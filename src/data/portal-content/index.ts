import type { Lesson } from '../types.js'
import { qcm } from '../helpers.js'
import type { PortalContent, Q } from './types.js'
import { japonais } from './japonais.js'
import { espagnol } from './espagnol.js'
import { anglais } from './anglais.js'
import { francais } from './francais.js'
import { vocabLessons } from './vocab.js'
import { sceneLessonFor, structureLessonFor, type GrammarContent } from './grammar.js'
import { grammarJaponais } from './grammar-japonais.js'
import { grammarEspagnol } from './grammar-espagnol.js'
import { grammarAnglais } from './grammar-anglais.js'

export const grammarContent: Partial<Record<string, GrammarContent>> = { japonais: grammarJaponais, espagnol: grammarEspagnol, anglais: grammarAnglais }

/** Ateliers de structures et scènes d'un niveau (ajoutés après les leçons, comme en coréen). */
export function grammarLessons(lang: string, levelIndex: number): Lesson[] {
  const g = grammarContent[lang]
  if (!g) return []
  return [...g.units.filter((u) => u.level === levelIndex).map((u) => structureLessonFor(lang, u)), ...g.scenes.filter((s) => s.levelIndex === levelIndex).map((s) => sceneLessonFor(lang, s))]
}

/** Toutes les scènes « En situation » des autres langues (pour la correction côté serveur). */
export const courseScenes = () => Object.values(grammarContent).flatMap((g) => g!.scenes)

/** Contenu des pages annexes, par langue (rempli langue par langue). */
export const portalContent: Partial<Record<string, PortalContent>> = { japonais, espagnol, anglais, francais }

const PFX: Record<string, string> = { japonais: 'ja', espagnol: 'es', anglais: 'en', francais: 'fr' }
const toQcm = (q: Q, explain?: string) => qcm(q[0], q[1], q.slice(2), explain)

/**
 * Leçons notées des pages annexes (comme pour le coréen) :
 * reconnaissance de l'écriture au niveau 0, couleurs et nombres au niveau 1.
 */
export function portalLessons(lang: string): { level0: Lesson[]; level1: Lesson[] } {
  const c = portalContent[lang]
  if (!c) return { level0: [], level1: [] }
  const p = PFX[lang]
  const en = lang === 'francais'
  const colorWord = (x: [string, string, string, string]) => (x[1] && /[぀-ヿ]/.test(x[1]) ? `${x[0]} (${x[1]})` : x[0])
  const writing: Lesson = {
    id: `${p}-writing`,
    title: c.writing.quizTitle,
    subtitle: c.writing.title,
    duration: 15,
    objectives: [c.writing.quizTitle],
    sections: c.writing.sections.map((s) => ({ title: s.title, body: s.body, table: s.table })),
    vocab: c.writing.grids[0].items.slice(0, 10).map(([ko, rom]) => ({ ko, rom, fr: rom })),
    exercises: c.writing.quiz.map((q) => toQcm(q)),
  }
  const colors = c.colors.colors
  const colorLesson: Lesson = {
    id: `${p}-v-colors`,
    title: en ? 'Colours' : 'Les couleurs',
    subtitle: c.colors.title,
    duration: 20,
    objectives: en ? ['Name 16 colours', 'Describe the colour of an object'] : ['Nommer 16 couleurs', 'Décrire la couleur d’un objet'],
    sections: [{ title: c.colors.sentence.title, body: c.colors.sentence.paragraphs.map((x) => x.text).join('\n') }],
    vocab: colors.map(([ko, rom, fr]) => ({ ko, rom: /[a-z]/.test(rom) ? rom : rom, fr })),
    exercises: colors.map((x, i) => qcm(en ? `How do you say « ${x[2]} »?` : `Comment dit-on « ${x[2]} » ?`, colorWord(x), [1, 3, 5].map((n) => colorWord(colors[(i + n) % colors.length])), `${colorWord(x)} : ${x[2]}.`)),
  }
  const colorQuiz: Lesson = {
    id: `${p}-v-color-images`,
    title: en ? 'Recognise the colours' : 'Reconnaître les couleurs',
    subtitle: en ? 'Look at the shade and choose' : 'Observe la teinte et choisis',
    duration: 10,
    objectives: [en ? 'Recognise a colour without its translation' : 'Reconnaître une couleur sans sa traduction'],
    sections: [{ title: en ? 'Look' : 'Observer', body: en ? 'Choose the French name of the colour shown.' : 'Choisis le nom de la teinte affichée.' }],
    vocab: colors.slice(0, 14).map(([ko, rom, fr]) => ({ ko, rom, fr })),
    exercises: colors.slice(0, 14).map((x, i) => ({ ...qcm(en ? 'What colour is this?' : 'Quelle est cette couleur ?', colorWord(x), [1, 3, 5].map((n) => colorWord(colors[(i + n) % 14])), `${colorWord(x)} : ${x[2]}.`), swatch: x[3] })),
  }
  const numbers: Lesson[] = c.numbers.units.map((u) => ({
    id: `${p}-numbers-${u.id}`,
    title: u.title,
    subtitle: en ? 'Numbers in everyday life' : 'Les nombres dans la vie quotidienne',
    duration: 20,
    objectives: [u.title],
    sections: [{ title: u.title, body: u.body, examples: u.examples }],
    vocab: [{ ko: u.examples[0].ko, rom: '', fr: u.examples[0].fr }],
    exercises: u.qs.map((q) => toQcm(q, `${en ? 'Remember' : 'À retenir'} : ${q[1]}.`)),
  }))
  const v = vocabLessons(lang)
  return { level0: [writing], level1: [...(v.photo ? [v.photo] : []), colorQuiz, colorLesson, ...numbers, ...v.themes] }
}
