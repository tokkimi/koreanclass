import { Link } from 'react-router-dom'
import { levels } from '../data'
import { structureUnits } from '../data/structures'
import { levelStats, useCurrentUser, useProgress } from '../lib/store'
import { ProgressBar } from '../components/ProgressBar'

const CURRICULUM_OUTCOMES = [
  ['Lire, prononcer et écrire', 'blocs syllabiques, 받침, liaisons et sons proches'],
  ['Se présenter et agir au quotidien', 'politesse, présent, passé, futur, demande et interdiction'],
  ['Relier ses idées', 'cause, but, contraste, obligation, expérience et chronologie'],
  ['Faire une conversation nuancée', '거든요, -는데요, condition, registre, comparaison et changement'],
  ['Parler comme dans la vraie vie', 'nuances orales, refus, hypothèse, discours rapporté et décision'],
  ['Argumenter avec précision', 'concession, connecteurs écrits, opinion et organisation d’un texte'],
]

export default function Courses() {
  const user = useCurrentUser()
  const progress = useProgress()
  const stats = levelStats(progress)

  return (
    <div className="container page">
      <div className="page-head">
        <p className="eyebrow">TON CURSUS COMPLET</p>
        <h1>Un cursus pour comprendre, parler et construire tes phrases.</h1>
        <p className="muted">
          {levels.length} niveaux, du hangeul au coréen courant. Chaque leçon comprend un cours, du vocabulaire, des exemples audio et des exercices.
          {!user && (
            <>
              {' '}
              <Link to="/inscription" className="link">Créez un compte</Link> pour enregistrer votre progression.
            </>
          )}
        </p>
        <Link to="/test-de-niveau" className="btn ghost">Trouver mon point de départ</Link>
      </div>

      <section className="curriculum-intro" aria-labelledby="cursus-title">
        <div>
          <p className="eyebrow">6 PALIERS, 1 FIL ROUGE</p>
          <h2 id="cursus-title">Ce que tu vas savoir faire à chaque étape</h2>
          <p className="muted">Chaque niveau contient des leçons guidées, du vocabulaire, des dialogues, des exercices corrigés, des ateliers de structures et des jeux de mise en situation.</p>
        </div>
        <ol className="curriculum-map">
          {stats.map(({ level }, index) => {
            const [outcome, detail] = CURRICULUM_OUTCOMES[index]
            const unitCount = structureUnits.filter((unit) => unit.level === level.index).length
            return <li key={level.id} style={{ ['--level-color' as string]: level.color }}>
              <span>{index + 1}</span><div><strong>{level.cefr} · {outcome}</strong><small>{detail} · {unitCount} ateliers de structures</small></div>
            </li>
          })}
        </ol>
      </section>

      <section className="course-tools" aria-label="Ateliers complémentaires">
        <Link to="/vocabulaire" className="card"><h2>Vocabulaire thématique</h2><p>Des mots en contexte, des phrases modèles et des QCM pour les mémoriser activement.</p><span className="link">Découvrir les mots →</span></Link>
        <Link to="/nombres" className="card"><h2>Chiffres & nombres</h2><p>Deux systèmes, âge, heure, dates, prix et monnaie avec exercices progressifs.</p><span className="link">Apprendre à compter →</span></Link>
        <Link to="/structures" className="card"><h2>Toutes les structures de phrase</h2><p>{structureUnits.length} ateliers : phrase simple, temps, cause, liaison, registre, oral et argumentation. Chaque forme est expliquée, décomposée et exercée.</p><span className="link">Explorer les structures →</span></Link>
      </section>

      <section className="course-levels" aria-label="Les six cursus">
        <h2>Choisis un cursus ou reprends là où tu en es</h2>
        <div className="level-grid">
        {stats.map(({ level, done, total, pct, test }) => {
          const [outcome, detail] = CURRICULUM_OUTCOMES[level.index]
          const unitList = structureUnits.filter((unit) => unit.level === level.index)
          return (
          <Link key={level.id} to={`/cours/${level.id}`} className="card level-card" style={{ ['--accent' as string]: level.color }}>
            <div className="row between">
              <span className="level-num">{level.index + 1}</span>
              <span className="pill">{level.cefr}</span>
            </div>
            <h2>
              {level.name.split('— ')[1]} <span className="ko-text muted">{level.korean}</span>
            </h2>
            <p className="small muted">{level.topik} · {total} leçons</p>
            <p><strong>{outcome}</strong><br /><span className="small">{detail}</span></p>
            <ul className="course-structure-list">
              {unitList.slice(0, 3).map((unit) => <li key={unit.id}>{unit.patterns.map((pattern) => pattern.form).join(' · ')}</li>)}
            </ul>
            <ProgressBar value={pct} color={level.color} />
            <div className="row between small muted">
              <span>
                {done}/{total} leçons
              </span>
              <span>{test?.passed ? '🏅 Niveau validé' : test ? `Test : ${test.best} %` : 'Test non passé'}</span>
            </div>
          </Link>)
        })}
        </div>
      </section>
    </div>
  )
}
