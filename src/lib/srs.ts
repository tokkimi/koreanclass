/**
 * Révisions espacées (variante simplifiée de SM-2), partagées client / serveur.
 * Une carte = un mot de vocabulaire d'une leçon, identifiée par « idLeçon|mot ».
 */
import { parisToday } from './time.js'

export type Grade = 0 | 1 | 2 | 3 // à revoir, difficile, bien, facile
export interface CardState {
  lesson: string
  due: string // AAAA-MM-JJ (heure de Paris)
  interval: number // jours
  ease: number
  reps: number
  lapses: number
  last?: string
}
export interface MistakeEntry {
  /** Leçon ou test concerné. */
  ref: string
  /** Index de l'exercice dans la leçon / le test. */
  index: number
  count: number
  lastAt: string
  resolved?: boolean
}

/** Intervalle à partir duquel un mot est considéré comme mémorisé. */
export const MASTERED_DAYS = 14
export const cardKey = (lessonId: string, word: string) => `${lessonId}|${word}`
export const lessonOfCard = (key: string) => key.slice(0, key.indexOf('|'))
export const wordOfCard = (key: string) => key.slice(key.indexOf('|') + 1)

export function addDays(day: string, n: number) {
  const d = new Date(`${day}T12:00:00Z`)
  d.setUTCDate(d.getUTCDate() + n)
  return d.toISOString().slice(0, 10)
}

export function newCard(lesson: string, today = parisToday()): CardState {
  return { lesson, due: today, interval: 0, ease: 2.5, reps: 0, lapses: 0 }
}

/** Calcule le prochain état d'une carte après une réponse. */
export function schedule(card: CardState, grade: Grade, today = parisToday()): CardState {
  let { interval, ease, reps, lapses } = card
  if (grade === 0) {
    reps = 0
    lapses += 1
    interval = 0
    ease = Math.max(1.3, ease - 0.2)
  } else if (grade === 1) {
    interval = Math.max(1, Math.round(interval * 1.2))
    ease = Math.max(1.3, ease - 0.15)
    reps += 1
  } else {
    interval = reps === 0 ? 1 : reps === 1 ? 3 : Math.round(Math.max(interval, 1) * ease)
    if (grade === 3) {
      interval = Math.round(interval * 1.3) + 1
      ease = Math.min(3, ease + 0.15)
    }
    reps += 1
  }
  interval = Math.min(interval, 365)
  return { ...card, interval, ease: Math.round(ease * 100) / 100, reps, lapses, due: addDays(today, interval), last: today }
}

export const isDue = (c: CardState, today = parisToday()) => c.due <= today
export const isMastered = (c: CardState) => c.interval >= MASTERED_DAYS

/** Statut pédagogique d'une leçon : consultée < exercices réussis < notion maîtrisée. */
export type LessonStatus = 'nouvelle' | 'consultée' | 'réussie' | 'maîtrisée'
export function lessonStatus(
  p: { lessons: Record<string, { completed: boolean }>; viewed?: Record<string, string>; srs?: Record<string, CardState>; mistakes?: Record<string, MistakeEntry> },
  lessonId: string,
  vocabCount: number,
): LessonStatus {
  if (p.lessons[lessonId]?.completed) {
    const cards = Object.entries(p.srs ?? {}).filter(([k]) => lessonOfCard(k) === lessonId).map(([, c]) => c)
    const open = Object.values(p.mistakes ?? {}).some((m) => m.ref === lessonId && !m.resolved)
    if (!open && vocabCount > 0 && cards.length >= vocabCount && cards.every(isMastered)) return 'maîtrisée'
    return 'réussie'
  }
  if (p.viewed?.[lessonId] || p.lessons[lessonId]) return 'consultée'
  return 'nouvelle'
}
