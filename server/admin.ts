import { randomUUID } from 'node:crypto'
import { emptyProgress } from '../src/lib/model.js'
import type { Account, Database } from './database.js'
import { passwordHash, randomToken } from './database.js'

export class AdminError extends Error {}
const requireValue = (ok:unknown, message:string) => { if(!ok) throw new AdminError(message) }
const text = (v:unknown,max=300) => typeof v==='string'?v.trim().slice(0,max):''
const cents = (v:unknown) => { requireValue(Number.isSafeInteger(v)&&Number(v)>=0&&Number(v)<=100000000,'Montant invalide.');return Number(v) }
export function adminSnapshot(db:Database) {
 return {users:Object.values(db.accounts).map(a=>({user:a.user,progress:a.progress,activeSessions:Object.values(a.sessions).filter(x=>x>Date.now()).length})),payments:db.payments??[],ledger:db.ledger??[],audit:(db.audit??[]).slice(-500).reverse()}
}
export async function adminAction(db:Database, actor:Account, body:Record<string,any>) {
 requireValue(actor.user.role==='admin','Accès administrateur requis.')
 const op=text(body.operationId,80)
 requireValue(/^[a-zA-Z0-9-]{10,80}$/.test(op),'Identifiant de requête invalide.')
 if(actor.operations.includes(op)) return
 const action=body.action, id=text(body.id,80), now=new Date().toISOString()
 const target=db.accounts[id]
 let detail=''
 if(action==='adminCreate'||action==='adminPassword') {
  const pass=typeof body.password==='string'?body.password:''
  requireValue(pass.length>=12&&pass.length<=128,'Mot de passe temporaire : 12 caractères minimum.')
  const salt=randomToken(),hash=await passwordHash(pass,salt)
  if(action==='adminPassword') {
   requireValue(target&&target.user.role!=='admin','Profil introuvable ou protégé.')
   target.password=hash;target.salt=salt;target.sessions={}
  } else {
   const email=text(body.email).toLowerCase(),username=text(body.username).toLowerCase(),displayName=text(body.displayName,40)
   requireValue(/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)&&/^[a-z0-9._]{3,20}$/.test(username)&&displayName,'E-mail, pseudo et nom valides requis.')
   requireValue(!Object.values(db.accounts).some(a=>a.user.email===email||a.user.username===username),'E-mail ou pseudo déjà utilisé.')
   const userId=randomUUID()
   db.accounts[userId]={user:{id:userId,email,username,displayName,createdAt:now,role:'student',avatar:null,bio:'',location:'',goal:'',website:''},password:hash,salt,progress:emptyProgress(),sessions:{},operations:[]}
   detail=`Création ${email}`
  }
 } else if(action==='adminUser') {
  requireValue(target,'Profil introuvable.')
  requireValue(target.user.role!=='admin','Le compte administrateur est protégé.')
  const patch=body.patch??{}
  requireValue(typeof patch.displayName==='string'&&patch.displayName.trim(),'Nom requis.')
  requireValue(typeof patch.isDemo==='boolean'&&typeof patch.suspended==='boolean','Accès invalide.')
  const credits=cents(patch.packCredits)
  const email=text(patch.email).toLowerCase(),username=text(patch.username).toLowerCase()
  requireValue(/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)&&/^[a-z0-9._]{3,20}$/.test(username),'E-mail ou pseudo invalide.')
  requireValue(!Object.values(db.accounts).some(a=>a.user.id!==id&&(a.user.email===email||a.user.username===username)),'E-mail ou pseudo déjà utilisé.')
  requireValue(credits<=10000,'Crédit trop élevé.')
  detail=`Crédits ${target.progress.packCredits} → ${credits}; illimité ${patch.isDemo}; suspendu ${patch.suspended}`
  target.user.displayName=text(patch.displayName,40);target.user.isDemo=patch.isDemo;target.user.suspended=patch.suspended;target.progress.packCredits=credits
  target.user.email=email;target.user.username=username
  if(patch.suspended)target.sessions={}
 } else if(['adminRevoke','adminReset','adminArchive','adminRestore'].includes(action)) {
  requireValue(target&&target.user.role!=='admin','Profil introuvable ou protégé.')
  if(action==='adminReset')target.progress={...emptyProgress(),bookings:target.progress.bookings,packCredits:target.progress.packCredits}
  else if(action==='adminArchive') {target.user.archived=true;target.sessions={}}
  else if(action==='adminRestore') {target.user.archived=false;target.user.suspended=false}
  else target.sessions={}
 } else if(action==='adminBooking') {
  const account=Object.values(db.accounts).find(a=>a.progress.bookings.some(b=>b.id===id)), b=account?.progress.bookings.find(b=>b.id===id)
  requireValue(b&&account,'Réservation introuvable.')
  requireValue(['demandée','confirmée','annulée'].includes(body.status),'Statut invalide.')
  requireValue(b!.status!=='annulée','Une réservation annulée ne peut pas être réactivée.')
  if(body.status==='confirmée')requireValue(!Object.values(db.accounts).some(a=>a.progress.bookings.some(x=>x.id!==id&&x.status==='confirmée'&&x.date===b!.date&&x.time===b!.time)),'Ce créneau est déjà confirmé pour un autre élève.')
  if(body.status==='annulée'&&b!.usedCredit){account!.progress.packCredits++;b!.usedCredit=false}
  if(body.status==='annulée'){const p=db.payments?.find(x=>x.id===b!.paymentId);if(p?.status==='pending')p.status='cancelled'}
  b!.status=body.status;detail=body.status
 } else if(action==='adminPayment') {
  const p=(db.payments??[]).find(p=>p.id===id)
  requireValue(p&&p.status==='pending','Paiement introuvable ou déjà traité.')
  const reference=text(body.reference,100), fee=cents(body.fee)
  requireValue(reference.length>=6,'Référence PayPal requise (au moins 6 caractères).')
  requireValue(!(db.payments??[]).some(x=>x.reference?.toLowerCase()===reference.toLowerCase()),'Cette transaction PayPal a déjà été enregistrée.')
  requireValue(fee<=p!.amount,'Les frais dépassent le montant reçu.')
  const account=db.accounts[p!.userId], booking=account?.progress.bookings.find(b=>b.id===p!.bookingId)
  requireValue(account&&booking&&booking.status!=='annulée','Réservation annulée ou introuvable : ne pas valider ce paiement.')
  p!.status='paid';p!.reference=reference;p!.fee=fee;p!.paidAt=now
  if(booking!.formula==='pack10')account.progress.packCredits+=9
  ;(db.ledger??=[]).push({id:op,date:now,kind:'income',amount:p!.amount,fee,label:booking!.formula==='pack10'?'Pack 10 heures':'Cours 1 heure',reference,paymentId:id,actor:actor.user.id})
  detail=`PayPal ${reference}; ${p!.amount} centimes; crédits activés`
 } else if(action==='adminRefund') {
  const p=(db.payments??[]).find(p=>p.id===id)
  requireValue(p&&p.status==='paid','Paiement non remboursable.')
  const amount=cents(body.amount), reference=text(body.reference,100)
  requireValue(amount>0&&amount<=p!.amount-(p!.refunded??0),'Montant supérieur au solde remboursable.')
  requireValue(reference.length>=6,'Référence du remboursement PayPal requise.')
  requireValue(!(db.ledger??[]).some(x=>x.reference.toLowerCase()===reference.toLowerCase()),'Référence déjà enregistrée.')
  p!.refunded=(p!.refunded??0)+amount;if(p!.refunded===p!.amount)p!.status='refunded'
  ;(db.ledger??=[]).push({id:op,date:now,kind:'refund',amount,fee:0,label:text(body.label)||'Remboursement PayPal',reference,paymentId:id,actor:actor.user.id})
  detail=`Remboursement enregistré ${amount} centimes. Ajustement des crédits séparé.`
 } else if(action==='adminExpense') {
  const amount=cents(body.amount),label=text(body.label),reference=text(body.reference,100),date=text(body.date,10)
  requireValue(amount>0&&label&&reference&&/^\d{4}-\d{2}-\d{2}$/.test(date)&&!Number.isNaN(Date.parse(date)),'Montant, libellé, référence et date requis.')
  ;(db.ledger??=[]).push({id:op,date:date+'T12:00:00.000Z',kind:'expense',amount,fee:0,label,reference,actor:actor.user.id});detail=label
 } else throw new AdminError('Action administrateur inconnue.')
 actor.operations=[...actor.operations,op].slice(-2000)
 ;(db.audit??=[]).push({id:randomUUID(),date:now,actor:actor.user.id,action,target:id,detail})
}
