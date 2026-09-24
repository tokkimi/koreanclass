import type { IncomingMessage, ServerResponse } from 'node:http'
import { randomUUID } from 'node:crypto'
import { consumeLimit, digest, findSession, passwordHash, randomToken, readDatabase, startSession, transaction, verifyPassword, type Account } from '../server/database.js'
import { workshops } from '../src/data/workshops.js'
import { compareSpeech } from '../src/lib/oral.js'
import { recordAttempt } from '../server/progress.js'
import { emptyProgress, type User, type Booking } from '../src/lib/model.js'

const usernameRE = /^[a-z0-9._]{3,20}$/
class HttpError extends Error { constructor(public status: number, message: string) { super(message) } }
const fail = (message: string, status = 400): never => { throw new HttpError(status, message) }
function str(value: unknown, max = 200) { return typeof value === 'string' ? value.slice(0,max).trim() : '' }
function password(value: unknown) { if (typeof value !== 'string' || value.length < 8 || value.length > 128) fail('Le mot de passe doit contenir entre 8 et 128 caractères.'); return value as string }
function sessionToken(req: IncomingMessage) { return (req.headers.cookie ?? '').split(';').map(x => x.trim()).find(x => x.startsWith('kc_session='))?.slice(11) ?? '' }
function cookie(res: ServerResponse, token: string, secure: boolean) { res.setHeader('Set-Cookie', `kc_session=${token}; HttpOnly; SameSite=Lax; Path=/; Max-Age=${token ? 2592000 : 0}${secure ? '; Secure' : ''}`) }
const snapshot = (a: Account) => ({ user: a.user, progress: a.progress })
export default async function handler(req: IncomingMessage & { body?: any }, res: ServerResponse) {
  res.setHeader('Cache-Control', 'private, no-store, max-age=0')
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  const secure = process.env.VERCEL === '1' || req.headers['x-forwarded-proto'] === 'https'
  try {
    if (!['GET','POST'].includes(req.method ?? '')) fail('Méthode non autorisée.', 405)
    const token = sessionToken(req)
    if (req.method === 'GET') {
      const { db } = await readDatabase()
      const a = findSession(db, token)
      res.end(JSON.stringify(a ? snapshot(a) : { user: null, progress: emptyProgress() })); return
    }
    const origin = req.headers.origin
    const host = req.headers.host
    if (origin && new URL(origin).host !== host) fail('Origine non autorisée.', 403)
    if (!req.headers['content-type']?.startsWith('application/json')) fail('Format JSON requis.', 415)
    let body = req.body
    if (!body) {
      let raw = ''
      for await (const chunk of req) { raw += chunk; if (raw.length > 900000) fail('Requête trop volumineuse.', 413) }
      body = JSON.parse(raw)
    } else if (typeof body === 'string') body = JSON.parse(body)
    if (!body || typeof body !== 'object') fail('Requête invalide.')
    const action = body.action
    if (action === 'login' || action === 'register') {
      const ip = str(req.headers['x-real-ip'] ?? req.headers['x-forwarded-for'] ?? 'local', 100)
      const identifier = str(action === 'register' ? body.email : body.identifier).toLowerCase()
      const allowed = await transaction(db => consumeLimit(db, digest(`auth:${ip}`), 45) && consumeLimit(db, digest(`identity:${identifier}`), 15))
      if (!allowed) fail('Trop de tentatives. Réessaie dans 15 minutes.', 429)
      const newToken = randomToken()
      if (action === 'login') {
        const { db } = await readDatabase()
        const account = Object.values(db.accounts).find(a => a.user.email === identifier || a.user.username === identifier)
        const supplied = typeof body.password === 'string' && body.password.length <= 128 ? body.password : ''
        if (!account || !await verifyPassword(supplied, account)) fail('Identifiant ou mot de passe incorrect.', 401)
        const data = await transaction(async latest => {
          const a = latest.accounts[account!.user.id]
          if (!a || a.password !== account!.password) fail('Reconnecte-toi.', 401)
          startSession(a, newToken)
          return snapshot(a)
        })
        cookie(res, newToken, secure); res.end(JSON.stringify(data)); return
      }
      const username = str(body.username).toLowerCase()
      if (!usernameRE.test(username) || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(identifier)) fail('Choisis un pseudo valide et une adresse e-mail valide.')
      const salt = randomToken()
      const hash = await passwordHash(password(body.password), salt)
      const user: User = { id: randomUUID(), username, email: identifier, displayName: str(body.displayName,40) || username, avatar: null, bio: '', goal: '', website: '', location: '', createdAt: new Date().toISOString() }
      const data = await transaction(db => {
        if (Object.values(db.accounts).some(a => a.user.username === username || a.user.email === identifier)) fail('Ce pseudo ou cet e-mail est déjà utilisé.')
        const account: Account = { user, salt, password: hash, progress: emptyProgress(), sessions: {}, operations: [] }
        startSession(account, newToken); db.accounts[user.id] = account
        return snapshot(account)
      })
      cookie(res, newToken, secure); res.end(JSON.stringify(data)); return
    }
    if (action === 'logout') {
      if (token) await transaction(db => { const a = findSession(db, token); if (a) delete a.sessions[digest(token)] })
      cookie(res, '', secure); res.end(JSON.stringify({ user: null, progress: emptyProgress() })); return
    }
    const { db: current } = await readDatabase()
    const currentAccount = findSession(current, token)
    if (!currentAccount) fail('Ta session a expiré. Reconnecte-toi pour enregistrer.', 401)
    let nextPassword: { salt: string; hash: string } | undefined
    if (action === 'password') {
      if (!await verifyPassword(str(body.current,128), currentAccount!)) fail('Mot de passe actuel incorrect.')
      const salt = randomToken()
      nextPassword = { salt, hash: await passwordHash(password(body.next), salt) }
    }
    const result = await transaction(db => {
      const a = findSession(db, token)
      if (!a) fail('Ta session a expiré. Reconnecte-toi.', 401)
      const account = a!
      const operationId = str(body.operationId,80)
      if (!/^[a-zA-Z0-9-]{10,80}$/.test(operationId)) fail('Identifiant de requête invalide.')
      if (account.operations.includes(operationId)) return snapshot(account)
      if (action === 'attempt') {
        if (!Array.isArray(body.answers)) fail('Réponses manquantes.')
        recordAttempt(account.progress, { kind: body.kind, refId: str(body.refId), answers: body.answers, id: operationId })
      } else if (action === 'scene' || action === 'oral') {
        const w=workshops.find(x=>x.id===body.refId)
        if(!w) fail('Atelier inconnu.')
        const practice=account.progress.practice??[]
        const entry:any={id:operationId,refId:w!.id,kind:action,date:new Date().toISOString(),score:null,total:0}
        if(action==='scene') {
          if(!Array.isArray(body.answers)||body.answers.length!==w!.turns.length||body.answers.some((x:unknown)=>typeof x!=='string'||x.length>3000))fail('Réponses incomplètes.')
          entry.score=w!.turns.filter((t,i)=>body.answers[i]===t.answer).length;entry.total=w!.turns.length
          const previous=Math.max(0,...practice.filter(x=>x.refId===w!.id&&x.kind==='scene').map(x=>x.score??0))
          account.progress.xp+=Math.max(0,entry.score-previous)*10
        } else {
          if(!['repeat','free'].includes(body.mode))fail('Mode oral invalide.')
          const transcript=str(body.transcript,5000)
          if(!transcript)fail('Transcription vide.')
          const parts=w!.speech.model.match(/[^.!?]+[.!?]?/g)??[w!.speech.model]
          if(!Number.isInteger(body.part)||body.part < -1 ||body.part>=parts.length)fail('Passage invalide.')
          const target=body.part<0?w!.speech.model:parts[body.part].trim()
          entry.transcript=transcript;entry.mode=body.mode;entry.total=100
          entry.score=body.mode==='repeat'?compareSpeech(target,transcript).similarity:null
        }
        account.progress.practice=[entry,...practice].slice(0,100)
      } else if (action === 'profile') {
        const p = body.patch ?? {}
        const name = str(p.username).toLowerCase()
        if (!usernameRE.test(name)) fail('Pseudo invalide.')
        if (Object.values(db.accounts).some(other => other.user.id !== account.user.id && other.user.username === name)) fail('Ce pseudo est déjà utilisé.')
        const website = str(p.website,100)
        if (website && !/^https?:\/\//i.test(website) && website.includes(':')) fail('Adresse de site invalide.')
        if (p.avatar !== null && (typeof p.avatar !== 'string' || !/^data:image\/(jpeg|png|webp);base64,/.test(p.avatar) || p.avatar.length > 600000)) fail('Photo invalide ou trop volumineuse.')
        account.user = { ...account.user, username: name, displayName: str(p.displayName,40) || name, bio: str(p.bio,150), location: str(p.location,40), goal: str(p.goal,80), website, avatar: p.avatar }
      } else if (action === 'password') {
        if (account.password !== currentAccount!.password) fail('Le mot de passe a changé. Reconnecte-toi.', 401)
        account.password = nextPassword!.hash; account.salt = nextPassword!.salt
        account.sessions = { [digest(token)]: Date.now() + 30 * 86400000 }
      } else if (action === 'reset') {
        account.progress = { ...emptyProgress(), bookings: account.progress.bookings, packCredits: account.progress.packCredits }
      } else if (action === 'delete') {
        delete db.accounts[account.user.id]
        return { user: null, progress: emptyProgress() }
      } else if (action === 'booking') {
        const b = body.booking ?? {}
        if (!/^\d{4}-\d{2}-\d{2}$/.test(str(b.date)) || !/^\d{2}:00$/.test(str(b.time))) fail('Date ou créneau invalide.')
        if (!['single','pack10','credit'].includes(b.formula)) fail('Formule invalide.')
        if (account.progress.bookings.some(x => x.status !== 'annulée' && x.date === b.date && x.time === b.time)) fail('Ce créneau est déjà réservé.')
        if (b.formula === 'credit' && !account.user.isDemo) {
          if (account.progress.packCredits <= 0) fail('Plus de crédit disponible.')
          account.progress.packCredits--
        }
        // A request is not a paid purchase: credits require payment confirmation.
        const booking: Booking = { id: operationId, formula: b.formula === 'single' ? 'single' : 'pack10', date: str(b.date), time: str(b.time), topic: str(b.topic,100), message: str(b.message,500), status: 'demandée', createdAt: new Date().toISOString() }
        account.progress.bookings.unshift(booking)
      } else if (action === 'cancelBooking') {
        const booking = account.progress.bookings.find(x => x.id === body.id)
        if (booking && booking.status !== 'annulée') booking.status = 'annulée'
      } else fail('Action inconnue.')
      account.operations = [...account.operations, operationId].slice(-2000)
      return snapshot(account)
    })
    if (action === 'delete') cookie(res, '', secure)
    res.end(JSON.stringify(result))
  } catch (error) {
    const known = error instanceof HttpError
    res.statusCode = known ? error.status : error instanceof SyntaxError ? 400 : 503
    res.end(JSON.stringify({ error: known ? error.message : 'La sauvegarde est momentanément indisponible. Réessaie : tes réponses restent affichées.' }))
    if (!known) console.error('Account service:', error instanceof Error ? error.message : 'unknown error')
  }
}
