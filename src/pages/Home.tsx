import { Link } from 'react-router-dom'
import { allLessons, levels, totalLessons } from '../data'
import { globalStats, levelStats, useCurrentUser, useProgress } from '../lib/store'
import { ScrollHero } from '../components/ScrollHero'
import { PathOrbit, usePathCards } from '../components/PathOrbit'

const chapters = ['Tes premiers caractères', 'Les bases pour discuter', 'Raconte ton quotidien', 'Trouve les bons mots', 'Affirme ton style', 'À toi les nuances']

export default function Home() {
  const user = useCurrentUser()
  const p = useProgress()
  const g = globalStats(p)
  const stats = levelStats(p)
  const pathCards = usePathCards(stats, chapters)
  const next =
    allLessons.find(({ level, lesson }) => level.index >= (p.placement?.levelIndex ?? 0) && !p.lessons[lesson.id]?.completed) ??
    allLessons.find(({ lesson }) => !p.lessons[lesson.id]?.completed)

  return (
    <>
      <ScrollHero imageSrc="/images/seoul.jpg" skipTargetId="accueil-contenu" />

      <div className="home-clean" id="accueil-contenu" tabIndex={-1}>
        {/* 1. Le parcours, en orbite */}
        <section className="hc-section hc-path">
          <div className="container hc-head">
            <p className="hc-eyebrow">{user ? `Hello, ${user.displayName} · ${g.pct} % du parcours` : `${levels.length} niveaux · ${totalLessons} leçons · accès libre`}</p>
            <h2>Ton parcours, sans pression.</h2>
            <p className="hc-lead">Du premier caractère aux vraies conversations. Fais tourner, choisis, commence.</p>
          </div>
          <div className="container">
            <PathOrbit cards={pathCards} />
          </div>
          {next && (
            <div className="container hc-next">
              <span className="hc-next-label">{g.completed ? 'Reprendre' : 'Commencer'}</span>
              <span className="hc-next-title">
                {next.lesson.title} <small>· {next.level.name.split('— ')[1]} · {next.lesson.duration} min</small>
              </span>
              <Link to={`/cours/${next.level.id}/${next.lesson.id}`} className="btn">
                {g.completed ? 'Continuer' : 'C’est parti'} <span aria-hidden="true">→</span>
              </Link>
            </div>
          )}
        </section>

        {/* 2. Mise en situation, en grande image */}
        <section className="hc-band" aria-labelledby="hc-band-title">
          <img src="/images/cafe.jpg" alt="" loading="lazy" />
          <div className="hc-band-copy container">
            <p className="hc-eyebrow light">En situation</p>
            <h2 id="hc-band-title">
              Un café. Une rencontre.
              <br />
              Ta première conversation.
            </h2>
            <Link to="/pratique" className="btn hc-light">
              Entrer dans la scène <span aria-hidden="true">→</span>
            </Link>
          </div>
        </section>

        {/* 3. Professeur + niveau */}
        <section className="hc-section container hc-duo" id="tarifs">
          <div>
            <p className="hc-eyebrow">Avec un professeur</p>
            <h2>Parle. On t’écoute.</h2>
            <p className="hc-lead">Cours particulier en visio : 15 € l’heure, ou 100 € les 10 heures.</p>
            <Link to="/reserver" className="btn">
              Voir les créneaux <span aria-hidden="true">→</span>
            </Link>
          </div>
          <div>
            <p className="hc-eyebrow">Déjà quelques bases ?</p>
            <h2>Trouve ton niveau.</h2>
            <p className="hc-lead">24 questions, 10 minutes, et on te dit par où commencer.</p>
            <Link to="/test-de-niveau" className="btn ghost">
              Faire le test <span aria-hidden="true">→</span>
            </Link>
          </div>
        </section>

        <section className="container hc-faq" id="faq">
          <details>
            <summary>Comment retrouver ma progression ?</summary>
            <p>
              {user ? 'Connecte-toi' : <><Link to="/inscription">Crée ton profil</Link>, puis connecte-toi</>} sur n’importe quel appareil : tes résultats sont
              sauvegardés en ligne. Une leçon est validée à partir de 70 %, et tu peux rejouer autant que tu veux.
            </p>
          </details>
        </section>
      </div>
    </>
  )
}
