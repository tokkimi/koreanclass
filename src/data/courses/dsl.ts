import type { DialogueLine, Example, Exercise, Section, VocabItem } from '../types.js'
import { fill } from '../helpers.js'

/**
 * Petites aides d'écriture pour les cursus japonais, espagnol, anglais et français.
 * Les champs `ko` des types d'origine contiennent ici le texte dans la langue étudiée.
 */
const lines = (s: string) => s.split('\n').map((l) => l.trim()).filter(Boolean)
const parts = (l: string) => l.split('|').map((x) => x.trim())

/** « mot | lecture | sens » ou « mot | sens ». */
export function vocab(s: string): VocabItem[] {
  return lines(s).map((l) => {
    const [ko, a, b] = parts(l)
    return b === undefined ? { ko, rom: '', fr: a } : { ko, rom: a, fr: b }
  })
}

/** « phrase | lecture | traduction » ou « phrase | traduction ». */
export function ex(s: string): Example[] {
  return lines(s).map((l) => {
    const [ko, a, b] = parts(l)
    return b === undefined ? { ko, fr: a } : { ko, rom: a, fr: b }
  })
}

/** « Personne: réplique | traduction ». */
export function dlg(s: string): DialogueLine[] {
  return lines(s).map((l) => {
    const i = l.indexOf(':')
    const [ko, fr] = parts(l.slice(i + 1))
    return { speaker: l.slice(0, i).trim(), ko, fr }
  })
}

/** Première ligne = en-têtes, puis une ligne par rangée, colonnes séparées par « | ». */
export function table(s: string): NonNullable<Section['table']> {
  const [head, ...rows] = lines(s).map(parts)
  return { head, rows }
}

const plain = (s: string) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').normalize('NFC').replace(/[¿¡]/g, '')

/** Réponse à taper : accepte aussi la version sans accents ni ¿ ¡, et l’apostrophe droite (claviers sans accents). */
export function type(q: string, answers: string | string[], hint?: string, explain?: string): Exercise {
  const list = Array.isArray(answers) ? answers : [answers]
  const all = [...new Set([...list, ...list.map(plain), ...list.map((a) => a.replace(/’/g, "'"))])]
  return fill(q, all, hint, explain)
}
