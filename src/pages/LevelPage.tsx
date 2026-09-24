import { Link, useParams } from 'react-router-dom'
import { getLevel } from '../data'
import { useProgress } from '../lib/store'
import { ProgressBar } from '../components/ProgressBar'
import NotFound from './NotFound'

export default function LevelPage() {
  const { levelId } = useParams()
  const level = getLevel(levelId)
  const progress = useProgress()
  if (!level) return <NotFound />

  const done = level.lessons.filter((l) => progress.lessons[l.id]?.completed).length
  const nextLesson = level.lessons.find((l) => !progress.lessons[l.id]?.completed) ?? level.lessons[0]
  const test = progress.tests[level.id]

  return (
    <div className="container page">
      <Link to="/cours" className="link small">← Tous les niveaux</Link>
      <div className="level-hero card" style={{ ['--accent' as string]: level.color }}>
        <div>
          <span className="pill">
            {level.cefr} · {level.topik}
          </span>
          <h1>
            {level.name} <span className="ko-text">{level.korean}</span>
          </h1>
          <p>{level.description}</p>
          <div className="row">
            <Link to={`/cours/${level.id}/${nextLesson.id}`} className="btn">
              {done === 0 ? 'Commencer' : done === level.lessons.length ? 'Réviser' : 'Continuer'} : {nextLesson.title}
            </Link>
            <Link to={`/tests/${level.id}`} className="btn ghost">
              Test de fin de niveau
            </Link>
          </div>
        </div>
        <div className="level-hero-stats">
          <div className="big-num">
            {done}/{level.lessons.length}
          </div>
          <div className="muted small">leçons terminées</div>
          <ProgressBar value={(done / level.lessons.length) * 100} color={level.color} />
          <div className="small">{test?.passed ? `🏅 Niveau validé (${test.best} %)` : test ? `Meilleur score au test : ${test.best} %` : 'Test non passé'}</div>
        </div>
      </div>

      <ol className="lesson-list">
        {level.lessons.map((l, i) => {
          const p = progress.lessons[l.id]
          return (
            <li key={l.id}>
              <Link to={`/cours/${level.id}/${l.id}`} className={`card lesson-row ${p?.completed ? 'done' : ''}`}>
                <span className="lesson-index" style={{ background: p?.completed ? level.color : undefined }}>
                  {p?.completed ? '✓' : i + 1}
                </span>
                <div className="grow">
                  <h3>{l.title}</h3>
                  <div className="muted small ko-text">{l.subtitle}</div>
                </div>
                <div className="lesson-meta small muted">
                  <span>⏱ {l.duration} min</span>
                  <span>✏️ {l.exercises.length} exercices</span>
                  {p && <span className="score">{p.bestScore} %</span>}
                </div>
              </Link>
            </li>
          )
        })}
        <li>
          <Link to={`/tests/${level.id}`} className="card lesson-row test-row">
            <span className="lesson-index">🏁</span>
            <div className="grow">
              <h3>Test de fin de niveau</h3>
              <div className="muted small">{level.test.length} questions · 70 % pour valider le niveau</div>
            </div>
            {test && <span className="score">{test.best} %</span>}
          </Link>
        </li>
      </ol>
    </div>
  )
}
