export interface Example {
  ko: string
  rom?: string
  fr: string
}

export interface VocabItem {
  ko: string
  rom: string
  fr: string
}

export interface DialogueLine {
  speaker: string
  ko: string
  fr: string
}

export interface Section {
  title: string
  /** Texte explicatif. Supporte **gras** et les retours à la ligne. */
  body?: string
  table?: { head: string[]; rows: string[][] }
  examples?: Example[]
  tip?: string
}

export type Exercise =
  | { type: 'qcm'; q: string; options: string[]; answer: number; explain?: string }
  | { type: 'fill'; q: string; answers: string[]; hint?: string; explain?: string }
  | { type: 'match'; q: string; pairs: [string, string][] }
  | { type: 'order'; q: string; words: string[]; fr?: string; explain?: string }

export interface Lesson {
  id: string
  title: string
  subtitle: string
  duration: number
  objectives: string[]
  sections: Section[]
  vocab: VocabItem[]
  dialogue?: DialogueLine[]
  exercises: Exercise[]
}

export interface Level {
  id: string
  index: number
  name: string
  korean: string
  cefr: string
  topik: string
  color: string
  description: string
  lessons: Lesson[]
  test: Exercise[]
}
