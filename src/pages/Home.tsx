import { Link } from 'react-router-dom'
import { allLessons, levels, totalLessons } from '../data'
import { globalStats, levelStats, useCurrentUser, useProgress } from '../lib/store'
import { ScrollHero } from '../components/ScrollHero'
import { PathOrbit, usePathCards } from '../components/PathOrbit'
import { TiltCard } from '../components/TiltCard'
import { JourneySnapshot } from '../components/JourneySnapshot'
import { LevelCheckBanner } from '../components/LevelCheckBanner'
import { PRICING } from '../config'

const chapters = ['Tes premiers caractères', 'Les bases pour discuter', 'Raconte ton quotidien', 'Trouve les bons mots', 'Affirme ton style', 'À toi les nuances']
const GUIDED_HOURS = Math.round(allLessons.reduce((minutes, entry) => minutes + entry.lesson.duration, 0) / 60)

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

        <div className="container">
          <JourneySnapshot levels={levels.length} lessons={totalLessons} guidedHours={GUIDED_HOURS} />
        </div>

        <div className="container">
          <LevelCheckBanner questionCount={36} />
        </div>

        {/* Les deux offres pour réserver un professeur */}
        <section className="hc-section" id="tarifs">
          <div className="container hc-head">
            <p className="hc-eyebrow">Avec un professeur</p>
            <h2>Parle. On t’écoute.</h2>
            <p className="hc-lead">Des cours particuliers en visio, adaptés à ton niveau et à tes envies.</p>
          </div>
          <div className="container hc-offers">
            <TiltCard
              title="Une heure"
              subtitle="Pour essayer, sans engagement"
              imageUrl="/images/cafe.jpg"
              badge={<>{PRICING.single.price} €</>}
              actionText="Réserver 1 heure"
              to="/reserver?formule=single"
            >
              <ul>
                <li>1 h en visio avec un professeur</li>
                <li>Conversation, grammaire ou TOPIK</li>
              </ul>
            </TiltCard>
            <TiltCard
              title="Pack 10 heures"
              subtitle="Pour progresser vraiment"
              imageUrl="/images/online-korean-lesson.png"
              badge={<>{PRICING.pack10.price} €</>}
              actionText="Prendre le pack"
              to="/reserver?formule=pack10"
            >
              <ul>
                <li>10 €/h · 50 € d’économie</li>
                <li>Tes heures, quand tu veux</li>
              </ul>
            </TiltCard>
          </div>
          <p className="container hc-level">
            Déjà quelques bases ? <Link to="/test-de-niveau">Trouve ton niveau en 18 minutes →</Link>
          </p>
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
