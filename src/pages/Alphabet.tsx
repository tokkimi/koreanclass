import { useState } from 'react'
import { Link } from 'react-router-dom'
import { compose, FINALS, INITIALS, MEDIALS } from '../lib/hangul'
import { speak } from '../lib/speech'
import { SpeakButton } from '../components/Speak'

const CONSONANTS: [string, string, string][] = [
  ['ㄱ', 'g/k', '기역'], ['ㄴ', 'n', '니은'], ['ㄷ', 'd/t', '디귿'], ['ㄹ', 'r/l', '리을'], ['ㅁ', 'm', '미음'],
  ['ㅂ', 'b/p', '비읍'], ['ㅅ', 's', '시옷'], ['ㅇ', '–/ng', '이응'], ['ㅈ', 'j', '지읒'], ['ㅊ', 'ch', '치읓'],
  ['ㅋ', 'k', '키읔'], ['ㅌ', 't', '티읕'], ['ㅍ', 'p', '피읖'], ['ㅎ', 'h', '히읗'],
  ['ㄲ', 'kk', '쌍기역'], ['ㄸ', 'tt', '쌍디귿'], ['ㅃ', 'pp', '쌍비읍'], ['ㅆ', 'ss', '쌍시옷'], ['ㅉ', 'jj', '쌍지읒'],
]
const VOWELS: [string, string][] = [
  ['ㅏ', 'a'], ['ㅑ', 'ya'], ['ㅓ', 'eo'], ['ㅕ', 'yeo'], ['ㅗ', 'o'], ['ㅛ', 'yo'], ['ㅜ', 'u'], ['ㅠ', 'yu'], ['ㅡ', 'eu'], ['ㅣ', 'i'],
  ['ㅐ', 'ae'], ['ㅒ', 'yae'], ['ㅔ', 'e'], ['ㅖ', 'ye'], ['ㅘ', 'wa'], ['ㅙ', 'wae'], ['ㅚ', 'oe'], ['ㅝ', 'wo'], ['ㅞ', 'we'], ['ㅟ', 'wi'], ['ㅢ', 'ui'],
]

export default function Alphabet() {
  const [ini, setIni] = useState('ㅎ')
  const [med, setMed] = useState('ㅏ')
  const [fin, setFin] = useState('ㄴ')
  const syllable = compose(ini, med, fin)

  return (
    <div className="container page">
      <div className="page-head">
        <h1>L'alphabet coréen <span className="ko-text">한글</span></h1>
        <p className="muted">
          Cliquez sur une lettre pour l'entendre (avec la voyelle ㅏ pour les consonnes). Pour apprendre pas à pas, suivez le{' '}
          <Link to="/cours/hangeul" className="link">Niveau 0 — Hangeul</Link>.
        </p>
      </div>

      <section className="card">
        <h2>Consonnes (자음)</h2>
        <div className="jamo-grid">
          {CONSONANTS.map(([c, r, name]) => (
            <button key={c} className="jamo" onClick={() => speak(compose(c, 'ㅏ'))}>
              <span className="ko-text jamo-char">{c}</span>
              <span className="small">{r}</span>
              <span className="muted small ko-text">{name}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="card mt">
        <h2>Voyelles (모음)</h2>
        <div className="jamo-grid">
          {VOWELS.map(([v, r]) => (
            <button key={v} className="jamo" onClick={() => speak(compose('ㅇ', v))}>
              <span className="ko-text jamo-char">{v}</span>
              <span className="small">{r}</span>
              <span className="muted small ko-text">{compose('ㅇ', v)}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="card mt builder">
        <h2>🧩 Construire une syllabe</h2>
        <p className="muted">Choisissez une consonne initiale, une voyelle et (facultatif) une consonne finale.</p>
        <div className="builder-grid">
          <label>
            Initiale
            <select className="input ko-text" value={ini} onChange={(e) => setIni(e.target.value)}>
              {INITIALS.map((x) => (
                <option key={x}>{x}</option>
              ))}
            </select>
          </label>
          <label>
            Voyelle
            <select className="input ko-text" value={med} onChange={(e) => setMed(e.target.value)}>
              {MEDIALS.map((x) => (
                <option key={x}>{x}</option>
              ))}
            </select>
          </label>
          <label>
            Finale (batchim)
            <select className="input ko-text" value={fin} onChange={(e) => setFin(e.target.value)}>
              {FINALS.map((x) => (
                <option key={x} value={x}>
                  {x || '(aucune)'}
                </option>
              ))}
            </select>
          </label>
          <div className="builder-result">
            <span className="ko-text">{syllable}</span>
            <SpeakButton text={syllable} label="Écouter" />
          </div>
        </div>
      </section>
    </div>
  )
}
