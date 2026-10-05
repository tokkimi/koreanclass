/**
 * Accès aux cours en autonomie (partagé client / serveur).
 * Tant que l'abonnement n'est pas activé (clés Stripe absentes), tout reste gratuit.
 */
import type { User } from './model.js'

export interface PlanInfo {
  /** Abonnement activé : Stripe configuré et date d'ouverture définie. */
  enabled: boolean
  /** Date d'ouverture du payant (AAAA-MM-JJ). */
  launch?: string
  monthly: number
  yearly: number
  /** Paiement des cours particuliers par Stripe disponible. */
  payments?: boolean
}

/** Mois offert aux élèves inscrits avant l'ouverture. */
export const TRANSITION_DAYS = 30

/** Formule Découverte : la première leçon de chaque niveau (et les tests de positionnement). */
export const isFreeLesson = (indexInLevel: number) => indexInLevel === 0

export function subscriptionActive(user: Pick<User, 'subscription'> | null | undefined, now = Date.now()) {
  const s = user?.subscription
  return !!s && ['active', 'trialing', 'past_due'].includes(s.status) && Date.parse(s.currentPeriodEnd) > now
}

/** Période de transition offerte aux comptes créés avant l'ouverture. */
export function inTransition(user: Pick<User, 'createdAt'> | null | undefined, plans: PlanInfo, now = Date.now()) {
  if (!user || !plans.launch) return false
  const launch = Date.parse(`${plans.launch}T00:00:00Z`)
  return Date.parse(user.createdAt) < launch && now < launch + TRANSITION_DAYS * 86400000
}

/** Accès complet aux cours en autonomie. */
export function hasFullAccess(user: Pick<User, 'role' | 'isDemo' | 'subscription' | 'createdAt'> | null | undefined, plans: PlanInfo, now = Date.now()) {
  if (!plans.enabled) return true
  if (plans.launch && now < Date.parse(`${plans.launch}T00:00:00Z`)) return true
  if (user?.role === 'admin' || user?.isDemo) return true
  return subscriptionActive(user, now) || inTransition(user, plans, now)
}

export const canOpenLesson = (user: Parameters<typeof hasFullAccess>[0], plans: PlanInfo, indexInLevel: number, now = Date.now()) =>
  isFreeLesson(indexInLevel) || hasFullAccess(user, plans, now)
