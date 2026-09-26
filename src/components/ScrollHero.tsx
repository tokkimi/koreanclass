import { useEffect, useRef, useState, type CSSProperties, type MouseEvent } from 'react'
import { Link } from 'react-router-dom'

/**
 * Bannière d'accueil pilotée par le défilement.
 *
 * Adaptée de « scroll-locked-video-hero » mais sans verrouillage :
 * la section est plus haute que l'écran et son contenu reste collé
 * (position: sticky) pendant qu'on défile. La position de défilement
 * donne une progression 0 → 1, écrite dans la variable CSS --p ;
 * toutes les animations (zoom, parallaxe, textes) sont calculées en CSS.
 * Aucun preventDefault, aucun blocage du body : le défilement natif,
 * le clavier et le tactile fonctionnent normalement.
 */
export interface ScrollHeroProps {
  /** Image toujours affichée (et image de secours si la vidéo échoue). */
  imageSrc: string
  /** Vidéo facultative : sa lecture suit le défilement. */
  videoSrc?: string
  /** id de l'élément vers lequel pointe « Passer aux cours ». */
  skipTargetId: string
  title?: string
  words?: string[]
  ctaLabel?: string
  ctaTo?: string
}

const clamp = (v: number, min = 0, max = 1) => Math.min(max, Math.max(min, v))
const reducedQuery = '(prefers-reduced-motion: reduce)'

function prefersReducedMotion() {
  return typeof window !== 'undefined' && !!window.matchMedia?.(reducedQuery).matches
}

export function ScrollHero({
  imageSrc,
  videoSrc,
  skipTargetId,
  title = 'Le coréen commence ici.',
  words = ['Écoute.', 'Comprends.', 'Ose parler.'],
  ctaLabel = 'Découvrir les cours',
  ctaTo = '/cours',
}: ScrollHeroProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [reduced, setReduced] = useState(prefersReducedMotion)
  const [videoReady, setVideoReady] = useState(false)
  const [videoFailed, setVideoFailed] = useState(false)
  const useVideo = !!videoSrc && !videoFailed && !reduced

  // Suit les changements de préférence « réduire les animations ».
  useEffect(() => {
    const mq = window.matchMedia?.(reducedQuery)
    if (!mq) return
    const onChange = () => setReduced(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  // La scène se colle juste sous le header : on suit sa hauteur réelle.
  useEffect(() => {
    const section = sectionRef.current
    const header = document.querySelector<HTMLElement>('.header')
    if (!section || !header) return
    const apply = () => section.style.setProperty('--header-h', `${header.offsetHeight}px`)
    apply()
    const ro = new ResizeObserver(apply)
    ro.observe(header)
    return () => ro.disconnect()
  }, [])

  useEffect(() => {
    const section = sectionRef.current
    const stage = stageRef.current
    if (!section || !stage || reduced) return

    let raf = 0
    let active = false
    let lastP = -1
    let seeking = false
    let pendingTime: number | null = null
    const video = useVideo ? videoRef.current : null

    const seek = (t: number) => {
      if (!video) return
      if (seeking) {
        pendingTime = t
        return
      }
      seeking = true
      video.currentTime = t
    }
    const onSeeked = () => {
      seeking = false
      if (pendingTime !== null) {
        const t = pendingTime
        pendingTime = null
        seek(t)
      }
    }
    video?.addEventListener('seeked', onSeeked)

    const update = () => {
      raf = 0
      const rect = section.getBoundingClientRect()
      const distance = rect.height - stage.offsetHeight
      const p = distance > 0 ? clamp(-rect.top / distance) : 0
      if (Math.abs(p - lastP) < 0.0005) return
      lastP = p
      stage.style.setProperty('--p', p.toFixed(4))
      stage.dataset.final = p > 0.7 ? 'true' : 'false'
      stage.dataset.started = p > 0.02 ? 'true' : 'false'
      if (video && video.duration > 0) seek(p * (video.duration - 0.05))
    }

    // Un seul calcul par image, et seulement quand quelque chose a bougé.
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    const attach = () => {
      if (active) return
      active = true
      window.addEventListener('scroll', schedule, { passive: true })
      window.addEventListener('resize', schedule, { passive: true })
      schedule()
    }
    const detach = () => {
      if (!active) return
      active = false
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      if (raf) cancelAnimationFrame(raf)
      raf = 0
    }

    // On n'écoute le défilement que lorsque la bannière est à l'écran.
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) attach()
      else {
        update() // fige l'état final (0 ou 1) avant de se détacher
        detach()
      }
    })
    io.observe(section)
    update()

    return () => {
      io.disconnect()
      detach()
      video?.removeEventListener('seeked', onSeeked)
    }
  }, [reduced, useVideo])

  function skip(e: MouseEvent<HTMLAnchorElement>) {
    const target = document.getElementById(skipTargetId)
    if (!target) return
    e.preventDefault()
    target.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' })
    target.focus({ preventScroll: true })
  }

  return (
    <section ref={sectionRef} className={`scroll-hero ${reduced ? 'is-static' : ''}`} aria-labelledby="scroll-hero-title">
      <div ref={stageRef} className="scroll-hero__stage" data-final={reduced ? 'true' : 'false'} style={{ '--p': reduced ? 1 : 0 } as CSSProperties}>
        <div className="scroll-hero__media" aria-hidden="true">
          <img className="scroll-hero__img" src={imageSrc} alt="" decoding="async" fetchPriority="high" />
          {useVideo && (
            <video
              ref={videoRef}
              className={`scroll-hero__video ${videoReady ? 'is-ready' : ''}`}
              src={videoSrc}
              poster={imageSrc}
              muted
              playsInline
              preload="auto"
              tabIndex={-1}
              onLoadedData={() => setVideoReady(true)}
              onError={() => setVideoFailed(true)}
            />
          )}
        </div>
        <div className="scroll-hero__veil" aria-hidden="true" />

        <a className="scroll-hero__skip" href={`#${skipTargetId}`} onClick={skip}>
          Passer aux cours <span aria-hidden="true">↓</span>
        </a>

        <div className="scroll-hero__copy">
          <h1 id="scroll-hero-title" className="scroll-hero__title">
            {title}
          </h1>
          <p className="scroll-hero__words">
            {words.map((w, i) => (
              <span key={w} style={{ '--i': i } as CSSProperties}>
                {w}{' '}
              </span>
            ))}
          </p>
          <Link to={ctaTo} className="btn scroll-hero__cta">
            {ctaLabel} <span aria-hidden="true">→</span>
          </Link>
        </div>

        <div className="scroll-hero__hint" aria-hidden="true">
          <span>Fais défiler</span>
          <svg width="14" height="18" viewBox="0 0 14 18">
            <path d="M7 1v16M2 12l5 5 5-5" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div className="scroll-hero__progress" aria-hidden="true">
          <span />
        </div>
      </div>
    </section>
  )
}
