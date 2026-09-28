/**
 * Contenu des pages « Écriture », « Nombres » et « Couleurs » des autres langues,
 * sur le modèle des pages coréennes (Hangeul, Nombres, Couleurs).
 */
export type Q = [question: string, answer: string, ...wrong: string[]]

export interface WritingContent {
  title: string
  lead: string
  /** Grilles cliquables : [caractère, lecture, précision, texte à prononcer]. */
  grids: { title: string; items: [string, string, string?, string?][] }[]
  /** Sections du cours (texte **gras** accepté), avec tableau ou mots à lire. */
  sections: { id: string; title: string; body: string; table?: { head: string[]; rows: string[][] }; words?: [string, string, string][] }[]
  quizTitle: string
  quiz: Q[]
  /** Liens vers les leçons guidées : [libellé, niveau, leçon]. */
  next: [string, string, string][]
}

export interface NumbersContent {
  title: string
  lead: string
  why: { title: string; paragraphs: string[] }
  table: { title: string; head: string[]; rows: string[][]; note?: string }
  build: { title: string; paragraphs: string[] }
  sentences: { title: string; items: { text: string; explain: string }[] }
  /** 4 unités de la vie quotidienne, 6 questions chacune (comme le coréen). */
  units: { id: string; title: string; body: string; examples: { ko: string; fr: string }[]; qs: Q[] }[]
  next: [string, string, string, string][]
}

export interface ColorsContent {
  title: string
  lead: string
  /** [mot, lecture, sens, couleur hex] — les 16 couleurs du coréen. */
  colors: [string, string, string, string][]
  sentence: { title: string; paragraphs: { text: string; say?: string }[] }
}

export interface PortalContent {
  writing: WritingContent
  numbers: NumbersContent
  colors: ColorsContent
}
