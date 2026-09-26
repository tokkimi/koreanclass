import { Link } from 'react-router-dom'
import type { CSSProperties } from 'react'

export function JourneySnapshot({ levels, lessons, guidedHours }: { levels: number; lessons: number; guidedHours: number }) {
  return <section className="journey-snapshot" aria-labelledby="journey-title">
    <div className="journey-copy">
      <p className="hc-eyebrow">UN VRAI CHEMIN, PAS UNE LISTE DE COURS</p>
      <h2 id="journey-title">Du premier bloc hangeul jusqu’aux phrases du TOPIK.</h2>
      <p>Construis les bases, relie tes idées, puis prends la parole avec précision. Tu avances à ton rythme, avec un point clair à chaque étape.</p>
      <dl className="journey-stats">
        <div><dt>{levels}</dt><dd>niveaux progressifs</dd></div>
        <div><dt>{lessons}</dt><dd>leçons et ateliers</dd></div>
        <div><dt>≈ {guidedHours} h</dt><dd>de parcours guidé</dd></div>
      </dl>
      <div className="journey-actions">
        <Link to="/cours" className="btn">Commencer mon parcours <span aria-hidden="true">→</span></Link>
        <Link to="/reserver" className="btn ghost">Être accompagnée par ton prof</Link>
      </div>
    </div>
    <div className="journey-visual" aria-hidden="true">
      <div className="journey-orbit journey-orbit-one" />
      <div className="journey-orbit journey-orbit-two" />
      <div className="journey-orbit journey-orbit-three" />
      <div className="journey-core"><small>objectif</small><strong>TOPIK</strong><span>parler<br />avec nuance</span></div>
      {['한글', 'A1', 'A2', 'B1', 'B2', 'C1+'].map((level, index) => <span className="journey-node" style={{ ['--i' as string]: index } as CSSProperties} key={level}>{level}</span>)}
    </div>
  </section>
}
