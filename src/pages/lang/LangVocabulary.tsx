import { useCallback, useMemo, useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import type { LanguageInfo } from '../../data/languages'
import { vocabularyThemes } from '../../data/vocabulary'
import { courseLevels } from '../../data/courses'
import { themeLabel, vocabContent, vocabWords } from '../../data/portal-content/vocab'
import type { Word } from '../../data/portal-content/vocab-types'
import { SavedQuiz } from '../../components/SavedQuiz'
import { SpeakButton } from '../../components/Speak'
import { CardFan } from '../../components/CardFan'
import { WordVisual } from '../../components/WordVisual'
import type { OrbitCard } from '../../components/OrbitGallery3D'
import { LangShell } from './LangPortal'
import NotFound from '../NotFound'

/** Page « Vocabulaire » des autres langues : même construction que la page coréenne. */

const PALETTE = [
  { accent: '#1d1d1f', tint: '#f5f5f7' },
  { accent: '#3d5a2b', tint: '#edf2e6' },
  { accent: '#8a4b36', tint: '#f6ebe5' },
]
const PFX: Record<string, string> = { japonais: 'ja', espagnol: 'es', anglais: 'en', francais: 'fr' }
const JA = /[぀-ヿ㐀-鿿]/
const photoUrl = (photo: string, w = 900) => (photo.startsWith('/') ? photo : `https://images.unsplash.com/${photo}?auto=format&fit=crop&w=${w}&q=75`)

function WordRow(props: { lang: LanguageInfo; label: string; items: Word[]; all: Word[]; hidden: boolean; revealed: string[]; onReveal: (w: string) => void; onQuiz: () => void }) {
  const { lang, label, items, all, hidden, revealed, onReveal, onQuiz } = props
  const en = lang.taughtIn === 'en'
  const track = useRef<HTMLDivElement>(null)
  const scroll = (dir: 1 | -1) => track.current?.scrollBy({ left: dir * track.current.clientWidth * 0.8, behavior: 'smooth' })
  return (
    <section className="word-row" aria-label={label}>
      <div className="word-row-head">
        <div>
          <h3>{label}</h3>
          <span className="muted small">
            {items.length} {en ? 'words' : 'mots'}
          </span>
        </div>
        <div className="word-row-actions">
          <button className="btn ghost small" onClick={onQuiz}>
            {en ? 'Theme quiz' : 'QCM du thème'}
          </button>
          <button className="row-arrow" onClick={() => scroll(-1)} aria-label={`${en ? 'Previous words' : 'Mots précédents'} : ${label}`}>
            ←
          </button>
          <button className="row-arrow" onClick={() => scroll(1)} aria-label={`${en ? 'Next words' : 'Mots suivants'} : ${label}`}>
            →
          </button>
        </div>
      </div>
      <div className="word-track" ref={track}>
        {items.map(([cat, word, reading, meaning, sentence, translation, own]) => {
          const show = !hidden || revealed.includes(word)
          const visualIndex = all.filter((w) => w[0] === cat).findIndex((w) => w[1] === word)
          return (
            <article className="word-tile" key={cat + word}>
              {own ? (
                <img className="word-photo" src={photoUrl(own, 640)} alt={hidden ? (en ? 'Photo to recognise' : 'Photo à reconnaître') : meaning} loading="lazy" />
              ) : (
                <WordVisual theme={cat} index={visualIndex} label={hidden ? (en ? 'word to recognise' : 'mot à reconnaître') : meaning} />
              )}
              <div className="word-body">
                <div className="word-ko">
                  <strong className={JA.test(word) ? 'ko-text' : ''} lang={lang.speech}>
                    {word}
                  </strong>{' '}
                  <SpeakButton text={word} lang={lang.speech} />
                </div>
                {reading && <p className="muted small">{reading}</p>}
                {show ? (
                  <p className="word-fr">{meaning}</p>
                ) : (
                  <button className="btn ghost small" onClick={() => onReveal(word)}>
                    {en ? 'Show the meaning' : 'Révéler le sens'}
                  </button>
                )}
                <p lang={lang.speech} className={`word-sentence ${JA.test(sentence) ? 'ko-text' : ''}`}>
                  {sentence} <SpeakButton text={sentence} lang={lang.speech} />
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

export function LangVocabulary({ lang }: { lang: LanguageInfo }) {
  const content = vocabContent[lang.id]
  const words = useMemo(() => vocabWords(lang.id), [lang.id])
  const en = lang.taughtIn === 'en'
  const ALL = en ? 'All' : 'Tout'
  const [params, setParams] = useSearchParams()
  const [category, setCategory] = useState(() => params.get('theme') ?? ALL)
  const [query, setQuery] = useState('')
  const [hidden, setHidden] = useState(false)
  const [revealed, setRevealed] = useState<string[]>([])
  const p = PFX[lang.id]
  const lessons = courseLevels(lang.id).flatMap((l) => l.lessons)
  const photoQuiz = lessons.find((l) => l.id === `${p}-v-photos`)
  const themeQuizzes = lessons.filter((l) => l.id.startsWith(`${p}-v-theme-`))

  const cards: OrbitCard[] = useMemo(
    () =>
      (content?.themes ?? []).map((t, i) => {
        const photo = vocabularyThemes.find((x) => x.name === t.key)?.photo ?? '/images/seoul.jpg'
        const items = t.items.split(';').map((x) => x.split('|')[1])
        return {
          id: t.key,
          to: `${lang.path}/vocabulaire?theme=${encodeURIComponent(t.key)}`,
          badge: `${items.length} ${en ? 'words' : 'mots'}`,
          ko: t.ko,
          title: t.label ?? t.key,
          subtitle: items.slice(0, 3).map((x) => x.split(',')[0]).join(' · '),
          image: photo.startsWith('/') ? photo : `https://images.unsplash.com/${photo}?auto=format&fit=crop&w=600&h=760&q=75`,
          ...PALETTE[i % PALETTE.length],
        }
      }),
    [content, lang.path, en],
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

  if (!content) return <NotFound />
  const label = (key: string) => themeLabel(lang.id, key)
  const visible = words.filter((w) => (category === ALL || w[0] === category) && w.slice(1, 4).join(' ').toLocaleLowerCase().includes(query.toLocaleLowerCase()))
  const categories = [...new Set(words.map((w) => w[0]))]
  const rows = [...new Set(visible.map((w) => w[0]))].map((theme) => ({ theme, items: visible.filter((w) => w[0] === theme) }))

  return (
    <LangShell lang={lang}>
      <div className="vocab-page">
        <section className="hc-section hc-path">
          <div className="container hc-head">
            <p className="hc-eyebrow">
              {en ? 'Vocabulary in pictures' : 'Vocabulaire en photos'} · {words.length} {en ? 'words' : 'mots'} · {content.themes.length} {en ? 'themes' : 'thèmes'}
            </p>
            <h1 className="hc-title">{en ? 'Every word has its place.' : 'Chaque mot a sa place.'}</h1>
            <p className="hc-lead">{en ? 'Fashion, love, home, feelings, jobs… Browse the fanned cards and pick your world.' : 'Mode, couple, maison, émotions, métiers… Parcours les cartes en éventail et choisis ton univers.'}</p>
          </div>
          <div className="container">
            <CardFan cards={cards} onSelect={choose} />
          </div>
          <p className="container hc-level">
            <a href="#photo-quiz">{en ? 'Photo quiz' : 'Quiz en photos'}</a> · <a href="#vocab-quizzes">{en ? 'Quizzes by theme' : 'QCM par thème'}</a> · <Link to={`${lang.path}/couleurs`}>{en ? 'Colours' : 'Les couleurs'}</Link>
          </p>
        </section>

        <section className="container vocab-list-section" id="vocab-list">
          <div className="vocab-toolbar">
            <div>
              <p className="hc-eyebrow">{category === ALL ? (en ? 'All themes' : 'Tous les thèmes') : en ? 'Theme' : 'Thème'}</p>
              <h2>{category === ALL ? (en ? 'All the words' : 'Tous les mots') : label(category)}</h2>
            </div>
            <div className="vocab-filters">
              <label>
                {en ? 'Theme' : 'Thème'}
                <select
                  className="input"
                  value={category}
                  onChange={(e) => {
                    setCategory(e.target.value)
                    setParams(e.target.value === ALL ? {} : { theme: e.target.value }, { replace: true })
                  }}
                >
                  <option value={ALL}>{ALL}</option>
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {label(c)}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                {en ? 'Search' : 'Rechercher'}
                <input className="input" value={query} onChange={(e) => setQuery(e.target.value)} placeholder={en ? 'English, French…' : `Français, ${lang.name.toLowerCase()}…`} />
              </label>
              <button
                className="btn ghost"
                aria-pressed={hidden}
                onClick={() => {
                  setHidden(!hidden)
                  setRevealed([])
                }}
              >
                {hidden ? (en ? 'Show translations' : 'Afficher les traductions') : en ? 'Hide translations' : 'Cacher les traductions'}
              </button>
            </div>
          </div>
          <p className="muted small">
            {visible.length} {en ? 'words · pictures and word cards · scroll each row' : 'mots · photos et fiches de mots · fais défiler chaque rangée'}
          </p>
          {rows.map(({ theme, items }) => (
            <WordRow
              key={theme}
              lang={lang}
              label={label(theme)}
              items={items}
              all={words}
              hidden={hidden}
              revealed={revealed}
              onReveal={(w) => setRevealed([...revealed, w])}
              onQuiz={() => {
                setCategory(theme)
                setParams({ theme }, { replace: true })
                requestAnimationFrame(() => document.getElementById('vocab-quizzes')?.scrollIntoView({ behavior: 'smooth' }))
              }}
            />
          ))}
          {!visible.length && <p>{en ? 'No words found. Try another word or theme.' : 'Aucun mot trouvé. Essaie un autre mot ou un autre thème.'}</p>}
        </section>

        {category === ALL && photoQuiz && (
          <section id="photo-quiz" className="container hc-section">
            <p className="hc-eyebrow">{en ? 'Your turn' : 'À toi de jouer'}</p>
            <h2>{en ? 'One photo, one word.' : 'Une photo, un mot.'}</h2>
            <SavedQuiz lesson={photoQuiz} />
          </section>
        )}

        <section id="vocab-quizzes" className="container vocab-quizzes">
          <p className="hc-eyebrow">{en ? 'Quizzes by theme' : 'QCM par thème'}</p>
          <h2>{category === ALL ? (en ? 'Test yourself, theme by theme.' : 'Teste-toi, thème par thème.') : `${en ? 'Quiz' : 'QCM'} : ${label(category)}`}</h2>
          <p className="muted">{en ? 'Each theme has its own score. Find the words both ways.' : 'Chaque thème a son propre score. Retrouve les mots dans les deux sens.'}</p>
          {themeQuizzes
            .filter((l) => category === ALL || l.subtitle === label(category))
            .map((l) => (
              <details className="vocab-quiz" key={l.id} open={category !== ALL}>
                <summary>
                  {l.subtitle} <span className="muted">· {l.exercises.length} questions</span>
                </summary>
                <SavedQuiz lesson={l} />
              </details>
            ))}
        </section>
      </div>
    </LangShell>
  )
}
