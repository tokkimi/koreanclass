import { levels, totalLessons } from '../data/index.js'
import type { Level } from '../data/types.js'
import type { CardState, MistakeEntry } from './srs.js'

export interface User {
  id: string
  username: string
  email: string
  displayName: string
  isDemo?: boolean
  role?: 'admin' | 'student'
  suspended?: boolean
  archived?: boolean
  avatar: string | null
  bio: string
  location: string
  goal: string
  website: string
  createdAt: string
}

export interface LessonProgress {
  completed: boolean
  bestScore: number
  lastScore: number
  attempts: number
  lastAt: string
}

export interface TestProgress {
  best: number
  last: number
  attempts: number
  passed: boolean
  lastAt: string
}

export interface ResultEntry {
  id: string
  kind: 'lesson' | 'test' | 'placement'
  refId: string
  title: string
  score: number
  total: number
  date: string
}

export type Formula = 'single' | 'pack10'

/** Référence courte et lisible à indiquer dans PayPal (ex. TTM-5886688B). */
export const shortRef = (id: string) => 'TTM-' + id.replace(/[^a-zA-Z0-9]/g, '').slice(0, 8).toUpperCase()

/** Comptes promus administrateur : pseudo + date de création antérieure à la mise en place (un nouveau compte qui reprendrait ce pseudo ne l'est pas). */
export const ADMIN_BOOTSTRAP: { username: string; createdBefore: string }[] = [{ username: 'sia', createdBefore: '2026-09-28T19:35:00Z' }]
export function shouldPromote(user: User) {
  return user.role !== 'admin' && ADMIN_BOOTSTRAP.some((a) => a.username === user.username && user.createdAt < a.createdBefore)
}

export interface Booking {
  /** Langue du cours ; absente sur les anciennes réservations (= coréen). */
  language?: 'coreen' | 'japonais' | 'espagnol' | 'anglais' | 'francais'
  paymentId?: string
  usedCredit?: boolean
  id: string
  formula: Formula
  date: string
  time: string
  topic: string
  message: string
  /** proposée : créneau proposé par le professeur, en attente de l'accord de l'élève. */
  status: 'demandée' | 'proposée' | 'confirmée' | 'annulée'
  /** Qui a créé la réservation (élève par défaut). */
  proposedBy?: 'student' | 'teacher'
  /** Note du professeur visible par l'élève. */
  teacherNote?: string
  /** Bilan après la séance et activités conseillées. */
  summary?: string
  recommended?: string
  createdAt: string
}

/** Notification affichée dans la cloche (rendez-vous, badges, paiements…). */
export interface AppNotification {
  id: string
  date: string
  kind: 'booking' | 'badge' | 'payment' | 'info'
  title: string
  body?: string
  link?: string
  read?: boolean
}
/** Ajoute une notification (les 60 plus récentes sont gardées). */
export function pushNotification(p: Progress, n: Omit<AppNotification, 'id' | 'date' | 'read'> & { id?: string }) {
  const id = n.id ?? `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`
  if ((p.notifications ?? []).some((x) => x.id === id)) return
  p.notifications = [{ ...n, id, date: new Date().toISOString(), read: false }, ...(p.notifications ?? [])].slice(0, 60)
}

export interface PracticeEntry { id:string; refId:string; kind:'scene'|'oral'; date:string; score:number|null; total:number; mode?:'repeat'|'free'; transcript?:string }
export interface Progress {
  practice?: PracticeEntry[]
  lessons: Record<string, LessonProgress>
  tests: Record<string, TestProgress>
  history: ResultEntry[]
  placement: { levelIndex: number; score: number; total: number; date: string } | null
  /** Tests de positionnement des autres langues (japonais, espagnol…). */
  placements?: Record<string, { levelIndex: number; score: number; total: number; date: string }>
  xp: number
  streak: { count: number; lastDay: string }
  bookings: Booking[]
  packCredits: number
  notifications?: AppNotification[]
  /** Révisions espacées : « idLeçon|mot » → état de la carte. */
  srs?: Record<string, CardState>
  /** Carnet d'erreurs : « idRéf#index » → exercice manqué. */
  mistakes?: Record<string, MistakeEntry>
  /** Leçons ouvertes (date de la dernière consultation). */
  viewed?: Record<string, string>
  /** Dernière activité, pour « reprendre ». */
  activity?: { path: string; title: string; date: string }
  /** Compteurs du jour (heure de Paris). */
  daily?: { day: string; reviews: number; activities: number }
  /** Objectif choisi par l'élève. */
  goal?: { purpose: 'voyage' | 'quotidien' | 'travail' | 'examen'; dailyReviews: number }
}


export function emptyProgress(): Progress {
  return {
    lessons: {},
    tests: {},
    history: [],
    placement: null,
    xp: 0,
    streak: { count: 0, lastDay: '' },
    bookings: [],
    packCredits: 0,
  }
}


export function levelStats(p: Progress, list: Level[] = levels) {
  return list.map((level) => {
    const done = level.lessons.filter((l) => p.lessons[l.id]?.completed).length
    const scores = level.lessons.map((l) => p.lessons[l.id]?.bestScore).filter((x): x is number => x !== undefined)
    return {
      level,
      done,
      total: level.lessons.length,
      pct: Math.round((done / level.lessons.length) * 100),
      avg: scores.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : null,
      test: p.tests[level.id],
    }
  })
}

/** Sans `list` : parcours coréen historique. Avec `list` : statistiques limitées à ces niveaux (une langue). */
export function globalStats(p: Progress, list?: Level[]) {
  const lv = list ?? levels
  const inList = list ? new Set(list.flatMap((l) => l.lessons.map((x) => x.id))) : null
  const lessonTotal = list ? inList!.size : totalLessons
  const completed = Object.entries(p.lessons).filter(([id, l]) => l.completed && (!inList || inList.has(id))).length
  const levelIds = list ? new Set(list.map((l) => l.id)) : null
  const scored = p.history.filter((h) => h.total > 0 && (!inList || inList.has(h.refId) || levelIds!.has(h.refId)))
  const avg = scored.length ? Math.round(scored.reduce((a, h) => a + (h.score / h.total) * 100, 0) / scored.length) : null
  const passedLevels = lv.filter((l) => p.tests[l.id]?.passed)
  const stats = levelStats(p, lv)
  const current = stats.find((s) => s.done < s.total || !s.test?.passed) ?? stats[stats.length - 1]
  const rank = RANKS.filter((r) => p.xp >= r.xp).pop() ?? RANKS[0]
  return {
    completed,
    total: lessonTotal,
    pct: Math.round((completed / lessonTotal) * 100),
    avg,
    passedLevels: passedLevels.length,
    currentLevel: current.level,
    rank,
    nextRank: RANKS.find((r) => r.xp > p.xp) ?? null,
  }
}

export const RANKS = [
  { xp: 0, name: '새싹', fr: 'Pousse' },
  { xp: 300, name: '학생', fr: 'Élève' },
  { xp: 1000, name: '열공러', fr: 'Bosseur' },
  { xp: 2500, name: '고수', fr: 'Expert' },
  { xp: 5000, name: '달인', fr: 'Maître' },
  { xp: 9000, name: '한국어 천재', fr: 'Génie du coréen' },
]

export function localDay(date = new Date()) {
 return new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Paris', year: 'numeric', month: '2-digit', day: '2-digit' }).format(date);
}
export function currentStreak(p: Progress) {
 const day = localDay();
 const yesterday = localDay(new Date(Date.now() - 86400000));
 return p.streak.lastDay === day || p.streak.lastDay === yesterday ? p.streak.count : 0;
}
