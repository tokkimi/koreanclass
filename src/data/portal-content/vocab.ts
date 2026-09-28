import type { Lesson } from '../types.js'
import { qcm } from '../helpers.js'
import type { VocabContent, Word } from './vocab-types.js'
import { vocabJaponais } from './vocab-japonais.js'

export const vocabContent: Partial<Record<string, VocabContent>> = { japonais: vocabJaponais }
const PFX: Record<string, string> = { japonais: 'ja', espagnol: 'es', anglais: 'en', francais: 'fr' }

/** Phrase d'exemple par défaut quand l'élément n'en donne pas (comme « …이에요 » en coréen). */
function defaultSentence(lang: string, word: string, meaning: string): [string, string] {
  if (lang === 'japonais') return [`${word}です。`, `C’est : ${meaning}.`]
  if (lang === 'espagnol') return [`${/^(los|las|unos|unas) /.test(word) ? 'Son' : 'Es'} ${word}.`, `C’est : ${meaning}.`]
  if (lang === 'anglais') return [`${/^some /.test(word) ? 'These are' : 'It’s'} ${word}.`, `C’est : ${meaning}.`]
  return [`${/^(des|les) /.test(word) ? 'Ce sont' : 'C’est'} ${word}.`, `It’s: ${meaning}.`]
}

/** Tous les mots d'une langue, dans l'ordre des thèmes (puis les 12 mots en photo). */
export function vocabWords(lang: string): Word[] {
  const c = vocabContent[lang]
  if (!c) return []
  const themed = c.themes.flatMap((t) =>
    t.items.split(';').map((item): Word => {
      const [raw, meaning, sentence, translation] = item.split('|')
      const m = raw.match(/^(.*?)\((.*)\)$/)
      const word = m ? m[1] : raw
      const reading = m ? m[2] : ''
      const [s, tr] = sentence ? [sentence, translation] : defaultSentence(lang, word, meaning)
      return [t.key, word, reading, meaning, s, tr, '']
    }),
  )
  return [...themed, ...c.photoWords]
}

export const themeLabel = (lang: string, key: string) => vocabContent[lang]?.themes.find((t) => t.key === key)?.label ?? key

/** QCM par thème et quiz photo, notés comme les leçons (ajoutés au niveau 1, comme en coréen). */
export function vocabLessons(lang: string): { photo: Lesson | null; themes: Lesson[] } {
  const words = vocabWords(lang)
  if (!words.length) return { photo: null, themes: [] }
  const p = PFX[lang]
  const en = lang === 'francais'
  const withPhoto = words.filter((w) => w[6])
  const photo: Lesson = {
    id: `${p}-v-photos`,
    title: en ? 'Recognise the photos' : 'Reconnaître les photos',
    subtitle: en ? 'Look and choose the French word' : 'Observe et choisis le mot',
    duration: 15,
    objectives: [en ? 'Match a photo with a word' : 'Associer une photo à un mot'],
    sections: [{ title: en ? 'Look' : 'Observer', body: en ? 'Look at the photo, then choose the French word for the main subject.' : 'Regarde la photo, puis choisis le mot qui correspond au sujet principal.' }],
    vocab: withPhoto.map((w) => ({ ko: w[1], rom: w[2], fr: w[3] })),
    exercises: withPhoto.map((w, i) => ({
      ...qcm(en ? 'Which word matches this photo?' : 'Quel mot correspond à cette photo ?', w[1], [1, 2, 3].map((n) => withPhoto[(i + n) % withPhoto.length][1]), `${w[1]} : ${w[3]}.`),
      image: `https://images.unsplash.com/${w[6]}?auto=format&fit=crop&w=640&q=80`,
    })),
  }
  const keys = [...new Set(words.filter((w) => !w[6]).map((w) => w[0]))]
  const themes: Lesson[] = keys.map((key, index) => {
    const items = words.filter((w) => w[0] === key && !w[6])
    const label = themeLabel(lang, key)
    const pick = (list: string[], from: number, exclude: string) => {
      const uniq = [...new Set(list)].filter((x) => x !== exclude)
      return Array.from({ length: Math.min(3, uniq.length) }, (_, k) => uniq[(from + k) % uniq.length])
    }
    const exercises = items.flatMap((w, i) => {
      const same = items.filter((x) => x[1] !== w[1] && x[3] !== w[3])
      return [
        qcm(en ? `In the theme « ${label} », what does ${w[1]} mean?` : `Dans le thème « ${label} », que signifie ${w[1]} ?`, w[3], pick(same.map((x) => x[3]), i, w[3]), `${w[1]} : ${w[3]}. ${w[4]} — ${w[5]}`),
        qcm(en ? `How do you say « ${w[3]} »?` : `Comment dit-on « ${w[3]} » ?`, w[1], pick(same.map((x) => x[1]), i, w[1]), en ? `${w[1]} means ${w[3]}.` : `${w[1]} signifie ${w[3]}.`),
      ]
    })
    return {
      id: `${p}-v-theme-${index}`,
      title: `${en ? 'Vocabulary' : 'Vocabulaire'} : ${label}`,
      subtitle: label,
      duration: 15,
      objectives: [en ? 'Understand and recall the words of the theme' : 'Comprendre et retrouver les mots du thème'],
      sections: [{ title: en ? 'Words in context' : 'Les mots en contexte', examples: items.map((w) => ({ ko: w[4], fr: w[5] })) }],
      vocab: items.map((w) => ({ ko: w[1], rom: w[2], fr: w[3] })),
      exercises,
    }
  })
  return { photo, themes }
}
