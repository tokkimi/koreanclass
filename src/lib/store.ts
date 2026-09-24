import { useSyncExternalStore } from 'react'
import { levels, totalLessons } from '../data'

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

export interface User {
  id: string
  username: string
  email: string
  displayName: string
  passwordHash: string
  salt: string
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

export interface Progress {
  lessons: Record<string, LessonProgress>
  tests: Record<string, TestProgress>
  history: ResultEntry[]
  placement: { levelIndex: number; score: number; total: number; date: string } | null
  xp: number
  streak: { count: number; lastDay: string }
  bookings: Booking[]
  packCredits: number
}

interface State {
  users: Record<string, User>
  sessionUserId: string | null
  progress: Record<string, Progress>
}

/* ------------------------------------------------------------------ */
/* Persistance                                                         */
/* ------------------------------------------------------------------ */

const KEY = 'hangeulclub:v1'
const emptyState: State = { users: {}, sessionUserId: null, progress: {} }

function load(): State {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return emptyState
    const parsed = JSON.parse(raw) as State
    return { ...emptyState, ...parsed }
  } catch {
    return emptyState
  }
}

let state: State = typeof window !== 'undefined' ? load() : emptyState
const listeners = new Set<() => void>()

function save() {
  try {
    localStorage.setItem(KEY, JSON.stringify(state))
  } catch (e) {
    console.error(e)
    throw new Error("Impossible d'enregistrer (stockage du navigateur plein ?). Essayez une photo plus légère.")
  }
}

function setState(updater: (s: State) => State) {
  state = updater(state)
  save()
  listeners.forEach((l) => l())
}

if (typeof window !== 'undefined') {
  window.addEventListener('storage', (e) => {
    if (e.key === KEY) {
      state = load()
      listeners.forEach((l) => l())
    }
  })
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export function useStore<T>(selector: (s: State) => T): T {
  return useSyncExternalStore(subscribe, () => selector(state), () => selector(emptyState))
}

/* ------------------------------------------------------------------ */
/* Utilitaires                                                         */
/* ------------------------------------------------------------------ */

const uid = () => Math.random().toString(36).slice(2, 10) + Date.now().toString(36)
const today = () => new Date().toISOString().slice(0, 10)

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

async function hashPassword(password: string, salt: string): Promise<string> {
  const data = new TextEncoder().encode(salt + ':' + password)
  if (typeof crypto !== 'undefined' && crypto.subtle) {
    const buf = await crypto.subtle.digest('SHA-256', data)
    return Array.from(new Uint8Array(buf))
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('')
  }
  // Repli (contexte non sécurisé) : hachage simple
  let h = 5381
  for (const b of data) h = ((h << 5) + h + b) >>> 0
  return 'djb2-' + h.toString(16)
}

/* ------------------------------------------------------------------ */
/* Authentification                                                    */
/* ------------------------------------------------------------------ */

export const USERNAME_RE = /^[a-z0-9._]{3,20}$/

export async function register(input: { username: string; email: string; displayName: string; password: string }): Promise<User> {
  const username = input.username.trim().toLowerCase()
  const email = input.email.trim().toLowerCase()
  if (!USERNAME_RE.test(username)) throw new Error("Nom d'utilisateur : 3 à 20 caractères (lettres minuscules, chiffres, . ou _).")
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) throw new Error('Adresse e-mail invalide.')
  if (input.password.length < 6) throw new Error('Le mot de passe doit contenir au moins 6 caractères.')
  const users = Object.values(state.users)
  if (users.some((u) => u.username === username)) throw new Error("Ce nom d'utilisateur est déjà pris.")
  if (users.some((u) => u.email === email)) throw new Error('Un compte existe déjà avec cet e-mail.')

  const salt = uid()
  const user: User = {
    id: uid(),
    username,
    email,
    displayName: input.displayName.trim() || username,
    passwordHash: await hashPassword(input.password, salt),
    salt,
    avatar: null,
    bio: '',
    location: '',
    goal: '',
    website: '',
    createdAt: new Date().toISOString(),
  }
  setState((s) => ({
    ...s,
    users: { ...s.users, [user.id]: user },
    progress: { ...s.progress, [user.id]: emptyProgress() },
    sessionUserId: user.id,
  }))
  return user
}

export async function login(identifier: string, password: string): Promise<User> {
  const id = identifier.trim().toLowerCase()
  const user = Object.values(state.users).find((u) => u.email === id || u.username === id)
  if (!user) throw new Error('Aucun compte ne correspond à cet identifiant.')
  const hash = await hashPassword(password, user.salt)
  if (hash !== user.passwordHash) throw new Error('Mot de passe incorrect.')
  setState((s) => ({ ...s, sessionUserId: user.id }))
  return user
}

export function logout() {
  setState((s) => ({ ...s, sessionUserId: null }))
}

export function updateProfile(patch: Partial<Pick<User, 'displayName' | 'bio' | 'avatar' | 'location' | 'goal' | 'website' | 'username'>>) {
  const me = state.sessionUserId
  if (!me) throw new Error('Non connecté.')
  if (patch.username !== undefined) {
    const username = patch.username.trim().toLowerCase()
    if (!USERNAME_RE.test(username)) throw new Error("Nom d'utilisateur : 3 à 20 caractères (lettres minuscules, chiffres, . ou _).")
    if (Object.values(state.users).some((u) => u.username === username && u.id !== me)) throw new Error("Ce nom d'utilisateur est déjà pris.")
    patch.username = username
  }
  if (patch.bio !== undefined && patch.bio.length > 150) throw new Error('La bio est limitée à 150 caractères.')
  setState((s) => ({ ...s, users: { ...s.users, [me]: { ...s.users[me], ...patch } } }))
}

export async function changePassword(current: string, next: string) {
  const me = state.sessionUserId
  if (!me) throw new Error('Non connecté.')
  const user = state.users[me]
  if ((await hashPassword(current, user.salt)) !== user.passwordHash) throw new Error('Mot de passe actuel incorrect.')
  if (next.length < 6) throw new Error('Le nouveau mot de passe doit contenir au moins 6 caractères.')
  const salt = uid()
  const passwordHash = await hashPassword(next, salt)
  setState((s) => ({ ...s, users: { ...s.users, [me]: { ...user, salt, passwordHash } } }))
}

export function deleteAccount() {
  const me = state.sessionUserId
  if (!me) return
  setState((s) => {
    const users = { ...s.users }
    const progress = { ...s.progress }
    delete users[me]
    delete progress[me]
    return { users, progress, sessionUserId: null }
  })
}

export function resetProgress() {
  const me = state.sessionUserId
  if (!me) return
  setState((s) => ({ ...s, progress: { ...s.progress, [me]: { ...emptyProgress(), bookings: s.progress[me]?.bookings ?? [], packCredits: s.progress[me]?.packCredits ?? 0 } } }))
}

/* ------------------------------------------------------------------ */
/* Sélecteurs                                                          */
/* ------------------------------------------------------------------ */

export function useCurrentUser(): User | null {
  return useStore((s) => (s.sessionUserId ? s.users[s.sessionUserId] ?? null : null))
}

export function useProgress(): Progress {
  const p = useStore((s) => (s.sessionUserId ? s.progress[s.sessionUserId] : undefined))
  return p ?? EMPTY
}
const EMPTY = emptyProgress()

export function useUserByUsername(username: string | undefined): User | null {
  return useStore((s) => Object.values(s.users).find((u) => u.username === username?.toLowerCase()) ?? null)
}

export function useProgressOf(userId: string | undefined): Progress {
  const p = useStore((s) => (userId ? s.progress[userId] : undefined))
  return p ?? EMPTY
}

/* ------------------------------------------------------------------ */
/* Progression                                                         */
/* ------------------------------------------------------------------ */

function mutateProgress(fn: (p: Progress) => Progress) {
  const me = state.sessionUserId
  if (!me) return
  setState((s) => ({ ...s, progress: { ...s.progress, [me]: fn(s.progress[me] ?? emptyProgress()) } }))
}

function bumpStreak(p: Progress): Progress['streak'] {
  const t = today()
  if (p.streak.lastDay === t) return p.streak
  const y = new Date(Date.now() - 86400000).toISOString().slice(0, 10)
  return { count: p.streak.lastDay === y ? p.streak.count + 1 : 1, lastDay: t }
}

export function recordLesson(lessonId: string, title: string, score: number, total: number) {
  mutateProgress((p) => {
    const prev = p.lessons[lessonId]
    const pct = total ? Math.round((score / total) * 100) : 100
    const firstCompletion = !prev?.completed
    return {
      ...p,
      lessons: {
        ...p.lessons,
        [lessonId]: {
          completed: true,
          bestScore: Math.max(prev?.bestScore ?? 0, pct),
          lastScore: pct,
          attempts: (prev?.attempts ?? 0) + 1,
          lastAt: new Date().toISOString(),
        },
      },
      history: [{ id: uid(), kind: 'lesson' as const, refId: lessonId, title, score, total, date: new Date().toISOString() }, ...p.history].slice(0, 200),
      xp: p.xp + score * 10 + (firstCompletion ? 50 : 0),
      streak: bumpStreak(p),
    }
  })
}

export function recordTest(levelId: string, title: string, score: number, total: number, passMark: number) {
  mutateProgress((p) => {
    const prev = p.tests[levelId]
    const pct = Math.round((score / total) * 100)
    const passed = pct >= passMark
    return {
      ...p,
      tests: {
        ...p.tests,
        [levelId]: {
          best: Math.max(prev?.best ?? 0, pct),
          last: pct,
          attempts: (prev?.attempts ?? 0) + 1,
          passed: (prev?.passed ?? false) || passed,
          lastAt: new Date().toISOString(),
        },
      },
      history: [{ id: uid(), kind: 'test' as const, refId: levelId, title, score, total, date: new Date().toISOString() }, ...p.history].slice(0, 200),
      xp: p.xp + score * 15 + (passed && !prev?.passed ? 200 : 0),
      streak: bumpStreak(p),
    }
  })
}

export function recordPlacement(levelIndex: number, score: number, total: number) {
  mutateProgress((p) => ({
    ...p,
    placement: { levelIndex, score, total, date: new Date().toISOString() },
    history: [{ id: uid(), kind: 'placement' as const, refId: 'placement', title: 'Test de positionnement', score, total, date: new Date().toISOString() }, ...p.history].slice(0, 200),
    xp: p.xp + score * 5,
    streak: bumpStreak(p),
  }))
}

/* ------------------------------------------------------------------ */
/* Réservations                                                        */
/* ------------------------------------------------------------------ */

export function addBooking(b: Omit<Booking, 'id' | 'status' | 'createdAt'>): Booking {
  const booking: Booking = { ...b, id: uid(), status: 'demandée', createdAt: new Date().toISOString() }
  mutateProgress((p) => ({
    ...p,
    bookings: [booking, ...p.bookings],
    // Un pack de 10 h crédite 10 heures, la séance réservée en consomme une.
    packCredits: b.formula === 'pack10' ? p.packCredits + 9 : p.packCredits,
  }))
  return booking
}

export function bookWithCredit(b: Omit<Booking, 'id' | 'status' | 'createdAt' | 'formula'>): Booking {
  const booking: Booking = { ...b, formula: 'pack10', id: uid(), status: 'demandée', createdAt: new Date().toISOString() }
  mutateProgress((p) => {
    if (p.packCredits <= 0) throw new Error('Plus de crédit disponible.')
    return { ...p, bookings: [booking, ...p.bookings], packCredits: p.packCredits - 1 }
  })
  return booking
}

export function cancelBooking(id: string) {
  mutateProgress((p) => {
    const b = p.bookings.find((x) => x.id === id)
    if (!b || b.status === 'annulée') return p
    return {
      ...p,
      bookings: p.bookings.map((x) => (x.id === id ? { ...x, status: 'annulée' as const } : x)),
      // on rend l'heure au crédit si la séance faisait partie d'un pack
      packCredits: b.formula === 'pack10' ? p.packCredits + 1 : p.packCredits,
    }
  })
}

/* ------------------------------------------------------------------ */
/* Statistiques dérivées                                               */
/* ------------------------------------------------------------------ */

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
