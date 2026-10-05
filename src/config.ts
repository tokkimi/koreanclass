import { OFFERS, paypalLink } from './lib/pricing'

/**
 * Configuration du site. Les valeurs peuvent être surchargées par des variables
 * d'environnement Vite (à définir dans Vercel → Settings → Environment Variables).
 */
const env = import.meta.env

export const SITE_NAME = 'TalkToMe Club'

/** Projet principal dont TalkToMe Club est une extension. */
export const TOKKIMI_URL = 'https://tokkimi.com'
export const OWNER = 'Une Digitale, Naudy Alexia'

/** E-mail qui reçoit les demandes de réservation (VITE_CONTACT_EMAIL). */
export const CONTACT_EMAIL: string = env.VITE_CONTACT_EMAIL ?? ''


/** Liens PayPal calculés à partir des prix (src/lib/pricing.ts) : jamais un lien d'un autre montant. */
export const PAYMENT_LINK_SINGLE: string = paypalLink('single')
export const PAYMENT_LINK_PACK: string = paypalLink('pack10')

export const PRICING = OFFERS

/** Créneaux proposés à la réservation (heure de Paris). */
export const TIME_SLOTS = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00']
