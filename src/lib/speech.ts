let koVoice: SpeechSynthesisVoice | null = null

function pickVoice() {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return
  const voices = window.speechSynthesis.getVoices()
  koVoice = voices.find((v) => v.lang?.toLowerCase().startsWith('ko')) ?? null
}

if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  pickVoice()
  window.speechSynthesis.onvoiceschanged = pickVoice
}

export function canSpeak(): boolean {
  return typeof window !== 'undefined' && 'speechSynthesis' in window
}

/** Lit un texte coréen avec la synthèse vocale du navigateur. */
export function speak(text: string, rate = 0.85) {
  if (!canSpeak()) return
  const clean = text.replace(/\[[^\]]*\]/g, '').replace(/\([^)]*\)/g, '')
  const u = new SpeechSynthesisUtterance(clean)
  u.lang = 'ko-KR'
  u.rate = rate
  if (koVoice) u.voice = koVoice
  window.speechSynthesis.cancel()
  window.speechSynthesis.speak(u)
}
