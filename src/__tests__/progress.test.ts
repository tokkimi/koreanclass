import { describe,it,expect } from 'vitest'
import { allLessons } from '../data'
import { emptyProgress } from '../lib/model'
import { recordAttempt, grade } from '../../server/progress'
import { correctAnswer } from '../components/ExerciseRunner'
describe('server progression',()=>{
 it('grades stored answers and awards completion only at 70%',()=>{
  const {lesson}=allLessons[0]; const p=emptyProgress()
  recordAttempt(p,{kind:'lesson',refId:lesson.id,answers:lesson.exercises.map(()=>''),id:'bad'})
  expect(p.lessons[lesson.id].completed).toBe(false)
  expect(p.xp).toBe(0)
  const answers=lesson.exercises.map(correctAnswer)
  recordAttempt(p,{kind:'lesson',refId:lesson.id,answers,id:'good'})
  expect(p.lessons[lesson.id].bestScore).toBe(100)
  expect(p.lessons[lesson.id].completed).toBe(true)
  const xp=p.xp
  recordAttempt(p,{kind:'lesson',refId:lesson.id,answers,id:'repeat'})
  expect(p.xp).toBe(xp)
  expect(p.lessons[lesson.id].attempts).toBe(3)
 })
 it('accepts every reference answer including shuffled match responses',()=>{
  for(const {lesson} of allLessons) for(const ex of lesson.exercises) expect(grade(ex,correctAnswer(ex))).toBe(true)
 })
})
