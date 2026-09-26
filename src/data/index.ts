import { photoQuiz, colorQuiz } from './visualQuizzes.js'
import { vocabularyLessons } from './vocabularyQuizzes.js'
import { numberLessons } from './numberPractice.js'
import { colorLesson } from './colors.js'
import { recognition } from './recognition.js'
import { workshops, workshopLesson } from './workshops.js'
import { structureLessons } from './structures.js'
import { qcm, fill } from './helpers.js'
import { level0 } from './level0.js'
import { level1 } from './level1.js'
import { level2 } from './level2.js'
import { level3 } from './level3.js'
import { level4 } from './level4.js'
import { level5 } from './level5.js'
import type { Exercise, Lesson, Level } from './types.js'

/**
 * Les tests de fin de niveau restent un diagnostic pédagogique interne, mais
 * ne se limitent plus à un échantillon de 15 questions. On garde le noyau du
 * niveau puis on pioche dans ses leçons pour couvrir vocabulaire, grammaire,
 * compréhension et production guidée.
 */
function comprehensiveAssessment(base: Exercise[], lessons: Lesson[]): Exercise[] {
  const seen = new Set<string>()
  const key = (exercise: Exercise) => exercise.q
  const add = (target: Exercise[], exercise: Exercise) => {
    if (!seen.has(key(exercise))) {
      seen.add(key(exercise))
      target.push(exercise)
    }
  }
  const assessment: Exercise[] = []
  base.forEach((exercise) => add(assessment, exercise))

  const byType = (type: Exercise['type']) => lessons.flatMap((lesson) => lesson.exercises).filter((exercise) => exercise.type === type)
  const groups = [byType('qcm'), byType('fill'), byType('order'), byType('match')]
  let cursor = 0
  while (assessment.length < 30 && groups.some((group) => cursor < group.length)) {
    for (const group of groups) {
      if (assessment.length >= 30) break
      const exercise = group[cursor]
      if (exercise) add(assessment, exercise)
    }
    cursor += 1
  }
  return assessment
}

export const levels: Level[] = [level0, level1, level2, level3, level4, level5].map(level => ({
 ...level,
 lessons: [...(level.index === 1 ? [photoQuiz, colorQuiz, colorLesson, ...numberLessons, ...vocabularyLessons] : []), ...(level.index === 0 ? [recognition] : []), ...level.lessons.map(lesson => ({...lesson, duration: lesson.duration + 15,
 sections: [...lesson.sections, {title:'Mémoriser activement', body:'Cache les traductions de la liste de vocabulaire. Lis chaque mot en coréen, donne son sens puis vérifie. Reprends les mots difficiles dans une phrase du cours. Après les exercices, explique la règle principale à voix haute avec un exemple personnel.', tip:'Revois les mots demain, dans trois jours puis dans une semaine. Un résultat parfait aujourd’hui ne remplace pas une révision espacée.'}],
 exercises: [...lesson.exercises, ...lesson.vocab.slice(0,4).map((v,i) => qcm('Révision active : que signifie « '+v.ko+' » ?', v.fr, [...new Set(lesson.vocab.filter((_,j)=>j!==i).map(x=>x.fr))].filter(x=>x!==v.fr).slice(0,3), v.ko+' : '+v.fr)), ...lesson.vocab.slice(0,2).map(v=>fill('Rappel de vocabulaire : écris « '+v.fr+' » en coréen.',v.ko.split('/').map(x=>x.trim()),v.rom))]
 })), ...structureLessons.filter(x=>x.level===level.index).map(x=>x.lesson), ...workshops.filter(w=>w.levelIndex===level.index).map(workshopLesson)],
 test: comprehensiveAssessment(level.test, [...(level.index === 1 ? [photoQuiz, colorQuiz, colorLesson, ...numberLessons, ...vocabularyLessons] : []), ...(level.index === 0 ? [recognition] : []), ...level.lessons, ...structureLessons.filter(x=>x.level===level.index).map(x=>x.lesson), ...workshops.filter(w=>w.levelIndex===level.index).map(workshopLesson)])
}))

export function getLevel(id: string | undefined): Level | undefined {
  return levels.find((l) => l.id === id)
}

export function getLesson(levelId: string | undefined, lessonId: string | undefined): { level: Level; lesson: Lesson; index: number } | undefined {
  const level = getLevel(levelId)
  if (!level) return undefined
  const index = level.lessons.findIndex((l) => l.id === lessonId)
  if (index < 0) return undefined
  return { level, lesson: level.lessons[index], index }
}

export const allLessons = levels.flatMap((level) => level.lessons.map((lesson) => ({ level, lesson })))

export const totalLessons = allLessons.length

/**
 * Test de positionnement : 4 questions QCM par niveau, de difficulté croissante.
 * Le niveau recommandé est le premier niveau où l'apprenant obtient moins de 3/4.
 */
/**
 * Positionnement : chaque palier contrôle à la fois les acquis du niveau et
 * les structures qui permettent réellement de faire une phrase.  Les tests
 * de fin de niveau restent plus longs ; celui-ci sert à choisir un point de
 * départ sans donner l'illusion qu'un simple mot de vocabulaire suffit.
 */
export const placementTest: { levelIndex: number; exercise: Exercise }[] = levels.flatMap((level) => {
  const foundations = level.test.filter((exercise) => exercise.type === 'qcm').slice(0, 3)
  const structureEntries = structureLessons.filter((entry) => entry.level === level.index)
  const firstPatternOfEachUnit = structureEntries.flatMap((entry) => entry.lesson.exercises.filter((exercise) => exercise.type === 'qcm').slice(0, 1))
  const extraPatternChecks = structureEntries.flatMap((entry) => entry.lesson.exercises.filter((exercise) => exercise.type === 'qcm').slice(1, 2))
  const patterns = [...firstPatternOfEachUnit, ...extraPatternChecks].slice(0, 3)

  return [...foundations, ...patterns].map((exercise) => ({ levelIndex: level.index, exercise }))
})

export type { Exercise, Lesson, Level } from './types.js'
