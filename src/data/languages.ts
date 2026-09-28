/** Les langues proposées par TalkToMe Club. */
export type LanguageId = 'coreen' | 'japonais' | 'espagnol' | 'anglais' | 'francais'

export interface LanguageInfo {
  id: LanguageId
  /** Nom affiché en français (dans l'interface francophone). */
  name: string
  /** Nom de la langue dans la langue elle-même. */
  native: string
  /** Salutation affichée en grand. */
  hello: string
  helloRead: string
  /** Code BCP 47 pour la synthèse vocale. */
  speech: string
  path: string
  accent: string
  tint: string
  /** Phrase d'accroche (en anglais pour le français langue étrangère). */
  pitch: string
  exam: string
  /** Les grandes étapes du cursus, du premier cours au niveau courant. */
  levels: { code: string; title: string; detail: string }[]
  /** Thèmes proposés dans le formulaire de réservation. */
  topics: string[]
  /** true quand le cursus en autonomie est entièrement en ligne. */
  available: boolean
  /** Langue d'explication des cours. */
  taughtIn: 'fr' | 'en'
}

export const languages: LanguageInfo[] = [
  {
    id: 'coreen',
    name: 'Coréen',
    native: '한국어',
    hello: '안녕하세요',
    helloRead: 'annyeonghaseyo',
    speech: 'ko-KR',
    path: '/coreen',
    accent: '#ff4f6d',
    tint: '#fff0f2',
    pitch: 'Du hangeul au niveau TOPIK : cours, quiz, vocabulaire en photos et mises en situation.',
    exam: 'TOPIK I et II',
    levels: [
      { code: 'Pré-A1', title: 'Hangeul', detail: 'Lire et écrire l’alphabet coréen' },
      { code: 'A1', title: 'Débutant', detail: 'Se présenter, compter, le présent poli' },
      { code: 'A2', title: 'Élémentaire', detail: 'Passé, futur, relier ses phrases' },
      { code: 'B1', title: 'Intermédiaire', detail: 'Honorifiques, relatives, conditions' },
      { code: 'B2', title: 'Intermédiaire avancé', detail: 'Discours indirect, nuances' },
      { code: 'C1-C2', title: 'Avancé & courant', detail: 'Hanja, proverbes, TOPIK II' },
    ],
    topics: ['Conversation', 'Grammaire', 'Préparation TOPIK', 'Prononciation', 'Voyage en Corée', 'Hangeul (débutant)', 'Autre'],
    available: true,
    taughtIn: 'fr',
  },
  {
    id: 'japonais',
    name: 'Japonais',
    native: '日本語',
    hello: 'こんにちは',
    helloRead: 'konnichiwa',
    speech: 'ja-JP',
    path: '/japonais',
    accent: '#d6336c',
    tint: '#fdeef3',
    pitch: 'Des kana aux kanji jusqu’au JLPT : un parcours complet expliqué en français.',
    exam: 'JLPT N5 à N1',
    levels: [
      { code: 'Pré-A1', title: 'Kana', detail: 'Hiragana et katakana' },
      { code: 'N5', title: 'Débutant', detail: 'Se présenter, particules, です / ます' },
      { code: 'N4', title: 'Élémentaire', detail: 'Forme en て, passé, premiers kanji' },
      { code: 'N3', title: 'Intermédiaire', detail: 'Formes neutres, conditionnels' },
      { code: 'N2', title: 'Intermédiaire avancé', detail: 'Keigo, nuances, lecture' },
      { code: 'N1', title: 'Avancé & courant', detail: 'Presse, expressions, JLPT N1' },
    ],
    topics: ['Conversation', 'Grammaire', 'Préparation JLPT', 'Kanji', 'Prononciation', 'Voyage au Japon', 'Kana (débutant)', 'Autre'],
    available: true,
    taughtIn: 'fr',
  },
  {
    id: 'espagnol',
    name: 'Espagnol',
    native: 'Español',
    hello: '¡Hola!',
    helloRead: 'ola',
    speech: 'es-ES',
    path: '/espagnol',
    accent: '#e8590c',
    tint: '#fff2e8',
    pitch: 'De tes premiers mots jusqu’au DELE : grammaire claire, audio et conversations du quotidien.',
    exam: 'DELE A1 à C2',
    levels: [
      { code: 'Pré-A1', title: 'Premiers pas', detail: 'Sons, alphabet, salutations' },
      { code: 'A1', title: 'Débutant', detail: 'Ser / estar, présent, nombres' },
      { code: 'A2', title: 'Élémentaire', detail: 'Passés, futur proche, pronoms' },
      { code: 'B1', title: 'Intermédiaire', detail: 'Subjonctif présent, récits' },
      { code: 'B2', title: 'Intermédiaire avancé', detail: 'Conditionnel, discours indirect' },
      { code: 'C1-C2', title: 'Avancé & courant', detail: 'Expressions, registres, DELE' },
    ],
    topics: ['Conversation', 'Grammaire', 'Préparation DELE', 'Prononciation', 'Voyage en Espagne / Amérique latine', 'Débutant', 'Autre'],
    available: true,
    taughtIn: 'fr',
  },
  {
    id: 'anglais',
    name: 'Anglais',
    native: 'English',
    hello: 'Hello!',
    helloRead: 'hèlo',
    speech: 'en-GB',
    path: '/anglais',
    accent: '#1c7ed6',
    tint: '#eaf3fc',
    pitch: 'De l’anglais de base à l’aisance : grammaire, vocabulaire, oral et préparation TOEIC / Cambridge.',
    exam: 'TOEIC, Cambridge, IELTS',
    levels: [
      { code: 'Pré-A1', title: 'Premiers pas', detail: 'Sons, alphabet, salutations' },
      { code: 'A1', title: 'Débutant', detail: 'To be, présent simple, nombres' },
      { code: 'A2', title: 'Élémentaire', detail: 'Prétérit, futur, comparatifs' },
      { code: 'B1', title: 'Intermédiaire', detail: 'Present perfect, modaux' },
      { code: 'B2', title: 'Intermédiaire avancé', detail: 'Conditionnels, voix passive' },
      { code: 'C1-C2', title: 'Avancé & courant', detail: 'Idioms, phrasal verbs, examens' },
    ],
    topics: ['Conversation', 'Grammaire', 'Préparation TOEIC / Cambridge / IELTS', 'Anglais professionnel', 'Prononciation', 'Voyage', 'Autre'],
    available: true,
    taughtIn: 'fr',
  },
  {
    id: 'francais',
    name: 'Français',
    native: 'Français',
    hello: 'Bonjour !',
    helloRead: 'bon-zhoor',
    speech: 'fr-FR',
    path: '/francais',
    accent: '#5f3dc4',
    tint: '#f1edfc',
    pitch: 'French for English speakers: from your first words to fluency and the DELF / DALF.',
    exam: 'DELF A1 to DALF C2',
    levels: [
      { code: 'Pre-A1', title: 'First steps', detail: 'Sounds, alphabet, greetings' },
      { code: 'A1', title: 'Beginner', detail: 'Être / avoir, present tense, numbers' },
      { code: 'A2', title: 'Elementary', detail: 'Passé composé, near future' },
      { code: 'B1', title: 'Intermediate', detail: 'Imparfait, subjunctive basics' },
      { code: 'B2', title: 'Upper intermediate', detail: 'Conditional, reported speech' },
      { code: 'C1-C2', title: 'Advanced & fluent', detail: 'Idioms, registers, DALF' },
    ],
    topics: ['Conversation', 'Grammar', 'DELF / DALF preparation', 'Pronunciation', 'Travel in France', 'Beginner', 'Other'],
    available: false,
    taughtIn: 'en',
  },
]

export const getLanguage = (id: string | null | undefined) => languages.find((l) => l.id === id)
export const languageName = (id: string | undefined) => getLanguage(id ?? 'coreen')?.name ?? 'Coréen'
