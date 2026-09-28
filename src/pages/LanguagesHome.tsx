import { useState } from 'react'
import { Link } from 'react-router-dom'
import { languages, type LanguageId } from '../data/languages'
import { PRICING } from '../config'

/**
 * Accueil de TalkToMe Club : présente les 5 langues. Chaque langue a sa
 * page principale (le coréen : /coreen, avec tous ses cours). On peut aussi
 * réserver un cours particulier directement en choisissant la langue.
 */
export default function LanguagesHome() {
  const [lang, setLang] = useState<LanguageId>('coreen')
  const chosen = languages.find((l) => l.id === lang)!

  return (
    <div className="lh">
      <section className="lh-hero container">
        <p className="hc-eyebrow">TalkToMe Club · 5 langues</p>
        <h1 className="lh-title">Parle une nouvelle langue.</h1>
        <p className="hc-lead">
          Coréen, japonais, espagnol, anglais ou français : des cours en autonomie du premier mot jusqu’au niveau courant, et des professeurs pour
          te faire parler.
        </p>
      </section>

      <section className="container lh-grid" aria-label="Choisis ta langue">
        {languages.map((l) => (
          <Link key={l.id} to={l.path} className="lh-card" style={{ ['--lang' as string]: l.accent, ['--lang-tint' as string]: l.tint }}>
            <span className="lh-card-hello" lang={l.speech}>
              {l.hello}
            </span>
            <span className="lh-card-name">
              {l.name} <small lang={l.speech}>{l.native}</small>
            </span>
            <span className="lh-card-pitch">{l.pitch}</span>
            <span className="lh-card-foot">
              <span className="lh-badge">{l.available ? 'Cours en ligne' : 'Bientôt en ligne'}</span>
              <span className="lh-card-go" aria-hidden="true">
                →
              </span>
            </span>
          </Link>
        ))}
      </section>

      <section className="container lh-how">
        <div>
          <strong>Cours en autonomie</strong>
          <p>Six niveaux par langue, du tout premier cours au niveau courant, avec audio et exercices corrigés.</p>
        </div>
        <div>
          <strong>Tests & quiz</strong>
          <p>Un test de positionnement, des QCM et un test à la fin de chaque niveau pour mesurer tes progrès.</p>
        </div>
        <div>
          <strong>Cours particuliers</strong>
          <p>Une heure en visio avec un professeur, dans la langue de ton choix.</p>
        </div>
      </section>

      <section className="lh-book" id="tarifs" aria-labelledby="lh-book-title">
        <div className="container">
          <p className="hc-eyebrow">Avec un professeur</p>
          <h2 id="lh-book-title">Réserve ton cours.</h2>
          <p className="hc-lead">Choisis ta langue, puis ta formule. Même prix pour toutes les langues.</p>

          <div className="lang-choice lh-lang-choice" role="radiogroup" aria-label="Langue du cours">
            {languages.map((l) => (
              <button
                type="button"
                key={l.id}
                role="radio"
                aria-checked={lang === l.id}
                className={`lang-chip ${lang === l.id ? 'active' : ''}`}
                style={{ ['--lang' as string]: l.accent }}
                onClick={() => setLang(l.id)}
              >
                <span lang={l.speech}>{l.native}</span>
                <small>{l.name}</small>
              </button>
            ))}
          </div>

          <div className="lh-offers">
            <div className="lh-offer">
              <span className="lh-offer-name">Une heure</span>
              <span className="lh-offer-price">{PRICING.single.price} €</span>
              <span className="muted small">Pour essayer, sans engagement</span>
              <Link className="btn" to={`/reserver?langue=${lang}&formule=single`}>
                Réserver 1 h de {chosen.name.toLowerCase()} →
              </Link>
            </div>
            <div className="lh-offer featured">
              <span className="lh-offer-name">Pack 10 heures</span>
              <span className="lh-offer-price">{PRICING.pack10.price} €</span>
              <span className="muted small">10 €/h · 50 € d’économie</span>
              <Link className="btn" to={`/reserver?langue=${lang}&formule=pack10`}>
                Prendre le pack de {chosen.name.toLowerCase()} →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="container hc-faq" id="faq">
        <details>
          <summary>Comment ça marche ?</summary>
          <p>
            Choisis une langue pour découvrir son parcours. Les cours en autonomie sont gratuits. Pour un cours particulier, choisis la langue et la
            formule, puis ton créneau : le professeur confirme le rendez-vous par e-mail.
          </p>
        </details>
        <details>
          <summary>Dire bonjour en 5 langues</summary>
          <p>
            {languages.map((l) => (
              <span key={l.id} className="lh-hello-line">
                <strong lang={l.speech}>{l.hello}</strong> ({l.name}, « {l.helloRead} »)
              </span>
            ))}
          </p>
        </details>
      </section>
    </div>
  )
}
