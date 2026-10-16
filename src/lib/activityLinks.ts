import { allLessons, levels, placementTest } from '../data/index.js'
import { allCourseLessons, allCourseLevels, coursePlacement, placementLanguage } from '../data/courses/index.js'
import { sentenceStages, sentenceAssessment } from '../data/koreanSentences.js'
import type { Exercise } from '../data/types.js'
import type { ResultEntry } from './model.js'

export interface LearningActivity { refId: string; kind: ResultEntry['kind']; lang: string; title: string; url: string; exercises: Exercise[]; levelId?: string }
const activities = new Map<string, LearningActivity>()
for (const { lang, level, lesson } of [...allLessons.map((x) => ({ ...x, lang: 'coreen' })), ...allCourseLessons]) {
  activities.set(`lesson:${lesson.id}`, { kind: 'lesson', refId: lesson.id, lang, title: lesson.title, exercises: lesson.exercises, levelId: level.id, url: `${lang === 'coreen' ? '' : `/${lang}`}/cours/${level.id}/${lesson.id}` })
}
for (const { lang, level } of [...levels.map((level) => ({ lang: 'coreen', level })), ...allCourseLevels]) {
  activities.set(`test:${level.id}`, { kind: 'test', refId: level.id, lang, title: `Test — ${level.name}`, exercises: level.test, levelId: level.id, url: `${lang === 'coreen' ? '' : `/${lang}`}/tests/${level.id}` })
}
for (const [index, stage] of sentenceStages.entries()) {
  const refId = `ko-sentence-stage-${index}`
  activities.set(`test:${refId}`, { kind: 'test', refId, lang: 'coreen', title: `Tournures de phrases — palier ${index + 1} · ${stage.title}`, exercises: sentenceAssessment(stage), url: `/coreen/tournures-de-phrases?palier=${index}&mode=test` })
}
export function learningActivity(kind: ResultEntry['kind'], refId: string): LearningActivity | undefined {
  if (kind === 'placement' && !refId) refId = 'placement'
  if (kind === 'placement') {
    const lang = placementLanguage(refId)
    if (!lang && refId !== 'placement') return undefined
    return { kind, refId, lang: lang ?? 'coreen', title: 'Test de positionnement', exercises: (lang ? coursePlacement(lang) : placementTest).map((p) => p.exercise), url: `${lang ? `/${lang}` : ''}/test-de-niveau` }
  }
  return activities.get(`${kind}:${refId}`)
}
export const resultUrl = (id: string) => `/resultats/${encodeURIComponent(id)}`
export function practiceUrl(activity: LearningActivity) {
  if (activity.kind !== 'lesson') return activity.url
  return `${activity.url}?etape=pratiquer`
}
