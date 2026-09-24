import { Fragment } from 'react'

const HANGUL = /([가-힣ㄱ-ㆎ][가-힣ㄱ-ㆎ0-9]*)/

function inline(text: string) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) return <strong key={i}>{wrapKo(part.slice(2, -2))}</strong>
    return <Fragment key={i}>{wrapKo(part)}</Fragment>
  })
}

function wrapKo(text: string) {
  return text.split(HANGUL).map((p, i) => (i % 2 === 1 ? <span key={i} className="ko-text">{p}</span> : p))
}

/** Rendu minimaliste : paragraphes, listes « • », « 1. » et **gras**. */
export function RichText({ text }: { text: string }) {
  const blocks = text.split(/\n\n+/)
  return (
    <>
      {blocks.map((block, bi) => {
        const lines = block.split('\n')
        const isList = lines.every((l) => /^(•|\d+\.)\s/.test(l.trim()))
        if (isList) {
          return (
            <ul key={bi} className="rich-list">
              {lines.map((l, li) => (
                <li key={li}>{inline(l.trim().replace(/^•\s/, ''))}</li>
              ))}
            </ul>
          )
        }
        return (
          <p key={bi}>
            {lines.map((l, li) => (
              <Fragment key={li}>
                {li > 0 && <br />}
                {inline(l)}
              </Fragment>
            ))}
          </p>
        )
      })}
    </>
  )
}
