import { Link } from 'react-router-dom'
import { allLessons, levels, totalLessons } from '../data'
import { globalStats, levelStats, useCurrentUser, useProgress, currentStreak } from '../lib/store'
import { SpeakButton } from '../components/Speak'
import { ProgressBar } from '../components/ProgressBar'
import { Icon } from '../components/Icon'

const chapters = ['Tes premiers caractères', 'Les bases pour discuter', 'Raconte ton quotidien', 'Trouve les bons mots', 'Affirme ton style', 'À toi les nuances']
export default function Home() {
  const user = useCurrentUser()
  const p = useProgress()
  const g = globalStats(p)
  const stats = levelStats(p)
  const next = allLessons.find(({ level, lesson }) => level.index >= (p.placement?.levelIndex ?? 0) && !p.lessons[lesson.id]?.completed)
    ?? allLessons.find(({ lesson }) => !p.lessons[lesson.id]?.completed)
  return <div className="container page learning-home">
    <div className="home-greeting">
      <div><h1>{user ? `Hello, ${user.displayName}.` : 'Un peu de coréen. Beaucoup de plaisir.'} <span className="greeting-wave">안녕!</span></h1><p className="muted">Des mots aux vraies conversations. À ton rythme.</p></div>
      <div className="home-counters"><span>🔥 {currentStreak(p)} <small>jours</small></span><span>✦ {p.xp} <small>XP</small></span></div>
    </div>
    <div className="row" style={{marginBottom:24,flexWrap:'wrap'}}><Link to="/structures" className="btn">Phrases & grammaire</Link><Link to="/alphabet" className="btn ghost">Comprendre le hangeul</Link><Link to="/pratique" className="btn ghost">Mises en situation</Link></div>
    <div className="home-top-grid">
      <section className="study-hero photo-hero">
        <div className="row between"><span className="hero-label">{g.completed ? 'ON GARDE LE RYTHME' : 'TA PROCHAINE AVENTURE'}</span><span className="hero-number">{String((next?.level.index ?? 0) + 1).padStart(2, '0')} / 06</span></div>
        <div className="study-hero-content"><div><p className="hero-kicker">{next ? next.level.name : 'Parcours terminé'}</p><h2>{next ? next.lesson.title : 'Tu as fait tout ce chemin.'}</h2><p>{next ? 'Lis, écoute, puis joue avec ce que tu viens d’apprendre.' : 'Reviens sur tes quiz pour faire encore mieux.'}</p><Link to={next ? `/cours/${next.level.id}/${next.lesson.id}` : '/tests'} className="btn hero-start">{g.completed ? 'Continuer ma leçon' : 'C’est parti'} <span aria-hidden="true">↗</span></Link><span className="hero-duration">{next ? `${next.lesson.duration} min · exercices inclus` : `${totalLessons} leçons explorées`}</span></div><div className="hero-destination"><span>서울</span><small>RENDEZ-VOUS À SÉOUL</small></div></div>
        <div className="hero-progress"><span>{g.completed} / {g.total} leçons validées</span><span>{g.pct} %</span><ProgressBar value={g.pct} label="Progression du parcours" /></div>
      </section>
      <aside className="word-card"><img className="word-photo" src="/images/cafe.jpg" alt="Café glacé et latte à Séoul" /><div className="row between"><span className="eyebrow">LE MOT À EMPORTER</span><span className="word-tag">Expression</span></div><div className="word-body"><span lang="ko">화이팅!</span><p>hwaiting</p><h2>Tu peux le faire.</h2><p className="muted">Le petit encouragement qui change tout.</p></div><div className="word-audio"><SpeakButton text="화이팅" /><span>Écoute. Répète. À toi !</span></div></aside>
    </div>
    <section className="quick-actions" aria-label="À toi de jouer">
      <Link to="/pratique" className="quick-action"><span className="action-icon lilac"><Icon name="quiz" /></span><div><h2>En situation</h2><p>Joue, parle, progresse</p></div><span className="action-arrow">↗</span></Link>
      <Link to="/alphabet" className="quick-action"><span className="action-icon lime">가</span><div><h2>L’atelier hangeul</h2><p>Des sons aux syllabes</p></div><span className="action-arrow">↗</span></Link>
      <Link to="/tableau-de-bord" className="quick-action"><span className="action-icon blue"><Icon name="chart" /></span><div><h2>Tes petites victoires</h2><p>Scores, XP et badges</p></div><span className="action-arrow">↗</span></Link>
    </section>
    <section className="practice-invite"><div><p className="eyebrow">TON PROCHAIN DÉFI</p><h2>Un café. Une rencontre. Ta première conversation.</h2><p>Choisis tes réponses, écoute le dialogue et prends le micro dans le studio oral.</p><Link to="/pratique" className="btn">Entrer dans la scène ↗</Link></div><img src="/images/cafe.jpg" alt="Deux boissons dans un café de Séoul" loading="lazy" /></section>
    <section className="path-section"><div className="section-title"><div><p className="eyebrow">CHAQUE ÉTAPE COMPTE</p><h2>Ton parcours, sans pression.</h2></div><Link className="link" to="/cours">Tout explorer ↗</Link></div><div className="chapter-grid">{stats.map(({level,done,total,pct}) => <Link className="chapter-card" key={level.id} to={`/cours/${level.id}`}><div className="row between"><span className={`chapter-number chapter-${level.index}`}>{String(level.index + 1).padStart(2, '0')}</span><span className="small muted">{level.cefr}</span></div><p className="chapter-ko" lang="ko">{level.korean}</p><h3>{chapters[level.index]}</h3><p className="muted small">{level.name.split('— ')[1]} · {total} leçons</p><ProgressBar value={pct} label={`Progression ${level.name}`} /><div className="row between small"><span>{done ? `${done} / ${total} validées` : 'À découvrir'}</span><span aria-hidden="true">→</span></div></Link>)}</div></section>
    {!user && <div className="join-banner"><div><h2>Tes progrès te suivent partout.</h2><p className="muted">Sur mobile ou ordinateur : un profil, le même parcours.</p></div><Link to="/inscription" className="btn">Créer mon profil</Link></div>}
    <div className="home-footnote"><span>{levels.length} niveaux · {totalLessons} leçons · accès libre</span><Link to="/test-de-niveau">Tu connais déjà les bases ? Teste ton niveau →</Link></div>
    <section id="tarifs" className="home-extra"><h2>Envie de parler avec un professeur ?</h2><p className="muted">Cours particulier : 15 €/h · Pack de 10 heures : 100 €.</p><Link to="/reserver" className="btn ghost">Voir les créneaux</Link></section>
    <details className="card faq" id="faq"><summary>Comment retrouver ma progression ?</summary><p>Connecte-toi à ton profil sur n’importe quel appareil : tes résultats sont sauvegardés en ligne. Les leçons sont validées à partir de 70 % ; tu peux rejouer autant que tu veux.</p></details>
  </div>
}
