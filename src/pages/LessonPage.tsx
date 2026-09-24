import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getLesson } from '../data'
import { recordLesson, useCurrentUser, useProgress } from '../lib/store'
import { ExerciseRunner } from '../components/ExerciseRunner'
import { RichText } from '../components/RichText'
import { SpeakButton } from '../components/Speak'
import NotFound from './NotFound'

const isKo = (s: string) => /[가-힣ㄱ-ㆎ]/.test(s)

export default function LessonRoute() {
  const { levelId, lessonId } = useParams()
  return <LessonPage key={`${levelId}/${lessonId}`} />
}

function LessonPage() {
  const { levelId, lessonId } = useParams()
  const found = getLesson(levelId, lessonId)
  const user = useCurrentUser()
  const progress = useProgress()
  const [finished, setFinished] = useState<{ score: number; total: number } | null>(null)
  const [runKey, setRunKey] = useState(1)

  if (!found) return <NotFound />
  const { level, lesson, index } = found
  const prev = level.lessons[index - 1]
  const next = level.lessons[index + 1]
  const p = progress.lessons[lesson.id]

  return (
    <div className="container page lesson" key={lesson.id}>
      <nav className="breadcrumb small">
        <Link to="/cours">Cours</Link> › <Link to={`/cours/${level.id}`}>{level.name}</Link> › Leçon {index + 1}
      </nav>

      <header className="lesson-head card" style={{ ['--accent' as string]: level.color }}>
        <div className="row between">
          <span className="pill">
            Leçon {index + 1}/{level.lessons.length} · ⏱ {lesson.duration} min
          </span>
          {p?.completed && <span className="pill ok">✓ Terminée · meilleur score {p.bestScore} %</span>}
        </div>
        <h1>{lesson.title}</h1>
        <p className="ko-text subtitle">{lesson.subtitle}</p>
        <div className="objectives">
          <strong>🎯 Objectifs</strong>
          <ul>
            {lesson.objectives.map((o) => (
              <li key={o}>{o}</li>
            ))}
          </ul>
        </div>
      </header>

      <div className="lesson-layout">
        <article className="lesson-body">
          {lesson.sections.map((s, i) => (
            <section key={i} className="card lesson-section">
              <h2>
                <span className="sec-num">{i + 1}</span> {s.title}
              </h2>
              {s.body && <RichText text={s.body} />}
              {s.table && (
                <div className="table-wrap">
                  <table>
                    <thead>
                      <tr>
                        {s.table.head.map((h) => (
                          <th key={h}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {s.table.rows.map((r, ri) => (
                        <tr key={ri}>
                          {r.map((c, ci) => (
                            <td key={ci} className={isKo(c) ? 'ko-text' : ''}>
                              <RichText text={c} />
                              {ci === 0 && isKo(c) && <SpeakButton text={c.split('(')[0]} />}
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
                      <div>
                        <span className="ko-text ex-ko">{e.ko}</span> <SpeakButton text={e.ko} />
                      </div>
                      {e.rom && <div className="muted small">{e.rom}</div>}
                      <div className="ex-fr">{e.fr}</div>
                    </li>
                  ))}
                </ul>
              )}
              {s.tip && (
                <div className="tip">
                  💡 <RichText text={s.tip} />
                </div>
              )}
            </section>
          ))}

          {lesson.dialogue && (
            <section className="card lesson-section">
              <h2>💬 Dialogue</h2>
              <div className="dialogue">
                {lesson.dialogue.map((d, i) => (
                  <div key={i} className={`bubble ${i % 2 ? 'right' : ''}`}>
                    <div className="speaker ko-text">{d.speaker}</div>
                    <div className="ko-text ex-ko">
                      {d.ko} <SpeakButton text={d.ko} />
                    </div>
                    <div className="muted small">{d.fr}</div>
                  </div>
                ))}
              </div>
            </section>
          )}

          <section className="card lesson-section" id="exercices">
            <h2>✏️ Exercices</h2>
            {!user && (
              <p className="notice">
                Vous n'êtes pas connecté(e) : vos résultats ne seront pas enregistrés. <Link to={`/connexion?next=/cours/${level.id}/${lesson.id}`}>Se connecter</Link> ou{' '}
                <Link to="/inscription">créer un compte</Link>.
              </p>
            )}
            <ExerciseRunner
              key={runKey}
              seed={runKey}
              exercises={lesson.exercises}
              onFinish={(score, total) => {
                setFinished({ score, total })
                if (user) recordLesson(lesson.id, `${level.name.split(' —')[0]} · ${lesson.title}`, score, total)
              }}
              onRestart={() => {
                setFinished(null)
                setRunKey(runKey + 1)
              }}
            />
            {finished && (
              <div className="row center gap">
                {next ? (
                  <Link to={`/cours/${level.id}/${next.id}`} className="btn">
                    Leçon suivante : {next.title} →
                  </Link>
                ) : (
                  <Link to={`/tests/${level.id}`} className="btn">
                    🏁 Passer le test de fin de niveau
                  </Link>
                )}
              </div>
            )}
          </section>
        </article>

        <aside className="lesson-aside">
          <div className="card sticky">
            <h3>📖 Vocabulaire</h3>
            <ul className="vocab">
              {lesson.vocab.map((v) => (
                <li key={v.ko}>
                  <div>
                    <span className="ko-text">{v.ko}</span> <SpeakButton text={v.ko.split('/')[0]} />
                  </div>
                  <div className="muted small">{v.rom}</div>
                  <div className="small">{v.fr}</div>
                </li>
              ))}
            </ul>
            <a href="#exercices" className="btn full small">
              Aller aux exercices ↓
            </a>
          </div>
        </aside>
      </div>

      <div className="lesson-nav">
        {prev ? (
          <Link to={`/cours/${level.id}/${prev.id}`} className="btn ghost">
            ← {prev.title}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link to={`/cours/${level.id}/${next.id}`} className="btn ghost">
            {next.title} →
          </Link>
        ) : (
          <Link to={`/tests/${level.id}`} className="btn ghost">
            Test de fin de niveau →
          </Link>
        )}
      </div>
    </div>
  )
}
