import type { Lesson } from './types'
import { qcm } from './helpers'

export interface ReadingQuestion {
  q: string
  options: string[]
  answer: number
  explain: string
}
export interface ReadingLine { ko: string; fr: string; note?: string }
export interface ReadingTranslation { source: string; target: 'ko' | 'fr'; answers: string[]; explain: string }
export interface KoreanReading {
  id: string
  title: string
  level: number
  context: string
  lines: ReadingLine[]
  glossary: { ko: string; fr: string }[]
  questions: ReadingQuestion[]
  translations: ReadingTranslation[]
  writingPrompt: string
  model: string
  readingTip: string
}

export function readingQuestion(q: string, correct: string, wrong: string[], explain: string): ReadingQuestion {
  const ex = qcm(q, correct, [...new Set(wrong)].filter((s) => s !== correct), explain)
  if (ex.type !== 'qcm') throw new Error('Expected a choice question')
  return { ...ex, explain }
}

/** A passage written for a level or vocabulary topic, never an unrelated random text. */
export function passage(id: string, title: string, level: number, context: string, lines: ReadingLine[],
  glossary: { ko: string; fr: string }[], questions: ReadingQuestion[], readingTip: string): KoreanReading {
  return {
    id, title, level, context, lines, glossary, questions, readingTip,
    translations: lines.slice(0, 3).flatMap((line) => [
      { source: line.ko, target: 'fr' as const, answers: [line.fr], explain: line.note ?? `Retrouve les mots du texte et conserve le temps, les personnes et les relations entre les idées. ${line.ko} → ${line.fr}` },
      { source: line.fr, target: 'ko' as const, answers: [line.ko], explain: line.note ?? `Une formulation possible est « ${line.ko} ». Le prédicat termine la proposition ; compare aussi les particules et le temps.` },
    ]),
    writingPrompt: 'Sans recopier la traduction, explique en français ce que tu as compris. Cite au moins deux informations du texte. Une autre formulation peut être juste.',
    model: lines.map((line) => line.fr).join(' '),
  }
}

/** Reuses the actual sentences and vocabulary studied in this precise lesson.
 * Fragments remain identified as fragments; we do not invent a story around them. */
export function lessonReading(lesson: Lesson, level: number): KoreanReading {
  const dialogue = (lesson.dialogue ?? []).filter((l) => /[가-힣]/.test(l.ko) && l.fr)
  const examples = lesson.sections.flatMap((s) => (s.examples ?? []).map((e) => ({ ...e, note: s.tip ?? s.body?.split('\n')[0] })))
    .filter((e) => /[가-힣]/.test(e.ko) && e.fr && !e.ko.includes('→'))
  const seen = new Set<string>()
  const source: ReadingLine[] = (dialogue.length >= 2 ? dialogue : examples).filter((e) => {
    if (seen.has(e.ko)) return false
    seen.add(e.ko); return true
  }).slice(0, 6).map((e) => ({ ko: e.ko, fr: e.fr, note: 'note' in e ? e.note : undefined }))
  if (!source.length) source.push(...lesson.vocab.filter((v) => /[가-힣]/.test(v.ko)).slice(0, 6).map((v) => ({ ko: v.ko, fr: v.fr, note: `Lecture du mot : ${v.ko}${v.rom ? ` (${v.rom})` : ''} — ${v.fr}.` })))
  if (!source.length) source.push({ ko: '나무', fr: 'arbre', note: '나 + 무 : deux blocs syllabiques. Lis-les dans cet ordre.' })
  const meanings = [...new Set(source.map((e) => e.fr))]
  const vocabMeanings = lesson.vocab.map((v) => v.fr)
  const questions = source.slice(0, 3).map((line, i) => readingQuestion(
    `Dans cet extrait, quel est le sens de « ${line.ko} » ?`, line.fr,
    [...meanings.slice(i + 1), ...meanings.slice(0, i), ...vocabMeanings, 'Le texte ne donne pas cette information.'].filter((v) => v !== line.fr).slice(0, 3),
    `${line.ko} signifie ici « ${line.fr} ». ${line.note ?? 'Compare les mots et la terminaison avec les explications de la leçon.'}`,
  ))
  const activity = passage(`lesson-${lesson.id}`, `Lire et comprendre : ${lesson.title}`, level,
    dialogue.length >= 2 ? 'Relis ce dialogue de la leçon comme un échange complet. Repère ce que chaque personne demande ou affirme.' : 'Lecture guidée des exemples étudiés dans cette leçon. Ces extraits peuvent être indépendants : cherche le sens de chacun.',
    source, lesson.vocab.slice(0, 8), questions,
    level === 0 ? 'Lis d’abord les blocs lentement. Une lettre finale reste dans son bloc. La romanisation n’est qu’une aide : reviens au hangeul.' : 'Lis une première fois sans traduction, repère le prédicat final et les particules, puis cherche les liens entre les propositions.')
  activity.translations = source.slice(0, 3).flatMap((line) => [
    { source: line.ko, target: 'fr' as const, answers: [line.fr], explain: line.note ?? `Sens de cet exemple : ${line.fr}. Compare le sujet, les compléments et la terminaison du cours.` },
    { source: line.fr, target: 'ko' as const, answers: [line.ko], explain: line.note ?? `Reprends le modèle exact étudié : ${line.ko}. D’autres formulations peuvent être possibles selon le contexte.` },
  ])
  return activity
}

const Q = readingQuestion
export const levelReadings: KoreanReading[] = [
  passage('level-0', 'Mes premiers mots', 0, 'Une première lecture de mots : aucune conjugaison à connaître. Lis chaque ligne en séparant les blocs.', [
    { ko: '나무', fr: 'arbre', note: '나 = ㄴ + ㅏ ; 무 = ㅁ + ㅜ. Les deux syllabes n’ont pas de consonne finale.' },
    { ko: '바다', fr: 'mer', note: '바 + 다 : deux syllabes ouvertes, à lire de gauche à droite.' },
    { ko: '우유', fr: 'lait', note: '우 + 유. Le ㅇ initial est muet ; la voyelle de 유 se lit yu.' },
    { ko: '학교', fr: 'école', note: '학 a une finale ㄱ ; 교 se compose de ㄱ et ㅛ. Écoute le mot complet.' },
  ], [{ ko: '나무', fr: 'arbre' }, { ko: '바다', fr: 'mer' }, { ko: '우유', fr: 'lait' }, { ko: '학교', fr: 'école' }], [
    Q('Quel mot désigne la mer ?', '바다', ['나무', '우유', '학교'], '바다 = mer. Les deux blocs sont 바 et 다.'),
    Q('Dans 우유, le ㅇ initial se prononce-t-il ?', 'Non, il sert de support à la voyelle.', ['Oui, il se prononce toujours ng.', 'Il se prononce n.'], 'ㅇ est muet au début du bloc. En finale, il représente ng.'),
    Q('Quel premier bloc contient une consonne finale ?', '학 dans 학교', ['나 dans 나무', '바 dans 바다'], '학 = ㅎ + ㅏ + ㄱ. ㄱ est placé sous la voyelle : c’est le batchim.'),
  ], 'Lis les mots avant d’écouter, puis compare ta lecture avec l’audio. Il ne s’agit pas encore d’un texte narratif.'),
  passage('level-1', 'Une journée à la bibliothèque', 1, 'Présent poli, lieux et objet de l’action. Mina raconte une journée simple.', [
    { ko: '저는 미나예요.', fr: 'Je suis Mina.', note: '저는 pose le thème. Après 미나, sans consonne finale, on utilise 예요.' },
    { ko: '오늘 도서관에 가요.', fr: 'Aujourd’hui, je vais à la bibliothèque.', note: '도서관에 indique la destination de 가요. Le sujet est compris grâce à la première phrase.' },
    { ko: '도서관에서 한국어 책을 읽어요.', fr: 'Je lis un livre de coréen à la bibliothèque.', note: '에서 situe l’action de lire ; 책을 est le complément d’objet.' },
    { ko: '친구도 도서관에 있어요.', fr: 'Mon ami est aussi à la bibliothèque.', note: '도 signifie aussi. Avec 있어요, 에 situe la présence et non une action.' },
  ], [{ ko: '도서관', fr: 'bibliothèque' }, { ko: '책', fr: 'livre' }, { ko: '읽다', fr: 'lire' }, { ko: '친구', fr: 'ami' }], [
    Q('Où Mina va-t-elle ?', 'À la bibliothèque.', ['Au marché.', 'À l’aéroport.'], '도서관에 가요 : elle va à la bibliothèque. 에 suit la destination.'),
    Q('Que lit-elle ?', 'Un livre de coréen.', ['Un journal anglais.', 'Une carte de métro.'], '한국어 책을 읽어요 : 한국어 qualifie 책, le livre ; 을 marque l’objet.'),
    Q('Que nous apprend 친구도 ?', 'L’ami est lui aussi à la bibliothèque.', ['L’ami ne sait pas lire.', 'Mina n’a pas d’ami.'], '도 ajoute une personne à l’information précédente : l’ami aussi est là.'),
  ], 'Distingue 에 avec 가요 ou 있어요 et 에서 avec 읽어요. Le choix dépend du prédicat, pas du seul nom de lieu.'),
  passage('level-2', 'Une sortie reportée', 2, 'Passé, cause, opposition et projet : suis ce qui change entre hier et demain.', [
    { ko: '어제 친구와 공원에 가려고 했어요.', fr: 'Hier, j’avais prévu d’aller au parc avec un ami.', note: '-려고 했어요 exprime une intention passée ; cela ne prouve pas que la sortie a eu lieu.' },
    { ko: '그런데 비가 많이 와서 집에 있었어요.', fr: 'Mais comme il a beaucoup plu, je suis resté à la maison.', note: '그런데 marque le changement ; 와서 relie la pluie à la conséquence.' },
    { ko: '집에서 영화를 보고 저녁을 먹었어요.', fr: 'À la maison, j’ai regardé un film et j’ai dîné.', note: '-고 relie les actions ; 먹었어요 porte la terminaison passée finale.' },
    { ko: '내일 날씨가 좋으면 공원에 갈 거예요.', fr: 'Demain, s’il fait beau, j’irai au parc.', note: '-으면 pose une condition ; 갈 거예요 exprime le projet.' },
  ], [{ ko: '어제', fr: 'hier' }, { ko: '비', fr: 'pluie' }, { ko: '내일', fr: 'demain' }, { ko: '날씨', fr: 'temps, météo' }], [
    Q('La personne est-elle allée au parc hier ?', 'Non, elle est restée chez elle.', ['Oui, malgré la pluie.', 'Le texte dit qu’elle est allée au travail.'], 'Le projet en -려고 했어요 est contredit par 집에 있었어요 : elle est restée à la maison.'),
    Q('Pourquoi est-elle restée chez elle ?', 'Parce qu’il a beaucoup plu.', ['Parce qu’elle avait un examen.', 'Parce que le parc était fermé.'], '비가 많이 와서 donne la raison de 집에 있었어요.'),
    Q('La sortie de demain est-elle certaine ?', 'Elle dépend du beau temps.', ['Oui, aucune condition.', 'Non, elle est définitivement annulée.'], '좋으면 signifie « si [le temps] est bon ». Le projet dépend de cette condition.'),
  ], 'Repère 어제 / 내일 et ne confonds pas intention, action réalisée et condition.'),
  passage('level-3', 'Choisir où étudier', 3, 'Explication, concession et relative : deux lieux sont comparés.', [
    { ko: '제가 자주 가는 카페는 조용해서 공부하기 좋아요.', fr: 'Le café où je vais souvent est calme, donc on y étudie bien.', note: '제가 자주 가는 est une relative placée avant 카페. -기 transforme l’action en notion.' },
    { ko: '그렇지만 주말에는 사람이 많아서 자리를 찾기 어려워요.', fr: 'Cependant, le week-end, il y a beaucoup de monde et il est difficile de trouver une place.', note: '그렇지만 oppose la limite à l’avantage ; -아서 introduit ici la cause.' },
    { ko: '그래서 시험이 가까워지면 도서관에서 공부하기로 했어요.', fr: 'J’ai donc décidé d’étudier à la bibliothèque à l’approche des examens.', note: '-기로 했어요 exprime une décision. -아/어지다 indique un changement.' },
    { ko: '카페가 싫은 것은 아니지만 집중할 수 있는 곳이 필요하거든요.', fr: 'Ce n’est pas que je n’aime pas le café, mais j’ai besoin d’un endroit où je peux me concentrer.', note: '-거든요 fournit une explication de fond ; -는 것은 아니다 nuance le refus.' },
  ], [{ ko: '조용하다', fr: 'être calme' }, { ko: '자리', fr: 'place' }, { ko: '집중하다', fr: 'se concentrer' }, { ko: '시험', fr: 'examen' }], [
    Q('Quel avantage le café a-t-il ?', 'Il est calme et adapté à l’étude.', ['Il est toujours vide le week-end.', 'Il est gratuit.'], '조용해서 공부하기 좋아요 donne l’avantage. La gratuité n’est pas mentionnée.'),
    Q('Pourquoi choisir la bibliothèque près des examens ?', 'Pour pouvoir se concentrer.', ['Parce que la personne déteste le café.', 'Parce que le café va fermer.'], 'La dernière phrase explique le besoin de concentration et rejette explicitement l’idée de détester le café.'),
    Q('Que désigne 제가 자주 가는 ?', 'Le café où le narrateur va souvent.', ['Une personne que le narrateur rencontre.', 'La date du prochain examen.'], 'La relative précède son nom : 제가 자주 가는 + 카페.'),
  ], 'Lis chaque relative jusqu’au nom qu’elle détermine ; cherche ensuite le prédicat principal.'),
  passage('level-4', 'Travailler à distance', 4, 'Discours rapporté, concession et conséquence : distingue avis rapporté et observation.', [
    { ko: '동료는 재택근무를 하면 시간을 절약할 수 있다고 했어요.', fr: 'Mon collègue a dit que le télétravail permettait de gagner du temps.', note: '-다고 했어요 rapporte les propos du collègue. Ce n’est pas une citation directe.' },
    { ko: '출퇴근을 하지 않아도 되기 때문에 여유가 생긴다는 거예요.', fr: 'Il explique qu’on gagne du temps libre parce qu’on n’a pas besoin de faire le trajet domicile-travail.', note: '-지 않아도 되다 = ne pas avoir besoin de. -기 때문에 marque la raison.' },
    { ko: '하지만 집에서 일한다고 해서 스트레스가 없는 것은 아니에요.', fr: 'Mais travailler chez soi ne signifie pas pour autant qu’on n’a aucun stress.', note: '-다고 해서…-는 것은 아니다 rejette une conclusion trop générale.' },
    { ko: '일과 생활의 경계가 모호해질수록 오히려 더 피곤해질 수 있어요.', fr: 'Plus la frontière entre travail et vie privée devient floue, plus on risque au contraire de se fatiguer.', note: '-(으)ㄹ수록 met deux évolutions en relation ; 수 있어요 exprime une possibilité.' },
  ], [{ ko: '재택근무', fr: 'télétravail' }, { ko: '출퇴근', fr: 'trajet domicile-travail' }, { ko: '경계', fr: 'frontière' }, { ko: '오히려', fr: 'au contraire' }], [
    Q('Quel bénéfice le collègue met-il en avant ?', 'Le temps gagné sur les trajets.', ['Un salaire plus élevé.', 'L’absence garantie de stress.'], '출퇴근을 하지 않아도 되다 : le trajet n’est plus nécessaire. Le salaire n’est pas mentionné.'),
    Q('Quelle généralisation le texte refuse-t-il ?', 'Travailler chez soi supprime tout stress.', ['Certains trajets prennent du temps.', 'La vie privée existe.'], '-다고 해서…-는 것은 아니다 refuse cette déduction automatique.'),
    Q('La fatigue est-elle présentée comme inévitable ?', 'Non, c’est un risque possible.', ['Oui, dans tous les cas.', 'Le texte ne parle pas de fatigue.'], '피곤해질 수 있어요 signifie « on peut devenir plus fatigué », sans certitude absolue.'),
  ], 'Identifie qui parle, puis la nuance portée par les négations et les modaux. Une possibilité n’est pas un fait universel.'),
  passage('level-5', 'Technologie et apprentissage', 5, 'Argumentation écrite : thèse, concession, limite et conclusion.', [
    { ko: '디지털 도구가 학습의 접근성을 높였다는 점은 부인하기 어렵다.', fr: 'Il est difficile de nier que les outils numériques ont amélioré l’accès à l’apprentissage.', note: '-다는 점 nominalise une proposition comme un point d’argumentation ; -기 어렵다 exprime la difficulté.' },
    { ko: '그럼에도 불구하고 자료가 풍부하다는 이유만으로 학습 효과가 보장되는 것은 아니다.', fr: 'Néanmoins, l’abondance des ressources ne garantit pas à elle seule l’efficacité de l’apprentissage.', note: '그럼에도 불구하고 concède le premier point ; -만으로 limite la cause suffisante.' },
    { ko: '배운 내용을 실제로 활용하고 자신의 오류를 점검하는 과정이 수반되어야 하기 때문이다.', fr: 'En effet, un travail d’application concrète des acquis et de vérification de ses erreurs doit l’accompagner.', note: '-아/어야 하다 marque une nécessité. -기 때문이다 justifie l’affirmation précédente.' },
    { ko: '따라서 도구의 수를 늘리기보다는 학습 습관의 질을 개선하는 데 초점을 맞출 필요가 있다.', fr: 'Il faut donc privilégier la qualité des habitudes d’apprentissage plutôt que multiplier les outils.', note: '-기보다는 construit la préférence ; -는 데 situe le domaine sur lequel porte l’effort.' },
  ], [{ ko: '접근성', fr: 'accessibilité' }, { ko: '수반되다', fr: 'accompagner, aller de pair' }, { ko: '오류', fr: 'erreur' }, { ko: '초점을 맞추다', fr: 'se concentrer sur' }], [
    Q('Quelle est la thèse nuancée du texte ?', 'Les outils facilitent l’accès, mais les pratiques d’apprentissage restent essentielles.', ['Tous les outils numériques sont inutiles.', 'Plus on a d’outils, plus la réussite est garantie.'], 'Le texte reconnaît l’accès facilité, puis refuse l’équivalence entre abondance et efficacité.'),
    Q('Que justifie -기 때문이다 dans la troisième phrase ?', 'L’idée que les ressources seules ne suffisent pas.', ['La disparition des erreurs.', 'Le besoin d’acheter davantage d’outils.'], 'Cette phrase donne la raison : il faut appliquer et contrôler ses erreurs.'),
    Q('Quelle recommandation conclut le texte ?', 'Améliorer ses habitudes plutôt que multiplier les outils.', ['Supprimer toute technologie.', 'Ne travailler que le vocabulaire.'], '늘리기보다는…질을 개선 : préférence pour la qualité des habitudes, sans rejet total des outils.'),
  ], 'Annote la fonction de chaque phrase : constat, concession, justification, conclusion. Résume ensuite la thèse sans la rendre absolue.'),
]
