import { allLessons } from './index'
import { lessonReading, levelReadings, passage, readingQuestion as Q } from './koreanReading'
import { themeReadings } from './koreanThemeReading'
import type { Lesson } from './types'

const cache = new Map<string, ReturnType<typeof lessonReading>>()
const firstReading = passage('lesson-h-recognition', 'Deux mots, quatre blocs', 0,
  'Reprends les deux mots présents dans les exercices d’assemblage. Il s’agit de déchiffrer, sans apprendre de conjugaison.', [
    { ko: '나무', fr: 'arbre', note: '나 = ㄴ + ㅏ ; 무 = ㅁ + ㅜ. Lis na-mu.' },
    { ko: '우유', fr: 'lait', note: '우 = ㅇ + ㅜ ; 유 = ㅇ + ㅠ. Le ㅇ initial est muet.' },
  ], [{ ko: '나무', fr: 'arbre' }, { ko: '우유', fr: 'lait' }], [
    Q('Quel mot contient 나 suivi de 무 ?', '나무', ['우유', '유우'], '나 puis 무 donne 나무, arbre.'),
    Q('Quel mot signifie lait ?', '우유', ['나무', '무나'], '우유 se compose de 우 et 유. Les deux syllabes commencent par un ㅇ muet.'),
  ], 'Lis chaque bloc, assemble le mot, puis écoute pour vérifier. Ne rajoute pas de son entre les deux blocs.')
const reportReading = passage('lesson-c5', 'Lire une enquête et en faire la synthèse', 5,
  'Données fictives pour un exercice d’écrit : les chiffres ci-dessous ne décrivent pas une enquête réelle.', [
    { ko: '20대 성인 1,000명을 대상으로 여가 활동에 대해 조사했다.', fr: 'Une enquête a été menée sur les loisirs auprès de 1 000 adultes de 20 à 29 ans.', note: '20대 désigne la tranche 20–29 ans. -을 대상으로 indique le public de l’enquête.' },
    { ko: '여행을 선택한 사람이 45%로 가장 많았다.', fr: 'Les personnes ayant choisi le voyage étaient les plus nombreuses, avec 45 %.', note: '-로 indique ici le taux ; 가장 많았다 exprime la valeur la plus élevée.' },
    { ko: '독서는 30%, 운동은 25%로 나타났다.', fr: 'La lecture représentait 30 %, et le sport 25 %.', note: '-로 나타났다 rapporte un résultat observé dans les données de l’exercice.' },
    { ko: '여행을 선택한 비율은 운동을 선택한 비율보다 20%포인트 높았다.', fr: 'La part du voyage était supérieure de 20 points de pourcentage à celle du sport.', note: '45 − 25 = 20 points. Ne confonds pas points de pourcentage et augmentation relative en pour cent.' },
  ], [{ ko: '조사하다', fr: 'enquêter' }, { ko: '비율', fr: 'proportion' }, { ko: '여가 활동', fr: 'loisirs' }], [
    Q('Quelle activité arrive en tête ?', 'Le voyage, à 45 %.', ['La lecture, à 30 %.', 'Le sport, à 25 %.'], '가장 많았다 désigne le résultat le plus fréquent : 45 % pour le voyage.'),
    Q('Quelle est la différence entre voyage et sport ?', '20 points de pourcentage.', ['20 personnes.', 'Une hausse relative de 20 %.'], '45 % moins 25 % = 20 points. Une différence de taux n’est pas une hausse relative de 20 %.'),
    Q('Que peut-on affirmer sur les répondants ?', 'Ils ont entre 20 et 29 ans.', ['Ils ont tous 20 ans.', 'Ils représentent tous les Coréens.'], '20대 indique la tranche d’âge ; le texte ne permet aucune généralisation à toute une population.'),
  ], 'Sépare la description des données de ton interprétation. Présente la population, le résultat principal puis une comparaison exacte.')
export function koreanLessonReading(lesson: Lesson, level?: number) {
  const known = allLessons.find((entry) => entry.lesson.id === lesson.id)
  // SavedQuiz is shared across languages; never attach Korean to a foreign lesson.
  if (!known && level === undefined) return undefined
  if (lesson.id === 'h-recognition') return firstReading
  if (lesson.id === 'c5') return reportReading
  const theme = themeReadings[lesson.subtitle]
  if (theme) return theme
  let reading = cache.get(lesson.id)
  if (!reading) { reading = lessonReading(lesson, level ?? known!.level.index); cache.set(lesson.id, reading) }
  return reading
}
export { levelReadings, themeReadings }
