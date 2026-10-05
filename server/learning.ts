import { allLessons } from '../src/data/index.js'
import { allCourseLessons } from '../src/data/courses/index.js'
import type { Lesson, Level } from '../src/data/types.js'
import type { Progress } from '../src/lib/model.js'
import { cardKey, newCard, schedule, type Grade } from '../src/lib/srs.js'
import { parisToday } from '../src/lib/time.js'

const index = new Map<string, { lang: string; level: Level; lesson: Lesson }>()
for (const x of allLessons) index.set(x.lesson.id, { lang: 'coreen', ...x })
for (const x of allCourseLessons) index.set(x.lesson.id, x)
export const findLesson = (id: string) => index.get(id)

/** Compteurs du jour (révisions, activités). */
export function bump(p: Progress, field: 'reviews' | 'activities', n = 1) {
  const day = parisToday()
  if (p.daily?.day !== day) p.daily = { day, reviews: 0, activities: 0 }
  p.daily[field] += n
}

/** Ajoute les mots d'une leçon à la file de révision (sans toucher aux cartes existantes). */
export function addLessonCards(p: Progress, lessonId: string) {
  const found = findLesson(lessonId)
  if (!found) return 0
  const srs = (p.srs ??= {})
  let added = 0
  for (const v of found.lesson.vocab) {
    const key = cardKey(lessonId, v.ko)
    if (!srs[key]) { srs[key] = newCard(lessonId); added++ }
  }
  return added
}

/** Met à jour le carnet d'erreurs après un exercice noté côté serveur. */
export function recordMistakes(p: Progress, ref: string, results: boolean[], indexes?: number[]) {
  const book = (p.mistakes ??= {})
  const now = new Date().toISOString()
  results.forEach((ok, i) => {
    const index = indexes ? indexes[i] : i
    const key = `${ref}#${index}`
    if (ok) { if (book[key]) book[key].resolved = true }
    else book[key] = { ref, index, count: (book[key]?.count ?? 0) + 1, lastAt: now, resolved: false }
  })
  // Le carnet garde au plus 400 entrées (les plus récentes).
  const keys = Object.keys(book)
  if (keys.length > 400) for (const k of keys.sort((a, b) => book[a].lastAt.localeCompare(book[b].lastAt)).slice(0, keys.length - 400)) delete book[k]
}

export function reviewCard(p: Progress, key: string, grade: number) {
  if (![0, 1, 2, 3].includes(grade)) throw new Error('Réponse de révision invalide.')
  const lessonId = key.slice(0, key.indexOf('|'))
  const word = key.slice(key.indexOf('|') + 1)
  const found = findLesson(lessonId)
  if (!found || !found.lesson.vocab.some((v) => v.ko === word)) throw new Error('Carte inconnue.')
  const srs = (p.srs ??= {})
  srs[key] = schedule(srs[key] ?? newCard(lessonId), grade as Grade)
  bump(p, 'reviews')
}
