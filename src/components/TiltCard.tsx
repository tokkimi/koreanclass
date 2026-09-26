import { useRef, type PointerEvent, type ReactNode } from 'react'
import { Link } from 'react-router-dom'

/**
 * Carte photo qui s'incline en 3D en suivant la souris
 * (adaptée de « InteractiveTravelCard », sans framer-motion :
 * l'inclinaison est écrite dans deux variables CSS, l'animation
 * de retour est une simple transition CSS).
 * Pas d'inclinaison au toucher ni avec « réduire les animations ».
 */
export interface TiltCardProps {
  title: string
  subtitle: string
  imageUrl: string
  /** Petite étiquette en haut à droite (ex. le prix). */
  badge: ReactNode
  actionText: string
  to: string
  children?: ReactNode
}

export function TiltCard({ title, subtitle, imageUrl, badge, actionText, to, children }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null)

  function move(e: PointerEvent<HTMLDivElement>) {
    if (e.pointerType !== 'mouse' || !ref.current) return
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return
    const r = ref.current.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - 0.5
    const y = (e.clientY - r.top) / r.height - 0.5
    ref.current.style.setProperty('--ry', `${(x * 21).toFixed(2)}deg`)
    ref.current.style.setProperty('--rx', `${(-y * 21).toFixed(2)}deg`)
  }
  function leave() {
    ref.current?.style.setProperty('--ry', '0deg')
    ref.current?.style.setProperty('--rx', '0deg')
  }

  return (
    <div className="tilt-wrap">
      <div ref={ref} className="tilt-card" onPointerMove={move} onPointerLeave={leave}>
        <div className="tilt-inner">
          <img src={imageUrl} alt="" loading="lazy" />
          <div className="tilt-shade" aria-hidden="true" />
          <div className="tilt-content">
            <div className="tilt-top">
              <div>
                <h3>{title}</h3>
                <p>{subtitle}</p>
              </div>
              <span className="tilt-badge">{badge}</span>
            </div>
            {children && <div className="tilt-body">{children}</div>}
            <Link to={to} className="tilt-action">
              {actionText}
              <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                <path d="M7 17 17 7M8 7h9v9" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
