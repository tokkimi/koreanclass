import { useCallback, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { photoQuiz } from '../data/visualQuizzes'
import { vocabularyLessons } from '../data/vocabularyQuizzes'
import { words, vocabularyThemes } from '../data/vocabulary'
import { SavedQuiz } from '../components/SavedQuiz'
import { SpeakButton } from '../components/Speak'
import { PathOrbit } from '../components/PathOrbit'
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
  { accent: '#1d1d1f', tint: '#f2efe9' },
  { accent: '#3d5a2b', tint: '#edf2e6' },
  { accent: '#8a4b36', tint: '#f6ebe5' },
]

export default function Vocabulary() {
  const [params, setParams] = useSearchParams()
  const [limit, setLimit] = useState(24)
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
          ...PALETTE[i % PALETTE.length],
        }
      }),
    [],
  )

  const choose = useCallback(
    (card: OrbitCard) => {
      setCategory(card.id)
      setLimit(24)
      setParams({ theme: card.id }, { replace: true })
      requestAnimationFrame(() => document.getElementById('vocab-list')?.scrollIntoView({ behavior: 'smooth', block: 'start' }))
    },
    [setParams],
  )

  const visible = words.filter(
    (w) => (category === 'Tout' || w[0] === category) && w.slice(1, 4).join(' ').toLocaleLowerCase().includes(query.toLocaleLowerCase()),
  )
  const categories = ['Tout', ...new Set(words.map((w) => w[0]))]

  return (
    <div className="vocab-page">
      <section className="hc-section hc-path">
        <div className="container hc-head">
          <p className="hc-eyebrow">
            Vocabulaire en photos · {words.length} mots · {vocabularyThemes.length} thèmes
          </p>
          <h1 className="hc-title">Chaque mot a sa place.</h1>
          <p className="hc-lead">Mode, couple, maison, émotions, métiers… Fais tourner les thèmes et choisis ton univers.</p>
        </div>
        <div className="container">
          <PathOrbit cards={cards} onSelect={choose} />
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
                  setLimit(24)
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
                  setLimit(24)
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
        <p className="muted small">{visible.length} mots</p>

        <div className="word-grid">
          {visible.slice(0, limit).map(([cat, ko, rom, fr, sentence, translation, photo]) => (
            <article className="word-tile" key={cat + ko}>
              {photo && (
                <img
                  src={`https://images.unsplash.com/${photo}?auto=format&fit=crop&w=640&q=80`}
                  alt={hidden ? `Illustration à reconnaître : ${cat}` : fr}
                  loading="lazy"
                />
              )}
              <p className="word-cat">{cat}</p>
              <h3 lang="ko">
                {ko} <SpeakButton text={ko} />
              </h3>
              {rom && <p className="muted small">{rom}</p>}
              {!hidden || revealed.includes(ko) ? (
                <p className="word-fr">{fr}</p>
              ) : (
                <button className="btn ghost small" onClick={() => setRevealed([...revealed, ko])}>
                  Révéler le sens
                </button>
              )}
              <p lang="ko" className="word-sentence">
                {sentence} <SpeakButton text={sentence} />
              </p>
              {(!hidden || revealed.includes(ko)) && <p className="muted small">{translation}</p>}
            </article>
          ))}
        </div>
        {visible.length > limit && (
          <button className="btn mt" onClick={() => setLimit(limit + 24)}>
            Voir 24 mots de plus
          </button>
        )}
        {!visible.length && <p>Aucun mot trouvé. Essaie un autre mot ou un autre thème.</p>}
      </section>

      <section id="photo-quiz" className="container hc-section">
        <p className="hc-eyebrow">À toi de jouer</p>
        <h2>Une photo, un mot.</h2>
        <SavedQuiz lesson={photoQuiz} />
      </section>

      <section id="vocab-quizzes" className="container vocab-quizzes">
        <p className="hc-eyebrow">QCM par thème</p>
        <h2>Teste-toi, thème par thème.</h2>
        <p className="muted">Chaque thème a son propre score. Retrouve les mots dans les deux sens.</p>
        {vocabularyLessons
          .filter((l) => category === 'Tout' || l.subtitle === category)
          .map((l) => (
            <details className="vocab-quiz" key={l.id}>
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
