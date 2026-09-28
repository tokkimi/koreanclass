import { useState } from 'react'
import { Link } from 'react-router-dom'

const PRACTICE_VIDEO = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_170732_8a9ccda6-5cff-4628-b164-059c500a2b41.mp4'

export interface PracticeCopy { eyebrow: string; title: string; text: string; tags: [string, string, string]; cta: string; to: string }
export function PracticeVideoInvite({ copy }: { copy?: PracticeCopy } = {}) {
  const c: PracticeCopy = copy ?? {
    eyebrow: 'MISES EN SITUATION',
    title: 'Ne reconnais pas seulement les mots. Utilise-les.',
    text: 'Commande un café, organise une sortie, résous un problème en voyage. Choisis ta réponse, écoute-la, puis prends la parole.',
    tags: ['jeu de dialogue', 'écoute', 'prise de parole'],
    cta: 'Tester les mises en situation',
    to: '/pratique',
  }
  const [videoUnavailable, setVideoUnavailable] = useState(false)
  return <section className={`practice-video-invite ${videoUnavailable ? 'is-image' : ''}`} aria-labelledby="practice-video-title">
    {!videoUnavailable && <video autoPlay loop muted playsInline preload="metadata" poster="/images/cafe.jpg" onError={() => setVideoUnavailable(true)}>
      <source src={PRACTICE_VIDEO} type="video/mp4" />
    </video>}
    <div className="practice-video-veil" aria-hidden="true" />
    <div className="practice-video-copy">
      <p className="hc-eyebrow light">{c.eyebrow}</p>
      <h2 id="practice-video-title">{c.title}</h2>
      <p>{c.text}</p>
      <div className="practice-video-tags" aria-label="Ce que proposent les mises en situation"><span>{c.tags[0]}</span><span>{c.tags[1]}</span><span>{c.tags[2]}</span></div>
      <Link to={c.to} className="btn hc-light">{c.cta} <span aria-hidden="true">→</span></Link>
    </div>
  </section>
}
