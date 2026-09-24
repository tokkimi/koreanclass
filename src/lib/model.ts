import { levels, totalLessons } from '../data/index.js'

export interface User {
  id: string
  username: string
  email: string
  displayName: string
  isDemo?: boolean
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

export interface Booking {
  id: string
  formula: Formula
  date: string
  time: string
  topic: string
  message: string
  status: 'demandée' | 'confirmée' | 'annulée'
  createdAt: string
}

export interface PracticeEntry { id:string; refId:string; kind:'scene'|'oral'; date:string; score:number|null; total:number; mode?:'repeat'|'free'; transcript?:string }
export interface Progress {
  practice?: PracticeEntry[]
  lessons: Record<string, LessonProgress>
  tests: Record<string, TestProgress>
  history: ResultEntry[]
  placement: { levelIndex: number; score: number; total: number; date: string } | null
  xp: number
  streak: { count: number; lastDay: string }
  bookings: Booking[]
  packCredits: number
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


export function levelStats(p: Progress) {
  return levels.map((level) => {
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

export function globalStats(p: Progress) {
  const completed = Object.values(p.lessons).filter((l) => l.completed).length
  const scored = p.history.filter((h) => h.total > 0)
  const avg = scored.length ? Math.round(scored.reduce((a, h) => a + (h.score / h.total) * 100, 0) / scored.length) : null
  const passedLevels = levels.filter((l) => p.tests[l.id]?.passed)
  const stats = levelStats(p)
  const current = stats.find((s) => s.done < s.total || !s.test?.passed) ?? stats[stats.length - 1]
  const rank = RANKS.filter((r) => p.xp >= r.xp).pop() ?? RANKS[0]
  return {
    completed,
    total: totalLessons,
    pct: Math.round((completed / totalLessons) * 100),
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
