import { Link } from 'react-router-dom'
import { SplineRobot } from './SplineRobot'

export function LevelCheckBanner({ questionCount }: { questionCount: number }) {
  return <section className="level-check" aria-labelledby="level-check-title">
    <div className="level-check-copy">
      <p className="hc-eyebrow light">TEST DE POSITIONNEMENT</p>
      <h2 id="level-check-title">Et si tu te concentrais sur ton apprentissage ?</h2>
      <p>Montre-nous ce que tu sais faire. Évalue ton niveau dès maintenant : hangeul, compréhension, structures de phrases et nuances.</p>
      <div className="level-check-meta"><span>{questionCount} questions</span><span>≈ 18 min</span><span>recommandation personnalisée</span></div>
      <Link to="/test-de-niveau" className="btn hc-light">Évaluer mon niveau maintenant <span aria-hidden="true">→</span></Link>
    </div>
    <div className="level-check-robot" aria-label="Robot 3D interactif">
      <SplineRobot />
    </div>
  </section>
}
