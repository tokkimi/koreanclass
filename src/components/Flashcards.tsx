import { useState } from 'react'
import type { LanguageInfo } from '../data/languages'
import { SpeakButton } from './Speak'
import { useSiteLang } from '../lib/i18n'

export interface Card {
  front: string // mot dans la langue étudiée
  back: string // sens
  rom?: string
  lessonId: string
  key?: string
}

const norm = (s: string) => s.normalize('NFC').toLowerCase().replace(/[\p{P}\s]/gu, '')
/** Réponse acceptée si elle correspond à l'une des formes (séparées par / , ou ;). */
export const recallMatches = (given: string, expected: string) => {
  const g = norm(given)
  return !!g && expected.split(/[/,;]|\(|\)/).map(norm).filter(Boolean).some((e) => e === g)
}

/**
 * Flashcards texte + audio. Sens « mot → sens » ou « sens → mot » ; rappel actif :
 * l'élève tape (ou dit dans sa tête) sa réponse avant de voir la carte retournée.
 * Avec `onGrade`, chaque réponse est notée (révisions espacées enregistrées sur le serveur).
 */
export function Flashcards({ cards, lang, onGrade, onDone }: { cards: Card[]; lang: LanguageInfo; onGrade?: (card: Card, grade: 0 | 1 | 2 | 3) => Promise<void> | void; onDone?: () => void }) {
  const site = useSiteLang()
  const en = lang.taughtIn === 'en' || site === 'en'
  const t = (fr: string, english: string) => (en ? english : fr)
  const [n, setN] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [reverse, setReverse] = useState(false)
  const [typed, setTyped] = useState('')
  const [busy, setBusy] = useState(false)
  const [again, setAgain] = useState<Card[]>([])
  const deck = [...cards, ...again]
  if (!deck.length) return <p className="muted small">{t('Aucune carte.', 'No cards.')}</p>
  if (n >= deck.length) {
    return (
      <div className="flash-done">
        <p><strong>{t('Série terminée !', 'Set finished!')}</strong> {deck.length} {t('cartes revues.', 'cards reviewed.')}</p>
        <button className="btn small ghost" onClick={() => { setN(0); setAgain([]); setFlipped(false); setTyped('') }}>{t('Recommencer', 'Start again')}</button>
        {onDone && <button className="btn small" onClick={onDone}>{t('Continuer', 'Continue')}</button>}
      </div>
    )
  }
  const c = deck[n]
  const question = reverse ? c.back : c.front
  const answer = reverse ? c.front : c.back
  const right = typed ? recallMatches(typed, answer) : null
  const move = async (grade: 0 | 1 | 2 | 3) => {
    setBusy(true)
    try { await onGrade?.(c, grade) } catch { setBusy(false); return }
    if (grade === 0 && again.length < 30) setAgain([...again, c]) // reviens en fin de série
    setBusy(false); setFlipped(false); setTyped(''); setN(n + 1)
  }
  return (
    <div className="flashcards">
      <div className="row between small">
        <span>{n + 1} / {deck.length}</span>
        <label className="row"><input type="checkbox" checked={reverse} onChange={(e) => { setReverse(e.target.checked); setFlipped(false); setTyped('') }} /> {t('Sens → mot', 'Meaning → word')}</label>
      </div>
      <div className={`flashcard ${flipped ? 'flipped' : ''}`}>
        <div className="flash-q" lang={reverse ? undefined : lang.speech}>{question}{!reverse && <SpeakButton text={c.front.split('/')[0]} lang={lang.speech} />}</div>
        {flipped ? (
          <div className="flash-a">
            <div lang={reverse ? lang.speech : undefined}><strong>{answer}</strong>{reverse && <SpeakButton text={c.front.split('/')[0]} lang={lang.speech} />}</div>
            {c.rom && <div className="small muted">{c.rom}</div>}
            {right !== null && <p className={`small ${right ? 'ok-text' : 'error'}`}>{right ? t('✓ Ta réponse correspond.', '✓ Your answer matches.') : t(`✗ Tu as écrit « ${typed} ».`, `✗ You wrote “${typed}”.`)}</p>}
          </div>
        ) : (
          <form className="flash-recall" onSubmit={(e) => { e.preventDefault(); setFlipped(true) }}>
            <input className="input" value={typed} onChange={(e) => setTyped(e.target.value)} placeholder={t('Ta réponse (facultatif)', 'Your answer (optional)')} lang={reverse ? lang.speech : undefined} aria-label={t('Ta réponse', 'Your answer')} />
            <button className="btn">{t('Retourner la carte', 'Flip the card')}</button>
          </form>
        )}
      </div>
      {flipped && (
        onGrade ? (
          <div className="flash-grades">
            <button className="btn small ghost" disabled={busy} onClick={() => move(0)}>{t('À revoir', 'Again')}</button>
            <button className="btn small ghost" disabled={busy} onClick={() => move(1)}>{t('Difficile', 'Hard')}</button>
            <button className="btn small" disabled={busy} onClick={() => move(2)}>{t('Bien', 'Good')}</button>
            <button className="btn small ghost" disabled={busy} onClick={() => move(3)}>{t('Facile', 'Easy')}</button>
          </div>
        ) : (
          <div className="flash-grades">
            <button className="btn small ghost" onClick={() => move(0)}>{t('À revoir', 'Again')}</button>
            <button className="btn small" onClick={() => move(2)}>{t('Je savais', 'I knew it')}</button>
          </div>
        )
      )}
    </div>
  )
}
