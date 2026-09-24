import { allLessons, levels, placementTest } from '../src/data/index.js'
import type { Exercise } from '../src/data/types.js'
import { checkFill, PASS_MARK } from '../src/lib/grading.js'
import { localDay, type Progress, type ResultEntry } from '../src/lib/model.js'

export function grade(ex: Exercise, answer: string) {
  switch (ex.type) {
    case 'qcm': return answer === ex.options[ex.answer]
    case 'fill': return checkFill(ex, answer)
    case 'order': return answer === ex.words.join(' ')
    case 'match': {
      const given = answer.split(' · ').sort()
      const expected = ex.pairs.map(([a,b]) => `${a} = ${b}`).sort()
      return JSON.stringify(given) === JSON.stringify(expected)
    }
  }
}
export function recordAttempt(p: Progress, input: { kind: ResultEntry['kind']; refId: string; answers: string[]; id: string }) {
  const lesson = allLessons.find(x => x.lesson.id === input.refId)
  const level = levels.find(x => x.id === input.refId)
  const exercises = input.kind === 'lesson' ? lesson?.lesson.exercises : input.kind === 'test' ? level?.test : input.kind === 'placement' ? placementTest.map(x => x.exercise) : undefined
  if (!exercises || input.answers.length !== exercises.length || input.answers.some(x => typeof x !== 'string' || x.length > 3000)) throw new Error('Les réponses du quiz sont incomplètes.')
  const results = exercises.map((ex, i) => grade(ex, input.answers[i]))
  const score = results.filter(Boolean).length
  const total = exercises.length
  const pct = Math.round(score / total * 100)
  const date = new Date().toISOString()
  let title = ''
  if (input.kind === 'lesson') {
    const prev = p.lessons[input.refId]
    const completed = (prev?.completed ?? false) || pct >= PASS_MARK
    const improvement = Math.max(0, score - Math.round((prev?.bestScore ?? 0) * total / 100))
    p.xp += improvement * 10 + (completed && !prev?.completed ? 50 : 0)
    p.lessons[input.refId] = { completed, bestScore: Math.max(prev?.bestScore ?? 0, pct), lastScore: pct, attempts: (prev?.attempts ?? 0) + 1, lastAt: date }
    title = `${lesson!.level.name.split(' —')[0]} · ${lesson!.lesson.title}`
  } else if (input.kind === 'test') {
    const prev = p.tests[input.refId]
    const passed = (prev?.passed ?? false) || pct >= PASS_MARK
    const improvement = Math.max(0, score - Math.round((prev?.best ?? 0) * total / 100))
    p.xp += improvement * 15 + (passed && !prev?.passed ? 200 : 0)
    p.tests[input.refId] = { passed, best: Math.max(prev?.best ?? 0, pct), last: pct, attempts: (prev?.attempts ?? 0) + 1, lastAt: date }
    title = `Test ${level!.name}`
  } else {
    let levelIndex = levels.length - 1
    for (const l of levels) {
      const indexes = placementTest.map((x, i) => x.levelIndex === l.index ? i : -1).filter(i => i >= 0)
      if (indexes.filter(i => results[i]).length < Math.ceil(indexes.length * .75)) { levelIndex = l.index; break }
    }
    const bestPrevious = Math.max(0, ...p.history.filter(h => h.kind === 'placement').map(h => h.score))
    p.xp += Math.max(0, score - bestPrevious) * 5
    p.placement = { levelIndex, score, total, date }
    title = 'Test de positionnement'
  }
  p.history = [{ id: input.id, kind: input.kind, refId: input.refId, title, score, total, date }, ...p.history].slice(0, 200)
  const today = localDay()
  if (p.streak.lastDay !== today) p.streak = { lastDay: today, count: p.streak.lastDay === localDay(new Date(Date.now() - 86400000)) ? p.streak.count + 1 : 1 }
  return { score, total, pct }
}
