import { Link } from 'react-router-dom'
import { allLessons, levels } from '../data'
import { globalStats, levelStats, useCurrentUser, useProgress } from '../lib/store'
import { computeBadges } from '../lib/badges'
import { ProgressBar } from '../components/ProgressBar'
import { Avatar } from '../components/Avatar'

export default function Dashboard() {
  const user = useCurrentUser()!
  const p = useProgress()
  const g = globalStats(p)
  const stats = levelStats(p)
  const badges = computeBadges(p)

  const startLevel = p.placement ? p.placement.levelIndex : 0
  const next =
    allLessons.find(({ level, lesson }) => level.index >= startLevel && !p.lessons[lesson.id]?.completed) ?? allLessons.find(({ lesson }) => !p.lessons[lesson.id]?.completed)
  const inProgress = stats.filter((s) => s.done > 0 && (s.done < s.total || !s.test?.passed))
  const upcoming = p.bookings.filter((b) => b.status !== 'annulée' && b.date >= new Date().toISOString().slice(0, 10))

  return (
    <div className="container page">
      <div className="dash-head">
        <Avatar user={user} size={64} />
        <div>
          <h1>안녕하세요, {user.displayName} !</h1>
          <p className="muted">
            Rang : <strong className="ko-text">{g.rank.name}</strong> ({g.rank.fr}) · niveau actuel : <strong>{g.currentLevel.name}</strong>
          </p>
        </div>
      </div>

      <div className="stat-grid">
        <div className="card stat">
          <span className="stat-icon">⭐</span>
          <strong>{p.xp}</strong>
          <span className="muted small">XP{g.nextRank && ` · ${g.nextRank.xp - p.xp} avant « ${g.nextRank.fr} »`}</span>
        </div>
        <div className="card stat">
          <span className="stat-icon">🔥</span>
          <strong>{p.streak.count}</strong>
          <span className="muted small">jour{p.streak.count > 1 ? 's' : ''} d'affilée</span>
        </div>
        <div className="card stat">
          <span className="stat-icon">📘</span>
          <strong>
            {g.completed}/{g.total}
          </strong>
          <span className="muted small">leçons terminées</span>
        </div>
        <div className="card stat">
          <span className="stat-icon">🎯</span>
          <strong>{g.avg !== null ? `${g.avg} %` : '—'}</strong>
          <span className="muted small">score moyen</span>
        </div>
        <div className="card stat">
          <span className="stat-icon">🏅</span>
          <strong>
            {g.passedLevels}/{levels.length}
          </strong>
          <span className="muted small">niveaux validés</span>
        </div>
      </div>

      <div className="dash-grid">
        <div className="stack">
          {next ? (
            <div className="card continue" style={{ ['--accent' as string]: next.level.color }}>
              <span className="pill">▶ À faire ensuite</span>
              <h2>{next.lesson.title}</h2>
              <p className="muted">
                {next.level.name} · <span className="ko-text">{next.lesson.subtitle}</span> · {next.lesson.duration} min
              </p>
              <Link to={`/cours/${next.level.id}/${next.lesson.id}`} className="btn">
                Continuer
              </Link>
            </div>
          ) : (
            <div className="card continue">
              <h2>🎉 Toutes les leçons sont terminées !</h2>
              <p className="muted">Validez les tests de niveau restants ou continuez avec un professeur.</p>
              <Link to="/reserver" className="btn">
                Réserver un cours
              </Link>
            </div>
          )}

          {!p.placement && (
            <div className="card notice-card">
              <strong>🎯 Vous ne savez pas par où commencer ?</strong>
              <p className="small muted">Passez le test de positionnement (10 min) : nous adapterons votre parcours.</p>
              <Link to="/test-de-niveau" className="btn small ghost">
                Faire le test
              </Link>
            </div>
          )}

          <div className="card">
            <h2>Progression par niveau</h2>
            <div className="level-progress">
              {stats.map((s) => (
                <Link to={`/cours/${s.level.id}`} key={s.level.id} className="lp-row">
                  <div className="row between small">
                    <strong>{s.level.name}</strong>
                    <span className="muted">
                      {s.done}/{s.total} · {s.test?.passed ? '🏅' : s.test ? `test ${s.test.best} %` : ''}
                    </span>
                  </div>
                  <ProgressBar value={s.pct} color={s.level.color} />
                </Link>
              ))}
            </div>
          </div>

          {inProgress.length > 0 && (
            <div className="card">
              <h2>Cours en cours</h2>
              {inProgress.map((s) => (
                <div key={s.level.id} className="in-progress">
                  <h3>{s.level.name}</h3>
                  <ul className="lesson-mini">
                    {s.level.lessons.map((l) => {
                      const lp = p.lessons[l.id]
                      return (
                        <li key={l.id} className={lp?.completed ? 'done' : ''}>
                          <Link to={`/cours/${s.level.id}/${l.id}`}>
                            {lp?.completed ? '✓' : '○'} {l.title}
                          </Link>
                          {lp && <span className="muted"> — {lp.bestScore} %</span>}
                        </li>
                      )
                    })}
                  </ul>
                </div>
              ))}
            </div>
          )}

          <div className="card">
            <h2>Mes résultats</h2>
            {p.history.length === 0 ? (
              <p className="muted">Aucun résultat pour l'instant. Terminez une leçon ou un test pour voir vos scores ici.</p>
            ) : (
              <div className="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Type</th>
                      <th>Intitulé</th>
                      <th>Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    {p.history.slice(0, 30).map((h) => {
                      const pct = Math.round((h.score / h.total) * 100)
                      return (
                        <tr key={h.id}>
                          <td className="nowrap">{new Date(h.date).toLocaleDateString('fr-FR')}</td>
                          <td>{h.kind === 'lesson' ? 'Leçon' : h.kind === 'test' ? 'Test de niveau' : 'Positionnement'}</td>
                          <td>{h.title}</td>
                          <td>
                            <span className={`score ${pct >= 70 ? 'ok' : 'ko'}`}>
                              {h.score}/{h.total} ({pct} %)
                            </span>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        <div className="stack">
          <div className="card">
            <h2>Badges</h2>
            <div className="badges">
              {badges.map((b) => (
                <div key={b.id} className={`badge ${b.earned ? 'earned' : ''}`} title={b.desc}>
                  <span>{b.icon}</span>
                  <small>{b.name}</small>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <h2>Cours particuliers</h2>
            <p className="small">
              Crédit restant : <strong>{p.packCredits} h</strong>
            </p>
            {upcoming.length ? (
              <ul className="booking-mini">
                {upcoming.slice(0, 3).map((b) => (
                  <li key={b.id}>
                    📅 {new Date(b.date + 'T12:00').toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'short' })} à {b.time} — <em>{b.status}</em>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="muted small">Aucun cours à venir.</p>
            )}
            <div className="row">
              <Link to="/reserver" className="btn small">
                Réserver
              </Link>
              <Link to="/reservations" className="btn small ghost">
                Mes réservations
              </Link>
            </div>
          </div>

          {p.placement && (
            <div className="card">
              <h2>Test de positionnement</h2>
              <p className="small">
                Niveau recommandé : <strong>{levels[p.placement.levelIndex].name}</strong>
                <br />
                <span className="muted">
                  {p.placement.score}/{p.placement.total} · le {new Date(p.placement.date).toLocaleDateString('fr-FR')}
                </span>
              </p>
              <Link to="/test-de-niveau" className="link small">
                Refaire le test
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
