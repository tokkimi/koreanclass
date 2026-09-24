import { level0 } from './level0'
import { level1 } from './level1'
import { level2 } from './level2'
import { level3 } from './level3'
import { level4 } from './level4'
import { level5 } from './level5'
import type { Exercise, Lesson, Level } from './types'

export const levels: Level[] = [level0, level1, level2, level3, level4, level5]

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
export const placementTest: { levelIndex: number; exercise: Exercise }[] = levels.flatMap((level) =>
  level.test
    .filter((e) => e.type === 'qcm')
    .slice(0, 4)
    .map((exercise) => ({ levelIndex: level.index, exercise })),
)

export type { Exercise, Lesson, Level } from './types'
