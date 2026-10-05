import { useEffect, useRef, useState } from 'react'

/** Reconnaissance vocale du navigateur (Web Speech). Aucun audio n'est envoyé au site. */
interface Recognition { lang: string; continuous: boolean; interimResults: boolean; maxAlternatives: number; onresult: ((event: any) => void) | null; onerror: ((event: any) => void) | null; onend: (() => void) | null; start: () => void; stop: () => void; abort: () => void }
function ctor(): (new () => Recognition) | undefined {
  if (typeof window === 'undefined') return undefined
  const w = window as unknown as { SpeechRecognition?: new () => Recognition; webkitSpeechRecognition?: new () => Recognition }
  return w.SpeechRecognition ?? w.webkitSpeechRecognition
}
export const recognitionSupported = () => !!ctor()

const CONSENT = 'kc:mic-consent'
export function micConsent() { try { return sessionStorage.getItem(CONSENT) === '1' } catch { return false } }
export function setMicConsent(v: boolean) { try { if (v) sessionStorage.setItem(CONSENT, '1'); else sessionStorage.removeItem(CONSENT) } catch { /* facultatif */ } }

/** Écoute une phrase : renvoie la transcription finale. */
export function useRecognizer(lang: string) {
  const [listening, setListening] = useState(false)
  const [text, setText] = useState('')
  const [error, setError] = useState('')
  const rec = useRef<Recognition | null>(null)
  useEffect(() => () => rec.current?.abort(), [])
  function start() {
    const C = ctor()
    if (!C) return
    rec.current?.abort()
    setText(''); setError('')
    const r = new C()
    rec.current = r
    r.lang = lang; r.continuous = false; r.interimResults = false; r.maxAlternatives = 1
    r.onresult = (e) => { let out = ''; for (let i = 0; i < e.results.length; i++) out += e.results[i][0].transcript + ' '; setText(out.trim()) }
    r.onerror = (e) => setError(e.error === 'not-allowed' ? 'micro' : e.error === 'no-speech' ? 'silence' : 'autre')
    r.onend = () => setListening(false)
    try { r.start(); setListening(true) } catch { setError('autre') }
  }
  return { listening, text, error, start, stop: () => rec.current?.stop(), reset: () => { setText(''); setError('') } }
}
