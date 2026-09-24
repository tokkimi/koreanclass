import { Link } from 'react-router-dom'
import { levels, placementTest } from '../data'
import { useProgress } from '../lib/store'

export default function Tests() {
  const progress = useProgress()
  return (
    <div className="container page">
      <div className="page-head">
        <h1>Tests & QCM</h1>
        <p className="muted">Évaluez-vous : test de positionnement pour trouver votre niveau, puis un test de fin de niveau pour valider chaque étape (70 % requis).</p>
      </div>

      <Link to="/test-de-niveau" className="card placement-banner">
        <div>
          <h2>🎯 Test de positionnement</h2>
          <p className="muted">
            {placementTest.length} questions de difficulté croissante · environ 10 minutes · recommandation de niveau à la fin
          </p>
          {progress.placement && (
            <p className="small">
              Dernier résultat : niveau recommandé <strong>{levels[progress.placement.levelIndex].name}</strong> ({progress.placement.score}/{progress.placement.total})
            </p>
          )}
        </div>
        <span className="btn">Commencer</span>
      </Link>

      <h2 className="mt">Tests de fin de niveau</h2>
      <div className="level-grid">
        {levels.map((l) => {
          const t = progress.tests[l.id]
          return (
            <Link key={l.id} to={`/tests/${l.id}`} className="card level-card" style={{ ['--accent' as string]: l.color }}>
              <div className="row between">
                <span className="level-num">{l.index}</span>
                <span className="pill">{l.cefr}</span>
              </div>
              <h3>{l.name}</h3>
              <p className="small muted">{l.test.length} questions · {l.topik}</p>
              <div className="small">
                {t ? (
                  <>
                    {t.passed ? '🏅 Validé' : '⏳ Non validé'} · meilleur score {t.best} % · {t.attempts} tentative{t.attempts > 1 ? 's' : ''}
                  </>
                ) : (
                  'Pas encore passé'
                )}
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
