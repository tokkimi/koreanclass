import { Link, useParams, useSearchParams } from 'react-router-dom'
import { currentStreak, globalStats, levelStats, useCurrentUser, useProgressOf, useUserByUsername } from '../lib/store'
import { computeBadges } from '../lib/badges'
import { Avatar } from '../components/Avatar'
import { ProgressBar } from '../components/ProgressBar'
import { AccountTabs } from '../components/AccountTabs'
import { baseOf, inLanguage, levelsOf, useLastLang } from '../lib/lastLang'
import NotFound from './NotFound'
import { LevelProgressCard, ResultHistoryLink, KoreanSpecialProgress } from '../components/ActivityProgress'

type Tab = 'progression' | 'resultats' | 'badges'

export default function Profile() {
  const { username } = useParams()
  const me = useCurrentUser()
  const other = useUserByUsername(username)
  const user = username ? other : me
  const p = useProgressOf(user?.id)
  const [params, setParams] = useSearchParams()
  const requestedTab = params.get('onglet')
  const tab: Tab = requestedTab === 'resultats' || requestedTab === 'badges' ? requestedTab : 'progression'
  const setTab = (value: Tab) => setParams({ onglet: value }, { replace: true })
  const lang = useLastLang()


  if (!user) return <NotFound />
  const isMe = me?.id === user.id
  const list = levelsOf(lang)
  const placement = lang.id === 'coreen' ? p.placement : p.placements?.[lang.id] ?? null
  const g = globalStats(p, list)
  const stats = levelStats(p, list)
  const badges = computeBadges(p, list)
  const history = p.history.filter(inLanguage(lang, list))
  const earned = badges.filter((b) => b.earned)

  return (
    <div className="container page narrow">
      {isMe && !username && <AccountTabs />}
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
          {stats.map((s) => <LevelProgressCard key={s.level.id} stat={s} base={baseOf(lang)} progress={p} userId={isMe ? me?.id : undefined} expandedLessons />)}
          {isMe && lang.id === 'coreen' && <KoreanSpecialProgress />}
          <Link to={`${baseOf(lang)}/cours`} className="card center activity-meter">
            <p className="small muted">Progression globale</p>
            <div className="big-num">{g.pct} %</div>
            <ProgressBar value={g.pct} />
            <span className="link small">Revenir à mon cursus →</span>
          </Link>
        </div>
      )}

      {tab === 'resultats' && (
        <div className="card">
          {history.length === 0 ? (
            <p className="muted">Aucun résultat pour le moment.</p>
          ) : (
            <ul className="results-list">
              {history.slice(0, 50).map((h) => <li key={h.id}><ResultHistoryLink entry={h} /></li>)}
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

      {placement && (
        <p className="small muted center mt">
          <Link className="link" to={`${baseOf(lang)}/test-de-niveau`}>Revoir le test de positionnement ({lang.name}) →</Link> : {list[Math.min(placement.levelIndex, list.length - 1)].name} ({placement.score}/{placement.total})
        </p>
      )}
    </div>
  )
}
