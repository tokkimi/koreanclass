/**
 * Source unique des prix (site, réservations, conditions de vente, serveur).
 * Changer un prix ici met à jour l'affichage, le lien PayPal et le montant attendu côté serveur.
 * Les paiements déjà enregistrés gardent leur montant et leurs heures (instantané à la commande).
 */
export const PAYPAL_ME = 'https://paypal.me/Siasiakorea'

export interface Offer {
  id: 'single' | 'pack10'
  label: string
  labelEn: string
  /** Prix TTC en euros. */
  price: number
  /** Heures de cours comprises. */
  hours: number
}

export const OFFERS: Record<Offer['id'], Offer> = {
  single: { id: 'single', label: 'Cours particulier 1 h', labelEn: 'Private lesson 1 h', price: 15, hours: 1 },
  pack10: { id: 'pack10', label: 'Pack 10 heures', labelEn: '10-hour pack', price: 100, hours: 10 },
}

export const priceCents = (id: Offer['id']) => OFFERS[id].price * 100
export const paypalLink = (id: Offer['id']) => `${PAYPAL_ME}/${OFFERS[id].price}EUR`
/** Prix horaire du pack et économie par rapport aux heures à l'unité. */
export const packHourly = () => Math.round((OFFERS.pack10.price / OFFERS.pack10.hours) * 100) / 100
export const packSaving = () => OFFERS.single.price * OFFERS.pack10.hours - OFFERS.pack10.price
/** Heures créditées à la validation d'un paiement (la première séance du pack est celle réservée). */
export const creditedHours = (hours: number) => Math.max(0, hours - 1)
export const euro = (n: number, en = false) => (en ? `€${n}` : `${n} €`)

/**
 * Grille à l'étude — PROPOSITION, non achetable. Rien ici n'est affiché comme une offre payante
 * tant que `available` est faux (prestataire, droits d'accès et renouvellements à mettre en place).
 */
export const PROPOSED_PLANS = [
  { id: 'decouverte', label: 'Découverte', price: 'Gratuit', detail: 'Accès limité à définir (ex. premières leçons de chaque niveau, tests de positionnement).', available: false },
  { id: 'autonomie', label: 'Autonomie', price: '9,90 €/mois ou 99 €/an', detail: 'Tous les cours, révisions et fiches. Nécessite un abonnement récurrent (PayPal Subscriptions ou Stripe) et une gestion des droits.', available: false },
  { id: 'single', label: 'Cours particulier', price: '15 €/h (lancement)', detail: 'Inchangé.', available: true },
  { id: 'pack10', label: 'Pack 10 heures', price: '130 € pour les nouvelles commandes', detail: 'Sous réserve de marge. Les packs déjà achetés restent aux conditions d’achat.', available: false },
] as const
