import { useSyncExternalStore } from 'react'
import { useCourseLang } from './courseLang'

/**
 * Langue de l'interface du site : français (par défaut) ou anglais.
 * Le choix est gardé sur l'appareil. Le cours de français, déjà expliqué
 * en anglais, reste toujours en anglais.
 */
export type UiLang = 'fr' | 'en'
const KEY = 'kc:ui'
const listeners = new Set<() => void>()

function read(): UiLang {
  try {
    const v = localStorage.getItem(KEY)
    if (v === 'fr' || v === 'en') return v
  } catch {
    /* stockage indisponible */
  }
  return 'fr'
}
let current: UiLang = typeof window === 'undefined' ? 'fr' : read()

export function setUiLang(lang: UiLang) {
  current = lang
  try {
    localStorage.setItem(KEY, lang)
  } catch {
    /* stockage indisponible */
  }
  if (typeof document !== 'undefined') document.documentElement.lang = lang
  listeners.forEach((l) => l())
}
const subscribe = (l: () => void) => {
  listeners.add(l)
  return () => listeners.delete(l)
}

/** Langue du site choisie par le visiteur. */
export function useSiteLang(): UiLang {
  return useSyncExternalStore(subscribe, () => current, () => 'fr')
}

/** Langue d'affichage effective : anglais si le site est en anglais ou si la page est un cours de français. */
export function useUiLang(): UiLang {
  const site = useSiteLang()
  const course = useCourseLang()
  return course?.ui === 'en' ? 'en' : site
}

/** t('texte français', 'English text') selon la langue d'affichage. */
export function useT() {
  const lang = useUiLang()
  return (fr: string, en: string) => (lang === 'en' ? en : fr)
}

if (typeof document !== 'undefined') document.documentElement.lang = current
