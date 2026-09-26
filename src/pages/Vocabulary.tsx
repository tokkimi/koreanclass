import { useCallback, useMemo, useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { photoQuiz } from '../data/visualQuizzes'
import { vocabularyLessons } from '../data/vocabularyQuizzes'
import { words, vocabularyThemes } from '../data/vocabulary'
import { SavedQuiz } from '../components/SavedQuiz'
import { SpeakButton } from '../components/Speak'
import { CardFan } from '../components/CardFan'
import type { OrbitCard } from '../components/OrbitGallery3D'

/** Mot coréen qui résume chaque thème, affiché en grand sur sa carte. */
const THEME_KO: Record<string, string> = {
  'Cuisine & ustensiles': '주방',
  'Voyage & sorties': '여행',
  'Loisirs & musique': '취미',
  'Temps & saisons': '계절',
  'Fruits & légumes': '과일',
  'À table': '식사',
  Animaux: '동물',
  'Nature & météo': '자연',
  'À la maison': '집',
  'École & objets': '학교',
  'Ville & transports': '도시',
  Vêtements: '옷',
  Corps: '몸',
  'Famille & personnes': '가족',
  'Mode & accessoires': '패션',
  'Couple & amour': '사랑',
  'Pièces de la maison': '방',
  'Objets de la maison': '물건',
  Émotions: '감정',
  Métiers: '직업',
  Sport: '운동',
  Shopping: '쇼핑',
  'Relations & entourage': '관계',
}
const PALETTE = [
  { accent: '#1d1d1f', tint: '#f5f5f7' },
  { accent: '#3d5a2b', tint: '#edf2e6' },
  { accent: '#8a4b36', tint: '#f6ebe5' },
]


const photoUrl = (photo: string, w = 900) => (photo.startsWith('/') ? photo : `https://images.unsplash.com/${photo}?auto=format&fit=crop&w=${w}&q=75`)

/** Photo du thème (ou, pour les anciens petits thèmes, la photo de leur premier mot). */
function themePhoto(theme: string): string {
  const t = vocabularyThemes.find((x) => x.name === theme)
  if (t) return photoUrl(t.photo, 1400)
  const w = words.find((x) => x[0] === theme && x[6])
  return w ? photoUrl(w[6], 1400) : '/images/seoul.jpg'
}

type Word = (typeof words)[number]

/** Une rangée de mots qui défile horizontalement. Sans photo propre, chaque carte
 * affiche une portion différente de la photo du thème : la rangée forme un panorama. */
function WordRow(props: {
  theme: string
  items: Word[]
  photo: string
  hidden: boolean
  revealed: string[]
  onReveal: (ko: string) => void
  onQuiz: () => void
}) {
  const { theme, items, hidden, revealed, onReveal, onQuiz } = props
  const track = useRef<HTMLDivElement>(null)
  const scroll = (dir: 1 | -1) => track.current?.scrollBy({ left: dir * track.current.clientWidth * 0.8, behavior: 'smooth' })
  return (
    <section className="word-row" aria-label={theme}>
      <div className="word-row-head">
        <div>
          <h3>{theme}</h3>
          <span className="muted small">{items.length} mots</span>
        </div>
        <div className="word-row-actions">
          <button className="btn ghost small" onClick={onQuiz}>
            QCM du thème
          </button>
          <button className="row-arrow" onClick={() => scroll(-1)} aria-label={`Mots précédents : ${theme}`}>
            ←
          </button>
          <button className="row-arrow" onClick={() => scroll(1)} aria-label={`Mots suivants : ${theme}`}>
            →
          </button>
        </div>
      </div>
      <div className="word-track" ref={track}>
        {items.map(([cat, ko, rom, fr, sentence, translation, own]) => {
          const show = !hidden || revealed.includes(ko)
          return (
            <article className="word-tile" key={cat + ko}>
              {own ? <img className="word-photo" src={photoUrl(own,640)} alt={hidden?'Photo à reconnaître':fr} loading="lazy"/> : <div className="word-lettering" lang="ko">{ko}</div>}
              <div className="word-body">
                <div className="word-ko">
                  <strong lang="ko">{ko}</strong> <SpeakButton text={ko} />
                </div>
                {rom && <p className="muted small">{rom}</p>}
                {show ? (
                  <p className="word-fr">{fr}</p>
                ) : (
                  <button className="btn ghost small" onClick={() => onReveal(ko)}>
                    Révéler le sens
                  </button>
                )}
                <p lang="ko" className="word-sentence">
                  {sentence} <SpeakButton text={sentence} />
                </p>
                {show && <p className="muted small">{translation}</p>}
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}

export default function Vocabulary() {
  const [params, setParams] = useSearchParams()
  const [category, setCategory] = useState(() => params.get('theme') ?? 'Tout')
  const [query, setQuery] = useState('')
  const [hidden, setHidden] = useState(false)
  const [revealed, setRevealed] = useState<string[]>([])

  const cards: OrbitCard[] = useMemo(
    () =>
      vocabularyThemes.map((t, i) => {
        const items = t.items.split(';').map((x) => x.split('|')[1])
        return {
          id: t.name,
          to: `/vocabulaire?theme=${encodeURIComponent(t.name)}`,
          badge: `${items.length} mots`,
          ko: THEME_KO[t.name] ?? t.name,
          title: t.name,
          subtitle: items.slice(0, 3).map((x) => x.split(',')[0]).join(' · '),
          image: t.photo.startsWith('/') ? t.photo : `https://images.unsplash.com/${t.photo}?auto=format&fit=crop&w=600&h=760&q=75`,
          ...PALETTE[i % PALETTE.length],
        }
      }),
    [],
  )

  const choose = useCallback(
    (card: OrbitCard) => {
      setQuery('')
      setCategory(card.id)
            setParams({ theme: card.id }, { replace: true })
      requestAnimationFrame(() => document.getElementById('vocab-list')?.scrollIntoView({ behavior: 'smooth', block: 'start' }))
    },
    [setParams],
  )

  const visible = words.filter(
    (w) => (category === 'Tout' || w[0] === category) && w.slice(1, 4).join(' ').toLocaleLowerCase().includes(query.toLocaleLowerCase()),
  )
  const categories = ['Tout', ...new Set(words.map((w) => w[0]))]
  const rows = [...new Set(visible.map((w) => w[0]))].map((theme) => ({ theme, items: visible.filter((w) => w[0] === theme) }))
  const themeHasPhotos = category === 'Tout'

  return (
    <div className="vocab-page">
      <section className="hc-section hc-path">
        <div className="container hc-head">
          <p className="hc-eyebrow">
            Vocabulaire en photos · {words.length} mots · {vocabularyThemes.length} thèmes
          </p>
          <h1 className="hc-title">Chaque mot a sa place.</h1>
          <p className="hc-lead">Mode, couple, maison, émotions, métiers… Parcours les cartes en éventail et choisis ton univers.</p>
        </div>
        <div className="container">
          <CardFan cards={cards} onSelect={choose} />
        </div>
        <p className="container hc-level">
          <a href="#photo-quiz">Quiz en photos</a> · <a href="#vocab-quizzes">QCM par thème</a> · <Link to="/couleurs">Les couleurs</Link>
        </p>
      </section>

      <section className="container vocab-list-section" id="vocab-list">
        <div className="vocab-toolbar">
          <div>
            <p className="hc-eyebrow">{category === 'Tout' ? 'Tous les thèmes' : 'Thème'}</p>
            <h2>{category === 'Tout' ? 'Tous les mots' : category}</h2>
          </div>
          <div className="vocab-filters">
            <label>
              Thème
              <select
                className="input"
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value)
                                    setParams(e.target.value === 'Tout' ? {} : { theme: e.target.value }, { replace: true })
                }}
              >
                {categories.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </label>
            <label>
              Rechercher
              <input
                className="input"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value)
                                  }}
                placeholder="Français, coréen…"
              />
            </label>
            <button
              className="btn ghost"
              aria-pressed={hidden}
              onClick={() => {
                setHidden(!hidden)
                setRevealed([])
              }}
            >
              {hidden ? 'Afficher les traductions' : 'Cacher les traductions'}
            </button>
          </div>
        </div>
        <p className="muted small">
          {visible.length} mots · photos et fiches de mots · fais défiler chaque rangée
        </p>

        {rows.map(({ theme, items }) => (
          <WordRow
            key={theme}
            theme={theme}
            items={items}
            photo={themePhoto(theme)}
            hidden={hidden}
            revealed={revealed}
            onReveal={(ko) => setRevealed([...revealed, ko])}
            onQuiz={() => {
              setCategory(theme)
              setParams({ theme }, { replace: true })
              requestAnimationFrame(() => document.getElementById('vocab-quizzes')?.scrollIntoView({ behavior: 'smooth' }))
            }}
          />
        ))}
        {!visible.length && <p>Aucun mot trouvé. Essaie un autre mot ou un autre thème.</p>}
      </section>

      {themeHasPhotos && (
      <section id="photo-quiz" className="container hc-section">
        <p className="hc-eyebrow">À toi de jouer</p>
        <h2>Une photo, un mot.</h2>
        <SavedQuiz lesson={photoQuiz} />
      </section>
      )}

      <section id="vocab-quizzes" className="container vocab-quizzes">
        <p className="hc-eyebrow">QCM par thème</p>
        <h2>{category === 'Tout' ? 'Teste-toi, thème par thème.' : `QCM : ${category}`}</h2>
        <p className="muted">Chaque thème a son propre score. Retrouve les mots dans les deux sens.</p>
        {vocabularyLessons
          .filter((l) => category === 'Tout' || l.subtitle === category)
          .map((l) => (
            <details className="vocab-quiz" key={l.id} open={category !== 'Tout'}>
              <summary>
                {l.subtitle} <span className="muted">· {l.exercises.length} questions</span>
              </summary>
              <SavedQuiz lesson={l} />
            </details>
          ))}
      </section>
    </div>
  )
}
