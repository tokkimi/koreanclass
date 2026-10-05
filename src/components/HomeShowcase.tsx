import { Link } from 'react-router-dom'
import { levels } from '../data'
import { courseLevels } from '../data/courses'
import { usePlans } from '../lib/plans'
import { OFFERS } from '../lib/pricing'

type T = (fr: string, en: string) => string

/** Chiffres réels calculés à partir des cours en ligne (5 langues). */
function totals() {
  const all = [levels, ...['japonais', 'espagnol', 'anglais', 'francais'].map((l) => courseLevels(l))].flatMap((lv) => lv.flatMap((l) => l.lessons))
  const round = (n: number) => Math.floor(n / 100) * 100
  return {
    lessons: round(all.length),
    exercises: round(all.reduce((n, l) => n + l.exercises.length, 0)),
    words: round(all.reduce((n, l) => n + l.vocab.length, 0)),
  }
}
const nf = (n: number, en: boolean) => n.toLocaleString(en ? 'en-GB' : 'fr-FR')

/** Blocs de présentation de l'accueil : chiffres, leçon en 5 étapes, outils, objectifs. */
export function HomeShowcase({ t, en }: { t: T; en: boolean }) {
  const n = totals()
  return (
    <>
      <section className="container hs-stats" aria-label={t('Le club en chiffres', 'The club in numbers')}>
        <div><strong>5</strong><span>{t('langues', 'languages')}</span></div>
        <div><strong>6</strong><span>{t('niveaux par langue, du débutant au courant', 'levels per language, beginner to fluent')}</span></div>
        <div><strong>{nf(n.lessons, en)}+</strong><span>{t('leçons', 'lessons')}</span></div>
        <div><strong>{nf(n.exercises, en)}+</strong><span>{t('exercices corrigés', 'corrected exercises')}</span></div>
        <div><strong>{nf(n.words, en)}+</strong><span>{t('mots avec audio', 'words with audio')}</span></div>
      </section>

      <section className="container hs-steps" aria-labelledby="hs-steps-title">
        <p className="hc-eyebrow">{t('Une méthode claire', 'A clear method')}</p>
        <h2 id="hs-steps-title">{t('Chaque leçon en 5 étapes', 'Every lesson in 5 steps')}</h2>
        <p className="hc-lead">{t('Comprendre, écouter, s’entraîner, parler, puis retenir : le même parcours dans les cinq langues, sur téléphone comme sur ordinateur.', 'Understand, listen, practise, speak, then remember: the same path in all five languages, on phone or computer.')}</p>
        <ol className="hs-step-list">
          <li>
            <div className="hs-illu hs-illu-learn" aria-hidden="true"><span className="hs-line w80" /><span className="hs-line w60" /><span className="hs-chip">💡 {t('À retenir', 'Key point')}</span><span className="hs-line w70" /></div>
            <strong>1. {t('Apprendre', 'Learn')}</strong>
            <p>{t('Objectifs, explications, tableaux, exemples et erreurs fréquentes.', 'Objectives, explanations, tables, examples and common mistakes.')}</p>
          </li>
          <li>
            <div className="hs-illu hs-illu-listen" aria-hidden="true"><span className="hs-play">▶</span><span className="hs-wave">{Array.from({ length: 14 }, (_, i) => <i key={i} style={{ height: `${20 + ((i * 37) % 60)}%` }} />)}</span><span className="hs-chip">🐢 {t('Lent', 'Slow')}</span></div>
            <strong>2. {t('Écouter', 'Listen')}</strong>
            <p>{t('Phrases et dialogues en vitesse normale ou lente, texte affiché à la demande.', 'Sentences and dialogues at normal or slow speed, text on demand.')}</p>
          </li>
          <li>
            <div className="hs-illu hs-illu-practice" aria-hidden="true"><span className="hs-opt ok">✓ 안녕하세요</span><span className="hs-opt">こんにちは</span><span className="hs-opt">Hola</span></div>
            <strong>3. {t('Pratiquer', 'Practise')}</strong>
            <p>{t('QCM, phrases à compléter, mots à remettre dans l’ordre, corrigés et expliqués.', 'Quizzes, gap fills and word ordering, corrected and explained.')}</p>
          </li>
          <li>
            <div className="hs-illu hs-illu-speak" aria-hidden="true"><span className="hs-mic">🎙️</span><span className="hs-bubble">« Un café, s’il vous plaît »</span><span className="hs-chip">{t('Jeu de rôle', 'Role play')}</span></div>
            <strong>4. {t('Parler', 'Speak')}</strong>
            <p>{t('Répétition phrase par phrase, jeux de rôle et ta propre phrase.', 'Sentence-by-sentence repetition, role plays and your own sentence.')}</p>
          </li>
          <li>
            <div className="hs-illu hs-illu-review" aria-hidden="true"><span className="hs-card back" /><span className="hs-card front">맛있어요<small>{t('délicieux', 'delicious')}</small></span></div>
            <strong>5. {t('Réviser', 'Review')}</strong>
            <p>{t('Flashcards, révisions espacées et carnet d’erreurs pour retenir pour de bon.', 'Flashcards, spaced reviews and a mistake notebook to remember for good.')}</p>
          </li>
        </ol>
      </section>

      <section className="hs-tools" aria-labelledby="hs-tools-title">
        <div className="container">
          <p className="hc-eyebrow">{t('Tout pour progresser', 'Everything to progress')}</p>
          <h2 id="hs-tools-title">{t('Ton parcours, suivi jour après jour', 'Your path, tracked day by day')}</h2>
          <div className="hs-tool-grid">
            <article>
              <div className="hs-illu hs-illu-dash" aria-hidden="true"><span className="hs-label">{t('Aujourd’hui', 'Today')}</span>{[78, 52, 34].map((w, i) => <span key={i} className="hs-bar"><i style={{ width: `${w}%` }} /></span>)}</div>
              <h3>{t('Un tableau de bord par langue', 'A dashboard per language')}</h3>
              <p>{t('La prochaine action conseillée, ton objectif du jour et tes progrès par compétence.', 'Your next suggested step, daily goal and progress by skill.')}</p>
            </article>
            <article>
              <div className="hs-illu hs-illu-cal" aria-hidden="true">{Array.from({ length: 21 }, (_, i) => <i key={i} className={[2, 5, 9, 13, 20].includes(i) ? 'on' : ''} />)}</div>
              <h3>{t('Des révisions au bon moment', 'Reviews at the right time')}</h3>
              <p>{t('Les mots reviennent 1 jour, 3 jours, puis de plus en plus tard : ce que tu oublies passe en premier.', 'Words come back after 1 day, 3 days, then later and later: what you forget comes first.')}</p>
            </article>
            <article>
              <div className="hs-illu hs-illu-sheet" aria-hidden="true"><span className="hs-page"><span className="hs-line w80" /><span className="hs-line w60" /><span className="hs-line w70" /></span><span className="hs-chip">PDF</span></div>
              <h3>{t('Des fiches à imprimer', 'Printable sheets')}</h3>
              <p>{t('Notions, vocabulaire, exemples et exercices, avec le corrigé à part.', 'Key points, vocabulary, examples and exercises, with a separate answer key.')}</p>
            </article>
            <article>
              <div className="hs-illu hs-illu-teacher" aria-hidden="true"><span className="hs-face">👩‍🏫</span><span className="hs-face">🙂</span><span className="hs-chip">{t('Visio · 1 h', 'Video · 1 h')}</span></div>
              <h3>{t('Un professeur quand tu veux', 'A teacher whenever you want')}</h3>
              <p>{t('Cours particulier en visio, bilan après chaque séance et activités conseillées.', 'Private video lesson, a summary after each session and suggested activities.')}</p>
            </article>
          </div>
          <p className="small muted hs-note">{t('Ta progression est enregistrée sur ton compte : tu la retrouves sur ton téléphone, ta tablette ou ton ordinateur.', 'Your progress is saved to your account: pick it up on your phone, tablet or computer.')}</p>
        </div>
      </section>

      <section className="container hs-goals" aria-labelledby="hs-goals-title">
        <h2 id="hs-goals-title">{t('Quel est ton objectif ?', 'What is your goal?')}</h2>
        <div className="hs-goal-grid">
          {[
            ['✈️', t('Voyager', 'Travel'), t('Commander, demander ton chemin, te débrouiller sur place.', 'Order, ask the way, get by on the spot.')],
            ['🏠', t('Vie quotidienne', 'Daily life'), t('Te présenter, parler de ta journée, de ta famille, de tes goûts.', 'Introduce yourself, talk about your day, family and tastes.')],
            ['💼', t('Travail', 'Work'), t('Registre poli, réunions, e-mails et entretiens.', 'Polite register, meetings, emails and interviews.')],
            ['🎓', t('Examen', 'Exam'), t('Grammaire structurée et tests par niveau (CECRL, TOPIK, JLPT, DELE, Cambridge, DELF).', 'Structured grammar and level tests (CEFR, TOPIK, JLPT, DELE, Cambridge, DELF).')],
          ].map(([icon, title, text]) => (
            <div key={title} className="hs-goal"><span aria-hidden="true">{icon}</span><strong>{title}</strong><p>{text}</p></div>
          ))}
        </div>
        <p className="small muted">{t('Les tests du site te situent et te préparent ; ce ne sont pas des examens officiels.', 'The site’s tests place and prepare you; they are not official exams.')}</p>
      </section>
    </>
  )
}

/** Les formules : Découverte, Autonomie (abonnement) et cours avec un professeur. */
export function HomePlans({ t, en }: { t: T; en: boolean }) {
  const plans = usePlans()
  const euro = (n: number) => (en ? `€${n}` : `${n.toLocaleString('fr-FR', { minimumFractionDigits: n % 1 ? 2 : 0 })} €`)
  return (
    <section className="container hs-plans" id="formules" aria-labelledby="hs-plans-title">
      <p className="hc-eyebrow">{t('Nos formules', 'Our plans')}</p>
      <h2 id="hs-plans-title">{t('Commence gratuitement, avance à ton rythme', 'Start for free, go at your own pace')}</h2>
      <div className="plans">
        <div className="card plan">
          <h3>{t('Découverte', 'Discovery')}</h3>
          <p className="plan-price">{t('Gratuit', 'Free')}</p>
          <ul>
            <li>{t('La première leçon de chaque niveau', 'The first lesson of each level')}</li>
            <li>{t('Les tests de positionnement', 'Placement tests')}</li>
            <li>{t('Alphabet, nombres, vocabulaire', 'Alphabet, numbers, vocabulary')}</li>
          </ul>
          <Link className="btn ghost" to="/inscription">{t('Créer mon compte', 'Create my account')}</Link>
        </div>
        <div className="card plan featured">
          <span className="hs-badge">{t('Le plus complet', 'Most complete')}</span>
          <h3>Autonomie</h3>
          <p className="plan-price">{euro(plans.monthly)} <small>/ {t('mois', 'month')}</small></p>
          <p className="small muted">{t(`ou ${euro(plans.yearly)} par an · sans engagement`, `or ${euro(plans.yearly)} a year · cancel anytime`)}</p>
          <ul>
            <li>{t('Toutes les leçons, 6 niveaux, 5 langues', 'Every lesson, 6 levels, 5 languages')}</li>
            <li>{t('Tests de niveau, badges, tableau de bord', 'Level tests, badges, dashboard')}</li>
            <li>{t('Révisions espacées, flashcards, fiches PDF', 'Spaced reviews, flashcards, PDF sheets')}</li>
          </ul>
          <Link className="btn" to="/abonnement">{plans.enabled ? t('S’abonner', 'Subscribe') : t('Découvrir l’abonnement', 'See the plan')}</Link>
        </div>
        <div className="card plan">
          <h3>{t('Avec un professeur', 'With a teacher')}</h3>
          <p className="plan-price">{euro(OFFERS.single.price)} <small>/ h</small></p>
          <p className="small muted">{t(`ou ${OFFERS.pack10.hours} h pour ${euro(OFFERS.pack10.price)}`, `or ${OFFERS.pack10.hours} h for ${euro(OFFERS.pack10.price)}`)}</p>
          <ul>
            <li>{t('Cours particulier en visio', 'Private video lesson')}</li>
            <li>{t('Dans la langue de ton choix', 'In the language of your choice')}</li>
            <li>{t('Bilan et conseils après la séance', 'Summary and advice after the session')}</li>
          </ul>
          <a className="btn ghost" href="#tarifs">{t('Réserver un cours', 'Book a lesson')}</a>
        </div>
      </div>
    </section>
  )
}
