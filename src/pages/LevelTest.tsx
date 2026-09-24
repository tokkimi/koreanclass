import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getLevel, levels } from '../data'
import { recordTest, useCurrentUser, useProgress } from '../lib/store'
import { ExerciseRunner } from '../components/ExerciseRunner'
import { PASS_MARK } from '../lib/grading'
import NotFound from './NotFound'

export default function LevelTestRoute() {
  const { levelId } = useParams()
  return <LevelTest key={levelId} />
}

function LevelTest() {
  const { levelId } = useParams()
  const level = getLevel(levelId)
  const user = useCurrentUser()
  const progress = useProgress()
  const [started, setStarted] = useState(false)
  const [result, setResult] = useState<{ score: number; total: number } | null>(null)
  const [runKey, setRunKey] = useState(1)
  if (!level) return <NotFound />
  const t = progress.tests[level.id]
  const nextLevel = levels[level.index + 1]
  const passed = result && (result.score / result.total) * 100 >= PASS_MARK

  return (
    <div className="container page narrow">
      <Link to={`/cours/${level.id}`} className="link small">← {level.name}</Link>
      <div className="card test-head" style={{ ['--accent' as string]: level.color }}>
        <h1>🏁 Test — {level.name}</h1>
        <p className="muted">
          {level.test.length} questions portant sur l'ensemble du niveau ({level.cefr}, {level.topik}). Obtenez au moins {PASS_MARK} % pour valider le niveau
          et gagner le badge.
        </p>
        {t && (
          <p className="small">
            Meilleur score : <strong>{t.best} %</strong> · {t.attempts} tentative{t.attempts > 1 ? 's' : ''} {t.passed && '· 🏅 Niveau validé'}
          </p>
        )}
        {!user && (
          <p className="notice">
            Connectez-vous pour enregistrer votre résultat : <Link to={`/connexion?next=/tests/${level.id}`}>connexion</Link>
          </p>
        )}
        {!started && (
          <button className="btn big" onClick={() => setStarted(true)}>
            Démarrer le test
          </button>
        )}
      </div>
      {started && (
        <ExerciseRunner
          key={runKey}
          seed={runKey + 50}
          exercises={level.test}
          passMark={PASS_MARK}
          onFinish={(score, total) => {
            setResult({ score, total })
            if (user) recordTest(level.id, `Test ${level.name}`, score, total, PASS_MARK)
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
            <Link to={`/cours/${nextLevel.id}`} className="btn">
              Passer au {nextLevel.name} →
            </Link>
          ) : passed ? (
            <Link to="/reserver" className="btn">
              🎓 Bravo ! Continuez avec un professeur
            </Link>
          ) : (
            <Link to={`/cours/${level.id}`} className="btn ghost">
              Réviser les leçons du niveau
            </Link>
          )}
          <Link to="/tableau-de-bord" className="btn ghost">
            Voir mes résultats
          </Link>
        </div>
      )}
    </div>
  )
}
