import { Link, useSearchParams } from 'react-router-dom'
import { findLesson, lessonUrl } from '../lib/lessonIndex'
import { languages } from '../data/languages'
import { correctAnswer } from '../components/ExerciseRunner'
import { seededShuffle } from '../lib/grading'
import NotFound from './NotFound'

const strip = (s: string) => s.replace(/\*\*/g, '')

/** Fiche de synthèse imprimable (ou « Enregistrer en PDF ») : notions, vocabulaire, exemples, exercices, corrigé séparé. */
export default function Sheet() {
  const [params] = useSearchParams()
  const found = findLesson(params.get('lecon') ?? '')
  if (!found) return <NotFound />
  const { lesson, level } = found
  const lang = languages.find((l) => l.id === found.lang)!
  const en = lang.taughtIn === 'en'
  const t = (fr: string, english: string) => (en ? english : fr)
  const exercises = lesson.exercises.slice(0, 12)
  return (
    <div className="container page sheet" lang={en ? 'en' : 'fr'} translate={en ? 'no' : undefined}>
      <div className="sheet-actions no-print row">
        <Link className="btn ghost small" to={lessonUrl(found, lang.path)}>← {t('Retour à la leçon', 'Back to the lesson')}</Link>
        <button className="btn small" onClick={() => window.print()}>🖨️ {t('Imprimer / enregistrer en PDF', 'Print / save as PDF')}</button>
      </div>
      <header className="sheet-head">
        <p className="eyebrow">TalkToMe Club · {t(lang.name, lang.nameEn)} · {level.name}</p>
        <h1>{lesson.title}</h1>
        <p lang={lang.speech}>{lesson.subtitle}</p>
      </header>

      <h2>{t('Objectifs', 'Objectives')}</h2>
      <ul>{lesson.objectives.map((o) => <li key={o}>{o}</li>)}</ul>

      <h2>{t('Notions essentielles', 'Key points')}</h2>
      {lesson.sections.map((s, i) => (
        <section key={i} className="sheet-block">
          <h3>{s.title}</h3>
          {s.body && <p>{strip(s.body).split('\n').filter(Boolean).slice(0, 4).join(' ')}</p>}
          {s.table && (
            <table><thead><tr>{s.table.head.map((h) => <th key={h}>{h}</th>)}</tr></thead><tbody>{s.table.rows.slice(0, 10).map((r, ri) => <tr key={ri}>{r.map((c, ci) => <td key={ci}>{strip(c)}</td>)}</tr>)}</tbody></table>
          )}
          {s.examples && <ul>{s.examples.slice(0, 4).map((e, ei) => <li key={ei}><span lang={lang.speech}>{e.ko}</span>{e.rom ? ` (${e.rom})` : ''} — {e.fr}</li>)}</ul>}
          {s.tip && <p className="sheet-tip">💡 {strip(s.tip)}</p>}
        </section>
      ))}

      <h2>{t('Vocabulaire', 'Vocabulary')}</h2>
      <table className="sheet-vocab"><tbody>{lesson.vocab.map((v) => <tr key={v.ko}><td lang={lang.speech}>{v.ko}</td><td>{v.rom}</td><td>{v.fr}</td></tr>)}</tbody></table>

      <h2>{t('Exercices', 'Exercises')}</h2>
      <ol className="sheet-exercises">
        {exercises.map((ex, i) => (
          <li key={i}>
            <p>{strip(ex.q)}</p>
            {ex.type === 'qcm' && <p className="small">{ex.options.map((o, oi) => `${String.fromCharCode(65 + oi)}. ${o}`).join('   ')}</p>}
            {ex.type === 'fill' && <p className="sheet-line">……………………………………</p>}
            {ex.type === 'order' && <p className="small" lang={lang.speech}>{seededShuffle(ex.words, i + 7).join(' / ')}</p>}
            {ex.type === 'match' && <p className="small">{ex.pairs.map((p) => p[0]).join(' · ')} ↔ {seededShuffle(ex.pairs.map((p) => p[1]), i + 3).join(' · ')}</p>}
          </li>
        ))}
      </ol>

      <section className="sheet-answers">
        <h2>{t('Corrigé', 'Answer key')}</h2>
        <ol>{exercises.map((ex, i) => <li key={i} lang={lang.speech}>{correctAnswer(ex)}</li>)}</ol>
      </section>
    </div>
  )
}
