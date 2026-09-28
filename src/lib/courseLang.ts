import { createContext, useContext } from 'react'

/**
 * Réglages d'un cursus autre que le coréen (japonais, espagnol, anglais, français).
 * Sans ce contexte, les exercices gardent exactement le comportement coréen d'origine.
 */
export interface CourseLang {
  /** Identifiant de la langue (japonais, espagnol…), utilisé pour les liens de réservation. */
  id: string
  /** Code BCP 47 de la langue étudiée (ja-JP, es-ES…). */
  speech: string
  /** Langue de l'interface : français, ou anglais pour le cours de français. */
  ui: 'fr' | 'en'
  /** Conseil de clavier affiché sous les réponses à taper. */
  keyboard: string
}

export const CourseLangContext = createContext<CourseLang | null>(null)
export const useCourseLang = () => useContext(CourseLangContext)

const JAPANESE = /[぀-ヿ㐀-鿿]/
/** Texte à lire à voix haute dans une consigne : le japonais, ou ce qui est entre « » / “ ”. */
export function spokenPart(text: string, lang: CourseLang): string {
  if (lang.speech.startsWith('ja')) return (text.match(/[぀-ヿ㐀-鿿][぀-ヿ㐀-鿿〜ー、。？！\s]*/g) ?? []).join('、').trim()
  return (text.match(/[«“]\s*([^»”]+?)\s*[»”]/g) ?? []).map((q) => q.replace(/[«»“”]/g, '').trim()).join(', ')
}
export const isTargetScript = (text: string, lang: CourseLang) => (lang.speech.startsWith('ja') ? JAPANESE.test(text) : false)
