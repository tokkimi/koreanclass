import { describe,it,expect } from 'vitest'
import { compareSpeech } from '../lib/oral'
import { workshops, workshopLesson } from '../data/workshops'
import { grade } from '../../server/progress'
import { correctAnswer } from '../components/ExerciseRunner'
describe('oral and situations',()=>{
 it('ignores punctuation and spacing but detects missing words',()=>{
  expect(compareSpeech('안녕하세요. 저는 학생이에요.','안녕하세요 저는학생이에요').similarity).toBe(100)
  const result=compareSpeech('아이스 아메리카노 한 잔 주세요.','아메리카노 주세요')
  expect(result.similarity).toBeLessThan(85)
  expect(result.missing).toContain('아이스')
  expect(compareSpeech('안녕하세요','').similarity).toBe(0)
 })
 it('covers every level and accepts workshop model answers',()=>{
  expect(new Set(workshops.map(w=>w.levelIndex)).size).toBe(6)
  for(const w of workshops){const lesson=workshopLesson(w);expect(lesson.exercises.length).toBeGreaterThanOrEqual(12);for(const ex of lesson.exercises) expect(grade(ex,correctAnswer(ex))).toBe(true)}
 })
})
