import type { Level, Lesson } from '../types.js'
import { jaExtra } from './japonais-plus.js'
import { jaKana, jaN5 } from './japonais-1.js'
import { jaN4, jaN3 } from './japonais-2.js'
import { jaN2, jaN1 } from './japonais-3.js'
import { es0, esA1, esA2 } from './espagnol-1.js'
import { esB1, esB2, esC1 } from './espagnol-2.js'
import { en0, enA1 } from './anglais-1.js'
import { enA2, enB1 } from './anglais-2.js'
import { enB2, enC1 } from './anglais-3.js'
import { fr0, frA1 } from './francais-1.js'
import { frA2, frB1 } from './francais-2.js'
import { frB2, frC1 } from './francais-3.js'

/** Cursus en autonomie des langues autres que le coréen (le coréen reste dans src/data/index.ts). */
export type CourseLanguage = 'japonais' | 'espagnol' | 'anglais' | 'francais'

/** Ajoute les leçons supplémentaires à la fin de chaque niveau. */
const withExtra = (level: Level, extra: Record<string, Lesson[]>): Level => ({ ...level, lessons: [...level.lessons, ...(extra[level.id] ?? [])] })

export const courses: Partial<Record<CourseLanguage, Level[]>> = {
  japonais: [jaKana, jaN5, jaN4, jaN3, jaN2, jaN1].map((l) => withExtra(l, jaExtra)),
  espagnol: [es0, esA1, esA2, esB1, esB2, esC1],
  anglais: [en0, enA1, enA2, enB1, enB2, enC1],
  francais: [fr0, frA1, frA2, frB1, frB2, frC1],
}

export const courseLevels = (lang: string): Level[] => courses[lang as CourseLanguage] ?? []
export const getCourseLevel = (lang: string, levelId?: string) => courseLevels(lang).find((l) => l.id === levelId)
export function getCourseLesson(lang: string, levelId?: string, lessonId?: string) {
  const level = getCourseLevel(lang, levelId)
  const index = level?.lessons.findIndex((l) => l.id === lessonId) ?? -1
  return level && index >= 0 ? { level, lesson: level.lessons[index], index } : undefined
}

/** Toutes les leçons et tous les niveaux, pour la correction côté serveur. */
export const allCourseLevels: { lang: CourseLanguage; level: Level }[] = Object.entries(courses).flatMap(([lang, levels]) => levels!.map((level) => ({ lang: lang as CourseLanguage, level })))
export const allCourseLessons: { lang: CourseLanguage; level: Level; lesson: Lesson }[] = allCourseLevels.flatMap(({ lang, level }) => level.lessons.map((lesson) => ({ lang, level, lesson })))
