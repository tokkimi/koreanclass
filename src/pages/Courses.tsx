import { Link } from 'react-router-dom'
import { levels } from '../data'
import { structureUnits } from '../data/structures'
import { levelStats, useCurrentUser, useProgress } from '../lib/store'
import { ProgressBar } from '../components/ProgressBar'

export default function Courses() {
  const user = useCurrentUser()
  const progress = useProgress()
  const stats = levelStats(progress)

  return (
    <div className="container page">
      <div className="page-head">
        <h1>Le parcours de coréen</h1>
        <p className="muted">
          {levels.length} niveaux, du hangeul au coréen courant. Chaque leçon comprend un cours, du vocabulaire, des exemples audio et des exercices.
          {!user && (
            <>
              {' '}
              <Link to="/inscription" className="link">Créez un compte</Link> pour enregistrer votre progression.
            </>
          )}
        </p>
        <Link to="/test-de-niveau" className="btn ghost">🎯 Je ne sais pas par où commencer</Link>
      </div>

      <div className="level-grid">
        <Link to="/structures" className="card"><h2>Phrases & grammaire en contexte</h2><p>Comprendre le hangeul, conjuguer, relier les idées et adapter son ton : {structureUnits.length} ateliers avec phrases décomposées et exercices corrigés.</p><span className="link">Explorer les structures →</span></Link>
        {stats.map(({ level, done, total, pct, test }) => (
          <Link key={level.id} to={`/cours/${level.id}`} className="card level-card" style={{ ['--accent' as string]: level.color }}>
            <div className="row between">
              <span className="level-num">{level.index}</span>
              <span className="pill">{level.cefr}</span>
            </div>
            <h2>
              {level.name.split('— ')[1]} <span className="ko-text muted">{level.korean}</span>
            </h2>
            <p className="small muted">{level.topik}</p>
            <p className="small">{level.description}</p>
            <ul className="lesson-mini">
              {level.lessons.map((l) => (
                <li key={l.id} className={progress.lessons[l.id]?.completed ? 'done' : ''}>
                  {progress.lessons[l.id]?.completed ? '✓' : '○'} {l.title}
                </li>
              ))}
            </ul>
            <ProgressBar value={pct} color={level.color} />
            <div className="row between small muted">
              <span>
                {done}/{total} leçons
              </span>
              <span>{test?.passed ? '🏅 Niveau validé' : test ? `Test : ${test.best} %` : 'Test non passé'}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
