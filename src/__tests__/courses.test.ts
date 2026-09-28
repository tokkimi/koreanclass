import { describe, it, expect } from 'vitest'
import { allLessons, levels } from '../data'
import { allCourseLessons, allCourseLevels, courses } from '../data/courses'
import { emptyProgress } from '../lib/model'
import { recordAttempt, grade } from '../../server/progress'
import { correctAnswer } from '../components/ExerciseRunner'

describe('cursus des autres langues', () => {
  it('uses unique ids that never collide with the Korean course', () => {
    const korean = new Set([...levels.map((l) => l.id), ...allLessons.map((x) => x.lesson.id)])
    const ids = [...allCourseLevels.map((x) => x.level.id), ...allCourseLessons.map((x) => x.lesson.id)]
    expect(new Set(ids).size).toBe(ids.length)
    for (const id of ids) expect(korean.has(id)).toBe(false)
  })
  it('has six levels per language, each with lessons and a test', () => {
    for (const levels of Object.values(courses)) {
      expect(levels!.length).toBe(6)
      levels!.forEach((l, i) => {
        expect(l.index).toBe(i)
        expect(l.lessons.length).toBeGreaterThanOrEqual(5)
        expect(l.test.length).toBeGreaterThanOrEqual(10)
      })
    }
  })
  it('accepts every reference answer and qcm answers are valid', () => {
    for (const { level, lesson } of allCourseLessons)
      for (const ex of [...lesson.exercises, ...level.test]) {
        expect(grade(ex, correctAnswer(ex))).toBe(true)
        if (ex.type === 'qcm') expect(new Set(ex.options).size).toBe(ex.options.length)
        if (ex.type === 'match') expect(new Set(ex.pairs.map((p) => p[1])).size).toBe(ex.pairs.length)
      }
  })
  it('records lessons and tests of other languages on the server', () => {
    const p = emptyProgress()
    const { level, lesson } = allCourseLessons[0]
    recordAttempt(p, { kind: 'lesson', refId: lesson.id, answers: lesson.exercises.map(correctAnswer), id: 'a' })
    expect(p.lessons[lesson.id].completed).toBe(true)
    recordAttempt(p, { kind: 'test', refId: level.id, answers: level.test.map(correctAnswer), id: 'b' })
    expect(p.tests[level.id].passed).toBe(true)
    expect(p.history[0].title).toMatch(/^Japonais · Test/)
  })
})
