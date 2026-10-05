import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import type { LanguageInfo } from '../data/languages'
import type { Lesson, Level } from '../data/types'
import { ExerciseRunner } from './ExerciseRunner'
import { RichText } from './RichText'
import { SpeakButton } from './Speak'
import { VoiceSettings } from './VoiceSettings'
import { Flashcards } from './Flashcards'
import { canSpeak, speak, stopSpeaking } from '../lib/speech'
import { recordLesson, useCurrentUser, useProgress, visitLesson } from '../lib/store'
import { compareSpeech } from '../lib/oral'
import { micConsent, recognitionSupported, setMicConsent, useRecognizer } from '../lib/recognition'
import { lessonStatus, type LessonStatus } from '../lib/srs'
import { useSiteLang } from '../lib/i18n'

export type Step = 'apprendre' | 'ecouter' | 'pratiquer' | 'parler' | 'reviser'
const STEPS: Step[] = ['apprendre', 'ecouter', 'pratiquer', 'parler', 'reviser']

const SCRIPT: Record<string, RegExp> = { coreen: /[가-힣ㄱ-ㆎ]/, japonais: /[぀-ヿ一-龯]/ }

interface Props {
  lang: LanguageInfo
  level: Level
  lesson: Lesson
  index: number
  /** Chemin d'une leçon du même niveau. */
  lessonPath: (id: string) => string
  levelPath: string
  coursesPath: string
  testPath: string
  /** Titre enregistré dans l'historique. */
  historyTitle: string
}

/** Une leçon en 5 étapes, identique pour les cinq langues. */
export function LessonStudio({ lang, level, lesson, index, lessonPath, levelPath, coursesPath, testPath, historyTitle }: Props) {
  const site = useSiteLang()
  const en = lang.taughtIn === 'en' || site === 'en'
  const t = (fr: string, english: string) => (en ? english : fr)
  const user = useCurrentUser()
  const progress = useProgress()
  const stored = useMemo(() => { try { return localStorage.getItem(`kc:step:${lesson.id}`) as Step | null } catch { return null } }, [lesson.id])
  const [step, setStep] = useState<Step>(stored && STEPS.includes(stored) ? stored : 'apprendre')
  const [resumed] = useState(!!stored && stored !== 'apprendre')
  const [finished, setFinished] = useState<{ score: number; total: number } | null>(null)
  const [runKey, setRunKey] = useState(1)
  const prev = level.lessons[index - 1]
  const next = level.lessons[index + 1]
  const p = progress.lessons[lesson.id]
  const status: LessonStatus = lessonStatus(progress, lesson.id, lesson.vocab.length)
  const script = SCRIPT[lang.id]
  const target = (s: string) => (script ? script.test(s) : true)
  const cls = (s: string) => (script && script.test(s) ? 'ko-text' : '')

  useEffect(() => { if (user) visitLesson(lesson.id, lessonPath(lesson.id)) }, [user?.id, lesson.id]) // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => { try { localStorage.setItem(`kc:step:${lesson.id}`, step) } catch { /* facultatif */ } }, [lesson.id, step])
  const go = (s: Step) => { stopSpeaking(); setStep(s); window.scrollTo({ top: 0 }) }

  const labels: Record<Step, [string, string]> = {
    apprendre: [t('Apprendre', 'Learn'), '📘'],
    ecouter: [t('Écouter', 'Listen'), '🎧'],
    pratiquer: [t('Pratiquer', 'Practise'), '✏️'],
    parler: [t('Parler', 'Speak'), '🎙️'],
    reviser: [t('Réviser', 'Review'), '🔁'],
  }
  const statusLabel: Record<LessonStatus, string> = {
    nouvelle: t('Nouvelle', 'New'),
    consultée: t('Consultée', 'Viewed'),
    réussie: t('Exercices réussis', 'Exercises passed'),
    maîtrisée: t('Notion maîtrisée', 'Mastered'),
  }

  // Phrases à écouter et à répéter : exemples puis dialogue.
  const lines = useMemo(() => {
    const out: { text: string; meaning: string; who?: string }[] = []
    for (const s of lesson.sections) for (const e of s.examples ?? []) out.push({ text: e.ko, meaning: e.fr })
    for (const d of lesson.dialogue ?? []) out.push({ text: d.ko, meaning: d.fr, who: d.speaker })
    return out
  }, [lesson])
  const tips = lesson.sections.map((s) => s.tip).filter(Boolean) as string[]
  const i = STEPS.indexOf(step)

  return (
    <div className="container page lesson lesson-studio">
      <nav className="breadcrumb small">
        <Link to={coursesPath}>{t('Cours', 'Courses')}</Link> › <Link to={levelPath}>{level.name}</Link> › {t('Leçon', 'Lesson')} {index + 1}
      </nav>
      <header className="lesson-head card" style={{ ['--accent' as string]: level.color }}>
        <div className="row between">
          <span className="pill">{t('Leçon', 'Lesson')} {index + 1}/{level.lessons.length} · ⏱ {lesson.duration} min</span>
          <span className={`pill status-${status}`}>{statusLabel[status]}{p?.completed ? ` · ${p.bestScore} %` : ''}</span>
        </div>
        <h1>{lesson.title}</h1>
        <p className={`subtitle ${cls(lesson.subtitle)}`} lang={lang.speech}>{lesson.subtitle}</p>
        {resumed && <p className="small muted">↩︎ {t('Reprise à l’étape où tu t’étais arrêté(e).', 'Picking up at the step where you stopped.')}</p>}
      </header>

      <nav className="step-nav" aria-label={t('Étapes de la leçon', 'Lesson steps')}>
        {STEPS.map((s, n) => (
          <button key={s} type="button" className={s === step ? 'active' : ''} aria-current={s === step ? 'step' : undefined} onClick={() => go(s)}>
            <span aria-hidden="true">{labels[s][1]}</span>
            <span>{n + 1}. {labels[s][0]}</span>
          </button>
        ))}
      </nav>

      <div className="lesson-layout">
        <article className="lesson-body">
          {step === 'apprendre' && (
            <>
              <section className="card lesson-section">
                <h2>🎯 {t('Objectifs', 'Objectives')}</h2>
                <ul>{lesson.objectives.map((o) => <li key={o}>{o}</li>)}</ul>
                {!lang.id.startsWith('cor') ? null : <VoiceSettings />}
              </section>
              {lesson.sections.map((s, n) => (
                <section key={n} className="card lesson-section">
                  <h2><span className="sec-num">{n + 1}</span> {s.title}</h2>
                  {s.body && <RichText text={s.body} />}
                  {s.table && (
                    <div className="table-wrap">
                      <table>
                        <thead><tr>{s.table.head.map((h) => <th key={h}>{h}</th>)}</tr></thead>
                        <tbody>
                          {s.table.rows.map((r, ri) => (
                            <tr key={ri}>
                              {r.map((c, ci) => (
                                <td key={ci} className={cls(c)} lang={ci === 0 ? lang.speech : undefined}>
                                  <RichText text={c} />
                                  {ci === 0 && target(c) && <SpeakButton text={c.split('(')[0]} lang={lang.speech} />}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                  {s.examples && (
                    <ul className="examples">
                      {s.examples.map((e, ei) => (
                        <li key={ei}>
                          <div><span className={`ex-ko ${cls(e.ko)}`} lang={lang.speech}>{e.ko}</span> <SpeakButton text={e.ko} lang={lang.speech} /></div>
                          {e.rom && <div className="muted small">{e.rom}</div>}
                          <div className="ex-fr">{e.fr}</div>
                        </li>
                      ))}
                    </ul>
                  )}
                  {s.tip && <div className="tip">💡 <RichText text={s.tip} /></div>}
                </section>
              ))}
              {tips.length > 0 && (
                <section className="card lesson-section pitfalls">
                  <h2>⚠️ {t('À retenir et erreurs fréquentes', 'Key points and common mistakes')}</h2>
                  <ul>{tips.map((tip, n) => <li key={n}><RichText text={tip} /></li>)}</ul>
                </section>
              )}
            </>
          )}

          {step === 'ecouter' && <ListenStep lines={lines} lang={lang} cls={cls} t={t} />}

          {step === 'pratiquer' && (
            <section className="card lesson-section" id="exercices">
              <h2>✏️ {t('Exercices', 'Exercises')}</h2>
              {!user && (
                <p className="notice">
                  {t('Tu n’es pas connecté(e) : tes résultats et révisions ne seront pas enregistrés.', 'You are not logged in: results and reviews will not be saved.')}{' '}
                  <Link to={`/connexion?next=${lessonPath(lesson.id)}`}>{t('Se connecter', 'Log in')}</Link>
                </p>
              )}
              <p className="small muted">{t('Chaque erreur est ajoutée à ton carnet d’erreurs ; les mots de la leçon entrent dans tes révisions.', 'Each mistake goes into your mistake notebook; the lesson words join your reviews.')}</p>
              <ExerciseRunner
                key={runKey}
                seed={runKey}
                exercises={lesson.exercises}
                passMark={70}
                onFinish={async (score, total, _results, answers, operationId) => {
                  if (user) await recordLesson(lesson.id, historyTitle, score, total, answers, operationId)
                  setFinished({ score, total })
                }}
                onRestart={() => { setFinished(null); setRunKey(runKey + 1) }}
              />
              {finished && <div className="row center gap mt"><button className="btn" onClick={() => go('parler')}>{t('Étape suivante : parler →', 'Next step: speak →')}</button></div>}
            </section>
          )}

          {step === 'parler' && <SpeakStep lines={lines} lesson={lesson} lang={lang} cls={cls} t={t} />}

          {step === 'reviser' && (
            <>
              <section className="card lesson-section">
                <h2>📝 {t('Synthèse', 'Summary')}</h2>
                <ul>{lesson.objectives.map((o) => <li key={o}>{o}</li>)}</ul>
                {tips.length > 0 && <ul className="small">{tips.slice(0, 4).map((tip, n) => <li key={n}><RichText text={tip} /></li>)}</ul>}
                <Link className="link small" to={`/fiche?lecon=${encodeURIComponent(lesson.id)}`}>🖨️ {t('Fiche imprimable avec exercices et corrigé', 'Printable sheet with exercises and answers')}</Link>
              </section>
              <section className="card lesson-section">
                <h2>🃏 {t('Flashcards de la leçon', 'Lesson flashcards')}</h2>
                <Flashcards cards={lesson.vocab.map((v) => ({ front: v.ko, back: v.fr, rom: v.rom, lessonId: lesson.id }))} lang={lang} />
              </section>
              <LessonMistakes lessonId={lesson.id} t={t} />
              <section className="card lesson-section">
                <h2>📅 {t('Révisions espacées', 'Spaced reviews')}</h2>
                <p className="small">{t('Les mots de cette leçon reviennent dans ta file de révision aux dates calculées (1 jour, 3 jours, puis de plus en plus espacées). Un mot est « mémorisé » quand il revient tous les 14 jours ou plus.', 'This lesson’s words come back in your review queue on calculated dates (1 day, 3 days, then further apart). A word counts as memorised once its interval reaches 14 days.')}</p>
                <Link className="btn small" to="/revisions">{t('Ouvrir mes révisions', 'Open my reviews')}</Link>
              </section>
            </>
          )}

          <div className="step-footer">
            {i > 0 ? <button className="btn ghost" onClick={() => go(STEPS[i - 1])}>← {labels[STEPS[i - 1]][0]}</button> : <span />}
            {i < STEPS.length - 1 ? (
              <button className="btn" onClick={() => go(STEPS[i + 1])}>{labels[STEPS[i + 1]][0]} →</button>
            ) : next ? (
              <Link className="btn" to={lessonPath(next.id)}>{t('Leçon suivante', 'Next lesson')} →</Link>
            ) : (
              <Link className="btn" to={testPath}>🏁 {t('Test de fin de niveau', 'End-of-level test')}</Link>
            )}
          </div>
        </article>

        <aside className="lesson-aside">
          <div className="card sticky">
            <h3>📖 {t('Vocabulaire', 'Vocabulary')}</h3>
            <ul className="vocab">
              {lesson.vocab.map((v) => (
                <li key={v.ko}>
                  <div><span className={cls(v.ko)} lang={lang.speech}>{v.ko}</span> <SpeakButton text={v.ko.split('/')[0]} lang={lang.speech} /></div>
                  {v.rom && <div className="muted small">{v.rom}</div>}
                  <div className="small">{v.fr}</div>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>

      <div className="lesson-nav">
        {prev ? <Link to={lessonPath(prev.id)} className="btn ghost">← {prev.title}</Link> : <span />}
        {next ? <Link to={lessonPath(next.id)} className="btn ghost">{next.title} →</Link> : <Link to={testPath} className="btn ghost">{t('Test de fin de niveau', 'End-of-level test')} →</Link>}
      </div>
    </div>
  )
}

type T = (fr: string, en: string) => string

/** Écouter : le texte est masqué tant que l'élève ne l'a pas demandé ; vitesse normale ou lente. */
function ListenStep({ lines, lang, cls, t }: { lines: { text: string; meaning: string; who?: string }[]; lang: LanguageInfo; cls: (s: string) => string; t: T }) {
  const [shown, setShown] = useState<Record<number, boolean>>({})
  const [all, setAll] = useState(false)
  if (!lines.length) return <section className="card lesson-section"><p className="muted">{t('Pas de phrase audio dans cette leçon.', 'No audio sentences in this lesson.')}</p></section>
  return (
    <section className="card lesson-section">
      <h2>🎧 {t('Écoute d’abord, lis ensuite', 'Listen first, then read')}</h2>
      <p className="small muted">{t('Écoute chaque phrase (normale puis lente), essaie de comprendre, puis affiche le texte pour vérifier.', 'Listen to each sentence (normal then slow), try to understand, then show the text to check.')}</p>
      {!canSpeak() && <p className="notice">{t('La synthèse vocale n’est pas disponible sur ce navigateur : le texte est affiché directement.', 'Speech synthesis is not available in this browser: the text is shown directly.')}</p>}
      <button className="btn ghost small" onClick={() => setAll(!all)}>{all ? t('Masquer les textes', 'Hide texts') : t('Afficher tous les textes', 'Show all texts')}</button>
      <ol className="listen-list">
        {lines.map((l, n) => {
          const visible = all || shown[n] || !canSpeak()
          return (
            <li key={n} className="listen-line">
              <div className="row">
                <button className="btn small" onClick={() => speak(l.text, { lang: lang.speech, rate: 0.95 })}>▶ {t('Normal', 'Normal')}</button>
                <button className="btn small ghost" onClick={() => speak(l.text, { lang: lang.speech, rate: 0.6 })}>🐢 {t('Lent', 'Slow')}</button>
                {!visible && <button className="btn small ghost" onClick={() => setShown({ ...shown, [n]: true })}>{t('Afficher le texte', 'Show text')}</button>}
              </div>
              {visible && (
                <div className="listen-text">
                  {l.who && <span className="muted small">{l.who} · </span>}
                  <span className={cls(l.text)} lang={lang.speech}>{l.text}</span>
                  <div className="small muted">{l.meaning}</div>
                </div>
              )}
            </li>
          )
        })}
      </ol>
      {canSpeak() && lines.length >= 4 && <ListeningQuiz lines={lines} lang={lang} t={t} />}
    </section>
  )
}

/** Compréhension orale : la phrase est seulement lue, l'élève choisit son sens (score affiché, non enregistré). */
function ListeningQuiz({ lines, lang, t }: { lines: { text: string; meaning: string }[]; lang: LanguageInfo; t: T }) {
  const questions = useMemo(() => {
    const pick = lines.filter((l, i, a) => a.findIndex((x) => x.meaning === l.meaning) === i).slice(0, 12)
    return pick.slice(0, 4).map((l, n) => {
      const others = pick.filter((x) => x !== l).map((x) => x.meaning)
      const wrong = [others[(n + 1) % others.length], others[(n + 3) % others.length], others[(n + 5) % others.length]].filter((x, i, a) => x && a.indexOf(x) === i).slice(0, 3)
      const options = [...wrong, l.meaning].sort((a, b) => ((a.length * 7 + n) % 5) - ((b.length * 7 + n) % 5))
      return { text: l.text, answer: l.meaning, options }
    })
  }, [lines])
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const done = Object.keys(answers).length
  const score = questions.filter((q, n) => answers[n] === q.answer).length
  return (
    <div className="listening-quiz mt">
      <h3>❓ {t('Compréhension orale', 'Listening comprehension')}</h3>
      <p className="small muted">{t('Écoute sans lire, puis choisis le sens.', 'Listen without reading, then choose the meaning.')}</p>
      {questions.map((q, n) => (
        <div key={n} className="listen-line">
          <button className="btn small" onClick={() => speak(q.text, { lang: lang.speech, rate: 0.9 })}>▶ {t('Écouter', 'Listen')} {n + 1}</button>
          <div className="quiz-options">
            {q.options.map((o) => {
              const chosen = answers[n] === o
              const state = answers[n] ? (o === q.answer ? 'ok' : chosen ? 'ko' : '') : ''
              return <button key={o} type="button" disabled={!!answers[n]} className={`option ${state}`} onClick={() => setAnswers({ ...answers, [n]: o })}>{o}</button>
            })}
          </div>
          {answers[n] && <p className="small" lang={lang.speech}>{q.text}</p>}
        </div>
      ))}
      {done === questions.length && <p><strong>{score}/{questions.length}</strong> {t('bonnes réponses.', 'correct answers.')}</p>}
    </div>
  )
}

/** Parler : répétition phrase par phrase, jeu de rôle sur le dialogue, production personnelle. */
function SpeakStep({ lines, lesson, lang, cls, t }: { lines: { text: string; meaning: string; who?: string }[]; lesson: Lesson; lang: LanguageInfo; cls: (s: string) => string; t: T }) {
  const supported = recognitionSupported()
  const [consent, setConsent] = useState(micConsent())
  const [selfCheck, setSelfCheck] = useState<Record<number, 'ok' | 'again'>>({})
  const [own, setOwn] = useState('')
  const words = lesson.vocab.slice(0, 3).map((v) => v.ko)
  const dialogue = lesson.dialogue ?? []
  const roles = [...new Set(dialogue.map((d) => d.speaker))]
  const [role, setRole] = useState(roles[1] ?? roles[0] ?? '')
  return (
    <>
      <section className="card lesson-section">
        <h2>🎙️ {t('Répéter phrase par phrase', 'Repeat sentence by sentence')}</h2>
        {supported ? (
          <label className="mic-consent small">
            <input type="checkbox" checked={consent} onChange={(e) => { setConsent(e.target.checked); setMicConsent(e.target.checked) }} />{' '}
            {t('J’active le micro. Mon navigateur peut transmettre ma voix à son service de reconnaissance ; le site n’enregistre pas l’audio.', 'I turn on the microphone. My browser may send my voice to its recognition service; the site does not store audio.')}
          </label>
        ) : (
          <p className="notice small">{t('La reconnaissance vocale n’est pas disponible sur ce navigateur (essaie Chrome sur ordinateur ou Android). Écoute, répète à voix haute, puis évalue-toi honnêtement.', 'Speech recognition is not available in this browser (try Chrome on a computer or Android). Listen, repeat aloud, then rate yourself honestly.')}</p>
        )}
        <p className="small muted">{t('Le pourcentage compare les mots reconnus au modèle : ce n’est pas une note de prononciation.', 'The percentage compares the recognised words with the model: it is not a pronunciation score.')}</p>
        <ol className="listen-list">
          {lines.slice(0, 10).map((l, n) => (
            <li key={n} className="listen-line">
              <div><span className={cls(l.text)} lang={lang.speech}>{l.text}</span> <SpeakButton text={l.text} lang={lang.speech} /></div>
              <div className="small muted">{l.meaning}</div>
              {supported && consent ? (
                <RepeatButton text={l.text} lang={lang} t={t} />
              ) : (
                <div className="row">
                  <button className={`btn small ${selfCheck[n] === 'ok' ? '' : 'ghost'}`} onClick={() => setSelfCheck({ ...selfCheck, [n]: 'ok' })}>✓ {t('Je l’ai bien dit', 'I said it well')}</button>
                  <button className={`btn small ${selfCheck[n] === 'again' ? '' : 'ghost'}`} onClick={() => setSelfCheck({ ...selfCheck, [n]: 'again' })}>↻ {t('À retravailler', 'Needs work')}</button>
                </div>
              )}
            </li>
          ))}
        </ol>
      </section>

      {dialogue.length > 1 && (
        <section className="card lesson-section">
          <h2>🎭 {t('Jeu de rôle', 'Role play')}</h2>
          <p className="small muted">{t('Choisis ton rôle : écoute les répliques de l’autre personne, puis dis la tienne avant d’afficher le modèle.', 'Choose your role: listen to the other person’s lines, then say yours before showing the model.')}</p>
          <div className="course-switch">{roles.map((r) => <button key={r} type="button" className={r === role ? 'active' : ''} onClick={() => setRole(r)}>{r}</button>)}</div>
          <RolePlay dialogue={dialogue} role={role} lang={lang} cls={cls} t={t} />
        </section>
      )}

      <section className="card lesson-section">
        <h2>✍️ {t('À toi : ta propre phrase', 'Your turn: your own sentence')}</h2>
        <p>{t('Écris puis dis une phrase personnelle avec au moins un de ces mots :', 'Write then say a personal sentence using at least one of these words:')} {words.map((w) => <strong key={w} className={cls(w)} lang={lang.speech}> {w}</strong>)}</p>
        <textarea className="input" rows={2} maxLength={300} value={own} onChange={(e) => setOwn(e.target.value)} lang={lang.speech} placeholder={t('Ta phrase…', 'Your sentence…')} />
        {own.trim() && (
          <div className="row mt">
            <SpeakButton text={own} lang={lang.speech} label={t('Écouter ma phrase', 'Hear my sentence')} />
            <span className="small">{words.some((w) => own.includes(w.split('/')[0].trim())) ? '✓ ' + t('Tu as utilisé un mot de la leçon.', 'You used a word from the lesson.') : t('Essaie d’utiliser un mot de la leçon.', 'Try to use a word from the lesson.')}</span>
          </div>
        )}
        <p className="small muted">{t('Aucune correction grammaticale automatique : compare avec les exemples de l’étape « Apprendre » ou fais-la relire en cours particulier.', 'No automatic grammar correction: compare with the examples in “Learn” or have it checked in a private lesson.')}</p>
      </section>
    </>
  )
}

function RepeatButton({ text, lang, t }: { text: string; lang: LanguageInfo; t: T }) {
  const r = useRecognizer(lang.speech)
  const score = r.text ? compareSpeech(text, r.text).similarity : null
  return (
    <div className="repeat">
      <button className={`btn small ${r.listening ? 'listening' : ''}`} onClick={() => (r.listening ? r.stop() : r.start())}>{r.listening ? t('⏹ Arrêter', '⏹ Stop') : t('🎙️ Répéter', '🎙️ Repeat')}</button>
      {r.text && <span className="small" lang={lang.speech}> « {r.text} » · <strong>{score} %</strong> {t('de correspondance', 'match')}</span>}
      {r.error && <span className="small error"> {r.error === 'micro' ? t('Micro refusé.', 'Microphone blocked.') : r.error === 'silence' ? t('Rien entendu.', 'Nothing heard.') : t('Réessaie.', 'Try again.')}</span>}
    </div>
  )
}

function RolePlay({ dialogue, role, lang, cls, t }: { dialogue: { speaker: string; ko: string; fr: string }[]; role: string; lang: LanguageInfo; cls: (s: string) => string; t: T }) {
  const [revealed, setRevealed] = useState<Record<number, boolean>>({})
  useEffect(() => setRevealed({}), [role])
  return (
    <ol className="listen-list">
      {dialogue.map((d, n) => {
        const mine = d.speaker === role
        return (
          <li key={n} className={`listen-line ${mine ? 'my-line' : ''}`}>
            <strong className="small">{d.speaker}{mine ? ` · ${t('toi', 'you')}` : ''}</strong>
            {mine && !revealed[n] ? (
              <div className="row">
                <span className="small muted">{t('Sens :', 'Meaning:')} {d.fr}</span>
                <button className="btn small ghost" onClick={() => setRevealed({ ...revealed, [n]: true })}>{t('Voir le modèle', 'Show the model')}</button>
              </div>
            ) : (
              <div>
                <span className={cls(d.ko)} lang={lang.speech}>{d.ko}</span> <SpeakButton text={d.ko} lang={lang.speech} />
                <div className="small muted">{d.fr}</div>
              </div>
            )}
          </li>
        )
      })}
    </ol>
  )
}

function LessonMistakes({ lessonId, t }: { lessonId: string; t: T }): ReactNode {
  const p = useProgress()
  const open = Object.values(p.mistakes ?? {}).filter((m) => m.ref === lessonId && !m.resolved)
  return (
    <section className="card lesson-section">
      <h2>📒 {t('Mes erreurs dans cette leçon', 'My mistakes in this lesson')}</h2>
      {open.length ? (
        <>
          <p className="small">{open.length} {t('exercice(s) à retravailler.', 'exercise(s) to work on again.')}</p>
          <Link className="btn small" to={`/revisions?erreurs=${encodeURIComponent(lessonId)}`}>{t('Retravailler mes erreurs', 'Work on my mistakes')}</Link>
        </>
      ) : (
        <p className="small muted">{t('Aucune erreur en attente pour cette leçon.', 'No pending mistakes for this lesson.')}</p>
      )}
    </section>
  )
}
