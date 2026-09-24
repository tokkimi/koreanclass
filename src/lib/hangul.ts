export const INITIALS = ['ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ']
export const MEDIALS = ['ㅏ', 'ㅐ', 'ㅑ', 'ㅒ', 'ㅓ', 'ㅔ', 'ㅕ', 'ㅖ', 'ㅗ', 'ㅘ', 'ㅙ', 'ㅚ', 'ㅛ', 'ㅜ', 'ㅝ', 'ㅞ', 'ㅟ', 'ㅠ', 'ㅡ', 'ㅢ', 'ㅣ']
export const FINALS = ['', 'ㄱ', 'ㄲ', 'ㄳ', 'ㄴ', 'ㄵ', 'ㄶ', 'ㄷ', 'ㄹ', 'ㄺ', 'ㄻ', 'ㄼ', 'ㄽ', 'ㄾ', 'ㄿ', 'ㅀ', 'ㅁ', 'ㅂ', 'ㅄ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ']

/** Compose une syllabe hangeul à partir de ses jamo. */
export function compose(initial: string, medial: string, final = ''): string {
  const i = INITIALS.indexOf(initial)
  const m = MEDIALS.indexOf(medial)
  const f = FINALS.indexOf(final)
  if (i < 0 || m < 0 || f < 0) return ''
  return String.fromCharCode(0xac00 + (i * 21 + m) * 28 + f)
}

/** Décompose une syllabe en jamo. */
export function decompose(syllable: string): [string, string, string] | null {
  const code = syllable.charCodeAt(0) - 0xac00
  if (code < 0 || code > 11171) return null
  return [INITIALS[Math.floor(code / 588)], MEDIALS[Math.floor((code % 588) / 28)], FINALS[code % 28]]
}
