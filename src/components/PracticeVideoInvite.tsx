import { useState } from 'react'
import { Link } from 'react-router-dom'

const PRACTICE_VIDEO = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_170732_8a9ccda6-5cff-4628-b164-059c500a2b41.mp4'

export function PracticeVideoInvite() {
  const [videoUnavailable, setVideoUnavailable] = useState(false)
  return <section className={`practice-video-invite ${videoUnavailable ? 'is-image' : ''}`} aria-labelledby="practice-video-title">
    {!videoUnavailable && <video autoPlay loop muted playsInline preload="metadata" poster="/images/cafe.jpg" onError={() => setVideoUnavailable(true)}>
      <source src={PRACTICE_VIDEO} type="video/mp4" />
    </video>}
    <div className="practice-video-veil" aria-hidden="true" />
    <div className="practice-video-copy">
      <p className="hc-eyebrow light">MISES EN SITUATION</p>
      <h2 id="practice-video-title">Ne reconnais pas seulement les mots. Utilise-les.</h2>
      <p>Commande un café, organise une sortie, résous un problème en voyage. Choisis ta réponse, écoute-la, puis prends la parole.</p>
      <div className="practice-video-tags" aria-label="Ce que proposent les mises en situation"><span>jeu de dialogue</span><span>écoute</span><span>prise de parole</span></div>
      <Link to="/pratique" className="btn hc-light">Tester les mises en situation <span aria-hidden="true">→</span></Link>
    </div>
    <div className="practice-video-cards" aria-hidden="true">
      <article className="practice-scenario-card">
        <img src="/images/cafe.jpg" alt="" /><div className="practice-scenario-shade" />
        <div><span>01 · commander</span><strong>Au café</strong><small>Choisis, écoute, réponds.</small></div>
      </article>
      <article className="practice-scenario-card">
        <img src="/images/online-korean-lesson.png" alt="" /><div className="practice-scenario-shade" />
        <div><span>02 · proposer</span><strong>Entre amis</strong><small>Organise une sortie.</small></div>
      </article>
      <article className="practice-scenario-card">
        <img src="/images/seoul.jpg" alt="" /><div className="practice-scenario-shade" />
        <div><span>03 · se débrouiller</span><strong>En voyage</strong><small>Trouve ton chemin.</small></div>
      </article>
    </div>
  </section>
}
