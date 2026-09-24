import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { levels } from '../data'
import { currentStreak, globalStats, levelStats, useCurrentUser, useProgressOf, useUserByUsername } from '../lib/store'
import { computeBadges } from '../lib/badges'
import { Avatar } from '../components/Avatar'
import { ProgressBar } from '../components/ProgressBar'
import NotFound from './NotFound'

type Tab = 'progression' | 'resultats' | 'badges'

export default function Profile() {
  const { username } = useParams()
  const me = useCurrentUser()
  const other = useUserByUsername(username)
  const user = username ? other : me
  const p = useProgressOf(user?.id)
  const [tab, setTab] = useState<Tab>('progression')


  if (!user) return <NotFound />
  const isMe = me?.id === user.id
  const g = globalStats(p)
  const stats = levelStats(p)
  const badges = computeBadges(p)
  const earned = badges.filter((b) => b.earned)

  return (
    <div className="container page narrow">
      <div className="profile-head">
        <Avatar user={user} size={132} />
        <div className="profile-info">
          <div className="row profile-title">
            <h1>@{user.username}</h1>
            {isMe ? (
              <>
                <Link to="/profil/modifier" className="btn small ghost">
                  Modifier le profil
                </Link>

              </>
            ) : null}
          </div>
          <ul className="profile-counts">
            <li>
              <strong>{g.completed}</strong> leçon{g.completed > 1 ? "s" : ""}
            </li>
            <li>
              <strong>{p.xp}</strong> XP
            </li>
            <li>
              <strong>{g.passedLevels}</strong> niveaux validés
            </li>
            <li>
              <strong>{currentStreak(p)}</strong> 🔥
            </li>
          </ul>
          <div className="profile-bio">
            <strong>{user.displayName}</strong>
            {user.isDemo && <span className="demo-badge">Profil test · Accès illimité</span>}
            <span className="pill small-pill" style={{ ['--accent' as string]: g.currentLevel.color }}>
              {g.currentLevel.cefr} · <span className="ko-text">{g.rank.name}</span>
            </span>
            {user.bio && <p className="bio">{user.bio}</p>}
            {user.goal && <p className="small">🎯 {user.goal}</p>}
            {user.location && <p className="small muted">📍 {user.location}</p>}
            {user.website && (
              <a className="small link" href={user.website.startsWith('http') ? user.website : `https://${user.website}`} target="_blank" rel="noreferrer noopener">
                🔗 {user.website.replace(/^https?:\/\//, '')}
              </a>
            )}
            <p className="small muted">Profil privé · Membre depuis {new Date(user.createdAt).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}</p>
          </div>
        </div>
      </div>

      {earned.length > 0 && (
        <div className="highlights">
          {earned.slice(0, 8).map((b) => (
            <div key={b.id} className="highlight" title={b.desc}>
              <span>{b.icon}</span>
              <small>{b.name}</small>
            </div>
          ))}
        </div>
      )}

      <div className="tabs">
        <button className={tab === 'progression' ? 'active' : ''} onClick={() => setTab('progression')}>
          📈 Progression
        </button>
        <button className={tab === 'resultats' ? 'active' : ''} onClick={() => setTab('resultats')}>
          📝 Résultats
        </button>
        <button className={tab === 'badges' ? 'active' : ''} onClick={() => setTab('badges')}>
          🏅 Badges
        </button>
      </div>

      {tab === 'progression' && (
        <div className="profile-levels">
          {stats.map((s) => (
            <div key={s.level.id} className="card profile-level" style={{ ['--accent' as string]: s.level.color }}>
              <div className="row between">
                <strong>{s.level.name}</strong>
                <span className="small muted">{s.test?.passed ? '🏅 validé' : `${s.done}/${s.total}`}</span>
              </div>
              <ProgressBar value={s.pct} color={s.level.color} />
              <div className="small muted">
                {s.avg !== null ? `Score moyen ${s.avg} %` : 'Pas encore commencé'}
                {s.test && ` · test : ${s.test.best} %`}
              </div>
            </div>
          ))}
          <div className="card center">
            <p className="small muted">Progression globale</p>
            <div className="big-num">{g.pct} %</div>
            <ProgressBar value={g.pct} />
          </div>
        </div>
      )}

      {tab === 'resultats' && (
        <div className="card">
          {p.history.length === 0 ? (
            <p className="muted">Aucun résultat pour le moment.</p>
          ) : (
            <ul className="results-list">
              {p.history.slice(0, 50).map((h) => {
                const pct = Math.round((h.score / h.total) * 100)
                return (
                  <li key={h.id}>
                    <span className={`score ${pct >= 70 ? 'ok' : 'ko'}`}>{pct} %</span>
                    <div className="grow">
                      <div>{h.title}</div>
                      <div className="small muted">
                        {h.kind === 'lesson' ? 'Leçon' : h.kind === 'test' ? 'Test de niveau' : 'Positionnement'} · {new Date(h.date).toLocaleString('fr-FR', { dateStyle: 'medium', timeStyle: 'short' })}
                      </div>
                    </div>
                    <span className="small muted">
                      {h.score}/{h.total}
                    </span>
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      )}

      {tab === 'badges' && (
        <div className="card">
          <div className="badges big">
            {badges.map((b) => (
              <div key={b.id} className={`badge ${b.earned ? 'earned' : ''}`}>
                <span>{b.icon}</span>
                <small>{b.name}</small>
                <small className="muted">{b.desc}</small>
              </div>
            ))}
          </div>
        </div>
      )}

      {p.placement && (
        <p className="small muted center mt">
          Test de positionnement : {levels[p.placement.levelIndex].name} ({p.placement.score}/{p.placement.total})
        </p>
      )}
    </div>
  )
}
