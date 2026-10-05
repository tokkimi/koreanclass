import { allLessons } from '../data'
import { allCourseLessons } from '../data/courses'
import type { Lesson, Level } from '../data/types'

export interface IndexedLesson { lang: string; level: Level; lesson: Lesson }
const index = new Map<string, IndexedLesson>()
for (const x of allLessons) index.set(x.lesson.id, { lang: 'coreen', ...x })
for (const x of allCourseLessons) index.set(x.lesson.id, x)

export const findLesson = (id: string) => index.get(id)
export const lessonsOf = (lang: string) => [...index.values()].filter((x) => x.lang === lang)
/** Adresse d'une leçon (le coréen garde ses adresses historiques). */
export function lessonUrl(x: IndexedLesson, langPath: string) {
  return x.lang === 'coreen' ? `/cours/${x.level.id}/${x.lesson.id}` : `${langPath}/cours/${x.level.id}/${x.lesson.id}`
}
