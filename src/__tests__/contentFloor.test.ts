import { describe, expect, it } from 'vitest'
import { levels, placementTest } from '../data'
import { courseLevels, coursePlacement } from '../data/courses'
import type { Level } from '../data/types'

/** Plancher de contenu au 5 octobre 2026 : une mise à jour peut ajouter, jamais retirer. */
const FLOOR: Record<string, { lessons: number; exercises: number; vocab: number; dialogues: number; sections: number; examples: number }> = {
  coreen: { lessons: 110, exercises: 1568, vocab: 745, dialogues: 37, sections: 438, examples: 662 },
  japonais: { lessons: 112, exercises: 1581, vocab: 779, dialogues: 52, sections: 404, examples: 578 },
  espagnol: { lessons: 112, exercises: 1588, vocab: 779, dialogues: 44, sections: 390, examples: 569 },
  anglais: { lessons: 112, exercises: 1588, vocab: 779, dialogues: 43, sections: 396, examples: 599 },
  francais: { lessons: 112, exercises: 1588, vocab: 779, dialogues: 43, sections: 395, examples: 599 },
}
const count = (lv: Level[]) => {
  const ls = lv.flatMap((l) => l.lessons)
  return {
    lessons: ls.length,
    exercises: ls.reduce((n, l) => n + l.exercises.length, 0),
    vocab: ls.reduce((n, l) => n + l.vocab.length, 0),
    dialogues: ls.filter((l) => l.dialogue?.length).length,
    sections: ls.reduce((n, l) => n + l.sections.length, 0),
    examples: ls.reduce((n, l) => n + l.sections.reduce((m, s) => m + (s.examples?.length ?? 0), 0), 0),
  }
}

describe('lesson content never shrinks', () => {
  for (const lang of Object.keys(FLOOR)) {
    it(lang, () => {
      const lv = lang === 'coreen' ? levels : courseLevels(lang)
      const c = count(lv)
      for (const k of Object.keys(FLOOR[lang]) as (keyof typeof c)[]) expect(c[k], k).toBeGreaterThanOrEqual(FLOOR[lang][k])
      expect(lv).toHaveLength(6)
      for (const l of lv) expect(l.test.length).toBeGreaterThanOrEqual(30)
      expect((lang === 'coreen' ? placementTest : coursePlacement(lang as never)).length).toBeGreaterThanOrEqual(36)
    })
  }
})
