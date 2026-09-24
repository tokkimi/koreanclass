/**
 * Configuration du site. Les valeurs peuvent être surchargées par des variables
 * d'environnement Vite (à définir dans Vercel → Settings → Environment Variables).
 */
const env = import.meta.env

export const SITE_NAME = 'KoreanClass'

/** E-mail qui reçoit les demandes de réservation (VITE_CONTACT_EMAIL). */
export const CONTACT_EMAIL: string = env.VITE_CONTACT_EMAIL ?? ''

/** Liens de paiement optionnels (ex. Stripe Payment Links, PayPal.me). */
export const PAYMENT_LINK_SINGLE: string = env.VITE_PAYMENT_LINK_SINGLE ?? ''
export const PAYMENT_LINK_PACK: string = env.VITE_PAYMENT_LINK_PACK ?? ''

export const PRICING = {
  single: { label: 'Cours particulier 1 h', price: 15, hours: 1 },
  pack10: { label: 'Pack 10 heures', price: 100, hours: 10 },
} as const

/** Créneaux proposés à la réservation (heure de Paris). */
export const TIME_SLOTS = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00']
