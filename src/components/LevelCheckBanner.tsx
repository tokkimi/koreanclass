import { Link } from 'react-router-dom'

export function LevelCheckBanner({ questionCount }: { questionCount: number }) {
  return <section className="level-check" aria-labelledby="level-check-title">
    <div className="level-check-copy">
      <p className="hc-eyebrow light">TEST DE POSITIONNEMENT</p>
      <h2 id="level-check-title">Et si tu te concentrais sur ton apprentissage ?</h2>
      <p>Montre-nous ce que tu sais faire. Évalue ton niveau dès maintenant : hangeul, compréhension, structures de phrases et nuances.</p>
      <div className="level-check-meta"><span>{questionCount} questions</span><span>≈ 18 min</span><span>recommandation personnalisée</span></div>
      <Link to="/test-de-niveau" className="btn hc-light">Évaluer mon niveau maintenant <span aria-hidden="true">→</span></Link>
    </div>
    <div className="assessment-deck" aria-hidden="true">
      <div className="assessment-card assessment-card-back"><small>structure</small><strong>-거든요</strong><span>expliquer naturellement</span></div>
      <div className="assessment-card assessment-card-middle"><small>liaison</small><strong>-아서</strong><span>exprimer une cause</span></div>
      <div className="assessment-card assessment-card-front"><small>ton niveau</small><strong>한글</strong><span>commence par ce que tu sais</span><i>01 / 06</i></div>
    </div>
  </section>
}
