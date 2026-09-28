/** Vocabulaire illustré des autres langues : mêmes 23 thèmes (et mêmes photos) que le coréen. */
export interface VocabContent {
  /** key = nom du thème coréen (photo, illustrations) ; label = nom affiché s'il diffère. */
  themes: { key: string; label?: string; ko: string; items: string }[]
  /** 12 mots avec leur propre photo : [thème, mot, lecture, sens, phrase, traduction, photo]. */
  photoWords: [string, string, string, string, string, string, string][]
}

/** [thème (clé), mot, lecture, sens, phrase, traduction, photo] — même forme que les mots coréens. */
export type Word = [string, string, string, string, string, string, string]
