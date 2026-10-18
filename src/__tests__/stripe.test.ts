import { describe, expect, it } from 'vitest'
import { createHmac } from 'node:crypto'
import { handleEvent, signatureProblem, verifySignature } from '../../server/stripe'
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
  it('accepts several secrets (test + live), ignores pasted spaces and explains refusals', () => {
    const raw = '{"id":"evt_1","livemode":true,"name":"Léa 한국어"}', t = Math.floor(Date.now() / 1000)
    const sig = createHmac('sha256', 'whsec_live').update(`${t}.${raw}`).digest('hex')
    expect(signatureProblem(raw, `t=${t},v1=${sig}`, ' whsec_test, whsec_live\n')).toBe('')
    expect(signatureProblem(raw, `t=${t},v1=${sig}`, 'whsec_test')).toContain('LIVE')
    expect(signatureProblem('', `t=${t},v1=${sig}`, 'whsec_live')).toBe('corps de requête vide')
    expect(signatureProblem(raw, '', 'whsec_live')).toContain('absent')
  })
  it('does not fail the webhook when the subscription cannot be read, and finds new-style invoices', async () => {
    const db: Database = { version: 1, accounts: { lea: account('lea') }, limits: {} }
    await handleEvent(db, { id: 'evt_a', type: 'checkout.session.completed', data: { object: { mode: 'subscription', subscription: 'sub_1', client_reference_id: 'lea' } } }, async () => { throw new Error('No such subscription') })
    expect(db.stripeEvents).toContain('evt_a')
    await handleEvent(db, { id: 'evt_b', type: 'customer.subscription.created', data: { object: sub('active') } })
    await handleEvent(db, { id: 'evt_c', type: 'invoice.paid', data: { object: { id: 'in_9', customer: 'cus_other', parent: { subscription_details: { subscription: 'sub_1' } }, amount_paid: 9900 } } })
    expect(db.payments!.find((p) => p.reference === 'in_9')?.userId).toBe('lea')
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

import { createPaidBooking } from '../../server/stripe'
describe('pay-first private lessons', () => {
  it('creates the booking, payment, ledger entry and credits only after a paid session, once', () => {
    const db: Database = { version: 1, accounts: { lea: account('lea'), sia: { ...account('sia'), user: { ...account('sia').user, role: 'admin' } } }, limits: {} }
    const session = { id: 'cs_1', amount_total: 13000, payment_status: 'paid', metadata: { kind: 'booking', userId: 'lea', formula: 'pack10', hours: '10', language: 'japonais', date: '2026-10-20', time: '15:00', topic: 'Conversation', message: '' } }
    expect(createPaidBooking(db, { ...session, payment_status: 'unpaid' })).toBe(false)
    expect(db.accounts.lea.progress.bookings).toHaveLength(0)
    expect(createPaidBooking(db, session)).toBe(true)
    expect(createPaidBooking(db, session)).toBe(false)
    expect(db.accounts.lea.progress.bookings).toHaveLength(1)
    expect(db.accounts.lea.progress.bookings[0]).toMatchObject({ status: 'demandée', formula: 'pack10', language: 'japonais', paymentId: 'stripe-cs_1' })
    expect(db.payments).toHaveLength(1)
    expect(db.payments![0]).toMatchObject({ status: 'paid', amount: 13000, method: 'stripe' })
    expect(db.accounts.lea.progress.packCredits).toBe(9)
    expect(db.accounts.sia.progress.notifications![0].title).toContain('Demande payée')
  })
})
