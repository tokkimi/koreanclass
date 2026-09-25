import { useMemo, useState, useRef } from 'react'
import type { Exercise } from '../data/types'
import { checkFill, checkMatch, checkOrder, scoreLabel, seededShuffle, shuffleDifferent } from '../lib/grading'
import { SpeakButton } from './Speak'

interface Props {
  exercises: Exercise[]
  seed?: number
  onFinish: (score: number, total: number, results: boolean[], answers: string[], operationId: string) => void | Promise<void>
  onRestart?: () => void
  finishLabel?: string
  passMark?: number
}

interface Answer {
  correct: boolean
  given: string
}

const hasHangul = (s: string) => /[가-힣ㄱ-ㆎ]/.test(s)
const koreanOnly = (s: string) => (s.match(/[가-힣ㄱ-ㆎ][가-힣ㄱ-ㆎ\s]*/g) ?? []).join(", ")

export function ExerciseRunner({ exercises, seed = 1, onFinish, onRestart, passMark }: Props) {
  const [index, setIndex] = useState(0)
  const [answers, setAnswers] = useState<Answer[]>([])
  const [checked, setChecked] = useState<Answer | null>(null)
  const [done, setDone] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const busy = useRef(false)
  const attempt = useRef(crypto.randomUUID())

  const ex = exercises[index]
  const score = answers.filter((a) => a.correct).length

  function submit(a: Answer) {
    setChecked(a)
  }

  async function next() {
    if (!checked || busy.current) return
    const all = [...answers, checked]
    if (index + 1 >= exercises.length) {
      busy.current = true; setSaving(true); setError('')
      try {
        await onFinish(all.filter(a=>a.correct).length, exercises.length, all.map(a=>a.correct), all.map(a=>a.given), attempt.current)
        setAnswers(all); setChecked(null); setDone(true)
      } catch(e) { setError((e as Error).message) }
      finally { busy.current = false; setSaving(false) }
    } else { setAnswers(all); setChecked(null); setIndex(index + 1) }
  }

  function restart() {
    attempt.current = crypto.randomUUID()
    setError('')
    setIndex(0)
    setAnswers([])
    setChecked(null)
    setDone(false)
    onRestart?.()
  }

  if (!exercises.length) return <p>Aucun exercice disponible.</p>
  if (done) {
    const pct = Math.round((score / exercises.length) * 100)
    const passed = passMark === undefined || pct >= passMark
    return (
      <div className="card result-card">
        <div className={`score-ring ${passed ? 'ok' : 'ko'}`} style={{ ['--pct' as string]: pct }}>
          <span>{pct}%</span>
        </div>
        <h3>{scoreLabel(pct)}</h3>
        <p className="muted">
          {score} bonne{score > 1 ? 's' : ''} réponse{score > 1 ? 's' : ''} sur {exercises.length}
          {passMark !== undefined && (passed ? ' — niveau validé ✅' : ` — il faut ${passMark} % pour valider`)}
        </p>
        <details className="recap">
          <summary>Voir le détail des réponses</summary>
          <ol>
            {exercises.map((e, i) => (
              <li key={i} className={answers[i]?.correct ? 'ok' : 'ko'}>
                <strong>{answers[i]?.correct ? '✓' : '✗'}</strong> {e.q}
                {!answers[i]?.correct && (
                  <div className="muted small">
                    Votre réponse : {answers[i]?.given || '—'} · Bonne réponse : {correctAnswer(e)}
                  </div>
                )}
              </li>
            ))}
          </ol>
        </details>
        <button className="btn" onClick={restart}>
          Recommencer
        </button>
      </div>
    )
  }

  return (
    <div className="card runner">
      <div className="runner-head">
        <span className="pill">
          Question {index + 1} / {exercises.length}
        </span>
        <span className="muted small">Score : {score}</span>
      </div>
      <div className="progress thin">
        <div style={{ width: `${(index / exercises.length) * 100}%` }} />
      </div>
      <ExerciseView key={`${seed}-${index}`} ex={ex} seed={seed * 100 + index} disabled={!!checked} onSubmit={submit} />
      {checked && (
        <div role="status" aria-live="polite" className={`feedback ${checked.correct ? 'ok' : 'ko'}`}>
          <strong>{checked.correct ? 'Bonne réponse ! 👏' : 'Pas tout à fait…'}</strong>
          {!checked.correct && <div>Réponse attendue : <span className="ko-text">{correctAnswer(ex)}</span></div>}
          {'explain' in ex && ex.explain && <div className="small">{ex.explain}</div>}
          {error && <p role="alert" className="error">{error}</p>}
          <button className="btn" onClick={next} disabled={saving} autoFocus>
            {saving ? 'Sauvegarde…' : error ? 'Réessayer la sauvegarde' : index + 1 >= exercises.length ? 'Voir mon résultat' : 'Question suivante →'}
          </button>
        </div>
      )}
    </div>
  )
}

export function correctAnswer(ex: Exercise): string {
  switch (ex.type) {
    case 'qcm':
      return ex.options[ex.answer]
    case 'fill':
      return ex.answers[0]
    case 'order':
      return ex.words.join(' ')
    case 'match':
      return ex.pairs.map(([a, b]) => `${a} = ${b}`).join(' · ')
  }
}

function ExerciseView({ ex, seed, disabled, onSubmit }: { ex: Exercise; seed: number; disabled: boolean; onSubmit: (a: Answer) => void }) {
  switch (ex.type) {
    case 'qcm':
      return <Qcm ex={ex} disabled={disabled} onSubmit={onSubmit} />
    case 'fill':
      return <Fill ex={ex} disabled={disabled} onSubmit={onSubmit} />
    case 'order':
      return <Order ex={ex} seed={seed} disabled={disabled} onSubmit={onSubmit} />
    case 'match':
      return <Match ex={ex} seed={seed} disabled={disabled} onSubmit={onSubmit} />
  }
}

function Question({ text }: { text: string }) {
  return (
    <h3 className="question">
      {text} {hasHangul(text) && <SpeakButton text={koreanOnly(text)} />}
    </h3>
  )
}

function Qcm({ ex, disabled, onSubmit }: { ex: Extract<Exercise, { type: 'qcm' }>; disabled: boolean; onSubmit: (a: Answer) => void }) {
  const [sel, setSel] = useState<number | null>(null)
  return (
    <div>
      <Question text={ex.q} />
      {ex.image && <img src={ex.image} alt="Photo à reconnaître" style={{display:'block',width:'100%',maxHeight:320,objectFit:'contain',borderRadius:18,marginBottom:20}} />}
      {ex.swatch && <div role="img" aria-label="Couleur à reconnaître" style={{height:180,background:ex.swatch,border:'1px solid #9998',borderRadius:18,marginBottom:20}} />}
      <div className="options">
        {ex.options.map((o, i) => {
          let cls = 'option'
          if (sel === i) cls += ' selected'
          if (disabled && i === ex.answer) cls += ' correct'
          if (disabled && sel === i && i !== ex.answer) cls += ' wrong'
          return (
            <button key={i} className={cls} aria-pressed={sel === i} disabled={disabled} onClick={() => setSel(i)}>
              <span className="opt-letter">{String.fromCharCode(65 + i)}</span> <span className={hasHangul(o) ? 'ko-text' : ''}>{o}</span>
            </button>
          )
        })}
      </div>
      {!disabled && (
        <button className="btn" disabled={sel === null} onClick={() => sel !== null && onSubmit({ correct: sel === ex.answer, given: ex.options[sel] })}>
          Vérifier
        </button>
      )}
    </div>
  )
}

function Fill({ ex, disabled, onSubmit }: { ex: Extract<Exercise, { type: 'fill' }>; disabled: boolean; onSubmit: (a: Answer) => void }) {
  const [v, setV] = useState('')
  const submit = () => v.trim() && onSubmit({ correct: checkFill(ex, v), given: v })
  return (
    <div>
      <Question text={ex.q} />
      {ex.hint && <p className="muted small">Indice : {ex.hint}</p>}
      <form
        className="fill-row"
        onSubmit={(e) => {
          e.preventDefault()
          submit()
        }}
      >
        <input className="input ko-text" value={v} onChange={(e) => setV(e.target.value)} disabled={disabled} placeholder="Tapez votre réponse (clavier coréen conseillé)" autoFocus lang="ko" />
        {!disabled && (
          <button className="btn" type="submit" disabled={!v.trim()}>
            Vérifier
          </button>
        )}
      </form>
      <p className="muted small">
        Astuce : activez le clavier coréen (2-set / 두벌식) sur votre ordinateur ou téléphone.
      </p>
    </div>
  )
}

function Order({ ex, seed, disabled, onSubmit }: { ex: Extract<Exercise, { type: 'order' }>; seed: number; disabled: boolean; onSubmit: (a: Answer) => void }) {
  const bank = useMemo(() => shuffleDifferent(ex.words.map((w, i) => ({ w, i })), seed), [ex, seed])
  const [picked, setPicked] = useState<number[]>([])
  const words = picked.map((i) => ex.words[i])
  return (
    <div>
      <Question text={ex.q} />
      {ex.fr && <p className="muted">« {ex.fr} »</p>}
      <div className="order-answer">
        {picked.length === 0 && <span className="muted small">Cliquez sur les mots dans le bon ordre…</span>}
        {picked.map((i) => (
          <button key={i} className="chip ko-text" disabled={disabled} onClick={() => setPicked(picked.filter((x) => x !== i))}>
            {ex.words[i]}
          </button>
        ))}
      </div>
      <div className="order-bank">
        {bank.map(({ w, i }) => (
          <button key={i} className="chip ko-text" disabled={disabled || picked.includes(i)} onClick={() => setPicked([...picked, i])}>
            {w}
          </button>
        ))}
      </div>
      {!disabled && (
        <div className="row">
          <button className="btn ghost" onClick={() => setPicked([])} disabled={!picked.length}>
            Effacer
          </button>
          <button className="btn" disabled={picked.length !== ex.words.length} onClick={() => onSubmit({ correct: checkOrder(ex, words), given: words.join(' ') })}>
            Vérifier
          </button>
        </div>
      )}
    </div>
  )
}

function Match({ ex, seed, disabled, onSubmit }: { ex: Extract<Exercise, { type: 'match' }>; seed: number; disabled: boolean; onSubmit: (a: Answer) => void }) {
  const rights = useMemo(() => shuffleDifferent(ex.pairs.map((p) => p[1]), seed), [ex, seed])
  const lefts = useMemo(() => seededShuffle(ex.pairs.map((p) => p[0]), seed + 3), [ex, seed])
  const [active, setActive] = useState<string | null>(null)
  const [chosen, setChosen] = useState<Record<string, string>>({})
  const usedRights = new Set(Object.values(chosen))
  const expected = Object.fromEntries(ex.pairs)

  function pickRight(r: string) {
    if (!active) return
    const next = { ...chosen }
    for (const k of Object.keys(next)) if (next[k] === r) delete next[k]
    next[active] = r
    setChosen(next)
    setActive(null)
  }

  return (
    <div>
      <Question text={ex.q} />
      <p className="muted small">Cliquez sur un élément à gauche, puis sur sa correspondance à droite.</p>
      <div className="match-grid">
        <div className="match-col">
          {lefts.map((l) => {
            let cls = 'option'
            if (active === l) cls += ' selected'
            if (disabled) cls += chosen[l] === expected[l] ? ' correct' : ' wrong'
            return (
              <button key={l} className={cls} disabled={disabled} onClick={() => setActive(active === l ? null : l)}>
                <span className={hasHangul(l) ? 'ko-text' : ''}>{l}</span>
                {chosen[l] && <span className="match-tag">→ {chosen[l]}</span>}
              </button>
            )
          })}
        </div>
        <div className="match-col">
          {rights.map((r) => (
            <button key={r} className={`option ${usedRights.has(r) ? 'used' : ''}`} disabled={disabled || !active} onClick={() => pickRight(r)}>
              <span className={hasHangul(r) ? 'ko-text' : ''}>{r}</span>
            </button>
          ))}
        </div>
      </div>
      {!disabled && (
        <div className="row">
          <button className="btn ghost" onClick={() => setChosen({})} disabled={!Object.keys(chosen).length}>
            Effacer
          </button>
          <button
            className="btn"
            disabled={Object.keys(chosen).length !== ex.pairs.length}
            onClick={() =>
              onSubmit({
                correct: checkMatch(ex, chosen),
                given: Object.entries(chosen)
                  .map(([a, b]) => `${a} = ${b}`)
                  .join(' · '),
              })
            }
          >
            Vérifier
          </button>
        </div>
      )}
    </div>
  )
}
