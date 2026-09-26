import { lazy, Suspense, useCallback, useEffect, useMemo, useRef, useState, type PointerEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import type { OrbitCard, OrbitControl } from './OrbitGallery3D'

const OrbitGallery3D = lazy(() => import('./OrbitGallery3D'))

const reducedQuery = '(prefers-reduced-motion: reduce)'

function hasWebGL() {
  try {
    const c = document.createElement('canvas')
    return !!(c.getContext('webgl2') || c.getContext('webgl'))
  } catch {
    return false
  }
}

/**
 * « Ton parcours, sans pression » présenté en galerie 3D en orbite.
 * Glisser horizontalement fait tourner l'anneau (le défilement vertical
 * de la page reste libre), les flèches et les puces permettent la
 * navigation au clavier, et la carte de face s'ouvre via un vrai lien.
 * Sans WebGL, une grille de liens classique est affichée.
 */
export function PathOrbit({ cards }: { cards: OrbitCard[] }) {
  const navigate = useNavigate()
  const wrap = useRef<HTMLDivElement>(null)
  const control = useRef<OrbitControl>({ target: 0, current: 0, dragging: false })
  const drag = useRef<{ x: number; y: number; id: number; decided: boolean; horizontal: boolean } | null>(null)
  const [active, setActive] = useState(false)
  const [seen, setSeen] = useState(false)
  const [webgl] = useState(hasWebGL)
  const [reduced, setReduced] = useState(() => !!window.matchMedia?.(reducedQuery).matches)
  const step = (Math.PI * 2) / cards.length

  useEffect(() => {
    const mq = window.matchMedia?.(reducedQuery)
    if (!mq) return
    const on = () => setReduced(mq.matches)
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])

  // On n'anime la scène que lorsqu'elle est visible.
  useEffect(() => {
    const el = wrap.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => {
        setActive(e.isIntersecting)
        if (e.isIntersecting) setSeen(true)
      },
      { rootMargin: '400px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const onFront = useCallback(() => {}, [])
  const onOpen = useCallback((card: OrbitCard) => navigate(card.to), [navigate])

  function pointerDown(e: PointerEvent<HTMLDivElement>) {
    drag.current = { x: e.clientX, y: e.clientY, id: e.pointerId, decided: e.pointerType === 'mouse', horizontal: e.pointerType === 'mouse' }
  }
  function pointerMove(e: PointerEvent<HTMLDivElement>) {
    const d = drag.current
    if (!d || d.id !== e.pointerId) return
    const dx = e.clientX - d.x
    const dy = e.clientY - d.y
    if (!d.decided) {
      if (Math.abs(dx) < 6 && Math.abs(dy) < 6) return
      d.decided = true
      d.horizontal = Math.abs(dx) > Math.abs(dy)
    }
    if (!d.horizontal) return
    if (e.pointerType !== 'mouse' || e.buttons === 1) {
      control.current.dragging = true
      control.current.target += (dx / (wrap.current?.clientWidth || 800)) * Math.PI * 1.4
    }
    d.x = e.clientX
    d.y = e.clientY
  }
  function pointerUp() {
    drag.current = null
    if (control.current.dragging) {
      control.current.dragging = false
      // s'aligne sur la carte la plus proche
      control.current.target = Math.round(control.current.target / step) * step
    }
  }


  if (!webgl) {
    return (
      <div className="orbit-fallback">
        {cards.map((c) => (
          <Link key={c.id} to={c.to} className="orbit-chip-card" style={{ ['--accent' as string]: c.accent, ['--tint' as string]: c.tint }}>
            <span lang="ko">{c.ko}</span>
            <strong>{c.title}</strong>
            <small>{c.subtitle}</small>
          </Link>
        ))}
      </div>
    )
  }

  return (
    <div className="orbit">
      <div
        ref={wrap}
        className="orbit-stage"
        onPointerDown={pointerDown}
        onPointerMove={pointerMove}
        onPointerUp={pointerUp}
        onPointerCancel={pointerUp}
        onPointerLeave={pointerUp}
      >
        {seen ? (
          <Suspense fallback={<div className="orbit-loading" aria-hidden="true" />}>
            <OrbitGallery3D cards={cards} control={control} reduced={reduced} active={active} onFront={onFront} onOpen={onOpen} />
          </Suspense>
        ) : (
          <div className="orbit-loading" aria-hidden="true" />
        )}
        <p className="orbit-help" aria-hidden="true">
          Fais glisser pour tourner · touche une carte pour l’ouvrir
        </p>
      </div>

      {/* Pas de commandes visibles : liens pour le clavier et les lecteurs d'écran. */}
      <nav className="sr-only" aria-label="Toutes les étapes du parcours">
        <ul>
          {cards.map((c) => (
            <li key={c.id}>
              <Link to={c.to}>
                {c.title} — {c.subtitle}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}

export function usePathCards(
  stats: { level: { id: string; index: number; name: string; korean: string; cefr: string }; total: number; pct: number }[],
  chapters: string[],
): OrbitCard[] {
  // Clé stable : les textures 3D ne sont redessinées que si la progression change.
  const key = stats.map((s) => `${s.level.id}:${s.pct}:${s.total}`).join('|') + chapters.join('|')
  return useMemo(() => {
    // Palette neutre : cartes blanches, teintes très douces, encre sombre.
    const palette = [
      { accent: '#1d1d1f', tint: '#f2efe9' },
      { accent: '#3d5a2b', tint: '#edf2e6' },
      { accent: '#8a4b36', tint: '#f6ebe5' },
    ]
    const levels: OrbitCard[] = stats.map(({ level, total, pct }) => ({
      id: level.id,
      to: `/cours/${level.id}`,
      badge: String(level.index + 1).padStart(2, '0'),
      ko: level.korean,
      title: chapters[level.index] ?? level.name,
      subtitle: `${level.cefr} · ${total} leçons`,
      pct,
      ...palette[level.index % 3],
    }))
    // Les cours ajoutés au menu déroulant
    const extras: OrbitCard[] = [
      { id: 'hangeul', to: '/alphabet', badge: 'Hangeul', ko: '가나다', title: 'L’atelier hangeul', subtitle: 'Lettres, sons et syllabes' },
      { id: 'nombres', to: '/nombres', badge: 'Nombres', ko: '하나 둘', title: 'Chiffres & nombres', subtitle: 'Compter, prix, heures' },
      { id: 'vocabulaire', to: '/vocabulaire', badge: 'Mots', ko: '단어', title: 'Vocabulaire en photos', subtitle: 'Des thèmes à retenir' },
      { id: 'couleurs', to: '/couleurs', badge: 'Couleurs', ko: '색깔', title: 'Les couleurs', subtitle: 'Voir, dire, décrire' },
      { id: 'structures', to: '/structures', badge: 'Grammaire', ko: '문장', title: 'Phrases & grammaire', subtitle: 'Construire tes phrases' },
      { id: 'tests', to: '/tests', badge: 'QCM', ko: '시험', title: 'Tests & QCM', subtitle: 'Valide chaque niveau' },
      { id: 'pratique', to: '/pratique', badge: 'Oral', ko: '대화', title: 'En situation', subtitle: 'Jeux et studio oral' },
    ].map((c, i) => ({ ...c, ...palette[i % 3] }))
    return [...levels, ...extras]
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key])
}
