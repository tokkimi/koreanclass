import { useEffect, useMemo, useRef, useState, type MutableRefObject } from 'react'
import { Canvas, useFrame, useThree, type ThreeEvent } from '@react-three/fiber'
import * as THREE from 'three'

/**
 * Galerie en orbite (adaptée de « 3d-orbit-gallery »).
 * Les cartes sont dessinées dans un <canvas> 2D puis appliquées comme
 * textures : aucune image distante, texte net, couleurs du site.
 * La rotation est pilotée de l'extérieur (glisser, flèches, puces) via
 * `control` ; ce composant ne fait que l'animer et signaler la carte de face.
 */
export interface OrbitCard {
  id: string
  to: string
  badge: string
  ko: string
  title: string
  subtitle: string
  /** 0-100 pour afficher une barre de progression (niveaux). */
  pct?: number
  accent: string
  tint: string
}

export interface OrbitControl {
  /** angle visé (radians) ; l'animation s'en approche en douceur */
  target: number
  current: number
  dragging: boolean
}

interface Props {
  cards: OrbitCard[]
  control: MutableRefObject<OrbitControl>
  reduced: boolean
  active: boolean
  onFront: (index: number) => void
  onOpen: (card: OrbitCard) => void
}

const RADIUS = 6.2
const CARD_W = 2.3
const CARD_H = 2.9

export default function OrbitGallery3D({ cards, control, reduced, active, onFront, onOpen }: Props) {
  return (
    <Canvas
      className="orbit-canvas"
      frameloop={active ? 'always' : 'never'}
      dpr={[1, 2]}
      camera={{ position: [0, 2.6, 15], fov: 40 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
      aria-hidden="true"
    >
      <Rig />
      <Particles reduced={reduced} />
      <Ring cards={cards} control={control} reduced={reduced} onFront={onFront} onOpen={onOpen} />
    </Canvas>
  )
}

/** Recule la caméra sur les écrans étroits pour que l'anneau tienne. */
function Rig() {
  const { camera, size } = useThree()
  useEffect(() => {
    const aspect = size.width / size.height
    const z = aspect < 0.75 ? 15.5 : aspect < 1.1 ? 15 : 12.5
    camera.position.set(0, aspect < 0.75 ? 2.4 : 2.1, z)
    camera.lookAt(0, -1.1, 0)
  }, [camera, size])
  return null
}

function Ring({ cards, control, reduced, onFront, onOpen }: Omit<Props, 'active'>) {
  const group = useRef<THREE.Group>(null)
  const meshes = useRef<(THREE.Mesh | null)[]>([])
  const [hovered, setHovered] = useState<number | null>(null)
  const lastFront = useRef(-1)
  const step = (Math.PI * 2) / cards.length
  const textures = useCardTextures(cards)

  useEffect(() => {
    document.body.style.cursor = hovered !== null ? 'pointer' : ''
    return () => {
      document.body.style.cursor = ''
    }
  }, [hovered])

  useFrame((_, delta) => {
    const c = control.current
    // Légère rotation automatique au repos (désactivée si « réduire les animations »).
    if (!reduced && !c.dragging && hovered === null) c.target -= delta * 0.08
    c.current += (c.target - c.current) * Math.min(1, delta * (reduced ? 12 : 5))
    if (group.current) group.current.rotation.y = c.current

    const front = (((Math.round(-c.current / step) % cards.length) + cards.length) % cards.length)
    if (front !== lastFront.current) {
      lastFront.current = front
      onFront(front)
    }
    meshes.current.forEach((m, i) => {
      if (!m) return
      const s = i === hovered ? 1.08 : i === front ? 1.04 : 1
      m.scale.x += (s - m.scale.x) * Math.min(1, delta * 8)
      m.scale.y = m.scale.x
    })
  })

  return (
    <group ref={group}>
      {cards.map((card, i) => {
        const a = i * step
        return (
          <mesh
            key={card.id}
            ref={(m) => {
              meshes.current[i] = m
            }}
            position={[Math.sin(a) * RADIUS, 0, Math.cos(a) * RADIUS]}
            rotation={[0, a, 0]}
            onPointerOver={(e: ThreeEvent<PointerEvent>) => {
              e.stopPropagation()
              setHovered(i)
            }}
            onPointerOut={() => setHovered((h) => (h === i ? null : h))}
            onClick={(e: ThreeEvent<MouseEvent>) => {
              e.stopPropagation()
              if (e.delta < 8) onOpen(card) // un glisser n'est pas un clic
            }}
          >
            <planeGeometry args={[CARD_W, CARD_H]} />
            <meshBasicMaterial map={textures[i]} transparent alphaTest={0.02} side={THREE.FrontSide} toneMapped={false} />
          </mesh>
        )
      })}
    </group>
  )
}

/** Poussière d'étoiles : un seul objet Points (bien plus léger que 1500 sphères). */
function Particles({ reduced }: { reduced: boolean }) {
  const ref = useRef<THREE.Points>(null)
  const geometry = useMemo(() => {
    const count = 900
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const color = new THREE.Color()
    for (let i = 0; i < count; i++) {
      const phi = Math.acos(-1 + (2 * i) / count)
      const theta = Math.sqrt(count * Math.PI) * phi
      const r = 9.5 + (Math.random() - 0.5) * 4
      positions.set([r * Math.cos(theta) * Math.sin(phi), r * Math.cos(phi) * 0.7, r * Math.sin(theta) * Math.sin(phi)], i * 3)
      color.setHSL(0.08, 0.05 + Math.random() * 0.1, 0.35 + Math.random() * 0.25)
      colors.set([color.r, color.g, color.b], i * 3)
    }
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    g.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    return g
  }, [])
  useEffect(() => () => geometry.dispose(), [geometry])
  useFrame((_, delta) => {
    if (ref.current && !reduced) ref.current.rotation.y += delta * 0.02
  })
  return (
    <points ref={ref} geometry={geometry}>
      <pointsMaterial size={0.06} vertexColors transparent opacity={0.55} sizeAttenuation depthWrite={false} />
    </points>
  )
}

/* ------------------------------------------------------------------ */
/* Textures des cartes                                                 */
/* ------------------------------------------------------------------ */

function useCardTextures(cards: OrbitCard[]) {
  const [version, setVersion] = useState(0)
  // Redessine quand les polices (Noto Sans KR, Inter) sont prêtes.
  useEffect(() => {
    let alive = true
    const fonts = document.fonts
    if (!fonts) return
    Promise.all([fonts.load('700 120px "Noto Sans KR"', '한글'), fonts.load('700 40px Inter')])
      .catch(() => undefined)
      .then(() => alive && setVersion((v) => v + 1))
    return () => {
      alive = false
    }
  }, [])
  const textures = useMemo(() => cards.map(drawCard), [cards, version])
  useEffect(() => () => textures.forEach((t) => t.dispose()), [textures])
  return textures
}

function drawCard(card: OrbitCard): THREE.CanvasTexture {
  const W = 512
  const H = 646
  const canvas = document.createElement('canvas')
  canvas.width = W
  canvas.height = H
  const ctx = canvas.getContext('2d')!
  const sans = 'Inter, system-ui, -apple-system, "Segoe UI", sans-serif'
  const ko = '"Noto Sans KR", "Apple SD Gothic Neo", "Malgun Gothic", sans-serif'

  // carte, avec une ombre douce pour se détacher du fond clair de la page
  roundRect(ctx, 14, 10, W - 28, H - 30, 44)
  ctx.save()
  ctx.shadowColor = 'rgba(40, 32, 20, 0.16)'
  ctx.shadowBlur = 18
  ctx.shadowOffsetY = 8
  const bg = ctx.createLinearGradient(0, 0, 0, H)
  bg.addColorStop(0, '#ffffff')
  bg.addColorStop(1, card.tint)
  ctx.fillStyle = bg
  ctx.fill()
  ctx.restore()
  ctx.lineWidth = 3
  ctx.strokeStyle = '#e4dfd7'
  ctx.stroke()

  // pastille
  roundRect(ctx, 40, 40, 150, 58, 18)
  ctx.fillStyle = card.tint
  ctx.fill()
  ctx.fillStyle = card.accent
  ctx.font = `700 30px ${sans}`
  ctx.textBaseline = 'middle'
  ctx.textAlign = 'center'
  ctx.fillText(card.badge, 115, 70, 136)

  // coréen
  ctx.textAlign = 'left'
  ctx.textBaseline = 'alphabetic'
  ctx.fillStyle = '#1d1d1f'
  ctx.font = `700 ${card.ko.length > 3 ? 100 : 128}px ${ko}`
  ctx.fillText(card.ko, 40, 270, W - 80)

  // titre (2 lignes max)
  ctx.font = `700 40px ${sans}`
  const lines = wrap(ctx, card.title, W - 80).slice(0, 2)
  lines.forEach((l, i) => ctx.fillText(l, 40, 360 + i * 50))

  ctx.fillStyle = '#6e6e73'
  ctx.font = `500 28px ${sans}`
  ctx.fillText(card.subtitle, 40, 360 + lines.length * 50 + 14, W - 80)

  // pied : progression ou invitation
  if (card.pct !== undefined) {
    roundRect(ctx, 40, H - 92, W - 80, 16, 8)
    ctx.fillStyle = '#ebe7e0'
    ctx.fill()
    if (card.pct > 0) {
      roundRect(ctx, 40, H - 92, Math.max(16, ((W - 80) * card.pct) / 100), 16, 8)
      ctx.fillStyle = card.accent
      ctx.fill()
    }
    ctx.fillStyle = '#6e6e73'
    ctx.font = `600 24px ${sans}`
    ctx.fillText(card.pct ? `${card.pct} % validé` : 'À découvrir', 40, H - 44)
  } else {
    ctx.fillStyle = card.accent
    ctx.font = `700 28px ${sans}`
    ctx.fillText('Explorer ↗', 40, H - 52)
  }

  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  texture.anisotropy = 4
  return texture
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.arcTo(x + w, y, x + w, y + h, r)
  ctx.arcTo(x + w, y + h, x, y + h, r)
  ctx.arcTo(x, y + h, x, y, r)
  ctx.arcTo(x, y, x + w, y, r)
  ctx.closePath()
}

function wrap(ctx: CanvasRenderingContext2D, text: string, max: number): string[] {
  const words = text.split(' ')
  const lines: string[] = []
  let line = ''
  for (const w of words) {
    const test = line ? `${line} ${w}` : w
    if (ctx.measureText(test).width > max && line) {
      lines.push(line)
      line = w
    } else line = test
  }
  if (line) lines.push(line)
  return lines
}
