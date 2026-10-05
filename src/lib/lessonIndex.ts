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

import { grammarContent } from '../data/portal-content'
/** Langue d'une scène ou d'un atelier oral (les ateliers coréens n'ont pas de préfixe). */
export function sceneLang(id: string) {
  for (const [lang, g] of Object.entries(grammarContent)) if (g?.scenes.some((s) => s.id === id)) return lang
  return 'coreen'
}

/** Mots-clés (titres de leçons) pour proposer un programme selon l'objectif — suggestions, pas un parcours certifié. */
export const GOAL_KEYWORDS: Record<string, RegExp> = {
  voyage: /voyag|hôtel|hotel|restaurant|café|cafe|transport|direction|aéroport|airport|achat|shopping|commander|order|travel|gare|train|taxi|chemin|ville|city/i,
  quotidien: /famille|family|maison|home|heure|time|jour|day|météo|weather|santé|health|loisir|hobb|courses|repas|meal|routine|ami|friend|présent/i,
  travail: /travail|work|bureau|office|réunion|meeting|e-?mail|formel|formal|poli|polite|entretien|interview|business|honorifi|respect|registre|register/i,
  examen: /grammaire|grammar|structure|connecteur|connector|argument|subjonctif|subjunctive|passé|past|conditionnel|conditional|compréhension|comprehension/i,
}
