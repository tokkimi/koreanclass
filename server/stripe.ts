import { createHmac, timingSafeEqual } from 'node:crypto'
import type { Account, Database } from './database.js'
import type { PlanInfo } from '../src/lib/access.js'
import { pushNotification, type Subscription } from '../src/lib/model.js'
import { SUBSCRIPTION, OFFERS, priceCents, creditedHours } from '../src/lib/pricing.js'
import { languageName } from '../src/data/languages.js'
import type { Booking } from '../src/lib/model.js'

/**
 * Abonnement « Autonomie » via Stripe (Checkout + portail client + webhook signé).
 * Variables Vercel (jamais côté navigateur) : STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET,
 * STRIPE_PRICE_MONTHLY, STRIPE_PRICE_YEARLY, SUBSCRIPTION_LAUNCH (AAAA-MM-JJ).
 * Si l'une manque, l'abonnement est désactivé et tous les cours restent gratuits.
 */
const env = () => ({
  key: process.env.STRIPE_SECRET_KEY ?? '',
  webhook: process.env.STRIPE_WEBHOOK_SECRET ?? '',
  monthly: process.env.STRIPE_PRICE_MONTHLY ?? '',
  yearly: process.env.STRIPE_PRICE_YEARLY ?? '',
  launch: /^\d{4}-\d{2}-\d{2}$/.test(process.env.SUBSCRIPTION_LAUNCH ?? '') ? process.env.SUBSCRIPTION_LAUNCH! : '',
})
/** Paiement Stripe des cours particuliers (clé et webhook suffisent). */
export const stripeReady = () => !!(env().key && env().webhook)

export function plans(): PlanInfo {
  const e = env()
  return { enabled: !!(e.key && e.webhook && e.monthly && e.yearly && e.launch), launch: e.launch || undefined, monthly: SUBSCRIPTION.monthly, yearly: SUBSCRIPTION.yearly, payments: stripeReady() }
}

async function stripe(path: string, params?: Record<string, string>, method = params ? 'POST' : 'GET') {
  const r = await fetch(`https://api.stripe.com/v1/${path}`, {
    method,
    headers: { Authorization: `Bearer ${env().key}`, ...(params ? { 'Content-Type': 'application/x-www-form-urlencoded' } : {}) },
    body: params ? new URLSearchParams(params).toString() : undefined,
  })
  const data = await r.json()
  if (!r.ok) throw new Error(data?.error?.message ?? 'Erreur Stripe')
  return data
}

export async function checkoutUrl(account: Account, plan: 'monthly' | 'yearly', origin: string) {
  const e = env()
  const params: Record<string, string> = {
    mode: 'subscription',
    'line_items[0][price]': plan === 'yearly' ? e.yearly : e.monthly,
    'line_items[0][quantity]': '1',
    client_reference_id: account.user.id,
    'subscription_data[metadata][userId]': account.user.id,
    'metadata[userId]': account.user.id,
    success_url: `${origin}/abonnement?statut=ok`,
    cancel_url: `${origin}/abonnement?statut=annule`,
    allow_promotion_codes: 'true',
    locale: 'fr',
  }
  if (account.user.subscription?.customerId) params.customer = account.user.subscription.customerId
  else if (account.user.email && !account.user.email.endsWith('.invalid')) params.customer_email = account.user.email
  return (await stripe('checkout/sessions', params)).url as string
}

/** Paiement d'un cours ou d'un pack : la réservation n'est créée qu'après confirmation du paiement par Stripe. */
export async function bookingCheckoutUrl(account: Account, b: Pick<Booking, 'language' | 'date' | 'time' | 'topic' | 'message'> & { formula: 'single' | 'pack10' }, origin: string) {
  const offer = OFFERS[b.formula]
  const params: Record<string, string> = {
    mode: 'payment',
    'line_items[0][quantity]': '1',
    'line_items[0][price_data][currency]': 'eur',
    'line_items[0][price_data][unit_amount]': String(priceCents(b.formula)),
    'line_items[0][price_data][product_data][name]': `${offer.label} · ${languageName(b.language)}`,
    'line_items[0][price_data][product_data][description]': `Cours particulier le ${b.date} à ${b.time} (heure de Paris)`,
    client_reference_id: account.user.id,
    'metadata[kind]': 'booking',
    'metadata[userId]': account.user.id,
    'metadata[formula]': b.formula,
    'metadata[hours]': String(offer.hours),
    'metadata[language]': b.language ?? 'coreen',
    'metadata[date]': b.date,
    'metadata[time]': b.time,
    'metadata[topic]': (b.topic ?? '').slice(0, 100),
    'metadata[message]': (b.message ?? '').slice(0, 450),
    success_url: `${origin}/reservations?paiement=ok`,
    cancel_url: `${origin}/reserver?paiement=annule`,
    locale: 'fr',
  }
  if (account.user.email && !account.user.email.endsWith('.invalid')) params.customer_email = account.user.email
  return (await stripe('checkout/sessions', params)).url as string
}

/** Paiement confirmé par Stripe : crée la réservation, le paiement, l'écriture comptable et les crédits (une seule fois). */
export function createPaidBooking(db: Database, session: { id: string; amount_total?: number; payment_status?: string; metadata?: Record<string, string> }) {
  const m = session.metadata ?? {}
  const account = m.userId ? db.accounts[m.userId] : undefined
  if (!account || session.payment_status !== 'paid' || account.progress.bookings.some((b) => b.id === session.id)) return false
  const formula: 'single' | 'pack10' = m.formula === 'pack10' ? 'pack10' : 'single'
  const hours = Number(m.hours) || OFFERS[formula].hours
  const language = (['coreen', 'japonais', 'espagnol', 'anglais', 'francais'] as const).find((l) => l === m.language) ?? 'coreen'
  const now = new Date().toISOString()
  const taken = Object.values(db.accounts).some((a) => a.progress.bookings.some((b) => b.status === 'confirmée' && b.date === m.date && b.time === m.time))
  const paymentId = `stripe-${session.id}`
  const booking: Booking = { id: session.id, language, formula, date: m.date, time: m.time, topic: m.topic ?? '', message: m.message ?? '', status: 'demandée', createdAt: now, paymentId, usedCredit: false, ...(taken ? { teacherNote: 'Ce créneau vient d’être pris : le professeur te propose un autre horaire.' } : {}) }
  account.progress.bookings.unshift(booking)
  const amount = session.amount_total ?? priceCents(formula)
  ;(db.payments ??= []).push({ id: paymentId, userId: account.user.id, customer: account.user.displayName, bookingId: booking.id, amount, currency: 'EUR', hours, method: 'stripe', label: OFFERS[formula].label, status: 'paid', createdAt: now, paidAt: now, reference: session.id, fee: 0 })
  ;(db.ledger ??= []).push({ id: paymentId, date: now, kind: 'income', amount, fee: 0, label: `${OFFERS[formula].label} · ${account.user.displayName}`, reference: session.id, paymentId, actor: 'stripe' })
  account.progress.packCredits += creditedHours(hours)
  pushNotification(account.progress, { kind: 'payment', title: '💶 Paiement reçu, demande envoyée', body: `${m.date} à ${m.time} · le professeur confirme le créneau.${hours > 1 ? ` ${creditedHours(hours)} h ajoutées à ton crédit.` : ''}`, link: '/reservations' })
  for (const a of Object.values(db.accounts)) if (a.user.role === 'admin') pushNotification(a.progress, { kind: 'booking', title: `📅 Demande payée · ${account.user.displayName}`, body: `${m.date} à ${m.time} · ${OFFERS[formula].label}`, link: '/admin?tab=agenda&filter=demandée' })
  return true
}

export async function portalUrl(account: Account, origin: string) {
  const customer = account.user.subscription?.customerId
  if (!customer) throw new Error('Aucun abonnement à gérer.')
  return (await stripe('billing_portal/sessions', { customer, return_url: `${origin}/abonnement` })).url as string
}

/** Vérifie la signature Stripe (en-tête Stripe-Signature, tolérance 5 minutes). */
export function verifySignature(raw: string, header: string, secret = env().webhook, now = Date.now()) {
  const parts = Object.fromEntries(header.split(',').map((p) => p.split('=') as [string, string]).filter((p) => p.length === 2)) as Record<string, string>
  const t = Number(parts.t)
  if (!secret || !t || Math.abs(now / 1000 - t) > 300) return false
  const expected = createHmac('sha256', secret).update(`${t}.${raw}`).digest('hex')
  return header.split(',').filter((p) => p.startsWith('v1=')).some((p) => {
    const sig = Buffer.from(p.slice(3), 'hex'), exp = Buffer.from(expected, 'hex')
    return sig.length === exp.length && timingSafeEqual(sig, exp)
  })
}

type StripeSub = { id: string; customer: string; status: Subscription['status']; cancel_at_period_end?: boolean; current_period_end?: number; metadata?: { userId?: string }; items?: { data: { current_period_end?: number; price?: { id: string; recurring?: { interval?: string } } }[] } }

function findAccount(db: Database, sub: { customer?: string; id?: string; userId?: string }) {
  return Object.values(db.accounts).find((a) => (sub.userId && a.user.id === sub.userId) || (sub.id && a.user.subscription?.subscriptionId === sub.id) || (sub.customer && a.user.subscription?.customerId === sub.customer))
}

/** Met à jour l'abonnement d'un compte à partir d'un objet subscription Stripe. */
export function applySubscription(db: Database, s: StripeSub, userId?: string) {
  const account = findAccount(db, { customer: s.customer, id: s.id, userId: userId ?? s.metadata?.userId })
  if (!account) return false
  const item = s.items?.data?.[0]
  const end = item?.current_period_end ?? s.current_period_end ?? 0
  const plan = item?.price?.recurring?.interval === 'year' || item?.price?.id === env().yearly ? 'yearly' : 'monthly'
  const before = account.user.subscription?.status
  account.user.subscription = { status: s.status, plan, customerId: s.customer, subscriptionId: s.id, currentPeriodEnd: new Date(end * 1000).toISOString(), cancelAtPeriodEnd: !!s.cancel_at_period_end }
  if (s.status === 'active' && before !== 'active') pushNotification(account.progress, { kind: 'payment', title: '🎉 Abonnement Autonomie activé', body: 'Tous les cours, révisions et fiches sont débloqués.', link: '/abonnement' })
  if (s.status === 'canceled' && before !== 'canceled') pushNotification(account.progress, { kind: 'payment', title: 'Abonnement terminé', body: 'Tu gardes la formule Découverte. Tu peux te réabonner quand tu veux.', link: '/abonnement' })
  return true
}

/** Traite un événement Stripe vérifié (idempotent par identifiant d'événement). */
export async function handleEvent(db: Database & { stripeEvents?: string[] }, event: { id: string; type: string; data: { object: any } }, fetchSub: (id: string) => Promise<StripeSub> = (id) => stripe(`subscriptions/${id}`)) {
  if ((db.stripeEvents ?? []).includes(event.id)) return
  const o = event.data.object
  if (event.type === 'checkout.session.completed' && o.mode === 'payment' && o.metadata?.kind === 'booking') {
    createPaidBooking(db, o)
  } else if (event.type === 'checkout.session.completed' && o.mode === 'subscription' && o.subscription) {
    applySubscription(db, await fetchSub(o.subscription), o.client_reference_id ?? o.metadata?.userId)
  } else if (event.type.startsWith('customer.subscription.')) {
    applySubscription(db, o)
  } else if (event.type === 'invoice.paid' && o.amount_paid > 0) {
    const account = findAccount(db, { customer: o.customer, id: o.subscription })
    if (account && !(db.payments ?? []).some((p) => p.reference === o.id)) {
      const now = new Date().toISOString()
      ;(db.payments ??= []).push({ id: `stripe-${o.id}`, userId: account.user.id, customer: account.user.displayName, bookingId: '', amount: o.amount_paid, currency: 'EUR', hours: 0, method: 'stripe', label: 'Abonnement Autonomie', status: 'paid', createdAt: now, paidAt: now, reference: o.id, fee: 0 })
      ;(db.ledger ??= []).push({ id: `stripe-${o.id}`, date: now, kind: 'income', amount: o.amount_paid, fee: 0, label: `Abonnement Autonomie · ${account.user.displayName}`, reference: o.id, paymentId: `stripe-${o.id}`, actor: 'stripe' })
    }
  } else if (event.type === 'invoice.payment_failed') {
    const account = findAccount(db, { customer: o.customer, id: o.subscription })
    if (account) pushNotification(account.progress, { kind: 'payment', title: '⚠️ Paiement de l’abonnement refusé', body: 'Mets à jour ton moyen de paiement pour garder l’accès.', link: '/abonnement' })
  }
  db.stripeEvents = [...(db.stripeEvents ?? []), event.id].slice(-500)
}
