import { describe, expect, it } from 'vitest'
import { levels, placementTest } from '../data'
import type { Exercise } from '../data/types'
import { checkFill, checkMatch, checkOrder, normalize } from '../lib/grading'
import { compose, decompose } from '../lib/hangul'
import { recommendLevel } from '../pages/Placement'

const allExercises: { where: string; ex: Exercise }[] = levels.flatMap((l) => [
  ...l.lessons.flatMap((lesson) => lesson.exercises.map((ex) => ({ where: `${l.id}/${lesson.id}`, ex }))),
  ...l.test.map((ex) => ({ where: `${l.id}/test`, ex })),
])

describe('contenu pédagogique', () => {
  it('a des identifiants uniques', () => {
    const levelIds = levels.map((l) => l.id)
    const lessonIds = levels.flatMap((l) => l.lessons.map((x) => x.id))
    expect(new Set(levelIds).size).toBe(levelIds.length)
    expect(new Set(lessonIds).size).toBe(lessonIds.length)
  })

  it('chaque leçon a du contenu et au moins 5 exercices', () => {
    for (const l of levels)
      for (const lesson of l.lessons) {
        expect(lesson.sections.length, lesson.id).toBeGreaterThan(0)
        expect(lesson.vocab.length, lesson.id).toBeGreaterThan(0)
        expect(lesson.exercises.length, lesson.id).toBeGreaterThanOrEqual(5)
      }
  })

  it('chaque niveau a un test d’au moins 12 questions', () => {
    for (const l of levels) expect(l.test.length, l.id).toBeGreaterThanOrEqual(12)
  })

  it('les QCM ont des options uniques et une réponse valide', () => {
    for (const { where, ex } of allExercises) {
      if (ex.type !== 'qcm') continue
      expect(new Set(ex.options).size, `${where}: ${ex.q}`).toBe(ex.options.length)
      expect(ex.answer, `${where}: ${ex.q}`).toBeGreaterThanOrEqual(0)
      expect(ex.answer).toBeLessThan(ex.options.length)
    }
  })

  it('les associations ont des éléments uniques', () => {
    for (const { where, ex } of allExercises) {
      if (ex.type !== 'match') continue
      expect(new Set(ex.pairs.map((p) => p[0])).size, where).toBe(ex.pairs.length)
      expect(new Set(ex.pairs.map((p) => p[1])).size, where).toBe(ex.pairs.length)
    }
  })

  it('les phrases à ordonner ont au moins 2 mots', () => {
    for (const { where, ex } of allExercises) if (ex.type === 'order') expect(ex.words.length, where).toBeGreaterThanOrEqual(2)
  })

  it('le test de positionnement couvre tous les niveaux', () => {
    expect(new Set(placementTest.map((p) => p.levelIndex)).size).toBe(levels.length)
  })
})

describe('correction', () => {
  it('normalise espaces et ponctuation', () => {
    expect(normalize(' 저는 학생이에요. ')).toBe(normalize('저는학생이에요'))
  })
  it('accepte les variantes de réponse', () => {
    const ex = { type: 'fill' as const, q: '', answers: ['얼마예요?'] }
    expect(checkFill(ex, '얼마예요')).toBe(true)
    expect(checkFill(ex, '얼마')).toBe(false)
    expect(checkFill(ex, '')).toBe(false)
  })
  it('vérifie ordre et associations', () => {
    expect(checkOrder({ type: 'order', q: '', words: ['a', 'b'] }, ['a', 'b'])).toBe(true)
    expect(checkOrder({ type: 'order', q: '', words: ['a', 'b'] }, ['b', 'a'])).toBe(false)
    expect(checkMatch({ type: 'match', q: '', pairs: [['a', '1'], ['b', '2']] }, { a: '1', b: '2' })).toBe(true)
    expect(checkMatch({ type: 'match', q: '', pairs: [['a', '1'], ['b', '2']] }, { a: '2', b: '1' })).toBe(false)
  })
})

describe('hangeul', () => {
  it('compose et décompose', () => {
    expect(compose('ㅎ', 'ㅏ', 'ㄴ')).toBe('한')
    expect(compose('ㄱ', 'ㅡ', 'ㄹ')).toBe('글')
    expect(compose('ㅇ', 'ㅏ')).toBe('아')
    expect(decompose('국')).toEqual(['ㄱ', 'ㅜ', 'ㄱ'])
  })
})

describe('positionnement', () => {
  it('recommande le premier niveau non maîtrisé', () => {
    expect(recommendLevel([4, 4, 2, 0, 0, 0], [4, 4, 4, 4, 4, 4])).toBe(2)
    expect(recommendLevel([1, 0, 0, 0, 0, 0], [4, 4, 4, 4, 4, 4])).toBe(0)
    expect(recommendLevel([4, 4, 4, 4, 4, 4], [4, 4, 4, 4, 4, 4])).toBe(5)
  })
})
