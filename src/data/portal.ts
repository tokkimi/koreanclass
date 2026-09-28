import type { JourneyCopy } from '../components/JourneySnapshot'
import type { LevelCheckCopy } from '../components/LevelCheckBanner'
import type { PracticeCopy } from '../components/PracticeVideoInvite'

/**
 * Textes des portails japonais, espagnol, anglais et français, construits
 * sur le modèle exact du portail coréen (mêmes sections, mêmes pages).
 */
export interface PortalCopy {
  hero: { image: string; title: string; words: [string, string, string]; cta: string }
  chapters: [string, string, string, string, string, string]
  writing: { menu: string; badge: string; ko: string; title: string; subtitle: string }
  nav: { home: string; courses: string; numbers: string; vocabulary: string; colors: string; structures: string; tests: string; practice: string; back: string; teacher: string }
  pathTitle: string
  pathLead: string
  start: string
  resume: string
  go: string
  continue: string
  access: (levels: number, lessons: number) => string
  hello: (name: string, pct: number) => string
  journey: JourneyCopy
  levelCheck: LevelCheckCopy
  practice: PracticeCopy
  teacher: { eyebrow: string; title: string; lead: string; one: string; oneSub: string; oneCta: string; oneList: [string, string]; pack: string; packSub: string; packCta: string; packList: [string, string]; level: string; levelLink: string }
  faq: { q: string; a: string }
  extras: { numbers: [string, string, string]; vocabulary: [string, string, string]; colors: [string, string, string]; structures: [string, string, string]; tests: [string, string, string]; practice: [string, string, string] }
}

const stagesFr = (names: string[], details: string[]) =>
  ['blue', 'mint', 'lavender', 'sky', 'violet', 'ink'].map((tone, i) => ({ level: String(i).padStart(2, '0'), name: names[i], detail: details[i], tone }))

const frTeacher = (topic: string) => ({
  eyebrow: 'Avec un professeur',
  title: 'Parle. On t’écoute.',
  lead: 'Des cours particuliers en visio, adaptés à ton niveau et à tes envies.',
  one: 'Une heure',
  oneSub: 'Pour essayer, sans engagement',
  oneCta: 'Réserver 1 heure',
  oneList: ['1 h en visio avec un professeur', topic] as [string, string],
  pack: 'Pack 10 heures',
  packSub: 'Pour progresser vraiment',
  packCta: 'Prendre le pack',
  packList: ['10 €/h · 50 € d’économie', 'Tes heures, quand tu veux'] as [string, string],
  level: 'Déjà quelques bases ?',
  levelLink: 'Trouve ton niveau en 18 minutes →',
})

const frNav = (lang: string) => ({
  home: `Accueil ${lang}`,
  courses: 'Cours',
  numbers: 'Nombres',
  vocabulary: 'Vocabulaire',
  colors: 'Couleurs',
  structures: 'Phrases & grammaire',
  tests: 'Tests & QCM',
  practice: 'En situation',
  back: '← Toutes les langues',
  teacher: 'Cours privé',
})

const frFaq = {
  q: 'Comment retrouver ma progression ?',
  a: 'Crée ton profil puis connecte-toi sur n’importe quel appareil : tes résultats sont sauvegardés en ligne. Une leçon est validée à partir de 70 %, et tu peux rejouer autant que tu veux.',
}

/** Pages déjà construites pour les autres langues (le menu et l'accueil n'affichent qu'elles). */
export type PortalPage = 'ecriture' | 'nombres' | 'vocabulaire' | 'couleurs' | 'structures' | 'tests' | 'pratique'
const ALWAYS: PortalPage[] = ['tests']
/** Pages annexes dont le contenu est prêt, langue par langue. */
export const readyPages: Record<string, PortalPage[]> = { japonais: ['ecriture', 'nombres', 'couleurs'] }
export const isBuilt = (lang: string, page: PortalPage) => ALWAYS.includes(page) || (readyPages[lang] ?? []).includes(page)

export const portals: Record<string, PortalCopy> = {
  japonais: {
    hero: { image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=2000&q=80', title: 'Le japonais commence ici.', words: ['Écoute.', 'Comprends.', 'Ose parler.'], cta: 'Découvrir les cours' },
    chapters: ['Tes premiers kana', 'Les bases pour discuter', 'Raconte ton quotidien', 'Parle comme un Japonais', 'Le keigo et les nuances', 'À toi le japonais courant'],
    writing: { menu: 'Kana', badge: 'Kana', ko: 'あいう', title: 'L’atelier kana', subtitle: 'Hiragana et katakana' },
    nav: frNav('japonais'),
    pathTitle: 'Ton parcours, sans pression.',
    pathLead: 'Des premiers kana aux vraies conversations. Fais tourner, choisis, commence.',
    start: 'Commencer',
    resume: 'Reprendre',
    go: 'C’est parti',
    continue: 'Continuer',
    access: (l, n) => `${l} niveaux · ${n} leçons · accès libre`,
    hello: (name, pct) => `Hello, ${name} · ${pct} % du parcours`,
    journey: {
      eyebrow: 'UN VRAI CHEMIN, PAS UNE LISTE DE COURS',
      title: 'Un parcours lisible, des kana au JLPT.',
      text: 'Lis les kana, construis tes phrases, puis maîtrise le keigo et les nuances. Tu avances à ton rythme, avec un point clair à chaque étape.',
      stages: stagesFr(['Kana', 'N5', 'N4', 'N3', 'N2', 'N1'], ['Lire les syllabes', 'Se présenter', 'Se raconter', 'Parler naturellement', 'Keigo et presse', 'Japonais courant']),
      goal: 'JLPT',
      start: 'Commencer mon parcours',
      startTo: '/japonais/cours',
      teacher: 'Être accompagnée par ton prof',
      teacherTo: '/reserver?langue=japonais',
      labels: ['niveaux progressifs', 'leçons et ateliers', 'de parcours guidé', '6 étapes', 'Un cap à la fois', 'objectif final'],
    },
    levelCheck: {
      eyebrow: 'TEST DE POSITIONNEMENT',
      title: 'Et si tu te concentrais sur ton apprentissage ?',
      text: 'Montre-nous ce que tu sais faire. Évalue ton niveau dès maintenant : kana, compréhension, structures de phrases et keigo.',
      minutes: '≈ 18 min',
      custom: 'recommandation personnalisée',
      questions: 'questions',
      cta: 'Évaluer mon niveau maintenant',
      to: '/japonais/test-de-niveau',
    },
    practice: {
      eyebrow: 'MISES EN SITUATION',
      title: 'Ne reconnais pas seulement les mots. Utilise-les.',
      text: 'Commande des ramen, demande ton chemin à Tokyo, réserve un ryokan. Choisis ta réponse, écoute-la, puis prends la parole.',
      tags: ['jeu de dialogue', 'écoute', 'prise de parole'],
      cta: 'Tester les mises en situation',
      to: '/japonais/pratique',
    },
    teacher: frTeacher('Conversation, grammaire ou JLPT'),
    faq: frFaq,
    extras: {
      numbers: ['Nombres', 'いち に', 'Compter, prix, heures'],
      vocabulary: ['Mots', 'ことば', 'Des thèmes à retenir'],
      colors: ['Couleurs', 'いろ', 'Voir, dire, décrire'],
      structures: ['Grammaire', 'ぶんぽう', 'Construire tes phrases'],
      tests: ['QCM', 'テスト', 'Valide chaque niveau'],
      practice: ['Oral', 'かいわ', 'Jeux et studio oral'],
    },
  },
  espagnol: {
    hero: { image: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&w=2000&q=80', title: 'L’espagnol commence ici.', words: ['Escucha.', 'Comprende.', '¡Habla!'], cta: 'Découvrir les cours' },
    chapters: ['Tes premiers mots', 'Les bases pour discuter', 'Raconte ton quotidien', 'Le subjonctif sans peur', 'Argumente et nuance', 'À toi l’espagnol courant'],
    writing: { menu: 'Alphabet & sons', badge: 'Sons', ko: 'ñ ll rr', title: 'Alphabet et prononciation', subtitle: 'Lettres, sons et accents' },
    nav: frNav('espagnol'),
    pathTitle: 'Ton parcours, sans pression.',
    pathLead: 'Des premiers mots aux vraies conversations. Fais tourner, choisis, commence.',
    start: 'Commencer',
    resume: 'Reprendre',
    go: 'C’est parti',
    continue: 'Continuer',
    access: (l, n) => `${l} niveaux · ${n} leçons · accès libre`,
    hello: (name, pct) => `¡Hola, ${name}! · ${pct} % du parcours`,
    journey: {
      eyebrow: 'UN VRAI CHEMIN, PAS UNE LISTE DE COURS',
      title: 'Un parcours lisible, des premiers mots au DELE.',
      text: 'Construis les bases, raconte au passé, apprivoise le subjonctif puis argumente avec précision. Tu avances à ton rythme.',
      stages: stagesFr(['Sons', 'A1', 'A2', 'B1', 'B2', 'C1+'], ['Lire et prononcer', 'Se présenter', 'Se raconter', 'Relier ses idées', 'Nuancer', 'Parler naturellement']),
      goal: 'DELE',
      start: 'Commencer mon parcours',
      startTo: '/espagnol/cours',
      teacher: 'Être accompagnée par ton prof',
      teacherTo: '/reserver?langue=espagnol',
      labels: ['niveaux progressifs', 'leçons et ateliers', 'de parcours guidé', '6 étapes', 'Un cap à la fois', 'objectif final'],
    },
    levelCheck: {
      eyebrow: 'TEST DE POSITIONNEMENT',
      title: 'Et si tu te concentrais sur ton apprentissage ?',
      text: 'Montre-nous ce que tu sais faire. Évalue ton niveau dès maintenant : bases, temps du passé, subjonctif et nuances.',
      minutes: '≈ 18 min',
      custom: 'recommandation personnalisée',
      questions: 'questions',
      cta: 'Évaluer mon niveau maintenant',
      to: '/espagnol/test-de-niveau',
    },
    practice: {
      eyebrow: 'MISES EN SITUATION',
      title: 'Ne reconnais pas seulement les mots. Utilise-les.',
      text: 'Commande des tapas, cherche un appartement, passe un entretien. Choisis ta réponse, écoute-la, puis prends la parole.',
      tags: ['jeu de dialogue', 'écoute', 'prise de parole'],
      cta: 'Tester les mises en situation',
      to: '/espagnol/pratique',
    },
    teacher: frTeacher('Conversation, grammaire ou DELE'),
    faq: frFaq,
    extras: {
      numbers: ['Nombres', 'uno dos', 'Compter, prix, heures'],
      vocabulary: ['Mots', 'palabras', 'Des thèmes à retenir'],
      colors: ['Couleurs', 'colores', 'Voir, dire, décrire'],
      structures: ['Grammaire', 'frases', 'Construire tes phrases'],
      tests: ['QCM', 'examen', 'Valide chaque niveau'],
      practice: ['Oral', 'charla', 'Jeux et studio oral'],
    },
  },
  anglais: {
    hero: { image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=2000&q=80', title: 'L’anglais commence ici.', words: ['Listen.', 'Understand.', 'Speak up.'], cta: 'Découvrir les cours' },
    chapters: ['Tes premiers mots', 'Les bases pour discuter', 'Raconte ton quotidien', 'Le present perfect maîtrisé', 'Parle comme au bureau', 'À toi l’anglais courant'],
    writing: { menu: 'Alphabet & sons', badge: 'Sons', ko: 'th · sh', title: 'Alphabet et prononciation', subtitle: 'Lettres, sons et accent' },
    nav: frNav('anglais'),
    pathTitle: 'Ton parcours, sans pression.',
    pathLead: 'Des premiers mots aux vraies conversations. Fais tourner, choisis, commence.',
    start: 'Commencer',
    resume: 'Reprendre',
    go: 'C’est parti',
    continue: 'Continuer',
    access: (l, n) => `${l} niveaux · ${n} leçons · accès libre`,
    hello: (name, pct) => `Hello, ${name} · ${pct} % du parcours`,
    journey: {
      eyebrow: 'UN VRAI CHEMIN, PAS UNE LISTE DE COURS',
      title: 'Un parcours lisible, des premiers mots à l’IELTS.',
      text: 'Construis les bases, maîtrise les temps, puis parle avec aisance au travail comme en voyage. Tu avances à ton rythme.',
      stages: stagesFr(['Sons', 'A1', 'A2', 'B1', 'B2', 'C1+'], ['Lire et prononcer', 'Se présenter', 'Se raconter', 'Relier ses idées', 'Nuancer', 'Parler naturellement']),
      goal: 'IELTS',
      start: 'Commencer mon parcours',
      startTo: '/anglais/cours',
      teacher: 'Être accompagnée par ton prof',
      teacherTo: '/reserver?langue=anglais',
      labels: ['niveaux progressifs', 'leçons et ateliers', 'de parcours guidé', '6 étapes', 'Un cap à la fois', 'objectif final'],
    },
    levelCheck: {
      eyebrow: 'TEST DE POSITIONNEMENT',
      title: 'Et si tu te concentrais sur ton apprentissage ?',
      text: 'Montre-nous ce que tu sais faire. Évalue ton niveau dès maintenant : bases, temps, modaux et nuances.',
      minutes: '≈ 18 min',
      custom: 'recommandation personnalisée',
      questions: 'questions',
      cta: 'Évaluer mon niveau maintenant',
      to: '/anglais/test-de-niveau',
    },
    practice: {
      eyebrow: 'MISES EN SITUATION',
      title: 'Ne reconnais pas seulement les mots. Utilise-les.',
      text: 'Commande dans un pub, prends le métro à Londres, passe un entretien. Choisis ta réponse, écoute-la, puis prends la parole.',
      tags: ['jeu de dialogue', 'écoute', 'prise de parole'],
      cta: 'Tester les mises en situation',
      to: '/anglais/pratique',
    },
    teacher: frTeacher('Conversation, anglais pro ou TOEIC / IELTS'),
    faq: frFaq,
    extras: {
      numbers: ['Nombres', 'one two', 'Compter, prix, heures'],
      vocabulary: ['Mots', 'words', 'Des thèmes à retenir'],
      colors: ['Couleurs', 'colours', 'Voir, dire, décrire'],
      structures: ['Grammaire', 'grammar', 'Construire tes phrases'],
      tests: ['QCM', 'quiz', 'Valide chaque niveau'],
      practice: ['Oral', 'talk', 'Jeux et studio oral'],
    },
  },
  francais: {
    hero: { image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=2000&q=80', title: 'French starts here.', words: ['Listen.', 'Understand.', 'Speak up.'], cta: 'Explore the lessons' },
    chapters: ['Your first words', 'The basics to chat', 'Tell your day', 'Past tenses mastered', 'Argue and nuance', 'Fluent French is yours'],
    writing: { menu: 'Alphabet & sounds', badge: 'Sounds', ko: 'é · on · u', title: 'Alphabet and pronunciation', subtitle: 'Letters, sounds and accents' },
    nav: {
      home: 'French home',
      courses: 'Lessons',
      numbers: 'Numbers',
      vocabulary: 'Vocabulary',
      colors: 'Colours',
      structures: 'Sentences & grammar',
      tests: 'Tests & quizzes',
      practice: 'Real-life practice',
      back: '← All languages',
      teacher: 'Private lesson',
    },
    pathTitle: 'Your path, no pressure.',
    pathLead: 'From your first words to real conversations. Spin, choose, start.',
    start: 'Start',
    resume: 'Resume',
    go: 'Let’s go',
    continue: 'Continue',
    access: (l, n) => `${l} levels · ${n} lessons · free access`,
    hello: (name, pct) => `Bonjour, ${name} · ${pct}% of the course`,
    journey: {
      eyebrow: 'A REAL PATH, NOT A LIST OF LESSONS',
      title: 'A clear path, from your first words to the DALF.',
      text: 'Build the basics, master the past tenses, then speak with precision. You move at your own pace, with a clear milestone at every step.',
      stages: ['blue', 'mint', 'lavender', 'sky', 'violet', 'ink'].map((tone, i) => ({ level: String(i).padStart(2, '0'), name: ['Sounds', 'A1', 'A2', 'B1', 'B2', 'C1+'][i], detail: ['Read and pronounce', 'Introduce yourself', 'Tell your story', 'Link ideas', 'Nuance', 'Speak naturally'][i], tone })),
      goal: 'DALF',
      start: 'Start my course',
      startTo: '/francais/cours',
      teacher: 'Get help from a teacher',
      teacherTo: '/reserver?langue=francais',
      labels: ['progressive levels', 'lessons and workshops', 'of guided learning', '6 steps', 'One goal at a time', 'final goal'],
    },
    levelCheck: {
      eyebrow: 'PLACEMENT TEST',
      title: 'Want to focus on what you really need?',
      text: 'Show us what you can do. Check your level now: basics, past tenses, subjunctive and nuance.',
      minutes: '≈ 18 min',
      custom: 'personal recommendation',
      questions: 'questions',
      cta: 'Check my level now',
      to: '/francais/test-de-niveau',
    },
    practice: {
      eyebrow: 'REAL-LIFE PRACTICE',
      title: 'Don’t just recognise the words. Use them.',
      text: 'Order at a Paris café, rent a flat, get through a job interview. Pick your answer, listen to it, then speak.',
      tags: ['dialogue game', 'listening', 'speaking'],
      cta: 'Try real-life practice',
      to: '/francais/pratique',
    },
    teacher: {
      eyebrow: 'With a teacher',
      title: 'Speak. We’re listening.',
      lead: 'One-to-one video lessons, tailored to your level and goals.',
      one: 'One hour',
      oneSub: 'Try it, no commitment',
      oneCta: 'Book 1 hour',
      oneList: ['1 h video lesson with a teacher', 'Conversation, grammar or DELF'],
      pack: '10-hour pack',
      packSub: 'To really make progress',
      packCta: 'Get the pack',
      packList: ['€10/h · save €50', 'Your hours, whenever you want'],
      level: 'Already know some French?',
      levelLink: 'Find your level in 18 minutes →',
    },
    faq: {
      q: 'How do I keep my progress?',
      a: 'Create your profile, then log in on any device: your results are saved online. A lesson is passed from 70%, and you can replay as often as you like.',
    },
    extras: {
      numbers: ['Numbers', 'un deux', 'Count, prices, time'],
      vocabulary: ['Words', 'les mots', 'Themes to remember'],
      colors: ['Colours', 'couleurs', 'See, say, describe'],
      structures: ['Grammar', 'grammaire', 'Build your sentences'],
      tests: ['Quiz', 'les tests', 'Pass every level'],
      practice: ['Speaking', 'parler', 'Games and speaking studio'],
    },
  },
}
