import { get, put, BlobPreconditionFailedError } from '@vercel/blob'
import { createHash, randomBytes, scrypt as scryptCallback, timingSafeEqual } from 'node:crypto'
import { promisify } from 'node:util'
import type { User, Progress } from '../src/lib/model.js'

export interface Account { user: User; password: string; salt: string; progress: Progress; sessions: Record<string, number>; operations: string[] }
export interface Payment { id:string; userId:string; customer:string; bookingId:string; amount:number; currency:'EUR'; status:'pending'|'paid'|'refunded'|'cancelled'; createdAt:string; paidAt?:string; reference?:string; fee?:number; refunded?:number }
export interface LedgerEntry { id:string; date:string; kind:'income'|'refund'|'expense'; amount:number; fee:number; label:string; reference:string; paymentId?:string; actor:string }
export interface AuditEntry { id:string; date:string; actor:string; action:string; target:string; detail:string }
export interface Database { version: 1; accounts: Record<string, Account>; limits: Record<string, { count: number; until: number }>; payments?:Payment[]; ledger?:LedgerEntry[]; audit?:AuditEntry[] }
export const DB_PATH = 'koreanclass/accounts-v1.json'
export const digest = (s: string) => createHash('sha256').update(s).digest('hex')
const scrypt = promisify(scryptCallback)
export async function passwordHash(password: string, salt: string) { return (await scrypt(password, salt, 64) as Buffer).toString('hex') }
export async function verifyPassword(password: string, account: Account) {
  const hash = await passwordHash(password, account.salt)
  return timingSafeEqual(Buffer.from(hash, 'hex'), Buffer.from(account.password, 'hex'))
}
export const randomToken = () => randomBytes(32).toString('hex')
export async function readDatabase() {
  const blob = await get(DB_PATH, { access: 'private', useCache: false })
  if (!blob || !blob.stream) throw new Error('Le service de comptes est en cours de préparation.')
  const db = JSON.parse(await new Response(blob.stream).text()) as Database
  return { db, etag: blob.blob.etag.replace(/^W\//, '') }
}
export async function transaction<T>(fn: (db: Database) => T | Promise<T>): Promise<T> {
  for (let attempt = 0; attempt < 6; attempt++) {
    const { db, etag } = await readDatabase()
    const result = await fn(db)
    try {
      await put(DB_PATH, JSON.stringify(db), { access: 'private', addRandomSuffix: false, allowOverwrite: true, ifMatch: etag, contentType: 'application/json' })
      return result
    } catch (error) {
      if (!(error instanceof BlobPreconditionFailedError) || attempt === 5) throw error
      await new Promise(resolve => setTimeout(resolve, 100 + Math.random() * 250))
    }
  }
  throw new Error('Réessaie dans un instant.')
}
export function findSession(db: Database, token: string) {
  if (!/^[a-f0-9]{64}$/.test(token)) return undefined
  const key = digest(token)
  return Object.values(db.accounts).find(a => !a.user.suspended && !a.user.archived && (a.sessions[key] ?? 0) > Date.now())
}
export function startSession(account: Account, token: string) {
  const active = Object.entries(account.sessions).filter(([, expiry]) => expiry > Date.now()).sort((a,b) => b[1] - a[1]).slice(0, 9)
  account.sessions = Object.fromEntries(active)
  account.sessions[digest(token)] = Date.now() + 30 * 86400000
}
export function consumeLimit(db: Database, key: string, max: number) {
  const now = Date.now()
  db.limits = Object.fromEntries(Object.entries(db.limits).filter(([, v]) => v.until > now).slice(-2000))
  const previous = db.limits[key]
  const item = previous && previous.until > now ? previous : { count: 0, until: now + 15 * 60000 }
  if (item.count >= max) return false
  item.count++
  db.limits[key] = item
  return true
}

