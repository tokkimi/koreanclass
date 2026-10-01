import { Link } from 'react-router-dom'
import { localized, type LanguageInfo } from '../data/languages'
import { useSiteLang } from '../lib/i18n'
import { PRICING } from '../config'
import { courseLevels } from '../data/courses'
import { packHourly, packSaving } from '../lib/pricing'

/** Textes de la page, en français ou en anglais selon la langue d'explication du cours. */
const T = {
  fr: {
    back: '← Toutes les langues',
    start: 'Commencer les cours →',
    lessons: 'leçons',
    path: 'Ton parcours',
    pathTitle: 'Du premier cours au niveau courant.',
    exam: 'Examen visé',
    soonTitle: 'Les cours en autonomie arrivent.',
    soon: 'Le parcours complet (leçons, vocabulaire, quiz et tests de niveau) est en préparation et sera mis en ligne niveau par niveau. En attendant, un professeur peut t’accompagner dès maintenant.',
    teacher: 'Avec un professeur',
    teacherTitle: 'Commence dès aujourd’hui.',
    teacherLead: 'Cours particulier en visio, adapté à ton niveau et à tes objectifs.',
    one: 'Une heure',
    oneSub: 'Pour essayer, sans engagement',
    pack: 'Pack 10 heures',
    packSub: `${packHourly()} €/h · ${packSaving()} € d’économie`,
    bookOne: 'Réserver 1 heure →',
    bookPack: 'Prendre le pack →',
  },
  en: {
    back: '← All languages',
    start: 'Start the lessons →',
    lessons: 'lessons',
    path: 'Your path',
    pathTitle: 'From your first lesson to fluency.',
    exam: 'Target exam',
    soonTitle: 'Self-study lessons are on their way.',
    soon: 'The full course (lessons, vocabulary, quizzes and level tests) is being prepared and will go online level by level. In the meantime, a teacher can guide you right now.',
    teacher: 'With a teacher',
    teacherTitle: 'Start today.',
    teacherLead: 'One-to-one video lessons, tailored to your level and goals.',
    one: 'One hour',
    oneSub: 'Try it, no commitment',
    pack: '10-hour pack',
    packSub: `€${packHourly()}/h · save €${packSaving()}`,
    bookOne: 'Book 1 hour →',
    bookPack: 'Get the pack →',
  },
}

export default function LanguagePage({ lang }: { lang: LanguageInfo }) {
  const site = useSiteLang()
  const ui = lang.taughtIn === 'en' || site === 'en' ? 'en' : 'fr'
  const t = T[ui]
  const loc = localized(lang, ui === 'en')
  const levels = courseLevels(lang.id)
  const open = lang.available && levels.length > 0
  return (
    <div className="lp" style={{ ['--lang' as string]: lang.accent, ['--lang-tint' as string]: lang.tint }} lang={ui}>
      <section className="lp-hero">
        <div className="container">
          <Link to="/" className="link small">
            {t.back}
          </Link>
          <p className="lp-hello" lang={lang.speech}>
            {lang.hello}
          </p>
          <h1 className="lh-title">
            {ui === 'en' ? `Learn ${loc.name}` : `Apprendre le ${lang.name.toLowerCase()}`} <span lang={lang.speech}>{lang.native}</span>
          </h1>
          <p className="hc-lead">{loc.pitch}</p>
          <p className="small muted">
            {t.exam} : <strong>{lang.exam}</strong>
          </p>
          {open && (
            <div className="row">
              <Link className="btn" to={`${lang.path}/cours`}>
                {t.start}
              </Link>
            </div>
          )}
        </div>
      </section>

      <section className="container hc-section lp-path">
        <p className="hc-eyebrow">{t.path}</p>
        <h2>{t.pathTitle}</h2>
        <ol className="lp-levels">
          {loc.levels.map((l, i) => (
            <li key={l.code}>
              <span className="lp-level-num">{String(i + 1).padStart(2, '0')}</span>
              <div>
                <strong>{l.title}</strong> <span className="lp-code">{l.code}</span>
                <p className="muted small">{l.detail}</p>
                {open && levels[i] && (
                  <Link className="link small" to={`${lang.path}/cours/${levels[i].id}`}>
                    {levels[i].lessons.length} {t.lessons} →
                  </Link>
                )}
              </div>
            </li>
          ))}
        </ol>
        {!open && (
          <div className="lp-soon">
            <strong>{t.soonTitle}</strong>
            <p>{t.soon}</p>
          </div>
        )}
      </section>

      <section className="lh-book" id="tarifs">
        <div className="container">
          <p className="hc-eyebrow">{t.teacher}</p>
          <h2>{t.teacherTitle}</h2>
          <p className="hc-lead">{t.teacherLead}</p>
          <div className="lh-offers">
            <div className="lh-offer">
              <span className="lh-offer-name">{t.one}</span>
              <span className="lh-offer-price">{PRICING.single.price} €</span>
              <span className="muted small">{t.oneSub}</span>
              <Link className="btn" to={`/reserver?langue=${lang.id}&formule=single`}>
                {t.bookOne}
              </Link>
            </div>
            <div className="lh-offer featured">
              <span className="lh-offer-name">{t.pack}</span>
              <span className="lh-offer-price">{PRICING.pack10.price} €</span>
              <span className="muted small">{t.packSub}</span>
              <Link className="btn" to={`/reserver?langue=${lang.id}&formule=pack10`}>
                {t.bookPack}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
