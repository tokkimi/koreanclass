import { useEffect, useId, useState } from 'react'
import type { KoreanReading as Reading } from '../data/koreanReading'
import { normalize } from '../lib/grading'
import { SpeakButton } from './Speak'
import { ReadingRecorder } from './ReadingRecorder'
import './KoreanReading.css'

interface Draft { meaning: string; translations: string[]; answers: Record<number, number>; checked: boolean; model: boolean; read: boolean }
const emptyDraft = (): Draft => ({ meaning: '', translations: [], answers: {}, checked: false, model: false, read: false })

/** Collapsed previews do not mount speech controls or storage effects until opened. */
export function KoreanReadingPanel({ reading, expanded = false }: { reading: Reading; expanded?: boolean }) {
  const [open, setOpen] = useState(expanded)
  return <details className="kr-panel" open={open} onToggle={(e) => setOpen(e.currentTarget.open)}>
    <summary><span><strong>Lecture, compréhension & traduction</strong><small>{reading.title} · {reading.lines.length} lignes · {reading.questions.length} questions</small></span><span aria-hidden="true">+</span></summary>
    {open && <KoreanReading key={reading.id} reading={reading} />}
  </details>
}

export function KoreanReading({ reading }: { reading: Reading }) {
  const uid = useId()
  // Content in the key invalidates stale answers after an editorial correction.
  const signature = JSON.stringify([reading.lines, reading.questions, reading.translations])
  const storageKey = `kc:reading:v1:${reading.id}`
  const [draft, setDraft] = useState<Draft>(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(storageKey) ?? 'null')
      if (saved?.signature === signature && saved.draft && typeof saved.draft.meaning === 'string' && Array.isArray(saved.draft.translations) && saved.draft.answers) return { ...emptyDraft(), ...saved.draft }
    } catch { /* Reading works without browser storage. */ }
    return emptyDraft()
  })
  const [revealed, setRevealed] = useState<number[]>([])
  const [translationChecked, setTranslationChecked] = useState<number[]>([])
  const [storageAvailable, setStorageAvailable] = useState(false)
  const patch = (value: Partial<Draft>) => setDraft((previous) => ({ ...previous, ...value }))
  useEffect(() => {
    try { localStorage.setItem(storageKey, JSON.stringify({ signature, draft })); setStorageAvailable(true) } catch { setStorageAvailable(false) }
  }, [draft, signature, storageKey])
  const answered = reading.questions.every((_, index) => Number.isInteger(draft.answers[index]))
  const score = reading.questions.filter((q, index) => q.answer === draft.answers[index]).length

  return <section className="kr-reading" aria-labelledby={`${uid}-title`}>
    <header><p className="eyebrow">CORÉEN · {reading.level === 0 ? 'Première lecture' : `Palier ${reading.level}`} · Atelier complémentaire</p><h2 id={`${uid}-title`}>{reading.title}</h2><p>{reading.context}</p><p className="small muted">Cet atelier est distinct du score du test ou de la leçon. {storageAvailable ? 'Tes réponses sont gardées sur cet appareil, sans synchronisation avec ton compte.' : 'Tes réponses restent disponibles pendant cette séance.'}</p></header>
    <div className="kr-text" aria-label="Texte à lire en coréen">
      <div className="row between"><h3>1. Lire et écouter</h3><SpeakButton lang="ko-KR" text={reading.lines.map((l) => l.ko).join(' ')} label="Écouter le texte" /></div>
      <ol>{reading.lines.map((line, index) => <li key={index}>
        <div className="kr-line"><p className="ko-text" lang="ko">{line.ko}</p><SpeakButton lang="ko-KR" text={line.ko} /></div>
        <button type="button" className="kr-help" aria-expanded={revealed.includes(index)} onClick={() => setRevealed((v) => v.includes(index) ? v.filter((n) => n !== index) : [...v, index])}>{revealed.includes(index) ? 'Cacher l’aide' : 'Traduction et explication'}</button>
        {revealed.includes(index) && <div className="kr-explanation"><p>{line.fr}</p>{line.note && <p className="small">{line.note}</p>}</div>}
      </li>)}</ol>
    </div>
    {reading.glossary.length > 0 && <details className="kr-glossary"><summary>Mots utiles du texte</summary><dl>{reading.glossary.map((v, index) => <div key={index}><dt lang="ko">{v.ko}</dt><dd>{v.fr}</dd></div>)}</dl></details>}
    <p className="kr-tip">{reading.readingTip}</p>
    <ReadingRecorder />
    <label className="kr-read-check"><input type="checkbox" checked={draft.read} onChange={(e) => patch({ read: e.target.checked })} /> J’ai lu à voix haute, puis comparé ma lecture avec l’audio.</label>

    <section className="kr-task"><h3>2. Ce que j’ai compris</h3><label htmlFor={`${uid}-meaning`}>{reading.writingPrompt}</label><textarea id={`${uid}-meaning`} className="input" rows={4} value={draft.meaning} maxLength={6000} onChange={(e) => patch({ meaning: e.target.value, model: false })} placeholder="Écris les informations que tu as comprises…" />
      <button type="button" className="btn ghost small" disabled={!draft.meaning.trim()} onClick={() => patch({ model: !draft.model })}>{draft.model ? 'Cacher le modèle' : 'Comparer avec le résumé modèle'}</button>
      {draft.model && <div className="kr-explanation"><strong>Résumé possible</strong><p>{reading.model}</p><p className="small">Vérifie les personnes, les actions, les lieux, les temps et les liens logiques. Ce résumé libre n’est pas noté automatiquement.</p></div>}
    </section>

    <section className="kr-task"><h3>3. Questions de compréhension</h3>
      {reading.questions.map((q, index) => <fieldset key={index} className="kr-question"><legend>{index + 1}. {q.q}</legend>{q.options.map((option, i) => <label key={i} className={draft.checked && i === q.answer ? 'kr-correct' : ''}><input type="radio" name={`${uid}-question-${index}`} checked={draft.answers[index] === i} onChange={() => patch({ answers: { ...draft.answers, [index]: i }, checked: false })} />{option}</label>)}{draft.checked && <p role="status" className="kr-explanation"><strong>{draft.answers[index] === q.answer ? 'Bonne réponse.' : `À revoir : ${q.options[q.answer]}`}</strong> {q.explain}</p>}</fieldset>)}
      <button className="btn" type="button" disabled={!answered} onClick={() => patch({ checked: true })}>Corriger la compréhension</button>
      {draft.checked && <p role="status"><strong>{score} / {reading.questions.length}</strong> en compréhension. Relis l’explication de chaque réponse.</p>}
    </section>

    <section className="kr-task"><h3>4. Traduire des phrases</h3><p className="small muted">Essaie sans les aides. Une traduction française peut avoir plusieurs formulations ; le modèle sert à comparer le sens. En coréen, compare aussi les particules, le registre et la conjugaison.</p>
      {reading.translations.map((item, index) => {
        const value = draft.translations[index] ?? ''
        const matches = item.answers.some((answer) => normalize(answer) === normalize(value))
        return <div className="kr-translation" key={index}><label htmlFor={`${uid}-translation-${index}`}><span className="pill small">{item.target === 'ko' ? 'Français → coréen' : 'Coréen → français'}</span><p lang={item.target === 'ko' ? 'fr' : 'ko'}>{item.source}</p></label><textarea id={`${uid}-translation-${index}`} className="input" lang={item.target} rows={2} value={value} maxLength={2000} onChange={(e) => { const values = [...draft.translations]; values[index] = e.target.value; patch({ translations: values }); setTranslationChecked((v) => v.filter((n) => n !== index)) }} placeholder={item.target === 'ko' ? 'Ta phrase en coréen…' : 'Ta traduction en français…'} /><button type="button" className="btn ghost small" disabled={!value.trim()} onClick={() => setTranslationChecked((v) => v.includes(index) ? v.filter((n) => n !== index) : [...v, index])}>{translationChecked.includes(index) ? 'Cacher le corrigé' : 'Comparer ma traduction'}</button>{translationChecked.includes(index) && <div className="kr-explanation"><strong>{matches ? 'Ta réponse correspond au modèle.' : 'Voici une traduction possible — une autre formulation peut aussi être correcte.'}</strong><p lang={item.target}>{item.answers[0]}</p><p className="small">{item.explain}</p>{item.target === 'ko' && <SpeakButton text={item.answers[0]} lang="ko-KR" label="Écouter le modèle" />}</div>}</div>
      })}
    </section>
    <button type="button" className="kr-help" onClick={() => { setDraft(emptyDraft()); setRevealed([]); setTranslationChecked([]) }}>Effacer mes réponses à cet atelier</button>
  </section>
}
