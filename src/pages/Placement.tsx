import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { levels, placementTest } from '../data'
import { recordPlacement, useCurrentUser } from '../lib/store'
import { ExerciseRunner } from '../components/ExerciseRunner'

/** Niveau recommandé : premier palier dont les bases ou structures ne sont pas encore stables. */
export function recommendLevel(correctByLevel: number[], perLevel: number[]): number {
  for (let i = 0; i < perLevel.length; i++) {
    if (correctByLevel[i] < Math.ceil(perLevel[i] * 0.75)) return i
  }
  return perLevel.length - 1
}

export default function Placement() {
  const user = useCurrentUser()
  const [started, setStarted] = useState(false)
  const [result, setResult] = useState<{ levelIndex: number; score: number; total: number } | null>(null)
  const [runKey, setRunKey] = useState(1)
  const exercises = useMemo(() => placementTest.map((p) => p.exercise), [])

  return (
    <div className="container page narrow">
      <div className="card test-head">
        <h1>🎯 Test de positionnement</h1>
        <p className="muted">
          {exercises.length} questions, du hangeul au niveau avancé. Chaque niveau combine des bases, une situation et des structures de phrase
          (temps, cause, opposition, registre, nuance). Comptez environ 18 minutes. À la fin, nous vous recommandons un point de départ et vous gardez le détail par niveau.
        </p>
        {!started && (
          <button className="btn big" onClick={() => setStarted(true)}>
            Commencer le test
          </button>
        )}
      </div>
      {started && !result && (
        <ExerciseRunner
          key={runKey}
          seed={runKey + 99}
          exercises={exercises}
          onFinish={async (score, total, results, answers, operationId) => {
            const per = levels.map((l) => placementTest.filter((p) => p.levelIndex === l.index).length)
            const correct = levels.map((l) => placementTest.reduce((acc, p, i) => acc + (p.levelIndex === l.index && results[i] ? 1 : 0), 0))
            const levelIndex = recommendLevel(correct, per)
            if (user) await recordPlacement(levelIndex, score, total, answers, operationId)
            setResult({ levelIndex, score, total })
          }}
        />
      )}
      {result && (
        <div className="card result-card">
          <p className="muted">Votre score : {result.score}/{result.total}</p>
          <h2>Niveau recommandé :</h2>
          <div className="recommended" style={{ ['--accent' as string]: levels[result.levelIndex].color }}>
            <span className="level-num">{result.levelIndex}</span>
            <div>
              <h3>{levels[result.levelIndex].name}</h3>
              <p className="muted small">
                {levels[result.levelIndex].cefr} · {levels[result.levelIndex].topik}
              </p>
            </div>
          </div>
          <div className="row center gap">
            <Link to={`/cours/${levels[result.levelIndex].id}`} className="btn">
              Commencer ce niveau
            </Link>
            <button
              className="btn ghost"
              onClick={() => {
                setResult(null)
                setRunKey(runKey + 1)
              }}
            >
              Refaire le test
            </button>
          </div>
          {!user && (
            <p className="notice">
              <Link to="/inscription">Créez un compte</Link> pour garder ce résultat dans votre profil.
            </p>
          )}
        </div>
      )}
    </div>
  )
}
