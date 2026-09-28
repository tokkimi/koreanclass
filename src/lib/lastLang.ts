import { useSyncExternalStore } from 'react'
import { languages, type LanguageInfo } from '../data/languages'
import { courseLevels } from '../data/courses'
import { levels } from '../data'
import type { Level } from '../data/types'

/** Dernière langue étudiée : l'espace personnel (menu, parcours, profil) la suit. */
const KEY = 'kc:lang'
const listeners = new Set<() => void>()

function read(): LanguageInfo {
  let id: string | null = null
  try { id = localStorage.getItem(KEY) } catch { /* préférence facultative */ }
  return languages.find((l) => l.id === id) ?? languages[0]
}

export function setLastLang(id: string) {
  try {
    if (localStorage.getItem(KEY) === id) return
    localStorage.setItem(KEY, id)
  } catch { /* préférence facultative */ }
  listeners.forEach((f) => f())
}

export function useLastLang(): LanguageInfo {
  return useSyncExternalStore(
    (f) => { listeners.add(f); return () => listeners.delete(f) },
    read,
    () => languages[0],
  )
}

/** Niveaux de la langue (le coréen garde ses données historiques). */
export const levelsOf = (lang: LanguageInfo): Level[] => (lang.id === 'coreen' ? levels : courseLevels(lang.id))
/** Préfixe des adresses de cours : /cours pour le coréen, /japonais/cours… pour les autres. */
export const baseOf = (lang: LanguageInfo) => (lang.id === 'coreen' ? '' : lang.path)
