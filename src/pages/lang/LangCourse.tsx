import { useState, type ReactNode } from 'react'
import { Link, useParams } from 'react-router-dom'
import { localized, type LanguageInfo } from '../../data/languages'
import type { Level } from '../../data/types'
import { courseLevels, getCourseLesson, getCourseLevel } from '../../data/courses'
import { recordLesson, recordTest, useCurrentUser, useProgress } from '../../lib/store'
import { CourseLangContext, type CourseLang } from '../../lib/courseLang'
import { ExerciseRunner } from '../../components/ExerciseRunner'
import { RichText } from '../../components/RichText'
import { SpeakButton } from '../../components/Speak'
import { ProgressBar } from '../../components/ProgressBar'
import { PASS_MARK } from '../../lib/grading'
import { useEn } from './LangPortal'
import NotFound from '../NotFound'
import { tr } from '../../i18n/translate'

/** Pages de cours communes au japonais, à l'espagnol, à l'anglais et au français. */

const KEYBOARD_EN: Record<string, string> = {
  japonais: 'Tip: turn on the Japanese keyboard (romaji → kana) on your computer or phone. Answer in kana unless the question asks for romaji.',
  espagnol: 'Tip: accents and the ¿ ¡ signs are not required to validate, but try to use them!',
  anglais: 'Tip: capital letters and final punctuation don’t count.',
  francais: 'Tip: accents are not required to validate your answer, but try to use them!',
}
const KEYBOARD: Record<string, string> = {
  japonais: 'Astuce : active le clavier japonais (romaji → kana) sur ton ordinateur ou ton téléphone. Réponds en kana, sauf si la question demande le romaji.',
  espagnol: 'Astuce : les accents et les signes ¿ ¡ ne sont pas obligatoires pour valider, mais essaie de les mettre !',
  anglais: 'Astuce : les majuscules et la ponctuation finale ne comptent pas.',
  francais: 'Tip: accents are not required to validate your answer, but try to use them!',
}

const T = {
  fr: {
    allLevels: '← Tous les niveaux',
    home: 'Accueil',
    courses: 'Cours',
    eyebrow: 'TON CURSUS COMPLET',
    title: (n: string) => `Le ${n.toLowerCase()} pas à pas, du premier mot au niveau courant.`,
    lead: (n: number) => `${n} niveaux. Chaque leçon comprend un cours, du vocabulaire avec audio, un dialogue et des exercices corrigés. Un test valide chaque niveau.`,
    signup: 'Crée un compte',
    signupEnd: ' pour enregistrer ta progression.',
    lessons: 'leçons',
    lessonsDone: 'leçons terminées',
    validated: '🏅 Niveau validé',
    testScore: (n: number) => `Test : ${n} %`,
    bestTest: (n: number) => `Meilleur score au test : ${n} %`,
    noTest: 'Test non passé',
    start: 'Commencer',
    review: 'Réviser',
    resume: 'Continuer',
    endTest: 'Test de fin de niveau',
    exercises: 'exercices',
    testInfo: (n: number) => `${n} questions · ${PASS_MARK} % pour valider le niveau`,
    lesson: 'Leçon',
    done: (n: number) => `✓ Terminée · meilleur score ${n} %`,
    goals: '🎯 Objectifs',
    dialogue: '💬 Dialogue',
    exTitle: '✏️ Exercices',
    guest: 'Tu n’es pas connecté(e) : tes résultats ne seront pas enregistrés.',
    login: 'Se connecter',
    or: ' ou ',
    create: 'créer un compte',
    next: (t: string) => `Leçon suivante : ${t} →`,
    takeTest: '🏁 Passer le test de fin de niveau',
    vocab: '📖 Vocabulaire',
    toEx: 'Aller aux exercices ↓',
    testTitle: (n: string) => `🏁 Test — ${n}`,
    testLead: (n: number, cefr: string, exam: string) => `${n} questions sur le vocabulaire, la grammaire et la compréhension (${cefr}, ${exam}). Obtiens au moins ${PASS_MARK} % pour valider le niveau. Ce bilan prépare le parcours : ce n’est pas un examen officiel.`,
    best: 'Meilleur score',
    attempts: (n: number) => `${n} tentative${n > 1 ? 's' : ''}`,
    loginTest: 'Connecte-toi pour enregistrer ton résultat :',
    loginWord: 'connexion',
    startTest: 'Démarrer le test',
    nextLevel: (n: string) => `Passer au ${n} →`,
    teacher: '🎓 Bravo ! Continue avec un professeur',
    reviewLevel: 'Réviser les leçons du niveau',
    results: 'Voir mes résultats',
    min: 'min',
  },
  en: {
    allLevels: '← All levels',
    home: 'Home',
    courses: 'Lessons',
    eyebrow: 'YOUR FULL COURSE',
    title: (n: string) => `${n} step by step, from your first word to fluency.`,
    lead: (n: number) => `${n} levels. Every lesson has explanations, vocabulary with audio, a dialogue and self-correcting exercises. A test validates each level.`,
    signup: 'Create an account',
    signupEnd: ' to save your progress.',
    lessons: 'lessons',
    lessonsDone: 'lessons completed',
    validated: '🏅 Level passed',
    testScore: (n: number) => `Test: ${n}%`,
    bestTest: (n: number) => `Best test score: ${n}%`,
    noTest: 'Test not taken',
    start: 'Start',
    review: 'Review',
    resume: 'Continue',
    endTest: 'End-of-level test',
    exercises: 'exercises',
    testInfo: (n: number) => `${n} questions · ${PASS_MARK}% to pass the level`,
    lesson: 'Lesson',
    done: (n: number) => `✓ Completed · best score ${n}%`,
    goals: '🎯 Goals',
    dialogue: '💬 Dialogue',
    exTitle: '✏️ Exercises',
    guest: 'You are not logged in: your results will not be saved.',
    login: 'Log in',
    or: ' or ',
    create: 'create an account',
    next: (t: string) => `Next lesson: ${t} →`,
    takeTest: '🏁 Take the end-of-level test',
    vocab: '📖 Vocabulary',
    toEx: 'Go to the exercises ↓',
    testTitle: (n: string) => `🏁 Test — ${n}`,
    testLead: (n: number, cefr: string, exam: string) => `${n} questions on vocabulary, grammar and comprehension (${cefr}, ${exam}). Score at least ${PASS_MARK}% to pass the level. This is a practice check, not an official exam.`,
    best: 'Best score',
    attempts: (n: number) => `${n} attempt${n > 1 ? 's' : ''}`,
    loginTest: 'Log in to save your result:',
    loginWord: 'log in',
    startTest: 'Start the test',
    nextLevel: (n: string) => `Go to ${n} →`,
    teacher: '🎓 Well done! Continue with a teacher',
    reviewLevel: 'Review the lessons',
    results: 'See my results',
    min: 'min',
  },
}

const JAPANESE = /[぀-ヿ㐀-鿿]/
const base = (lang: LanguageInfo) => `${lang.path}/cours`
/** « Niveau 1 — Débutant » → « Débutant » */
const shortName = (level: Level) => level.name.split('— ')[1] ?? level.name

function CourseShell({ lang, children }: { lang: LanguageInfo; children: ReactNode }) {
  const ui = useEn(lang) ? 'en' : 'fr'
  const value: CourseLang = { id: lang.id, speech: lang.speech, ui, keyboard: (ui === 'en' ? KEYBOARD_EN : KEYBOARD)[lang.id] ?? '' }
  return (
    <CourseLangContext.Provider value={value}>
      <div lang={ui} translate={lang.taughtIn === 'en' ? 'no' : undefined} style={{ ['--lang' as string]: lang.accent }}>{children}</div>
    </CourseLangContext.Provider>
  )
}

function stats(levels: Level[], progress: ReturnType<typeof useProgress>) {
  return levels.map((level) => {
    const done = level.lessons.filter((l) => progress.lessons[l.id]?.completed).length
    return { level, done, total: level.lessons.length, pct: (done / level.lessons.length) * 100, test: progress.tests[level.id] }
  })
}

export function LangCourses({ lang }: { lang: LanguageInfo }) {
  const t = T[useEn(lang) ? 'en' : 'fr']
  const user = useCurrentUser()
  const progress = useProgress()
  const levels = courseLevels(lang.id)
  if (!levels.length) return <NotFound />
  return (
    <CourseShell lang={lang}>
      <div className="container page">
        <Link to={lang.path} className="link small">← {localized(lang, t === T.en).name} · {t.home}</Link>
        <div className="page-head">
          <p className="eyebrow">{t.eyebrow}</p>
          <h1>{t.title(localized(lang, t === T.en).name)}</h1>
          <p className="muted">
            {t.lead(levels.length)}
            {!user && (
              <>
                {' '}
                <Link to="/inscription" className="link">{t.signup}</Link>
                {t.signupEnd}
              </>
            )}
          </p>
        </div>
        <section className="course-levels">
          <div className="level-grid">
            {stats(levels, progress).map(({ level, done, total, pct, test }) => (
              <Link key={level.id} to={`${base(lang)}/${level.id}`} className="card level-card" style={{ ['--accent' as string]: level.color }}>
                <div className="row between">
                  <span className="level-num">{level.index + 1}</span>
                  <span className="pill">{level.cefr}</span>
                </div>
                <h2>
                  {shortName(level)} <span className="ko-text muted" lang={lang.speech}>{level.korean}</span>
                </h2>
                <p className="small muted">{level.topik} · {total} {t.lessons}</p>
                <p className="small">{level.description}</p>
                <ProgressBar value={pct} color={level.color} />
                <div className="row between small muted">
                  <span>{done}/{total} {t.lessons}</span>
                  <span>{test?.passed ? t.validated : test ? t.testScore(test.best) : t.noTest}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </CourseShell>
  )
}

export function LangLevel({ lang }: { lang: LanguageInfo }) {
  const t = T[useEn(lang) ? 'en' : 'fr']
  const { levelId } = useParams()
  const level = getCourseLevel(lang.id, levelId)
  const progress = useProgress()
  if (!level) return <NotFound />
  const done = level.lessons.filter((l) => progress.lessons[l.id]?.completed).length
  const nextLesson = level.lessons.find((l) => !progress.lessons[l.id]?.completed) ?? level.lessons[0]
  const test = progress.tests[level.id]
  const root = base(lang)
  return (
    <CourseShell lang={lang}>
      <div className="container page">
        <Link to={root} className="link small">{t.allLevels}</Link>
        <div className="level-hero card" style={{ ['--accent' as string]: level.color }}>
          <div>
            <span className="pill">{level.cefr} · {level.topik}</span>
            <h1>
              {level.name} <span className="ko-text" lang={lang.speech}>{level.korean}</span>
            </h1>
            <p>{level.description}</p>
            <div className="row">
              <Link to={`${root}/${level.id}/${nextLesson.id}`} className="btn">
                {done === 0 ? t.start : done === level.lessons.length ? t.review : t.resume} : {nextLesson.title}
              </Link>
              <Link to={`${lang.path}/tests/${level.id}`} className="btn ghost">{t.endTest}</Link>
            </div>
          </div>
          <div className="level-hero-stats">
            <div className="big-num">{done}/{level.lessons.length}</div>
            <div className="muted small">{t.lessonsDone}</div>
            <ProgressBar value={(done / level.lessons.length) * 100} color={level.color} />
            <div className="small">{test?.passed ? `${t.validated} (${test.best} %)` : test ? t.bestTest(test.best) : t.noTest}</div>
          </div>
        </div>
        <ol className="lesson-list">
          {level.lessons.map((l, i) => {
            const p = progress.lessons[l.id]
            return (
              <li key={l.id}>
                <Link to={`${root}/${level.id}/${l.id}`} className={`card lesson-row ${p?.completed ? 'done' : ''}`}>
                  <span className="lesson-index" style={{ background: p?.completed ? level.color : undefined }}>{p?.completed ? '✓' : i + 1}</span>
                  <div className="grow">
                    <h3>{l.title}</h3>
                    <div className="muted small ko-text" lang={lang.speech}>{l.subtitle}</div>
                  </div>
                  <div className="lesson-meta small muted">
                    <span>⏱ {l.duration} {t.min}</span>
                    <span>✏️ {l.exercises.length} {t.exercises}</span>
                    {p && <span className="score">{p.bestScore} %</span>}
                  </div>
                </Link>
              </li>
            )
          })}
          <li>
            <Link to={`${lang.path}/tests/${level.id}`} className="card lesson-row test-row">
              <span className="lesson-index">🏁</span>
              <div className="grow">
                <h3>{t.endTest}</h3>
                <div className="muted small">{t.testInfo(level.test.length)}</div>
              </div>
              {test && <span className="score">{test.best} %</span>}
            </Link>
          </li>
        </ol>
      </div>
    </CourseShell>
  )
}

export function LangLesson({ lang }: { lang: LanguageInfo }) {
  const { levelId, lessonId } = useParams()
  return <LessonView key={`${levelId}/${lessonId}`} lang={lang} />
}

function LessonView({ lang }: { lang: LanguageInfo }) {
  const t = T[useEn(lang) ? 'en' : 'fr']
  const { levelId, lessonId } = useParams()
  const found = getCourseLesson(lang.id, levelId, lessonId)
  const user = useCurrentUser()
  const [finished, setFinished] = useState<{ score: number; total: number } | null>(null)
  const [runKey, setRunKey] = useState(1)
  const progress = useProgress()
  if (!found) return <NotFound />
  const { level, lesson, index } = found
  const prev = level.lessons[index - 1]
  const next = level.lessons[index + 1]
  const p = progress.lessons[lesson.id]
  const root = base(lang)
  const ja = lang.id === 'japonais'
  /** En japonais on ne lit que le texte japonais ; ailleurs, la première colonne est dans la langue étudiée. */
  const speakable = (s: string) => (ja ? JAPANESE.test(s) : true)
  const script = (s: string) => (ja && JAPANESE.test(s) ? 'ko-text' : '')

  return (
    <CourseShell lang={lang}>
      <div className="container page lesson">
        <nav className="breadcrumb small">
          <Link to={root}>{t.courses}</Link> › <Link to={`${root}/${level.id}`}>{level.name}</Link> › {t.lesson} {index + 1}
        </nav>
        <header className="lesson-head card" style={{ ['--accent' as string]: level.color }}>
          <div className="row between">
            <span className="pill">{t.lesson} {index + 1}/{level.lessons.length} · ⏱ {lesson.duration} {t.min}</span>
            {p?.completed && <span className="pill ok">{t.done(p.bestScore)}</span>}
          </div>
          <h1>{lesson.title}</h1>
          <p className={`subtitle ${script(lesson.subtitle)}`} lang={lang.speech}>{lesson.subtitle}</p>
          <div className="objectives">
            <strong>{t.goals}</strong>
            <ul>{lesson.objectives.map((o) => <li key={o}>{o}</li>)}</ul>
          </div>
        </header>

        <div className="lesson-layout">
          <article className="lesson-body">
            {lesson.sections.map((s, i) => (
              <section key={i} className="card lesson-section">
                <h2><span className="sec-num">{i + 1}</span> {s.title}</h2>
                {s.body && <RichText text={s.body} />}
                {s.table && (
                  <div className="table-wrap">
                    <table>
                      <thead><tr>{s.table.head.map((h) => <th key={h}>{h}</th>)}</tr></thead>
                      <tbody>
                        {s.table.rows.map((r, ri) => (
                          <tr key={ri}>
                            {r.map((c, ci) => (
                              <td key={ci} className={script(c)} lang={ci === 0 ? lang.speech : undefined}>
                                <RichText text={c} />
                                {ci === 0 && speakable(c) && <SpeakButton text={c.split('(')[0]} lang={lang.speech} />}
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
                          <span className={`ex-ko ${script(e.ko)}`} lang={lang.speech}>{e.ko}</span> <SpeakButton text={e.ko} lang={lang.speech} />
                        </div>
                        {e.rom && <div className="muted small">{e.rom}</div>}
                        <div className="ex-fr">{e.fr}</div>
                      </li>
                    ))}
                  </ul>
                )}
                {s.tip && <div className="tip">💡 <RichText text={s.tip} /></div>}
              </section>
            ))}

            {lesson.dialogue && (
              <section className="card lesson-section">
                <h2>{t.dialogue}</h2>
                <div className="dialogue">
                  {lesson.dialogue.map((d, i) => (
                    <div key={i} className={`bubble ${i % 2 ? 'right' : ''}`}>
                      <div className={`speaker ${script(d.speaker)}`}>{d.speaker}</div>
                      <div className={`ex-ko ${script(d.ko)}`} lang={lang.speech}>
                        {d.ko} <SpeakButton text={d.ko} lang={lang.speech} />
                      </div>
                      <div className="muted small">{d.fr}</div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            <section className="card lesson-section" id="exercices">
              <h2>{t.exTitle}</h2>
              {!user && (
                <p className="notice">
                  {t.guest} <Link to={`/connexion?next=${root}/${level.id}/${lesson.id}`}>{t.login}</Link>{t.or}
                  <Link to="/inscription">{t.create}</Link>.
                </p>
              )}
              <ExerciseRunner
                key={runKey}
                seed={runKey}
                exercises={lesson.exercises}
                passMark={70}
                onFinish={async (score, total, _results, answers, operationId) => {
                  if (user) await recordLesson(lesson.id, lesson.title, score, total, answers, operationId)
                  setFinished({ score, total })
                }}
                onRestart={() => {
                  setFinished(null)
                  setRunKey(runKey + 1)
                }}
              />
              {finished && finished.score / finished.total >= 0.7 && (
                <div className="row center gap">
                  {next ? (
                    <Link to={`${root}/${level.id}/${next.id}`} className="btn">{t.next(next.title)}</Link>
                  ) : (
                    <Link to={`${lang.path}/tests/${level.id}`} className="btn">{t.takeTest}</Link>
                  )}
                </div>
              )}
            </section>
          </article>

          <aside className="lesson-aside">
            <div className="card sticky">
              <h3>{t.vocab}</h3>
              <ul className="vocab">
                {lesson.vocab.map((v) => (
                  <li key={v.ko}>
                    <div>
                      <span className={script(v.ko)} lang={lang.speech}>{v.ko}</span> <SpeakButton text={v.ko.split('/')[0]} lang={lang.speech} />
                    </div>
                    {v.rom && <div className="muted small">{v.rom}</div>}
                    <div className="small">{v.fr}</div>
                  </li>
                ))}
              </ul>
              <a href="#exercices" className="btn full small">{t.toEx}</a>
            </div>
          </aside>
        </div>

        <div className="lesson-nav">
          {prev ? <Link to={`${root}/${level.id}/${prev.id}`} className="btn ghost">← {prev.title}</Link> : <span />}
          {next ? (
            <Link to={`${root}/${level.id}/${next.id}`} className="btn ghost">{next.title} →</Link>
          ) : (
            <Link to={`${lang.path}/tests/${level.id}`} className="btn ghost">{t.endTest} →</Link>
          )}
        </div>
      </div>
    </CourseShell>
  )
}

export function LangTest({ lang }: { lang: LanguageInfo }) {
  const { levelId } = useParams()
  return <TestView key={levelId} lang={lang} />
}

function TestView({ lang }: { lang: LanguageInfo }) {
  const t = T[useEn(lang) ? 'en' : 'fr']
  const { levelId } = useParams()
  const level = getCourseLevel(lang.id, levelId)
  const user = useCurrentUser()
  const progress = useProgress()
  const [started, setStarted] = useState(false)
  const [result, setResult] = useState<{ score: number; total: number } | null>(null)
  const [runKey, setRunKey] = useState(1)
  if (!level) return <NotFound />
  const levels = courseLevels(lang.id)
  const record = progress.tests[level.id]
  const nextLevel = levels[level.index + 1]
  const passed = result && (result.score / result.total) * 100 >= PASS_MARK
  const root = base(lang)
  return (
    <CourseShell lang={lang}>
      <div className="container page narrow">
        <Link to={`${root}/${level.id}`} className="link small">← {level.name}</Link>
        <div className="card test-head" style={{ ['--accent' as string]: level.color }}>
          <h1>{t.testTitle(level.name)}</h1>
          <p className="muted">{t.testLead(level.test.length, level.cefr, tr(level.topik))}</p>
          {record && (
            <p className="small">
              {t.best} : <strong>{record.best} %</strong> · {t.attempts(record.attempts)} {record.passed && `· ${t.validated}`}
            </p>
          )}
          {!user && (
            <p className="notice">
              {t.loginTest} <Link to={`/connexion?next=${lang.path}/tests/${level.id}`}>{t.loginWord}</Link>
            </p>
          )}
          {!started && <button className="btn big" onClick={() => setStarted(true)}>{t.startTest}</button>}
        </div>
        {started && (
          <ExerciseRunner
            key={runKey}
            seed={runKey + 50}
            exercises={level.test}
            passMark={PASS_MARK}
            onFinish={async (score, total, _results, answers, operationId) => {
              if (user) await recordTest(level.id, level.name, score, total, PASS_MARK, answers, operationId)
              setResult({ score, total })
            }}
            onRestart={() => {
              setResult(null)
              setRunKey(runKey + 1)
            }}
          />
        )}
        {result && (
          <div className="row center gap mt">
            {passed && nextLevel ? (
              <Link to={`${root}/${nextLevel.id}`} className="btn">{t.nextLevel(nextLevel.name)}</Link>
            ) : passed ? (
              <Link to={`/reserver?langue=${lang.id}`} className="btn">{t.teacher}</Link>
            ) : (
              <Link to={`${root}/${level.id}`} className="btn ghost">{t.reviewLevel}</Link>
            )}
            <Link to="/tableau-de-bord" className="btn ghost">{t.results}</Link>
          </div>
        )}
      </div>
    </CourseShell>
  )
}
