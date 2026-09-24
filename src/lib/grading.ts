import type { Exercise } from '../data/types.js'

/** Normalise une réponse libre : espaces, ponctuation finale, casse. */
export function normalize(s: string): string {
  return s
    .normalize('NFC')
    .toLowerCase()
    .replace(/[.!?。,，~…"'«»]/g, '')
    .replace(/\s+/g, '')
    .trim()
}

export function checkFill(ex: Extract<Exercise, { type: 'fill' }>, answer: string): boolean {
  const a = normalize(answer)
  return a.length > 0 && ex.answers.some((ok) => normalize(ok) === a)
}

export function checkOrder(ex: Extract<Exercise, { type: 'order' }>, words: string[]): boolean {
  return words.join(' ') === ex.words.join(' ')
}

export function checkMatch(ex: Extract<Exercise, { type: 'match' }>, chosen: Record<string, string>): boolean {
  return ex.pairs.every(([left, right]) => chosen[left] === right)
}

/** Mélange déterministe (graine) pour que l'ordre reste stable pendant l'exercice. */
export function seededShuffle<T>(items: T[], seed: number): T[] {
  const arr = [...items]
  let s = seed || 1
  for (let i = arr.length - 1; i > 0; i--) {
    s = (s * 9301 + 49297) % 233280
    const j = Math.floor((s / 233280) * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

/** Mélange qui garantit (si possible) un ordre différent de l'original. */
export function shuffleDifferent<T>(items: T[], seed: number): T[] {
  if (items.length < 2) return [...items]
  for (let k = 0; k < 10; k++) {
    const out = seededShuffle(items, seed + k * 7919)
    if (out.some((v, i) => v !== items[i])) return out
  }
  return [...items].reverse()
}

export function scoreLabel(pct: number): string {
  if (pct >= 90) return 'Excellent ! 완벽해요!'
  if (pct >= 70) return 'Très bien ! 잘했어요!'
  if (pct >= 50) return 'Pas mal, continuez ! 화이팅!'
  return 'À retravailler — 다시 해 봐요!'
}

export const PASS_MARK = 70
