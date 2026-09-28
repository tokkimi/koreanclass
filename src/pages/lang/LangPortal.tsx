import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import type { LanguageInfo } from '../../data/languages'
import { coursePlacement, courseLevels, placementRef } from '../../data/courses'
import { builtPages, portals } from '../../data/portal'
import { recordCoursePlacement, useCurrentUser, useProgress } from '../../lib/store'
import { CourseLangContext } from '../../lib/courseLang'
import { ScrollHero } from '../../components/ScrollHero'
import { PathOrbit, usePathCards } from '../../components/PathOrbit'
import { TiltCard } from '../../components/TiltCard'
import { JourneySnapshot } from '../../components/JourneySnapshot'
import { LevelCheckBanner } from '../../components/LevelCheckBanner'
import { PracticeVideoInvite } from '../../components/PracticeVideoInvite'
import { ExerciseRunner } from '../../components/ExerciseRunner'
import { recommendLevel } from '../Placement'
import { PRICING } from '../../config'
import type { Progress } from '../../lib/model'
import NotFound from '../NotFound'

/** Progression d'une langue, calculée comme levelStats / globalStats pour le coréen. */
export function courseStats(lang: string, p: Progress) {
  const levels = courseLevels(lang)
  const stats = levels.map((level) => {
    const done = level.lessons.filter((l) => p.lessons[l.id]?.completed).length
    return { level, done, total: level.lessons.length, pct: Math.round((done / level.lessons.length) * 100), test: p.tests[level.id] }
  })
  const total = stats.reduce((a, s) => a + s.total, 0)
  const completed = stats.reduce((a, s) => a + s.done, 0)
  return { levels, stats, total, completed, pct: total ? Math.round((completed / total) * 100) : 0 }
}

const KEYBOARD: Record<string, string> = {
  japonais: 'Astuce : active le clavier japonais (romaji → kana) sur ton ordinateur ou ton téléphone.',
  espagnol: 'Astuce : les accents et les signes ¿ ¡ ne sont pas obligatoires pour valider.',
  anglais: 'Astuce : les majuscules et la ponctuation finale ne comptent pas.',
  francais: 'Tip: accents are not required to validate your answer.',
}
export function LangShell({ lang, children }: { lang: LanguageInfo; children: React.ReactNode }) {
  return (
    <CourseLangContext.Provider value={{ id: lang.id, speech: lang.speech, ui: lang.taughtIn, keyboard: KEYBOARD[lang.id] ?? '' }}>
      <div lang={lang.taughtIn}>{children}</div>
    </CourseLangContext.Provider>
  )
}

/** Accueil d'une langue : même construction que l'accueil coréen. */
export function LangHome({ lang }: { lang: LanguageInfo }) {
  const c = portals[lang.id]
  const user = useCurrentUser()
  const p = useProgress()
  const s = courseStats(lang.id, p)
  const base = lang.path
  const extras = useMemo(
    () =>
      c
        ? [
            { id: 'ecriture', to: `${base}/ecriture`, badge: c.writing.badge, ko: c.writing.ko, title: c.writing.title, subtitle: c.writing.subtitle },
            { id: 'nombres', to: `${base}/nombres`, badge: c.extras.numbers[0], ko: c.extras.numbers[1], title: c.nav.numbers, subtitle: c.extras.numbers[2] },
            { id: 'vocabulaire', to: `${base}/vocabulaire`, badge: c.extras.vocabulary[0], ko: c.extras.vocabulary[1], title: c.nav.vocabulary, subtitle: c.extras.vocabulary[2] },
            { id: 'couleurs', to: `${base}/couleurs`, badge: c.extras.colors[0], ko: c.extras.colors[1], title: c.nav.colors, subtitle: c.extras.colors[2] },
            { id: 'structures', to: `${base}/structures`, badge: c.extras.structures[0], ko: c.extras.structures[1], title: c.nav.structures, subtitle: c.extras.structures[2] },
            { id: 'tests', to: `${base}/tests`, badge: c.extras.tests[0], ko: c.extras.tests[1], title: c.nav.tests, subtitle: c.extras.tests[2] },
            { id: 'pratique', to: `${base}/pratique`, badge: c.extras.practice[0], ko: c.extras.practice[1], title: c.nav.practice, subtitle: c.extras.practice[2] },
          ].filter((x) => builtPages.includes(x.id as (typeof builtPages)[number]))
        : [],
    [c, base],
  )
  const pathCards = usePathCards(s.stats, c?.chapters ?? [], { courseBase: `${base}/cours`, extras, lessonsLabel: lang.taughtIn === 'en' ? 'lessons' : 'leçons' })
  if (!c) return <NotFound />
  const placed = p.placements?.[lang.id]?.levelIndex ?? 0
  const all = s.levels.flatMap((level) => level.lessons.map((lesson) => ({ level, lesson })))
  const next = all.find(({ level, lesson }) => level.index >= placed && !p.lessons[lesson.id]?.completed) ?? all.find(({ lesson }) => !p.lessons[lesson.id]?.completed)
  const hours = Math.round(all.reduce((m, x) => m + x.lesson.duration, 0) / 60)
  const en = lang.taughtIn === 'en'

  return (
    <LangShell lang={lang}>
      <ScrollHero
        imageSrc={c.hero.image}
        skipTargetId="accueil-contenu"
        title={c.hero.title}
        words={c.hero.words}
        ctaLabel={c.hero.cta}
        ctaTo={`${base}/cours`}
        doors={false}
        blossoms={lang.id === 'japonais'}
        skipLabel={en ? 'Skip to the lessons' : 'Passer aux cours'}
        hintLabel={en ? 'Scroll' : 'Fais défiler'}
      />
      <div className="home-clean" id="accueil-contenu" tabIndex={-1}>
        <section className="hc-section hc-path">
          <div className="container hc-head">
            <p className="hc-eyebrow">{user ? c.hello(user.displayName, s.pct) : c.access(s.levels.length, s.total)}</p>
            <h2>{c.pathTitle}</h2>
            <p className="hc-lead">{c.pathLead}</p>
          </div>
          <div className="container">
            <PathOrbit cards={pathCards} />
          </div>
          {next && (
            <div className="container hc-next">
              <span className="hc-next-label">{s.completed ? c.resume : c.start}</span>
              <span className="hc-next-title">
                {next.lesson.title} <small>· {next.level.name.split('— ')[1]} · {next.lesson.duration} min</small>
              </span>
              <Link to={`${base}/cours/${next.level.id}/${next.lesson.id}`} className="btn">
                {s.completed ? c.continue : c.go} <span aria-hidden="true">→</span>
              </Link>
            </div>
          )}
        </section>

        <div className="container">
          <JourneySnapshot levels={s.levels.length} lessons={s.total} guidedHours={hours} copy={c.journey} />
        </div>

        <LevelCheckBanner questionCount={coursePlacement(lang.id).length} copy={c.levelCheck} />

        <section className="hc-section" id="tarifs">
          <div className="container hc-head">
            <p className="hc-eyebrow">{c.teacher.eyebrow}</p>
            <h2>{c.teacher.title}</h2>
            <p className="hc-lead">{c.teacher.lead}</p>
          </div>
          <div className="container hc-offers">
            <TiltCard title={c.teacher.one} subtitle={c.teacher.oneSub} imageUrl="/images/cafe.jpg" badge={<>{PRICING.single.price} €</>} actionText={c.teacher.oneCta} to={`/reserver?langue=${lang.id}&formule=single`}>
              <ul>
                <li>{c.teacher.oneList[0]}</li>
                <li>{c.teacher.oneList[1]}</li>
              </ul>
            </TiltCard>
            <TiltCard title={c.teacher.pack} subtitle={c.teacher.packSub} imageUrl="/images/online-korean-lesson.png" badge={<>{PRICING.pack10.price} €</>} actionText={c.teacher.packCta} to={`/reserver?langue=${lang.id}&formule=pack10`}>
              <ul>
                <li>{c.teacher.packList[0]}</li>
                <li>{c.teacher.packList[1]}</li>
              </ul>
            </TiltCard>
          </div>
          <p className="container hc-level">
            {c.teacher.level} <Link to={`${base}/test-de-niveau`}>{c.teacher.levelLink}</Link>
          </p>
        </section>

        <section className="container hc-faq" id="faq">
          <details>
            <summary>{c.faq.q}</summary>
            <p>{c.faq.a}</p>
          </details>
        </section>

        <PracticeVideoInvite copy={c.practice} />
      </div>
    </LangShell>
  )
}

/** Page « Tests & QCM » d'une langue. */
export function LangTests({ lang }: { lang: LanguageInfo }) {
  const p = useProgress()
  const en = lang.taughtIn === 'en'
  const levels = courseLevels(lang.id)
  const placement = coursePlacement(lang.id)
  const last = p.placements?.[lang.id]
  if (!levels.length) return <NotFound />
  return (
    <LangShell lang={lang}>
      <div className="container page">
        <div className="page-head">
          <h1>{en ? 'Tests & quizzes' : 'Tests & QCM'}</h1>
          <Link className="btn ghost" to={`${lang.path}/pratique`}>{en ? 'Try the games and the speaking studio ↗' : 'Essayer les jeux et le studio oral ↗'}</Link>
          <p className="muted">
            {en
              ? 'Check yourself: a placement test to find your level, then an end-of-level test to validate each step (70% required).'
              : 'Évaluez-vous : test de positionnement pour trouver votre niveau, puis un test de fin de niveau pour valider chaque étape (70 % requis).'}
          </p>
        </div>
        <Link to={`${lang.path}/test-de-niveau`} className="card placement-banner">
          <div>
            <h2>🎯 {en ? 'Placement test' : 'Test de positionnement'}</h2>
            <p className="muted">
              {en
                ? `${placement.length} questions of increasing difficulty · about 18 minutes · level recommendation at the end`
                : `${placement.length} questions de difficulté croissante · environ 18 minutes · bases, compréhension et structures de phrase · recommandation de niveau à la fin`}
            </p>
            {last && (
              <p className="small">
                {en ? 'Last result: recommended level' : 'Dernier résultat : niveau recommandé'} <strong>{levels[last.levelIndex].name}</strong> ({last.score}/{last.total})
              </p>
            )}
          </div>
          <span className="btn">{en ? 'Start' : 'Commencer'}</span>
        </Link>
        <h2 className="mt">{en ? 'End-of-level tests' : 'Tests de fin de niveau'}</h2>
        <div className="level-grid">
          {levels.map((l) => {
            const t = p.tests[l.id]
            return (
              <Link key={l.id} to={`${lang.path}/tests/${l.id}`} className="card level-card" style={{ ['--accent' as string]: l.color }}>
                <div className="row between">
                  <span className="level-num">{l.index}</span>
                  <span className="pill">{l.cefr}</span>
                </div>
                <h3>{l.name}</h3>
                <p className="small muted">
                  {l.test.length} questions · {l.topik}
                </p>
                <div className="small">
                  {t
                    ? `${t.passed ? (en ? '🏅 Passed' : '🏅 Validé') : en ? '⏳ Not passed' : '⏳ Non validé'} · ${en ? 'best score' : 'meilleur score'} ${t.best} % · ${t.attempts} ${en ? 'attempt' : 'tentative'}${t.attempts > 1 ? 's' : ''}`
                    : en
                      ? 'Not taken yet'
                      : 'Pas encore passé'}
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </LangShell>
  )
}

/** Test de positionnement d'une langue (même règle que le coréen). */
export function LangPlacement({ lang }: { lang: LanguageInfo }) {
  const user = useCurrentUser()
  const en = lang.taughtIn === 'en'
  const [started, setStarted] = useState(false)
  const [result, setResult] = useState<{ levelIndex: number; score: number; total: number } | null>(null)
  const [runKey, setRunKey] = useState(1)
  const test = useMemo(() => coursePlacement(lang.id), [lang.id])
  const levels = courseLevels(lang.id)
  if (!levels.length) return <NotFound />
  const rec = result && levels[result.levelIndex]
  return (
    <LangShell lang={lang}>
      <div className="container page narrow">
        <div className="card test-head">
          <h1>🎯 {en ? 'Placement test' : 'Test de positionnement'}</h1>
          <p className="muted">
            {en
              ? `${test.length} questions, from the very basics to advanced level. Each level mixes vocabulary, situations and sentence structures. Allow about 18 minutes. At the end, we recommend a starting point.`
              : `${test.length} questions, des bases au niveau avancé. Chaque niveau combine vocabulaire, situations et structures de phrase. Comptez environ 18 minutes. À la fin, nous vous recommandons un point de départ.`}
          </p>
          {!started && (
            <button className="btn big" onClick={() => setStarted(true)}>
              {en ? 'Start the test' : 'Commencer le test'}
            </button>
          )}
        </div>
        {started && !result && (
          <ExerciseRunner
            key={runKey}
            seed={runKey + 99}
            exercises={test.map((x) => x.exercise)}
            onFinish={async (score, total, results, answers, operationId) => {
              const per = levels.map((l) => test.filter((x) => x.levelIndex === l.index).length)
              const correct = levels.map((l) => test.reduce((acc, x, i) => acc + (x.levelIndex === l.index && results[i] ? 1 : 0), 0))
              const levelIndex = recommendLevel(correct, per)
              if (user) await recordCoursePlacement(placementRef(lang.id), answers, operationId)
              setResult({ levelIndex, score, total })
            }}
          />
        )}
        {result && rec && (
          <div className="card result-card">
            <p className="muted">
              {en ? 'Your score' : 'Votre score'} : {result.score}/{result.total}
            </p>
            <h2>{en ? 'Recommended level:' : 'Niveau recommandé :'}</h2>
            <div className="recommended" style={{ ['--accent' as string]: rec.color }}>
              <span className="level-num">{result.levelIndex}</span>
              <div>
                <h3>{rec.name}</h3>
                <p className="muted small">
                  {rec.cefr} · {rec.topik}
                </p>
              </div>
            </div>
            <div className="row center gap">
              <Link to={`${lang.path}/cours/${rec.id}`} className="btn">
                {en ? 'Start this level' : 'Commencer ce niveau'}
              </Link>
              <button
                className="btn ghost"
                onClick={() => {
                  setResult(null)
                  setRunKey(runKey + 1)
                }}
              >
                {en ? 'Take the test again' : 'Refaire le test'}
              </button>
            </div>
            {!user && (
              <p className="notice">
                <Link to="/inscription">{en ? 'Create an account' : 'Créez un compte'}</Link> {en ? 'to keep this result in your profile.' : 'pour garder ce résultat dans votre profil.'}
              </p>
            )}
          </div>
        )}
      </div>
    </LangShell>
  )
}
