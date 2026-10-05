import { describe, expect, it } from 'vitest'
import { allLessons } from '../data'
import { allCourseLessons } from '../data/courses'
import { emptyProgress } from '../lib/model'
import { recordAttempt, grade } from '../../server/progress'
import { recordMistakes, reviewCard } from '../../server/learning'
import { correctAnswer } from '../components/ExerciseRunner'
import { cardKey, lessonStatus } from '../lib/srs'
import { parisToday } from '../lib/time'

describe('mistake notebook and review queue (server)', () => {
  for (const { lesson } of [allLessons[3], allCourseLessons.find((x) => x.lang === 'japonais')!, allCourseLessons.find((x) => x.lang === 'francais')!]) {
    it(`records mistakes, creates cards and resolves on drill — ${lesson.id}`, () => {
      const p = emptyProgress()
      const answers = lesson.exercises.map((ex, i) => (i === 0 ? '__faux__' : correctAnswer(ex)))
      recordAttempt(p, { kind: 'lesson', refId: lesson.id, answers, id: 'op-1' })
      expect(p.mistakes![`${lesson.id}#0`]).toMatchObject({ count: 1, resolved: false })
      expect(Object.keys(p.srs!)).toHaveLength(new Set(lesson.vocab.map((v) => v.ko)).size)
      expect(p.viewed![lesson.id]).toBeTruthy()
      expect(lessonStatus(p, lesson.id, lesson.vocab.length)).not.toBe('maîtrisée')
      // Révision d'une carte : prochaine date calculée côté serveur
      const key = cardKey(lesson.id, lesson.vocab[0].ko)
      reviewCard(p, key, 2)
      expect(p.srs![key].due > parisToday()).toBe(true)
      expect(p.daily!.reviews).toBe(1)
      // Reprise de l'exercice manqué
      recordMistakes(p, lesson.id, [grade(lesson.exercises[0], correctAnswer(lesson.exercises[0]))], [0])
      expect(p.mistakes![`${lesson.id}#0`].resolved).toBe(true)
    })
  }
  it('rejects unknown cards and grades', () => {
    const p = emptyProgress()
    expect(() => reviewCard(p, 'nope|x', 2)).toThrow()
    expect(() => reviewCard(p, cardKey(allLessons[0].lesson.id, allLessons[0].lesson.vocab[0].ko), 7)).toThrow()
  })
  it('keeps old profiles without the new fields working', () => {
    const old = JSON.parse(JSON.stringify(emptyProgress()))
    delete old.srs; delete old.mistakes
    const { lesson } = allLessons[0]
    recordAttempt(old, { kind: 'lesson', refId: lesson.id, answers: lesson.exercises.map(correctAnswer), id: 'op' })
    expect(old.lessons[lesson.id].completed).toBe(true)
    expect(Object.values(old.mistakes ?? {})).toHaveLength(0)
  })
})
