import { Link } from 'react-router-dom'
import type { LanguageInfo } from '../../data/languages'
import { portalContent } from '../../data/portal-content'
import { courseLevels } from '../../data/courses'
import { SpeakButton } from '../../components/Speak'
import { RichText } from '../../components/RichText'
import { SavedQuiz } from '../../components/SavedQuiz'
import { speak } from '../../lib/speech'
import { LangShell, useEn } from './LangPortal'
import NotFound from '../NotFound'

/** Pages « Écriture », « Nombres » et « Couleurs » des autres langues, sur le modèle coréen. */

const JA = /[぀-ヿ㐀-鿿]/
const script = (lang: LanguageInfo, s: string) => (lang.id === 'japonais' && JA.test(s) ? 'ko-text' : '')
const lessonOf = (lang: LanguageInfo, id: string) => courseLevels(lang.id).flatMap((l) => l.lessons).find((l) => l.id === id)
const PFX: Record<string, string> = { japonais: 'ja', espagnol: 'es', anglais: 'en', francais: 'fr' }

export function LangWriting({ lang }: { lang: LanguageInfo }) {
  const en = useEn(lang)
  const c = portalContent[lang.id]?.writing
  const quiz = lessonOf(lang, `${PFX[lang.id]}-writing`)
  if (!c || !quiz) return <NotFound />
  return (
    <LangShell lang={lang}>
      <div className="container page">
        <div className="page-head">
          <h1>{c.title}</h1>
          <p className="muted">{c.lead}</p>
        </div>
        <section className="card">
          <h2>{en ? 'The letters at a glance' : 'Les lettres, en un coup d’œil'}</h2>
          <p className="muted">{en ? 'Start here: tap a card to hear the sound, then move on to the guided lesson.' : 'Commence ici : touche une carte pour entendre le son, puis passe à la leçon guidée juste après.'}</p>
          {c.grids.map((g, gi) => (
            <div key={g.title}>
              <h3 className={gi ? 'mt' : ''}>{g.title}</h3>
              <div className="jamo-grid">
                {g.items.map(([ch, read, extra, say]) => (
                  <button key={ch + read} className="jamo" onClick={() => speak(say ?? ch, { lang: lang.speech })}>
                    <span className={`jamo-char ${script(lang, ch)}`} lang={lang.speech}>
                      {ch}
                    </span>
                    <span className="small">{read}</span>
                    {extra && <span className="muted small">{extra}</span>}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </section>
        <section className="card">
          <h2>{en ? 'Starting from zero: read the lesson' : 'Commencer de zéro : lire le cours'}</h2>
          <p>{en ? 'You don’t need to know anything yet. Read the explanations in order, listen to the examples and copy them out.' : 'Tu n’as besoin de rien connaître. Lis les explications dans l’ordre, écoute les exemples et essaie de les recopier. Aucun quiz ni compte n’est nécessaire pour cette partie.'}</p>
          <nav className="row" style={{ flexWrap: 'wrap' }}>
            <a className="btn" href="#quiz-lettres">
              {en ? 'Letters quiz' : 'QCM de reconnaissance'}
            </a>
            {c.sections.map((s) => (
              <a key={s.id} className="btn ghost" href={`#${s.id}`}>
                {s.title}
              </a>
            ))}
          </nav>
        </section>
        {c.sections.map((s) => (
          <section className="card mt" id={s.id} key={s.id}>
            <h2>{s.title}</h2>
            <RichText text={s.body} />
            {s.table && (
              <div className="table-wrap">
                <table>
                  <thead>
                    <tr>
                      {s.table.head.map((h) => (
                        <th key={h}>{h}</th>
                      ))}
                      <th>{en ? 'Listen' : 'Écouter'}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {s.table.rows.map((r, i) => (
                      <tr key={i}>
                        {r.map((cell, j) => (
                          <td key={j} className={script(lang, cell)} lang={j === 0 ? lang.speech : undefined}>
                            {cell}
                          </td>
                        ))}
                        <td>
                          <SpeakButton text={r[0].split(/\s/)[0]} lang={lang.speech} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {s.words?.map(([w, parts, meaning]) => (
              <div className="mt" key={w}>
                <h3>
                  <span className={script(lang, w)} lang={lang.speech}>
                    {w}
                  </span>{' '}
                  <SpeakButton text={w} lang={lang.speech} /> — {meaning}
                </h3>
                <p>{parts}</p>
              </div>
            ))}
          </section>
        ))}
        <section className="mt" id="quiz-lettres">
          <h2>{c.quizTitle}</h2>
          <p>{en ? `${quiz.exercises.length} questions with an explanation after each answer.` : `${quiz.exercises.length} questions avec une correction après chaque réponse.`}</p>
          <SavedQuiz lesson={quiz} />
        </section>
        <section className="card mt">
          <h2>{en ? 'Continue the guided course' : 'Continuer le cours guidé'}</h2>
          <p>{en ? 'These lessons develop the rules with more examples.' : 'Ces leçons développent les règles avec d’autres exemples. Le cours se lit avant les exercices, qui restent en bas de chaque leçon.'}</p>
          <div className="row" style={{ flexWrap: 'wrap' }}>
            {c.next.map(([label, level, lesson], i) => (
              <Link key={lesson} className={`btn ${i ? 'ghost' : ''}`} to={`${lang.path}/cours/${level}/${lesson}`}>
                {label}
              </Link>
            ))}
          </div>
        </section>
      </div>
    </LangShell>
  )
}

export function LangNumbers({ lang }: { lang: LanguageInfo }) {
  const en = useEn(lang)
  const c = portalContent[lang.id]?.numbers
  if (!c) return <NotFound />
  const lessons = c.units.map((u) => lessonOf(lang, `${PFX[lang.id]}-numbers-${u.id}`)!)
  return (
    <LangShell lang={lang}>
      <div className="container page">
        <div className="page-head">
          <h1>{c.title}</h1>
          <p className="muted">{c.lead}</p>
        </div>
        <section className="card">
          <h2>{c.why.title}</h2>
          {c.why.paragraphs.map((p) => (
            <RichText key={p} text={p} />
          ))}
        </section>
        <section className="card">
          <h2>{c.table.title}</h2>
          <div style={{ overflowX: 'auto' }}>
            <table>
              <thead>
                <tr>
                  {c.table.head.map((h) => (
                    <th key={h}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {c.table.rows.map((r) => (
                  <tr key={r[0]}>
                    {r.map((cell, j) => (
                      <td key={j}>
                        {j === 0 ? (
                          cell
                        ) : (
                          <>
                            <span className={script(lang, cell)} lang={lang.speech}>
                              {cell}
                            </span>
                            {cell !== '—' && <SpeakButton text={cell.replace(' / ', ', ')} lang={lang.speech} />}
                          </>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {c.table.note && <p>{c.table.note}</p>}
        </section>
        <section className="card">
          <h2>{c.build.title}</h2>
          {c.build.paragraphs.map((p) => (
            <RichText key={p} text={p} />
          ))}
        </section>
        <section className="card">
          <h2>{c.sentences.title}</h2>
          {c.sentences.items.map((s) => (
            <div key={s.text}>
              <h3 className={script(lang, s.text)} lang={lang.speech}>
                {s.text} <SpeakButton text={s.text} lang={lang.speech} />
              </h3>
              <p>{s.explain}</p>
            </div>
          ))}
        </section>
        <nav className="row" style={{ flexWrap: 'wrap' }}>
          {c.units.map((u) => (
            <a key={u.id} className="btn ghost" href={`#${u.id}`}>
              {u.title}
            </a>
          ))}
        </nav>
        {c.units.map((u, i) => (
          <section className="card mt" id={u.id} key={u.id}>
            <h2>{u.title}</h2>
            <RichText text={u.body} />
            {u.examples.map((e) => (
              <div key={e.ko}>
                <h3 className={script(lang, e.ko)} lang={lang.speech}>
                  {e.ko} <SpeakButton text={e.ko} lang={lang.speech} />
                </h3>
                <p>{e.fr}</p>
              </div>
            ))}
            <h3>{en ? 'Your turn: 6 corrected questions' : 'À toi : 6 questions corrigées'}</h3>
            {lessons[i] && <SavedQuiz lesson={lessons[i]} />}
          </section>
        ))}
        <div className="level-grid">
          {c.next.map(([pill, title, level, lesson]) => (
            <Link key={lesson} className="card" to={`${lang.path}/cours/${level}/${lesson}`}>
              <span className="pill">{pill}</span>
              <h2>{title}</h2>
              <span className="link">{en ? 'Go to the lesson →' : 'Aller à la leçon →'}</span>
            </Link>
          ))}
        </div>
      </div>
    </LangShell>
  )
}

export function LangColors({ lang }: { lang: LanguageInfo }) {
  const en = useEn(lang)
  const c = portalContent[lang.id]?.colors
  const lesson = lessonOf(lang, `${PFX[lang.id]}-v-colors`)
  const quiz = lessonOf(lang, `${PFX[lang.id]}-v-color-images`)
  if (!c || !lesson || !quiz) return <NotFound />
  return (
    <LangShell lang={lang}>
      <div className="container page">
        <div className="page-head">
          <Link className="link" to={`${lang.path}/vocabulaire`}>
            ← {en ? 'Vocabulary' : 'Vocabulaire'}
          </Link>
          <h1>{c.title}</h1>
          <p>{c.lead}</p>
          <a className="btn" href="#color-images">
            {en ? 'Visual quiz ↓' : 'Quiz visuel ↓'}
          </a>{' '}
          <a className="btn ghost" href="#quiz-couleurs">
            {en ? 'Go to the quiz' : 'Passer au QCM'}
          </a>
        </div>
        <div className="color-grid">
          {c.colors.map(([word, read, meaning, hex]) => (
            <article className="color-tile" key={word}>
              <div className="color-swatch" role="img" aria-label={meaning} style={{ background: hex }} />
              <div className="color-name">
                <span className={script(lang, word)} lang={lang.speech}>
                  {word}
                </span>
                <SpeakButton text={JA.test(read) ? read : word} lang={lang.speech} />
              </div>
              {read && <p className="muted small">{read}</p>}
              <p>{meaning}</p>
            </article>
          ))}
        </div>
        <section className="card mt">
          <h2>{c.sentence.title}</h2>
          {c.sentence.paragraphs.map((p) =>
            p.say ? (
              <p key={p.text} className={script(lang, p.text)} lang={lang.speech}>
                {p.text} <SpeakButton text={p.say} lang={lang.speech} />
              </p>
            ) : (
              <RichText key={p.text} text={p.text} />
            ),
          )}
        </section>
        <section className="mt" id="color-images">
          <h2>{en ? 'Recognise the colour' : 'Reconnais la couleur'}</h2>
          <SavedQuiz lesson={quiz} />
        </section>
        <section className="mt" id="quiz-couleurs">
          <h2>{en ? 'Quiz: find the name of the colour' : 'QCM : retrouve le nom de la couleur'}</h2>
          <SavedQuiz lesson={lesson} />
        </section>
      </div>
    </LangShell>
  )
}
