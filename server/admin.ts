import { randomUUID } from 'node:crypto'
import { emptyProgress, pushNotification, type Booking } from '../src/lib/model.js'
import { bookingWhen } from './notify.js'
import { findLesson } from './learning.js'
import { creditedHours } from '../src/lib/pricing.js'
import type { Account, Database } from './database.js'
import { passwordHash, randomToken } from './database.js'

export class AdminError extends Error {}
const requireValue = (ok:unknown, message:string) => { if(!ok) throw new AdminError(message) }
const text = (v:unknown,max=300) => typeof v==='string'?v.trim().slice(0,max):''
const cents = (v:unknown) => { requireValue(Number.isSafeInteger(v)&&Number(v)>=0&&Number(v)<=100000000,'Montant invalide.');return Number(v) }
export function adminSnapshot(db:Database) {
 return {reports:(db.reports??[]).slice(-300).reverse(),editorial:db.editorial??{},users:Object.values(db.accounts).map(a=>({user:a.user,progress:a.progress,activeSessions:Object.values(a.sessions).filter(x=>x>Date.now()).length})),payments:db.payments??[],ledger:db.ledger??[],audit:(db.audit??[]).slice(-500).reverse()}
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
  // Fiche client sans accès au site : mot de passe aléatoire, à remplacer plus tard si le client veut se connecter.
  const pass=action==='adminCreate'&&!body.password?randomToken():typeof body.password==='string'?body.password:''
  requireValue(pass.length>=12&&pass.length<=128,'Mot de passe temporaire : 12 caractères minimum.')
  const salt=randomToken(),hash=await passwordHash(pass,salt)
  if(action==='adminPassword') {
   requireValue(target&&target.user.role!=='admin','Profil introuvable ou protégé.')
   target.password=hash;target.salt=salt;target.sessions={}
  } else {
   const username=text(body.username).toLowerCase(),displayName=text(body.displayName,40)
   // Sans e-mail : adresse fictive non routable (domaine .invalid réservé), jamais utilisée pour écrire au client.
   const email=(text(body.email)||`${username}@clients.talktome-club.invalid`).toLowerCase()
   requireValue((!email||/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email))&&/^[a-z0-9._]{3,20}$/.test(username)&&displayName,'Nom et pseudo valides requis (e-mail facultatif).')
   requireValue(!Object.values(db.accounts).some(a=>(email&&a.user.email===email)||a.user.username===username),'E-mail ou pseudo déjà utilisé.')
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
  requireValue((!email||/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email))&&/^[a-z0-9._]{3,20}$/.test(username),'E-mail ou pseudo invalide.')
  requireValue(!Object.values(db.accounts).some(a=>a.user.id!==id&&((email&&a.user.email===email)||a.user.username===username)),'E-mail ou pseudo déjà utilisé.')
  requireValue(credits<=10000,'Crédit trop élevé.')
  detail=`Crédits ${target.progress.packCredits} → ${credits}; illimité ${patch.isDemo}; suspendu ${patch.suspended}`
  if(credits>target.progress.packCredits)pushNotification(target.progress,{kind:'payment',title:'🎟️ Heures de cours ajoutées',body:`Tu as maintenant ${credits} h à planifier.`,link:'/reservations'})
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
  requireValue(['demandée','confirmée','annulée'].includes(body.status)||(body.status==='proposée'&&b!.status==='proposée'),'Statut invalide.')
  requireValue(b!.status!=='annulée','Une réservation annulée ne peut pas être réactivée.')
  // Déplacer le créneau (optionnel) et laisser une note à l'élève
  const previous=`${b!.date} ${b!.time}`,previousStatus=b!.status
  if(body.date!==undefined||body.time!==undefined){
   const date=text(body.date,10),time=text(body.time,5)
   requireValue(/^\d{4}-\d{2}-\d{2}$/.test(date)&&!Number.isNaN(Date.parse(date))&&/^([01]\d|2[0-3]):(00|30)$/.test(time),'Date ou heure invalide.')
   b!.date=date;b!.time=time
  }
  if(typeof body.note==='string')b!.teacherNote=text(body.note,500)
  // Bilan de séance (après le cours) : visible par l'élève, avec les activités conseillées.
  if(typeof body.summary==='string'&&body.summary.trim()){
   b!.summary=text(body.summary,1500);b!.recommended=text(body.recommended,500)
   pushNotification(account!.progress,{kind:'info',title:'📝 Bilan de ton cours',body:`${bookingWhen(b!)} · ${b!.summary.slice(0,90)}`,link:'/reservations'})
  }
  if(body.status==='confirmée'&&b!.status==='proposée'&&!account!.user.isDemo){
   requireValue(account!.progress.packCredits>0,'Cet élève n’a plus de crédit : valide d’abord son paiement.')
   account!.progress.packCredits--;b!.usedCredit=true
  }
  if(body.status==='confirmée')requireValue(!Object.values(db.accounts).some(a=>a.progress.bookings.some(x=>x.id!==id&&x.status==='confirmée'&&x.date===b!.date&&x.time===b!.time)),'Ce créneau est déjà confirmé pour un autre élève.')
  if(body.status==='annulée'&&b!.usedCredit){account!.progress.packCredits++;b!.usedCredit=false}
  if(body.status==='annulée'){const p=db.payments?.find(x=>x.id===b!.paymentId);if(p?.status==='pending')p.status='cancelled'}
  b!.status=body.status;detail=body.status
  const moved=previous!==`${b!.date} ${b!.time}`
  const link='/reservations'
  if(body.status==='annulée')pushNotification(account!.progress,{kind:'booking',title:'🚫 Cours annulé par le professeur',body:bookingWhen(b!),link})
  else if(body.status==='confirmée'&&previousStatus!=='confirmée')pushNotification(account!.progress,{kind:'booking',title:'✅ Cours confirmé',body:`${bookingWhen(b!)}${b!.teacherNote?` · ${b!.teacherNote}`:''}`,link})
  else if(moved)pushNotification(account!.progress,{kind:'booking',title:'🔁 Cours déplacé',body:`Nouvel horaire : ${bookingWhen(b!)}`,link})
  else if(typeof body.note==='string'&&body.note.trim())pushNotification(account!.progress,{kind:'info',title:'💬 Message du professeur',body:text(body.note,200),link})
 } else if(action==='adminPropose') {
  requireValue(target&&!target.user.archived,'Profil introuvable.')
  const date=text(body.date,10),time=text(body.time,5)
  requireValue(/^\d{4}-\d{2}-\d{2}$/.test(date)&&!Number.isNaN(Date.parse(date))&&/^([01]\d|2[0-3]):(00|30)$/.test(time),'Date ou heure invalide.')
  requireValue(!Object.values(db.accounts).some(a=>a.progress.bookings.some(x=>x.status==='confirmée'&&x.date===date&&x.time===time)),'Ce créneau est déjà confirmé pour un élève.')
  requireValue(!target.progress.bookings.some(x=>x.status!=='annulée'&&x.date===date&&x.time===time),'Cet élève a déjà un cours à cet horaire.')
  const language=(['coreen','japonais','espagnol','anglais','francais'] as const).find(l=>l===body.language)??'coreen'
  const booking:Booking={id:op,language,formula:'pack10',date,time,topic:text(body.topic,100)||'Cours particulier',message:'',teacherNote:text(body.note,500),status:'proposée',proposedBy:'teacher',createdAt:now}
  target.progress.bookings.unshift(booking)
  pushNotification(target.progress,{id:`prop-${op}`,kind:'booking',title:'📩 Nouveau créneau proposé',body:`${bookingWhen(booking)} · à accepter dans Mes réservations`,link:'/reservations'})
  detail=`Proposition ${date} ${time}`
 } else if(action==='adminReport') {
  const r=(db.reports??[]).find(x=>x.id===id)
  requireValue(r,'Signalement introuvable.')
  requireValue(['nouveau','traité'].includes(body.status),'Statut invalide.')
  r!.status=body.status;const reply=text(body.reply,500);if(reply)r!.reply=reply
  const author=db.accounts[r!.userId]
  if(author&&body.status==='traité')pushNotification(author.progress,{kind:'info',title:'✅ Ton signalement a été traité',body:`${r!.title}${reply?` · ${reply}`:''}`})
  detail=`Signalement ${r!.status}`
 } else if(action==='adminEditorial') {
  requireValue(findLesson(id),'Leçon introuvable.')
  requireValue(['brouillon','à relire','validé'].includes(body.status),'Statut invalide.')
  ;(db.editorial??={})[id]={status:body.status,by:actor.user.displayName,date:now}
  detail=`Leçon ${id} : ${body.status}`
 } else if(action==='adminManualPayment') {
  // Achat réglé hors PayPal (virement, espèces…) : enregistré comme payé, au journal comptable, avec notification au client.
  requireValue(target,'Profil introuvable.')
  const label=text(body.label,120), amount=cents(body.amount), date=text(body.date,10), reference=text(body.reference,100)
  const method=(['virement','especes','paypal','autre'] as const).find(m=>m===body.method)
  requireValue(label&&amount>0&&method,'Libellé, montant et moyen de paiement requis.')
  requireValue(/^\d{4}-\d{2}-\d{2}$/.test(date)&&!Number.isNaN(Date.parse(date))&&date<=now.slice(0,10),'Date de paiement invalide.')
  const hours=Number.isInteger(body.hours)&&body.hours>=0&&body.hours<=100?body.hours as number:0
  const paidAt=`${date}T12:00:00.000Z`
  ;(db.payments??=[]).push({id:op,userId:id,customer:target.user.displayName,bookingId:'',amount,currency:'EUR',hours,method,label,status:'paid',createdAt:paidAt,paidAt,reference:reference||undefined,fee:0})
  ;(db.ledger??=[]).push({id:op,date:paidAt,kind:'income',amount,fee:0,label:`${label} · ${target.user.displayName}`,reference:reference||`${method} ${date}`,paymentId:op,actor:actor.user.id})
  if(hours)target.progress.packCredits+=hours
  if(body.notify!==false){const via={virement:'par virement',especes:'en espèces',paypal:'par PayPal',autre:''}[method!];pushNotification(target.progress,{kind:'payment',title:`💶 Paiement reçu ${via}`.trim(),body:`${label} · ${(amount/100).toLocaleString('fr-FR')} € · ${new Date(paidAt).toLocaleDateString('fr-FR')}. Merci !`,link:'/reservations'})}
  detail=`Paiement ${method} ${amount} centimes · ${label}`
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
  // Heures figées dans le paiement : une hausse de prix ne change pas un pack déjà commandé.
  account.progress.packCredits+=creditedHours(p!.hours??(booking!.formula==='pack10'?10:1))
  pushNotification(account.progress,{kind:'payment',title:'💶 Paiement reçu, merci !',body:booking!.formula==='pack10'?'Ton pack de 10 heures est activé : propose tes créneaux.':'Ton cours est réglé.',link:'/reservations'})
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
