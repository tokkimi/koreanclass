import { useState } from 'react'
import { Link } from 'react-router-dom'
import { languages, localized, type LanguageId } from '../data/languages'
import { useSiteLang } from '../lib/i18n'
import { PRICING } from '../config'
import { ContainerScroll } from '../components/ui/container-scroll-animation'
import { packHourly, packSaving } from '../lib/pricing'
import { OWNER, TOKKIMI_URL } from '../config'

/**
 * Accueil de TalkToMe Club : présente les 5 langues. Chaque langue a sa
 * page principale (le coréen : /coreen, avec tous ses cours). On peut aussi
 * réserver un cours particulier directement en choisissant la langue.
 */
export default function LanguagesHome() {
  const [lang, setLang] = useState<LanguageId>('coreen')
  const en = useSiteLang() === 'en'
  const t = (fr: string, e: string) => (en ? e : fr)
  const name = (l: (typeof languages)[number]) => localized(l, en).name
  const chosen = languages.find((l) => l.id === lang)!

  return (
    <div className="lh">
      <section className="lh-hero container">
        <p className="hc-eyebrow">TalkToMe Club · {t('5 langues', '5 languages')}</p>
        <h1 className="lh-title">{t('Parle une nouvelle langue.', 'Speak a new language.')}</h1>
        <p className="hc-lead">
          {t(
            'Coréen, japonais, espagnol, anglais ou français : des cours en autonomie du premier mot jusqu’au niveau courant, et des professeurs pour te faire parler.',
            'Korean, Japanese, Spanish, English or French: self-study courses from your very first word to fluency, and teachers to get you talking.',
          )}
        </p>
      </section>

      <section className="lh-banner" aria-label={t('Cinq langues, un seul club', 'Five languages, one club')}>
        <ContainerScroll
          titleComponent={
            <h2 className="cs-title">
              {t('Séoul, Tokyo, Londres, Paris, Barcelone…', 'Seoul, Tokyo, London, Paris, Barcelona…')}
              <span>{t('Un seul club.', 'One club.')}</span>
            </h2>
          }
        >
          <img
            src="/images/langues-panorama.jpg"
            alt={t(
              'Panorama imaginaire réunissant Séoul, le mont Fuji, Londres, Paris et Barcelone au coucher du soleil',
              'Imaginary panorama bringing together Seoul, Mount Fuji, London, Paris and Barcelona at sunset',
            )}
            draggable={false}
            onError={(e) => {
              const img = e.currentTarget
              if (!img.src.endsWith('/images/seoul.jpg')) img.src = '/images/seoul.jpg'
            }}
          />
        </ContainerScroll>
      </section>

      <section className="container lh-grid" aria-label={t('Choisis ta langue', 'Choose your language')}>
        {languages.map((l) => (
          <Link key={l.id} to={l.path} className="lh-card" style={{ ['--lang' as string]: l.accent, ['--lang-tint' as string]: l.tint }}>
            <span className="lh-card-hello" lang={l.speech}>
              {l.hello}
            </span>
            <span className="lh-card-name">
              {name(l)} <small lang={l.speech}>{l.native}</small>
            </span>
            <span className="lh-card-pitch">{localized(l, en).pitch}</span>
            <span className="lh-card-foot">
              <span className="lh-badge">{l.available ? t('Cours en ligne', 'Courses online') : t('Bientôt en ligne', 'Coming soon')}</span>
              <span className="lh-card-go" aria-hidden="true">
                →
              </span>
            </span>
          </Link>
        ))}
      </section>

      <section className="container lh-how">
        <div>
          <strong>{t('Cours en autonomie', 'Self-study courses')}</strong>
          <p>{t('Six niveaux par langue, du tout premier cours au niveau courant, avec audio et exercices corrigés.', 'Six levels per language, from the very first lesson to fluency, with audio and corrected exercises.')}</p>
        </div>
        <div>
          <strong>{t('Tests & quiz', 'Tests & quizzes')}</strong>
          <p>{t('Un test de positionnement, des QCM et un test à la fin de chaque niveau pour mesurer tes progrès.', 'A placement test, quizzes and an end-of-level test to measure your progress.')}</p>
        </div>
        <div>
          <strong>{t('Cours particuliers', 'Private lessons')}</strong>
          <p>{t('Une heure en visio avec un professeur, dans la langue de ton choix.', 'One hour on video with a teacher, in the language of your choice.')}</p>
        </div>
      </section>

      <section className="lh-book" id="tarifs" aria-labelledby="lh-book-title">
        <div className="container">
          <p className="hc-eyebrow">{t('Avec un professeur', 'With a teacher')}</p>
          <h2 id="lh-book-title">{t('Réserve ton cours.', 'Book your lesson.')}</h2>
          <p className="hc-lead">{t('Choisis ta langue, puis ta formule. Même prix pour toutes les langues.', 'Choose your language, then your plan. Same price for every language.')}</p>

          <div className="lang-choice lh-lang-choice" role="radiogroup" aria-label={t('Langue du cours', 'Lesson language')}>
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
                <small>{name(l)}</small>
              </button>
            ))}
          </div>

          <div className="lh-offers">
            <div className="lh-offer">
              <span className="lh-offer-name">{t('Une heure', 'One hour')}</span>
              <span className="lh-offer-price">{PRICING.single.price} €</span>
              <span className="muted small">{t('Pour essayer, sans engagement', 'To try it out, no commitment')}</span>
              <Link className="btn" to={`/reserver?langue=${lang}&formule=single`}>
                {en ? `Book 1 h of ${name(chosen)} →` : `Réserver 1 h de ${chosen.name.toLowerCase()} →`}
              </Link>
            </div>
            <div className="lh-offer featured">
              <span className="lh-offer-name">{t('Pack 10 heures', '10-hour pack')}</span>
              <span className="lh-offer-price">{PRICING.pack10.price} €</span>
              <span className="muted small">{t(`${packHourly()} €/h · ${packSaving()} € d’économie`, `€${packHourly()}/h · save €${packSaving()}`)}</span>
              <Link className="btn" to={`/reserver?langue=${lang}&formule=pack10`}>
                {en ? `Get the ${name(chosen)} pack →` : `Prendre le pack de ${chosen.name.toLowerCase()} →`}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="container hc-faq" id="faq">
        <details>
          <summary>{t('Comment ça marche ?', 'How does it work?')}</summary>
          <p>
            {t(
              'Choisis une langue pour découvrir son parcours. Les cours en autonomie sont gratuits. Pour un cours particulier, choisis la langue et la formule, puis ton créneau : le professeur confirme le rendez-vous par e-mail.',
              'Pick a language to discover its path. Self-study courses are free. For a private lesson, choose the language and the plan, then your time slot: the teacher confirms the appointment by email.',
            )}
          </p>
        </details>
        <details>
          <summary>{t('Dire bonjour en 5 langues', 'Say hello in 5 languages')}</summary>
          <p>
            {languages.map((l) => (
              <span key={l.id} className="lh-hello-line">
                <strong lang={l.speech}>{l.hello}</strong> ({name(l)}, {en ? `“${l.helloRead}”` : `« ${l.helloRead} »`})
              </span>
            ))}
          </p>
        </details>
      </section>

      <section className="container lh-tokkimi" aria-labelledby="lh-tokkimi-title">
        <div className="lh-tokkimi-card">
          <p className="hc-eyebrow">{t('Un projet Tokkimi', 'A Tokkimi project')}</p>
          <h2 id="lh-tokkimi-title">{t('TalkToMe Club fait partie de tokkimi.com', 'TalkToMe Club is part of tokkimi.com')}</h2>
          <p>{t(`TalkToMe Club est une extension du projet tokkimi.com, consacrée à l’apprentissage des langues et à la pratique orale. Les deux projets appartiennent à ${OWNER}.`, `TalkToMe Club is an extension of the tokkimi.com project, dedicated to language learning and speaking practice. Both projects belong to ${OWNER}.`)}</p>
          <div className="lh-tokkimi-links">
            <a className="btn" href={TOKKIMI_URL} target="_blank" rel="noopener">{t('Découvrir tokkimi.com ↗', 'Discover tokkimi.com ↗')}</a>
            <Link className="btn ghost" to="/cgv">{t('Mentions et conditions', 'Legal notice and terms')}</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
