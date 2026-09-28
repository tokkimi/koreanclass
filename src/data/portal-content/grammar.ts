import type { Lesson } from '../types.js'
import { fill, match, order, qcm } from '../helpers.js'

/**
 * Ateliers « Phrases & grammaire » et scènes « En situation » des autres langues,
 * construits exactement comme les ateliers et scènes coréens.
 */

/** [forme, sens, règle, exemple, traduction, piège] */
export type Pattern = [string, string, string, string, string, string]

export interface StructureUnit {
  id: string
  level: number
  title: string
  context: string
  patterns: Pattern[]
  /** Décomposition d'une phrase : [morceau, fonction]. */
  breakdown: [string, string][]
  dialogue: [string, string][]
  question: string
  answer: string
  wrong: [string, string]
  /** Phrase à compléter : [consigne, réponse, explication]. */
  cloze: [string, string, string]
  task: string
  /** Mot clé de l'atelier : [mot, lecture, sens]. */
  word: [string, string, string]
}

export interface SceneTurn {
  speaker: string
  line: string
  fr: string
  answer: string
  translation: string
  wrong: [string, string]
  explain: string
}

export interface Scene {
  id: string
  levelIndex: number
  title: string
  subtitle: string
  setting: string
  image: string
  grammar: string
  pitfalls: string
  pronunciation: string
  vocab: [string, string, string][]
  turns: SceneTurn[]
  speech: { title: string; brief: string; model: string; translation: string }
}

export interface GrammarContent {
  units: StructureUnit[]
  scenes: Scene[]
}

const T = {
  fr: {
    goal2: 'Choisir une structure selon le sens, le contexte et la relation.',
    goal3: 'Produire des phrases personnelles, puis les réviser.',
    situation: 'La situation',
    breakdown: 'Décomposer pour comprendre',
    head: ['Morceau de phrase', 'Fonction et construction'],
    production: 'À toi : production en contexte',
    productionTip: 'Commence avec un modèle, puis change le sujet, le temps et le complément. Vérifie la terminaison et le registre. Cette production libre est un travail personnel, pas une correction automatique.',
    review: 'Révision espacée',
    reviewBody: 'Aujourd’hui : lis le dialogue et explique les trois structures. Demain : réécris tes phrases sans regarder. Dans une semaine : réutilise-les dans une autre situation.',
    use: (f: string) => `Dans cet atelier, à quoi sert « ${f} » ?`,
    mean: (x: string) => `Quel est le sens de « ${x} » ?`,
    reorder: 'Remets cette réplique du dialogue dans l’ordre.',
    sceneGoals: ['Comprendre les structures dans un contexte concret', 'Choisir une réponse adaptée au registre', 'Préparer et répéter une prise de parole'],
    mission: 'La mission',
    missionBody: 'Commence par lire le dialogue sans regarder les traductions. Repère les mots connus. Reviens ensuite aux explications, puis joue la scène dans l’espace « En situation ».',
    missionTip: 'Une séance complète : 10 min de découverte, 15 min de grammaire et dialogue, 15 min de jeu, 10 min de prise de parole.',
    construction: 'Comprendre la construction',
    pitfalls: 'Les pièges à éviter',
    pronunciation: 'Prononciation et rythme',
    speech: 'Ton mini-discours',
    speechTip: 'Écoute une fois, répète en courtes séquences, puis recommence sans le texte. Reviens demain et une semaine plus tard pour consolider.',
    you: 'Toi',
    vocabQ: (w: string) => `Que signifie « ${w} » dans cette situation ?`,
    matchQ: 'Associe les mots de la scène',
    write: (m: string, lang: string) => `Écris ${lang} : ${m}`,
    orderQ: 'Remets la réponse dans l’ordre',
  },
  en: {
    goal2: 'Choose a structure according to meaning, context and relationship.',
    goal3: 'Produce your own sentences, then review them.',
    situation: 'The situation',
    breakdown: 'Break it down',
    head: ['Piece of the sentence', 'Function and construction'],
    production: 'Your turn: produce in context',
    productionTip: 'Start from a model, then change the subject, the tense and the object. Check the ending and the register. This free production is personal practice, not automatic marking.',
    review: 'Spaced review',
    reviewBody: 'Today: read the dialogue and explain the three structures. Tomorrow: rewrite your sentences without looking. In a week: reuse them in another situation.',
    use: (f: string) => `In this workshop, what is « ${f} » used for?`,
    mean: (x: string) => `What does « ${x} » mean?`,
    reorder: 'Put this line of the dialogue back in order.',
    sceneGoals: ['Understand the structures in a real context', 'Choose an answer that fits the register', 'Prepare and rehearse a short talk'],
    mission: 'The mission',
    missionBody: 'Start by reading the dialogue without looking at the translations. Spot the words you know. Then go back to the explanations and play the scene in the « Real-life practice » area.',
    missionTip: 'A full session: 10 min discovery, 15 min grammar and dialogue, 15 min game, 10 min speaking.',
    construction: 'Understand the construction',
    pitfalls: 'Traps to avoid',
    pronunciation: 'Pronunciation and rhythm',
    speech: 'Your short talk',
    speechTip: 'Listen once, repeat in short chunks, then try again without the text. Come back tomorrow and a week later to consolidate.',
    you: 'You',
    vocabQ: (w: string) => `What does « ${w} » mean in this situation?`,
    matchQ: 'Match the words from the scene',
    write: (m: string, _lang?: string) => `Write in French: ${m}`,
    orderQ: 'Put the answer back in order',
  },
}
const IN: Record<string, string> = { japonais: 'en japonais', espagnol: 'en espagnol', anglais: 'en anglais', francais: 'in French' }

export function structureLessonFor(lang: string, u: StructureUnit): Lesson {
  const t = lang === 'francais' ? T.en : T.fr
  const [w, rom, meaning] = u.word
  return {
    id: u.id,
    title: u.title,
    subtitle: u.patterns.map((p) => p[0]).join(' · '),
    duration: 35,
    objectives: [u.context, t.goal2, t.goal3],
    sections: [
      { title: t.situation, body: u.context },
      ...u.patterns.map((p) => ({ title: `${p[0]} — ${p[1]}`, body: p[2], examples: [{ ko: p[3], fr: p[4] }], tip: p[5] })),
      { title: t.breakdown, table: { head: t.head, rows: u.breakdown } },
      { title: t.production, body: u.task, tip: t.productionTip },
      { title: t.review, body: t.reviewBody },
    ],
    vocab: [{ ko: w, rom, fr: meaning }],
    dialogue: u.dialogue.map(([ko, fr], i) => ({ speaker: i % 2 ? 'B' : 'A', ko, fr })),
    exercises: [
      qcm(u.question, u.answer, u.wrong, u.patterns.map((p) => p[5]).join(' ')),
      ...u.patterns.map((p, i) => qcm(t.use(p[0]), p[1], u.patterns.filter((_, j) => j !== i).map((x) => x[1]), p[2])),
      ...u.patterns.map((p, i) => qcm(t.mean(p[3]), p[4], u.patterns.filter((_, j) => j !== i).map((x) => x[4]), p[2])),
      fill(u.cloze[0], u.cloze[1], undefined, u.cloze[2]),
      ...u.dialogue.filter(([line]) => line.split(' ').length >= 2).map(([line, fr]) => order(t.reorder, line, fr)),
    ],
  }
}

export function sceneLessonFor(lang: string, s: Scene): Lesson {
  const t = lang === 'francais' ? T.en : T.fr
  return {
    id: s.id,
    title: s.title,
    subtitle: s.subtitle,
    duration: 50,
    objectives: t.sceneGoals,
    sections: [
      { title: t.mission, body: `${s.setting}\n\n${t.missionBody}`, tip: t.missionTip },
      { title: t.construction, body: s.grammar },
      { title: t.pitfalls, body: s.pitfalls },
      { title: t.pronunciation, body: s.pronunciation, examples: s.turns.map((x) => ({ ko: x.answer, fr: x.translation })) },
      { title: t.speech, body: s.speech.brief, examples: [{ ko: s.speech.model, fr: s.speech.translation }], tip: t.speechTip },
    ],
    vocab: s.vocab.map(([ko, rom, fr]) => ({ ko, rom, fr })),
    dialogue: s.turns.flatMap((x) => [
      { speaker: x.speaker, ko: x.line, fr: x.fr },
      { speaker: t.you, ko: x.answer, fr: x.translation },
    ]),
    exercises: [
      ...s.turns.map((x) => qcm(`${x.speaker} : « ${x.line} » — ${x.fr}`, x.answer, x.wrong, x.explain)),
      ...s.vocab.slice(0, 4).map((v, i) => qcm(t.vocabQ(v[0]), v[2], s.vocab.filter((_, j) => j !== i).slice(0, 3).map((x) => x[2]), `${v[0]} : ${v[2]}.`)),
      match(t.matchQ, s.vocab.slice(0, 4).map((v) => [v[0], v[2]])),
      ...s.vocab.slice(0, 2).map((v) => fill(t.write(v[2], IN[lang]), v[0], v[1] || undefined)),
      order(t.orderQ, s.turns[0].answer, s.turns[0].translation),
    ],
  }
}
