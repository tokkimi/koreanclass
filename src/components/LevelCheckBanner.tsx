import { Link } from 'react-router-dom'
import { SplineRobot } from './SplineRobot'

export interface LevelCheckCopy { eyebrow: string; title: string; text: string; minutes: string; custom: string; questions: string; cta: string; to: string }
export function LevelCheckBanner({ questionCount, copy }: { questionCount: number; copy?: LevelCheckCopy }) {
  const c: LevelCheckCopy = copy ?? {
    eyebrow: 'TEST DE POSITIONNEMENT',
    title: 'Et si tu te concentrais sur ton apprentissage ?',
    text: 'Montre-nous ce que tu sais faire. Évalue ton niveau dès maintenant : hangeul, compréhension, structures de phrases et nuances.',
    minutes: '≈ 18 min',
    custom: 'recommandation personnalisée',
    questions: 'questions',
    cta: 'Évaluer mon niveau maintenant',
    to: '/test-de-niveau',
  }
  return <section className="level-check" aria-labelledby="level-check-title">
    <div className="level-check-copy">
      <p className="hc-eyebrow light">{c.eyebrow}</p>
      <h2 id="level-check-title">{c.title}</h2>
      <p>{c.text}</p>
      <div className="level-check-meta"><span>{questionCount} {c.questions}</span><span>{c.minutes}</span><span>{c.custom}</span></div>
      <Link to={c.to} className="btn hc-light">{c.cta} <span aria-hidden="true">→</span></Link>
    </div>
    <div className="level-check-robot" aria-label="Robot 3D interactif">
      <SplineRobot />
    </div>
  </section>
}
