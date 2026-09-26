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
      <span><b>01</b> Café</span><span><b>02</b> Sortie</span><span><b>03</b> Voyage</span>
    </div>
  </section>
}
