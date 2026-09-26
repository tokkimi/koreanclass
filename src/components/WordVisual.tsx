import { visualForWord } from '../data/wordVisuals'

function emojiToCode(value: string) {
  return Array.from(value).filter((char) => char !== '\ufe0f' && char !== '\u200d').map((char) => char.codePointAt(0)?.toString(16).toUpperCase()).join('-')
}

export function WordVisual({ theme, index, label }: { theme: string; index: number; label: string }) {
  const symbol = visualForWord(theme, index)
  const code = emojiToCode(symbol)
  const src = `https://cdn.jsdelivr.net/gh/hfg-gmuend/openmoji@15.1.0/color/svg/${code}.svg`
  return <div className="word-visual" role="img" aria-label={`Illustration : ${label}`}>
    <img src={src} alt="" loading="lazy" />
  </div>
}
