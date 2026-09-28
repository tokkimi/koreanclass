import { Link } from 'react-router-dom'
import type { CSSProperties } from 'react'
import { useUiLang } from '../lib/i18n'

const stages = [
  { level: '00', name: 'Hangeul', detail: 'Lire les blocs', tone: 'blue' },
  { level: '01', name: 'A1', detail: 'Se présenter', tone: 'mint' },
  { level: '02', name: 'A2', detail: 'Se raconter', tone: 'lavender' },
  { level: '03', name: 'B1', detail: 'Relier ses idées', tone: 'sky' },
  { level: '04', name: 'B2', detail: 'Nuancer', tone: 'violet' },
  { level: '05', name: 'C1+', detail: 'Parler naturellement', tone: 'ink' },
]

/** Textes modifiables pour les autres langues ; sans eux, la version coréenne reste identique. */
export interface JourneyCopy {
  eyebrow: string
  title: string
  text: string
  stages: { level: string; name: string; detail: string; tone: string }[]
  goal: string
  start: string
  startTo: string
  teacher: string
  teacherTo: string
  labels: [string, string, string, string, string, string]
}
export function JourneySnapshot({ levels, lessons, guidedHours, copy }: { levels: number; lessons: number; guidedHours: number; copy?: JourneyCopy }) {
  const ui = useUiLang()
  const c: JourneyCopy = copy ?? (ui === 'en' ? {
    eyebrow: 'A REAL PATH, NOT A LIST OF LESSONS',
    title: 'A clear path, from hangul to TOPIK.',
    text: 'Build the basics, link your ideas, then speak with precision. You move at your own pace, with a clear milestone at every step.',
    stages: stages.map((s, i) => ({ ...s, name: i === 0 ? 'Hangul' : s.name, detail: ['Read the blocks', 'Introduce yourself', 'Tell your story', 'Link ideas', 'Nuance', 'Speak naturally'][i] })),
    goal: 'TOPIK',
    start: 'Start my course',
    startTo: '/cours',
    teacher: 'Get help from a teacher',
    teacherTo: '/reserver',
    labels: ['progressive levels', 'lessons and workshops', 'of guided learning', '6 steps', 'One goal at a time', 'final goal'],
  } : {
    eyebrow: 'UN VRAI CHEMIN, PAS UNE LISTE DE COURS',
    title: 'Un parcours lisible, du hangeul au TOPIK.',
    text: 'Construis les bases, relie tes idées, puis prends la parole avec précision. Tu avances à ton rythme, avec un point clair à chaque étape.',
    stages,
    goal: 'TOPIK',
    start: 'Commencer mon parcours',
    startTo: '/cours',
    teacher: 'Être accompagnée par ton prof',
    teacherTo: '/reserver',
    labels: ['niveaux progressifs', 'leçons et ateliers', 'de parcours guidé', '6 étapes', 'Un cap à la fois', 'objectif final'],
  })
  return <section className="journey-snapshot" aria-labelledby="journey-title">
    <div className="journey-copy">
      <p className="hc-eyebrow">{c.eyebrow}</p>
      <h2 id="journey-title">{c.title}</h2>
      <p>{c.text}</p>
      <dl className="journey-stats">
        <div><dt>{levels}</dt><dd>{c.labels[0]}</dd></div>
        <div><dt>{lessons}</dt><dd>{c.labels[1]}</dd></div>
        <div><dt>≈ {guidedHours} h</dt><dd>{c.labels[2]}</dd></div>
      </dl>
      <div className="journey-actions">
        <Link to={c.startTo} className="btn">{c.start} <span aria-hidden="true">→</span></Link>
        <Link to={c.teacherTo} className="btn ghost">{c.teacher}</Link>
      </div>
    </div>
    <div className="journey-visual" aria-label={ui === 'en' ? 'The six steps of the course' : 'Les six étapes du parcours'}>
      <div className="journey-visual-heading"><span>{c.labels[3]}</span><strong>{c.labels[4]}</strong></div>
      <div className="journey-track">
        {c.stages.map((stage, index) => <article className={`journey-stage ${stage.tone}`} style={{ ['--delay' as string]: `${index * -0.45}s` } as CSSProperties} key={stage.level}>
          <span>{stage.level}</span><strong>{stage.name}</strong><small>{stage.detail}</small>
        </article>)}
      </div>
      <div className="journey-finish"><span>{c.labels[5]}</span><strong>{c.goal}</strong></div>
    </div>
  </section>
}
