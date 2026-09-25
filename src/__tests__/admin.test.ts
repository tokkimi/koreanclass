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
})
