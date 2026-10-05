import { describe, expect, it } from 'vitest'
import { createHmac } from 'node:crypto'
import { handleEvent, verifySignature } from '../../server/stripe'
import type { Account, Database } from '../../server/database'
import { emptyProgress } from '../lib/model'

const account = (id: string): Account => ({ user: { id, email: id + '@example.com', username: id, displayName: id, role: 'student', createdAt: '2026-09-01', avatar: null, bio: '', goal: '', location: '', website: '' }, password: 'x', salt: 'x', sessions: {}, operations: [], progress: emptyProgress() })
const sub = (status: string) => ({ id: 'sub_1', customer: 'cus_1', status, cancel_at_period_end: false, metadata: { userId: 'lea' }, items: { data: [{ current_period_end: 1893456000, price: { id: 'price_m', recurring: { interval: 'month' } } }] } })

describe('Stripe subscriptions', () => {
  it('accepts only correctly signed, recent webhooks', () => {
    const raw = '{"id":"evt_1"}', t = Math.floor(Date.now() / 1000)
    const sig = createHmac('sha256', 'whsec_test').update(`${t}.${raw}`).digest('hex')
    expect(verifySignature(raw, `t=${t},v1=${sig}`, 'whsec_test')).toBe(true)
    expect(verifySignature(raw + ' ', `t=${t},v1=${sig}`, 'whsec_test')).toBe(false)
    expect(verifySignature(raw, `t=${t - 1000},v1=${sig}`, 'whsec_test')).toBe(false)
    expect(verifySignature(raw, `t=${t},v1=${sig}`, '')).toBe(false)
  })
  it('activates on checkout, records paid invoices once, and ends on cancellation', async () => {
    const db: Database = { version: 1, accounts: { lea: account('lea') }, limits: {} }
    await handleEvent(db, { id: 'evt_1', type: 'checkout.session.completed', data: { object: { mode: 'subscription', subscription: 'sub_1', client_reference_id: 'lea' } } }, async () => sub('active') as never)
    expect(db.accounts.lea.user.subscription).toMatchObject({ status: 'active', plan: 'monthly', customerId: 'cus_1' })
    const invoice = { id: 'evt_2', type: 'invoice.paid', data: { object: { id: 'in_1', customer: 'cus_1', subscription: 'sub_1', amount_paid: 990 } } }
    await handleEvent(db, invoice); await handleEvent(db, invoice); await handleEvent(db, { ...invoice, id: 'evt_3' })
    expect(db.payments!.filter((p) => p.reference === 'in_1')).toHaveLength(1)
    expect(db.ledger!.filter((l) => l.reference === 'in_1')).toHaveLength(1)
    await handleEvent(db, { id: 'evt_4', type: 'customer.subscription.deleted', data: { object: sub('canceled') } })
    expect(db.accounts.lea.user.subscription!.status).toBe('canceled')
    expect(db.accounts.lea.progress.notifications!.map((n) => n.title).join(' ')).toContain('Abonnement Autonomie activé')
  })
})
