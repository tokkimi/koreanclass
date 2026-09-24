import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { levels, totalLessons } from '../data'
import { PRICING } from '../config'
import { useCurrentUser } from '../lib/store'
import { SpeakButton } from '../components/Speak'

const totalExercises = levels.reduce((a, l) => a + l.test.length + l.lessons.reduce((b, x) => b + x.exercises.length, 0), 0)

export default function Home() {
  const user = useCurrentUser()
  const { hash } = useLocation()

  useEffect(() => {
    if (hash) document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth' })
  }, [hash])

  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <span className="pill">🇰🇷 Coréen · 🇫🇷 expliqué en français</span>
            <h1>
              Apprenez le coréen,
              <br />
              <span className="grad">du premier 안녕 au TOPIK.</span>
            </h1>
            <p className="lead">
              Un parcours complet en {levels.length} niveaux : l'alphabet hangeul, la grammaire, le vocabulaire, des exercices corrigés et des QCM
              pour valider chaque étape. Et quand vous voulez aller plus vite, réservez un cours particulier.
            </p>
            <div className="row">
              <Link to={user ? '/tableau-de-bord' : '/inscription'} className="btn big">
                {user ? 'Reprendre mon parcours' : 'Commencer gratuitement'}
              </Link>
              <Link to="/test-de-niveau" className="btn big ghost">
                Tester mon niveau
              </Link>
            </div>
            <div className="hero-stats">
              <div>
                <strong>{totalLessons}</strong>
                <span>leçons</span>
              </div>
              <div>
                <strong>{totalExercises}+</strong>
                <span>exercices & QCM</span>
              </div>
              <div>
                <strong>A1 → C2</strong>
                <span>TOPIK I & II</span>
              </div>
            </div>
          </div>
          <div className="hero-card card">
            <div className="hero-hangul">한국어</div>
            <p className="muted">
              hangugeo — « la langue coréenne » <SpeakButton text="한국어" />
            </p>
            <div className="mini-lesson">
              <div>
                <span className="ko-text big">안녕하세요</span> <SpeakButton text="안녕하세요" />
                <div className="muted small">Bonjour</div>
              </div>
              <div>
                <span className="ko-text big">감사합니다</span> <SpeakButton text="감사합니다" />
                <div className="muted small">Merci</div>
              </div>
              <div>
                <span className="ko-text big">사랑해요</span> <SpeakButton text="사랑해요" />
                <div className="muted small">Je t'aime</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRESENTATION */}
      <section className="section" id="presentation">
        <div className="container">
          <div className="section-head">
            <h2>Trois façons d'apprendre</h2>
            <p className="muted">Avancez seul(e) à votre rythme, validez vos acquis, et faites-vous accompagner quand vous en avez besoin.</p>
          </div>
          <div className="grid-3">
            <div className="card feature">
              <div className="feature-icon">📚</div>
              <h3>Cours en autonomie</h3>
              <p>
                {totalLessons} leçons structurées : explications claires en français, tableaux, exemples avec audio, dialogues et vocabulaire.
                Chaque leçon se termine par des exercices corrigés.
              </p>
              <Link to="/cours" className="link">
                Voir le programme →
              </Link>
            </div>
            <div className="card feature">
              <div className="feature-icon">✅</div>
              <h3>Tests & QCM</h3>
              <p>
                QCM, textes à trous, phrases à remettre dans l'ordre, associations… Un test de fin de niveau (70 % pour valider) et un test de
                positionnement pour savoir où commencer.
              </p>
              <Link to="/tests" className="link">
                Passer un test →
              </Link>
            </div>
            <div className="card feature highlight">
              <div className="feature-icon">🎓</div>
              <h3>Cours particuliers</h3>
              <p>
                Une heure en visio avec un professeur, adaptée à vos objectifs : conversation, TOPIK, prononciation, voyage… À partir de{' '}
                <strong>10 €/h</strong> avec le pack.
              </p>
              <Link to="/reserver" className="link">
                Réserver une heure →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CURSUS */}
      <section className="section alt" id="cursus">
        <div className="container">
          <div className="section-head">
            <h2>Le cursus, niveau par niveau</h2>
            <p className="muted">Du tout premier cours jusqu'au niveau TOPIK 6 et à l'aisance à l'oral.</p>
          </div>
          <div className="timeline">
            {levels.map((l) => (
              <Link to={`/cours/${l.id}`} key={l.id} className="timeline-item card" style={{ ['--accent' as string]: l.color }}>
                <div className="timeline-badge">{l.index}</div>
                <div>
                  <div className="row between">
                    <h3>
                      {l.name} <span className="ko-text muted">{l.korean}</span>
                    </h3>
                    <span className="pill">
                      {l.cefr} · {l.topik}
                    </span>
                  </div>
                  <p className="muted">{l.description}</p>
                  <div className="small muted">
                    {l.lessons.length} leçons · {l.lessons.reduce((a, x) => a + x.duration, 0)} min · test de fin de niveau
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* COMMENT CA MARCHE */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <h2>Comment ça marche ?</h2>
          </div>
          <div className="grid-4 steps">
            <div className="card">
              <span className="step">1</span>
              <h4>Créez votre profil</h4>
              <p className="muted small">Photo, bio, objectif… votre espace d'apprentissage personnel.</p>
            </div>
            <div className="card">
              <span className="step">2</span>
              <h4>Testez votre niveau</h4>
              <p className="muted small">24 questions pour savoir par quel niveau commencer.</p>
            </div>
            <div className="card">
              <span className="step">3</span>
              <h4>Suivez les leçons</h4>
              <p className="muted small">Cours, audio, exercices : votre progression est enregistrée automatiquement.</p>
            </div>
            <div className="card">
              <span className="step">4</span>
              <h4>Validez & progressez</h4>
              <p className="muted small">Tests de niveau, XP, séries de jours, résultats détaillés dans votre tableau de bord.</p>
            </div>
          </div>
        </div>
      </section>

      {/* TARIFS */}
      <section className="section alt" id="tarifs">
        <div className="container">
          <div className="section-head">
            <h2>Tarifs</h2>
            <p className="muted">Les cours en autonomie et les tests sont gratuits. Les cours particuliers se réservent en ligne.</p>
          </div>
          <div className="grid-3 pricing">
            <div className="card price-card">
              <h3>Autonomie</h3>
              <div className="price">
                0 €<span>/toujours</span>
              </div>
              <ul>
                <li>✓ Toutes les leçons, du hangeul au niveau avancé</li>
                <li>✓ Exercices & QCM corrigés</li>
                <li>✓ Tests de niveau et de positionnement</li>
                <li>✓ Profil, suivi de progression, résultats</li>
              </ul>
              <Link to="/inscription" className="btn ghost full">
                Créer mon compte
              </Link>
            </div>
            <div className="card price-card">
              <h3>{PRICING.single.label}</h3>
              <div className="price">
                {PRICING.single.price} €<span>/heure</span>
              </div>
              <ul>
                <li>✓ 1 heure en visio avec un professeur</li>
                <li>✓ Programme adapté à votre niveau</li>
                <li>✓ Conversation, grammaire, TOPIK, prononciation</li>
                <li>✓ Sans engagement</li>
              </ul>
              <Link to="/reserver?formule=single" className="btn full">
                Réserver 1 h
              </Link>
            </div>
            <div className="card price-card featured">
              <span className="ribbon">Meilleure offre</span>
              <h3>{PRICING.pack10.label}</h3>
              <div className="price">
                {PRICING.pack10.price} €<span>/10 heures</span>
              </div>
              <p className="save">Soit 10 €/h — vous économisez 50 €</p>
              <ul>
                <li>✓ 10 heures de cours particuliers</li>
                <li>✓ Crédit d'heures utilisable quand vous voulez</li>
                <li>✓ Suivi personnalisé de votre progression</li>
                <li>✓ Idéal pour préparer le TOPIK</li>
              </ul>
              <Link to="/reserver?formule=pack10" className="btn full">
                Prendre le pack
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section" id="faq">
        <div className="container narrow">
          <div className="section-head">
            <h2>Questions fréquentes</h2>
          </div>
          {FAQ.map(([q, a]) => (
            <details key={q} className="card faq">
              <summary>{q}</summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="section cta">
        <div className="container center">
          <h2>
            Prêt(e) ? <span className="ko-text">시작해 볼까요?</span>
          </h2>
          <p>Votre premier cours de hangeul prend 25 minutes.</p>
          <Link to="/cours/hangeul/h1" className="btn big light">
            Commencer la leçon 1
          </Link>
        </div>
      </section>
    </>
  )
}

const FAQ: [string, string][] = [
  ['Je ne connais rien au coréen, par où commencer ?', "Par le Niveau 0 (Hangeul) : en 6 leçons, vous apprenez à lire et écrire l'alphabet coréen. C'est la base de tout le reste."],
  ["Les cours en autonomie sont-ils vraiment gratuits ?", 'Oui. Toutes les leçons, exercices et tests sont accessibles gratuitement. Créez un compte pour enregistrer votre progression.'],
  ["À quoi correspondent les niveaux ?", "Les niveaux suivent le cadre européen (A1 à C2) et l'examen officiel TOPIK : niveaux 1-2 = TOPIK I, niveaux 3-5 = TOPIK II (3 à 6)."],
  ['Comment se déroule un cours particulier ?', "Vous choisissez une date et un créneau, précisez vos objectifs, puis le professeur vous confirme le rendez-vous par e-mail avec le lien de visio. Le cours dure 1 heure."],
  ['Comment fonctionne le pack 10 heures ?', "Pour 100 €, vous obtenez 10 heures de cours. La première séance est réservée lors de l'achat, les 9 autres sont créditées sur votre compte et se réservent quand vous voulez depuis la page de réservation."],
  ['Puis-je écouter la prononciation ?', 'Oui : cliquez sur les boutons 🔊 à côté des mots et phrases coréennes. La voix utilise la synthèse vocale coréenne de votre appareil.'],
  ['Comment taper en coréen ?', "Ajoutez le clavier « Coréen – 2-set (두벌식) » dans les réglages de votre ordinateur ou téléphone. Les exercices acceptent aussi les réponses avec ou sans espaces et ponctuation."],
]
