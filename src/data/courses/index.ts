import type { Exercise, Level, Lesson } from '../types.js'
import { comprehensiveAssessment } from '../index.js'
import { qcm } from '../helpers.js'
import { type } from './dsl.js'
import { jaExtra } from './japonais-plus.js'
import { esExtra } from './espagnol-plus.js'
import { enExtra } from './anglais-plus.js'
import { frExtra } from './francais-plus.js'
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

const raw: Partial<Record<CourseLanguage, Level[]>> = {
  japonais: [jaKana, jaN5, jaN4, jaN3, jaN2, jaN1].map((l) => withExtra(l, jaExtra)),
  espagnol: [es0, esA1, esA2, esB1, esB2, esC1].map((l) => withExtra(l, esExtra)),
  anglais: [en0, enA1, enA2, enB1, enB2, enC1].map((l) => withExtra(l, enExtra)),
  francais: [fr0, frA1, frA2, frB1, frB2, frC1].map((l) => withExtra(l, frExtra)),
}

const LABEL: Record<CourseLanguage, string> = { japonais: 'en japonais', espagnol: 'en espagnol', anglais: 'en anglais', francais: 'in French' }
const KANA = /[\u3040-\u30ff]/

/**
 * Même enrichissement que le coréen : chaque leçon reçoit une section de mémorisation
 * et 6 exercices de révision du vocabulaire ; chaque test de niveau passe à 30 questions.
 */
function enrich(lang: CourseLanguage, level: Level): Level {
  const en = lang === 'francais'
  const lessons = level.lessons.map((lesson) => ({
    ...lesson,
    duration: lesson.duration + 15,
    sections: [
      ...lesson.sections,
      en
        ? { title: 'Memorise actively', body: 'Hide the translations in the vocabulary list. Read each French word, say what it means, then check. Reuse the difficult words in a sentence from the lesson. After the exercises, explain the main rule out loud with a personal example.', tip: 'Review the words tomorrow, in three days and in a week. A perfect score today does not replace spaced review.' }
        : { title: 'Mémoriser activement', body: `Cache les traductions de la liste de vocabulaire. Lis chaque mot ${LABEL[lang]}, donne son sens puis vérifie. Reprends les mots difficiles dans une phrase du cours. Après les exercices, explique la règle principale à voix haute avec un exemple personnel.`, tip: 'Revois les mots demain, dans trois jours puis dans une semaine. Un résultat parfait aujourd’hui ne remplace pas une révision espacée.' },
    ],
    exercises: [
      ...lesson.exercises,
      ...lesson.vocab.slice(0, 4).map((v, i) =>
        qcm(`${en ? 'Active review: what does' : 'Révision active : que signifie'} « ${v.ko} »${en ? ' mean?' : ' ?'}`, v.fr, [...new Set(lesson.vocab.filter((_, j) => j !== i).map((x) => x.fr))].filter((x) => x !== v.fr).slice(0, 3), `${v.ko} : ${v.fr}`),
      ),
      ...lesson.vocab.slice(0, 2).map((v) =>
        type(
          en ? `Vocabulary recall: write « ${v.fr} » in French.` : `Rappel de vocabulaire : écris « ${v.fr} » ${LABEL[lang]}.`,
          [...v.ko.split('/').map((x) => x.trim()), ...(KANA.test(v.rom) ? v.rom.split('/').map((x) => x.trim()) : [])],
          lang === 'japonais' ? v.rom : undefined,
        ),
      ),
    ],
  }))
  return { ...level, lessons, test: comprehensiveAssessment(level.test, level.lessons) }
}

export const courses: Partial<Record<CourseLanguage, Level[]>> = Object.fromEntries(
  Object.entries(raw).map(([lang, levels]) => [lang, levels!.map((level) => enrich(lang as CourseLanguage, level))]),
)

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

/** Préfixe des identifiants de chaque langue (ja-, es-, en-, fr-). */
export const PREFIX: Record<CourseLanguage, string> = { japonais: 'ja', espagnol: 'es', anglais: 'en', francais: 'fr' }

/**
 * Test de positionnement, construit comme celui du coréen : 6 questions par niveau
 * (3 du test de niveau + 3 tirées des leçons), de difficulté croissante.
 */
export function coursePlacement(lang: string): { levelIndex: number; exercise: Exercise }[] {
  return courseLevels(lang).flatMap((level) => {
    const base = level.test.filter((e) => e.type === 'qcm').slice(0, 3)
    const fromLessons = level.lessons.map((l) => l.exercises.find((e) => e.type === 'qcm' && !base.includes(e))).filter((e): e is Exercise => !!e).slice(1, 4)
    return [...base, ...fromLessons].map((exercise) => ({ levelIndex: level.index, exercise }))
  })
}
export const placementRef = (lang: string) => `${PREFIX[lang as CourseLanguage]}-placement`
export const placementLanguage = (refId: string) => (Object.keys(PREFIX) as CourseLanguage[]).find((l) => placementRef(l) === refId)
