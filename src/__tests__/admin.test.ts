import { describe,expect,it } from 'vitest'
import { randomUUID } from 'node:crypto'
import { adminAction,adminSnapshot } from '../../server/admin'
import { findSession,digest,type Account,type Database } from '../../server/database'
import { emptyProgress } from '../lib/model'
function setup(){
 const account=(id:string,admin=false):Account=>({user:{id,email:id+'@example.com',username:id,displayName:id,role:admin?'admin':'student',createdAt:'2026-09-25',avatar:null,bio:'',goal:'',location:'',website:''},password:'hidden',salt:'hidden',sessions:{},operations:[],progress:emptyProgress()})
 const admin=account('admin',true),student=account('student'),db:Database={version:1,accounts:{admin,student},limits:{},payments:[{id:'payment',userId:'student',customer:'Student',bookingId:'booking',amount:10000,currency:'EUR',status:'pending',createdAt:'2026-09-25'}]}
 student.progress.bookings=[{id:'booking',paymentId:'payment',date:'2026-10-10',time:'09:00',formula:'pack10',topic:'Conversation',message:'',status:'demandée',createdAt:'2026-09-25'}]
 return {db,admin,student}
}
const op=(action:string,extra:Record<string,unknown>={})=>({action,operationId:randomUUID(),...extra})
describe('administration and payment accounting',()=>{
 it('denies student access to admin mutations and never exports password hashes or sessions',async()=>{
  const {db,student}=setup();await expect(adminAction(db,student,op('adminExpense',{amount:100,label:'A',reference:'B',date:'2026-09-25'}))).rejects.toThrow('Accès administrateur')
  const json=JSON.stringify(adminSnapshot(db));expect(json).not.toContain('hidden');expect(json).not.toContain('"sessions"')
 })
 it('activates nine remaining hours exactly once and journals the gross payment and fees',async()=>{
  const {db,student,admin}=setup(),body=op('adminPayment',{id:'payment',reference:'PAYPAL12345',fee:350})
  await adminAction(db,admin,body);await adminAction(db,admin,body)
  expect(student.progress.packCredits).toBe(9);expect(db.ledger).toHaveLength(1);expect(db.ledger![0]).toMatchObject({amount:10000,fee:350,kind:'income'});expect(db.audit).toHaveLength(1)
  await expect(adminAction(db,admin,op('adminPayment',{id:'payment',reference:'PAYPAL12345',fee:350}))).rejects.toThrow()
 })
 it('rejects duplicated PayPal references, invalid fees and cancelled bookings',async()=>{
  const {db,admin,student}=setup();db.payments!.push({...db.payments![0],id:'old',status:'paid',reference:'PAYPAL12345'})
  await expect(adminAction(db,admin,op('adminPayment',{id:'payment',reference:'PAYPAL12345',fee:0}))).rejects.toThrow('déjà')
  await expect(adminAction(db,admin,op('adminPayment',{id:'payment',reference:'PAYPAL54321',fee:10001}))).rejects.toThrow('frais')
  student.progress.bookings[0].status='annulée';await expect(adminAction(db,admin,op('adminPayment',{id:'payment',reference:'PAYPAL54321',fee:0}))).rejects.toThrow('annulée')
  expect(db.ledger??[]).toHaveLength(0)
 })
 it('caps refunds at received amount and preserves original ledger entries',async()=>{
  const {db,admin}=setup();await adminAction(db,admin,op('adminPayment',{id:'payment',reference:'PAYPAL12345',fee:300}))
  await adminAction(db,admin,op('adminRefund',{id:'payment',amount:4000,reference:'REFUND123'}));await expect(adminAction(db,admin,op('adminRefund',{id:'payment',amount:6001,reference:'REFUND456'}))).rejects.toThrow('solde')
  await adminAction(db,admin,op('adminRefund',{id:'payment',amount:6000,reference:'REFUND789'}));expect(db.payments![0].status).toBe('refunded');expect(db.ledger).toHaveLength(3);expect(db.ledger![0].amount).toBe(10000)
 })
 it('revokes suspended and archived accounts and prevents admin self-destruction',async()=>{
  const {db,admin,student}=setup(),token='a'.repeat(64);student.sessions[digest(token)]=Date.now()+100000
  expect(findSession(db,token)).toBe(student);await adminAction(db,admin,op('adminArchive',{id:'student'}));expect(findSession(db,token)).toBeUndefined();expect(student.sessions).toEqual({})
  await expect(adminAction(db,admin,op('adminArchive',{id:'admin'}))).rejects.toThrow('protégé')
 })
 it('returns a used credit only once when cancelling and detects conflicting confirmations',async()=>{
  const {db,admin,student}=setup();student.progress.bookings[0].usedCredit=true
  await adminAction(db,admin,op('adminBooking',{id:'booking',status:'annulée'}));expect(student.progress.packCredits).toBe(1);expect(db.payments![0].status).toBe('cancelled')
  await expect(adminAction(db,admin,op('adminBooking',{id:'booking',status:'annulée'}))).rejects.toThrow();expect(student.progress.packCredits).toBe(1)
 })
 it('proposes a lesson to a student, reschedules it and consumes one credit on confirmation',async()=>{
  const {db,admin,student}=setup();student.progress.packCredits=2
  const body=op('adminPropose',{id:'student',date:'2026-10-12',time:'18:30',language:'japonais',topic:'Conversation',note:'Lien envoyé par e-mail'})
  await adminAction(db,admin,body);await adminAction(db,admin,body)
  const proposal=student.progress.bookings.filter(b=>b.status==='proposée');expect(proposal).toHaveLength(1);expect(proposal[0]).toMatchObject({language:'japonais',proposedBy:'teacher',time:'18:30'})
  await expect(adminAction(db,admin,op('adminPropose',{id:'student',date:'2026-10-12',time:'18:30'}))).rejects.toThrow('déjà')
  await expect(adminAction(db,admin,op('adminPropose',{id:'student',date:'2026-10-12',time:'18:15'}))).rejects.toThrow('invalide')
  await adminAction(db,admin,op('adminBooking',{id:proposal[0].id,status:'confirmée',date:'2026-10-13',time:'10:00'}))
  expect(proposal[0]).toMatchObject({status:'confirmée',date:'2026-10-13',time:'10:00',usedCredit:true});expect(student.progress.packCredits).toBe(1)
 })
 it('refuses to confirm a teacher proposal when the student has no credit',async()=>{
  const {db,admin,student}=setup()
  await adminAction(db,admin,op('adminPropose',{id:'student',date:'2026-10-12',time:'09:00'}))
  const id=student.progress.bookings.find(b=>b.status==='proposée')!.id
  await expect(adminAction(db,admin,op('adminBooking',{id,status:'confirmée'}))).rejects.toThrow('crédit')
 })
 it('notifies the student of proposals, confirmations and validated payments',async()=>{
  const {db,admin,student}=setup()
  await adminAction(db,admin,op('adminPayment',{id:'payment',reference:'PAYPAL12345',fee:0}))
  await adminAction(db,admin,op('adminPropose',{id:'student',date:'2026-10-12',time:'09:00'}))
  const id=student.progress.bookings.find(b=>b.status==='proposée')!.id
  await adminAction(db,admin,op('adminBooking',{id,status:'confirmée'}))
  const titles=(student.progress.notifications??[]).map(n=>n.title).join(' | ')
  expect(titles).toContain('Paiement reçu');expect(titles).toContain('Nouveau créneau proposé');expect(titles).toContain('Cours confirmé')
  expect(student.progress.notifications!.every(n=>n.read===false)).toBe(true)
 })
 it('handles content reports, editorial status and lesson summaries',async()=>{
  const {db,admin,student}=setup()
  const {allLessons}=await import('../data')
  const lessonId=allLessons[0].lesson.id
  db.reports=[{id:'r1',date:'2026-10-01',userId:'student',name:'Student',lessonId,title:'L',message:'Faute de frappe',status:'nouveau'}]
  await adminAction(db,admin,op('adminReport',{id:'r1',status:'traité',reply:'Corrigé, merci'}))
  expect(db.reports[0]).toMatchObject({status:'traité',reply:'Corrigé, merci'})
  expect(student.progress.notifications!.some(n=>n.title.includes('signalement'))).toBe(true)
  await adminAction(db,admin,op('adminEditorial',{id:lessonId,status:'validé'}))
  expect(db.editorial![lessonId].status).toBe('validé')
  await expect(adminAction(db,admin,op('adminEditorial',{id:'inconnue',status:'validé'}))).rejects.toThrow()
  await adminAction(db,admin,op('adminBooking',{id:'booking',status:'demandée',summary:'Bonne séance, revoir les particules',recommended:'Leçon 3'}))
  expect(student.progress.bookings[0]).toMatchObject({summary:'Bonne séance, revoir les particules',recommended:'Leçon 3'})
 })
 it('creates a client file without email and records a bank-transfer purchase with notification',async()=>{
  const {db,admin}=setup()
  await adminAction(db,admin,op('adminCreate',{displayName:'Johny Rajalu',username:'johny.rajalu',email:''}))
  const johny=Object.values(db.accounts).find(a=>a.user.username==='johny.rajalu')!
  expect(johny.user.email).toBe('johny.rajalu@clients.talktome-club.invalid')
  const yesterday=new Date(Date.now()-86400000).toISOString().slice(0,10)
  const body=op('adminManualPayment',{id:johny.user.id,label:'Formation Clirus Global',amount:7000,method:'virement',date:yesterday})
  await adminAction(db,admin,body);await adminAction(db,admin,body)
  const p=db.payments!.filter(x=>x.userId===johny.user.id)
  expect(p).toHaveLength(1);expect(p[0]).toMatchObject({status:'paid',amount:7000,method:'virement',label:'Formation Clirus Global'})
  expect(db.ledger!.filter(x=>x.paymentId===p[0].id)).toHaveLength(1)
  expect(johny.progress.notifications![0].title).toContain('virement')
  await expect(adminAction(db,admin,op('adminManualPayment',{id:johny.user.id,label:'X',amount:7000,method:'virement',date:'2999-01-01'}))).rejects.toThrow('Date')
  await expect(adminAction(db,admin,op('adminCreate',{displayName:'Autre',username:'johny.rajalu',email:''}))).rejects.toThrow('déjà')
 })
})
