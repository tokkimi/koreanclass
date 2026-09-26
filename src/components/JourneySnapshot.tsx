import { Link } from 'react-router-dom'
import type { CSSProperties } from 'react'

const stages = [
  { level: '00', name: 'Hangeul', detail: 'Lire les blocs', tone: 'blue' },
  { level: '01', name: 'A1', detail: 'Se présenter', tone: 'mint' },
  { level: '02', name: 'A2', detail: 'Se raconter', tone: 'lavender' },
  { level: '03', name: 'B1', detail: 'Relier ses idées', tone: 'sky' },
  { level: '04', name: 'B2', detail: 'Nuancer', tone: 'violet' },
  { level: '05', name: 'C1+', detail: 'Parler naturellement', tone: 'ink' },
]

export function JourneySnapshot({ levels, lessons, guidedHours }: { levels: number; lessons: number; guidedHours: number }) {
  return <section className="journey-snapshot" aria-labelledby="journey-title">
    <div className="journey-copy">
      <p className="hc-eyebrow">UN VRAI CHEMIN, PAS UNE LISTE DE COURS</p>
      <h2 id="journey-title">Un parcours lisible, du hangeul au TOPIK.</h2>
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
    <div className="journey-visual" aria-label="Les six étapes du parcours">
      <div className="journey-visual-heading"><span>6 étapes</span><strong>Un cap à la fois</strong></div>
      <div className="journey-track">
        {stages.map((stage, index) => <article className={`journey-stage ${stage.tone}`} style={{ ['--delay' as string]: `${index * -0.45}s` } as CSSProperties} key={stage.level}>
          <span>{stage.level}</span><strong>{stage.name}</strong><small>{stage.detail}</small>
        </article>)}
      </div>
      <div className="journey-finish"><span>objectif final</span><strong>TOPIK</strong></div>
    </div>
  </section>
}
