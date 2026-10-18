import type { IncomingMessage, ServerResponse } from 'node:http'
import { transaction } from '../server/database.js'
import { handleEvent, signatureProblem, stripeReady } from '../server/stripe.js'

/** Corps brut exact (octets) : indispensable à la vérification de signature Stripe. */
async function rawBody(req: IncomingMessage & { body?: unknown }) {
  const chunks: Buffer[] = []
  let size = 0
  for await (const chunk of req) {
    const b = typeof chunk === 'string' ? Buffer.from(chunk) : (chunk as Buffer)
    size += b.length
    if (size > 1_000_000) return null
    chunks.push(b)
  }
  if (chunks.length) return Buffer.concat(chunks).toString('utf8')
  // Si l'hébergeur a déjà lu le flux, on reprend le corps qu'il a conservé.
  if (typeof req.body === 'string') return req.body
  if (Buffer.isBuffer(req.body)) return req.body.toString('utf8')
  return ''
}

/** Webhook Stripe : seule source de vérité pour l'état des abonnements (signature vérifiée). */
export default async function handler(req: IncomingMessage, res: ServerResponse) {
  res.setHeader('Content-Type', 'application/json')
  if (req.method !== 'POST') { res.statusCode = 405; res.end('{}'); return }
  if (!stripeReady()) { console.error('Stripe webhook: STRIPE_SECRET_KEY ou STRIPE_WEBHOOK_SECRET absent'); res.statusCode = 503; res.end(JSON.stringify({ error: 'Stripe non configuré.' })); return }
  const raw = await rawBody(req)
  if (raw === null) { res.statusCode = 413; res.end('{}'); return }
  const signature = String(req.headers['stripe-signature'] ?? '')
  const problem = signatureProblem(raw, signature)
  if (problem) {
    console.error(`Stripe webhook refusé (400) : ${problem} (corps ${raw.length} octets)`)
    res.statusCode = 400
    res.end(JSON.stringify({ error: 'Signature invalide.', reason: problem }))
    return
  }
  let event: { id: string; type: string; livemode?: boolean; data: { object: any } }
  try { event = JSON.parse(raw) } catch { res.statusCode = 400; res.end(JSON.stringify({ error: 'JSON invalide.' })); return }
  try {
    await transaction(async (db) => { await handleEvent(db, event) })
    res.end(JSON.stringify({ received: true }))
  } catch (e) {
    console.error(`Stripe webhook ${event.type} ${event.id}:`, e instanceof Error ? e.message : 'erreur')
    res.statusCode = 500 // Stripe réessaie automatiquement
    res.end(JSON.stringify({ error: 'Traitement impossible.' }))
  }
}
