import { afterEach, describe, expect, it, vi } from 'vitest'
import { allLessons, levels } from '../data'
import { allCourseLessons, allCourseLevels, placementRef } from '../data/courses'
import { languages } from '../data/languages'
import { learningActivity, practiceUrl } from '../lib/activityLinks'
import { inLanguage, levelsOf } from '../lib/lastLang'
import { exerciseSignature, readQuizDraft, saveQuizDraft, type QuizDraft } from '../lib/quizDraft'
import { emptyProgress } from '../lib/model'
import { recordAttempt } from '../../server/progress'
import { correctAnswer } from '../components/ExerciseRunner'

afterEach(() => vi.unstubAllGlobals())

describe('profile activity destinations', () => {
  it('resolves every lesson and level test in all five languages', () => {
    for (const { lang, level, lesson } of [...allLessons.map(x => ({ ...x, lang: 'coreen' })), ...allCourseLessons]) {
      const activity = learningActivity('lesson', lesson.id)!
      expect(activity.lang).toBe(lang)
      expect(activity.url).toBe(`${lang === 'coreen' ? '' : '/' + lang}/cours/${level.id}/${lesson.id}`)
      expect(practiceUrl(activity)).toContain('?etape=pratiquer')
    }
    for (const { lang, level } of [...levels.map(level => ({ lang: 'coreen', level })), ...allCourseLevels]) {
      expect(learningActivity('test', level.id)?.url).toBe(`${lang === 'coreen' ? '' : '/' + lang}/tests/${level.id}`)
    }
    expect(learningActivity('test', 'removed-activity')).toBeUndefined()
  })
  it('keeps placement and Korean sentence results in their own language', () => {
    for (const lang of languages) {
      const refId = lang.id === 'coreen' ? 'placement' : placementRef(lang.id)
      const entry = { kind: 'placement', refId }
      expect(learningActivity('placement', refId)?.lang).toBe(lang.id)
      for (const target of languages) expect(inLanguage(target, levelsOf(target))(entry)).toBe(target.id === lang.id)
      expect(inLanguage(lang, levelsOf(lang))({ kind: 'test', refId: 'ko-sentence-stage-3' })).toBe(lang.id === 'coreen')
    }
  })
})

describe('saved attempts and answer review', () => {
  it('grades all six sentence assessments on the server and retains an immutable review', () => {
    const p = emptyProgress()
    for (let index = 0; index < 6; index++) {
      const refId = `ko-sentence-stage-${index}`
      const activity = learningActivity('test', refId)!
      const answers = activity.exercises.map(correctAnswer)
      recordAttempt(p, { kind: 'test', refId, answers, id: `sentence-${index}` })
      expect(p.tests[refId].passed).toBe(true)
      expect(p.tests[refId].best).toBe(100)
      expect(p.history[0].exerciseSignature).toBe(exerciseSignature(activity.exercises))
      answers[0] = 'tampered after saving'
      expect(p.history[0].answers![0]).not.toBe(answers[0])
      recordAttempt(p, { kind: 'test', refId, answers: activity.exercises.map(() => 'incorrect'), id: `retry-${index}` })
      expect(p.tests[refId]).toMatchObject({ best: 100, last: 0, passed: true, attempts: 2 })
    }
    expect(() => recordAttempt(p, { kind: 'test', refId: 'ko-sentence-stage-99', answers: [], id: 'invalid' })).toThrow()
  })
  it('resumes only the right user and unchanged question set, tolerating unavailable storage', () => {
    const storage = new Map<string, string>()
    vi.stubGlobal('localStorage', { getItem: (key: string) => storage.get(key) ?? null, setItem: (key: string, val: string) => storage.set(key, val), removeItem: (key: string) => storage.delete(key) })
    const exercises = levels[0].test
    const draft: QuizDraft = { signature: exerciseSignature(exercises), index: 1, answers: [{ correct: true, given: correctAnswer(exercises[0]) }], checked: null, attempt: 'attempt-123456', savedAt: new Date().toISOString() }
    saveQuizDraft('test', 'alice', draft)
    expect(readQuizDraft('test', 'alice', exercises)).toEqual(draft)
    expect(readQuizDraft('test', 'bob', exercises)).toBeNull()
    expect(readQuizDraft('test', undefined, exercises)).toBeNull()
    expect(readQuizDraft('test', 'alice', exercises.slice(1))).toBeNull()
    saveQuizDraft('test', 'alice', { ...draft, index: exercises.length })
    expect(readQuizDraft('test', 'alice', exercises)).toBeNull()
    saveQuizDraft('test', 'alice', null)
    expect(readQuizDraft('test', 'alice', exercises)).toBeNull()
    vi.stubGlobal('localStorage', { getItem() { throw new Error('disabled') }, setItem() { throw new Error('disabled') } })
    expect(readQuizDraft('test', 'alice', exercises)).toBeNull()
    expect(() => saveQuizDraft('test', 'alice', draft)).not.toThrow()
  })
})
