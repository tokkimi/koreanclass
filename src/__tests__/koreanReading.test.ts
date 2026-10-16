import { describe, expect, it } from 'vitest'
import { allLessons } from '../data'
import { allCourseLessons } from '../data/courses'
import { vocabularyLessons } from '../data/vocabularyQuizzes'
import { koreanLessonReading, levelReadings, themeReadings } from '../data/koreanReadingCatalog'
import { sentenceStages, sentenceExercises, sentenceAssessment, sentenceReading, sentenceStageReadings } from '../data/koreanSentences'
import type { KoreanReading } from '../data/koreanReading'
import { correctAnswer } from '../components/ExerciseRunner'
import { grade } from '../../server/progress'

function validReading(reading: KoreanReading) {
  expect(reading.id).toBeTruthy()
  expect(reading.lines.length, reading.title).toBeGreaterThanOrEqual(2)
  expect(reading.questions.length, reading.title).toBeGreaterThanOrEqual(2)
  expect(reading.translations.some((t) => t.target === 'ko')).toBe(true)
  expect(reading.translations.some((t) => t.target === 'fr')).toBe(true)
  expect(reading.writingPrompt).toBeTruthy()
  for (const line of reading.lines) { expect(line.ko).toMatch(/[가-힣]/); expect(line.fr).toBeTruthy() }
  for (const q of reading.questions) {
    expect(q.options.length, q.q).toBeGreaterThanOrEqual(2)
    expect(new Set(q.options).size, q.q).toBe(q.options.length)
    expect(q.answer).toBeGreaterThanOrEqual(0)
    expect(q.answer).toBeLessThan(q.options.length)
    expect(q.explain.length).toBeGreaterThan(10)
  }
  for (const translation of reading.translations) {
    expect(translation.source.trim()).toBeTruthy()
    expect(translation.explain.length).toBeGreaterThan(10)
    expect(translation.answers.every((a) => a.trim())).toBe(true)
    if (translation.target === 'ko') expect(translation.answers[0]).toMatch(/[가-힣]/)
  }
}

describe('Korean reading strand', () => {
  it('adds a relevant, explained reading to all 110 existing Korean lessons without removing content', () => {
    expect(allLessons).toHaveLength(110)
    for (const { lesson, level } of allLessons) validReading(koreanLessonReading(lesson, level.index)!)
  })
  it('covers each vocabulary quiz with its own original theme passage', () => {
    expect(vocabularyLessons).toHaveLength(26)
    const ids = vocabularyLessons.map((lesson) => {
      const reading = koreanLessonReading(lesson)!
      expect(reading).toBe(themeReadings[lesson.subtitle])
      validReading(reading)
      expect(reading.glossary.length).toBeGreaterThanOrEqual(1)
      expect(reading.glossary.every((word) => reading.lines.some((line) => line.ko.includes(word.ko)))).toBe(true)
      return reading.id
    })
    expect(new Set(ids).size).toBe(26)
  })
  it('never attaches a Korean reading to any foreign-language lesson, even a similarly named theme', () => {
    for (const { lesson } of allCourseLessons) expect(koreanLessonReading(lesson)).toBeUndefined()
    expect(koreanLessonReading({ ...allCourseLessons[0].lesson, subtitle: 'Cuisine & ustensiles' })).toBeUndefined()
  })
  it('offers six distinct progressive level texts and six distinct sentence-stage texts', () => {
    expect(levelReadings).toHaveLength(6)
    expect(sentenceStageReadings).toHaveLength(6)
    expect(new Set(sentenceStageReadings.map((r) => r.id)).size).toBe(6)
    for (const reading of [...levelReadings, ...sentenceStageReadings]) validReading(reading)
  })
  it('keeps lesson readings tied to studied examples, dialogues or vocabulary', () => {
    for (const { lesson, level } of allLessons) {
      if (themeReadings[lesson.subtitle] || ['c5', 'h-recognition'].includes(lesson.id)) continue
      const source = [...(lesson.dialogue ?? []).map((e) => e.ko), ...lesson.sections.flatMap((s) => (s.examples ?? []).map((e) => e.ko)), ...lesson.vocab.map((v) => v.ko)]
      for (const line of koreanLessonReading(lesson, level.index)!.lines) expect(source, lesson.id).toContain(line.ko)
    }
  })
})

describe('Dedicated Korean sentence patterns', () => {
  it('contains six stages, 24 distinct workshops and 96 bilingual examples', () => {
    expect(sentenceStages).toHaveLength(6)
    const units = sentenceStages.flatMap((s) => s.units)
    expect(units).toHaveLength(24)
    expect(new Set(units.map((u) => u.id)).size).toBe(24)
    expect(units.flatMap((u) => u.examples)).toHaveLength(96)
    for (const [index, stage] of sentenceStages.entries()) for (const unit of stage.units) {
      expect(unit.ruleEn.length).toBeGreaterThan(20)
      expect(unit.pitfall.length).toBeGreaterThan(20)
      validReading(sentenceReading(unit, index))
      for (const example of unit.examples) { expect(example[0]).toMatch(/[가-힣]/); expect(example[1]).toBeTruthy(); expect(example[2]).toBeTruthy() }
    }
  })
  it('grades every reference answer in the 24 practice sets and six dedicated assessments correctly', () => {
    for (const stage of sentenceStages) {
      const exercises = sentenceAssessment(stage)
      expect(exercises).toHaveLength(12)
      for (const exercise of [...exercises, ...stage.units.flatMap((u) => sentenceExercises(u))]) {
        expect(grade(exercise, correctAnswer(exercise)), exercise.q).toBe(true)
        if (exercise.type === 'qcm') expect(new Set(exercise.options).size).toBe(exercise.options.length)
      }
    }
  })
})
