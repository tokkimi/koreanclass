import type { IncomingMessage, ServerResponse } from 'node:http'
import { transaction } from '../server/database.js'
import { handleEvent, stripeReady, verifySignature } from '../server/stripe.js'

/** Webhook Stripe : seule source de vérité pour l'état des abonnements (signature vérifiée). */
export default async function handler(req: IncomingMessage, res: ServerResponse) {
  res.setHeader('Content-Type', 'application/json')
  if (req.method !== 'POST') { res.statusCode = 405; res.end('{}'); return }
  if (!stripeReady()) { res.statusCode = 503; res.end(JSON.stringify({ error: 'Stripe non configuré.' })); return }
  let raw = ''
  for await (const chunk of req) { raw += chunk; if (raw.length > 1_000_000) { res.statusCode = 413; res.end('{}'); return } }
  const signature = String(req.headers['stripe-signature'] ?? '')
  if (!verifySignature(raw, signature)) { res.statusCode = 400; res.end(JSON.stringify({ error: 'Signature invalide.' })); return }
  try {
    const event = JSON.parse(raw)
    await transaction(async (db) => { await handleEvent(db, event) })
    res.end(JSON.stringify({ received: true }))
  } catch (e) {
    console.error('Stripe webhook:', e instanceof Error ? e.message : 'erreur')
    res.statusCode = 500 // Stripe réessaie automatiquement
    res.end(JSON.stringify({ error: 'Traitement impossible.' }))
  }
}
