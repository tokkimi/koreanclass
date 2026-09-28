import { useState } from 'react'
import { Link } from 'react-router-dom'
import type { LanguageInfo } from '../../data/languages'
import { courseLevels } from '../../data/courses'
import { grammarContent } from '../../data/portal-content'
import { qcm } from '../../data/helpers'
import { mutate, useCurrentUser, useProgress } from '../../lib/store'
import { ExerciseRunner } from '../../components/ExerciseRunner'
import { OralPractice } from '../../components/OralPractice'
import { SpeakButton } from '../../components/Speak'
import { LangShell } from './LangPortal'
import NotFound from '../NotFound'

/** Pages « Phrases & grammaire » et « En situation » des autres langues, sur le modèle coréen. */

const JA = /[぀-ヿ㐀-鿿]/

export function LangStructures({ lang }: { lang: LanguageInfo }) {
  const g = grammarContent[lang.id]
  const levels = courseLevels(lang.id)
  const progress = useProgress()
  const [level, setLevel] = useState('all')
  const [search, setSearch] = useState('')
  if (!g) return <NotFound />
  const en = lang.taughtIn === 'en'
  const units = g.units.filter(
    (u) => (level === 'all' || u.level === Number(level)) && `${u.title} ${u.context} ${u.patterns.map((p) => p.slice(0, 3).join(' ')).join(' ')}`.toLowerCase().includes(search.toLowerCase()),
  )
  return (
    <LangShell lang={lang}>
      <div className="container page">
        <header className="page-head">
          <p className="eyebrow">{en ? 'FROM SOUND TO CONVERSATION' : 'DU SON À LA CONVERSATION'}</p>
          <h1>{en ? 'Understand and build your sentences' : 'Comprendre et construire ses phrases'}</h1>
          <p className="muted">
            {en
              ? `${g.units.length} workshops: sentences in context, breakdown, rules, nuances and corrected exercises. Pick an intention, then learn how to say it.`
              : `${g.units.length} ateliers : phrases en contexte, décomposition, règles, nuances et exercices corrigés. Choisis une intention, puis apprends à la formuler.`}
          </p>
        </header>
        <div className="card">
          <div className="row">
            <label>
              {en ? 'Search a structure' : 'Rechercher une structure'}
              <input className="input" value={search} onChange={(e) => setSearch(e.target.value)} placeholder={en ? 'passé composé, subjunctive…' : 'passé, condition, politesse…'} />
            </label>
            <label>
              {en ? 'Level' : 'Niveau'}
              <select className="input" value={level} onChange={(e) => setLevel(e.target.value)}>
                <option value="all">{en ? 'All levels' : 'Tous les niveaux'}</option>
                {levels.map((l) => (
                  <option key={l.id} value={l.index}>
                    {l.name}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <p className="small muted">{en ? 'Levels organise the learning path; they do not certify an official level.' : 'Les niveaux organisent la progression pédagogique ; ils ne certifient pas un niveau officiel.'}</p>
        </div>
        <div className="level-grid mt">
          {units.map((u) => (
            <Link className="card level-card" key={u.id} to={`${lang.path}/cours/${levels[u.level].id}/${u.id}`}>
              <span className="pill">{levels[u.level].name.split('— ')[1] ?? levels[u.level].name}</span>
              <h2>{u.title}</h2>
              <p>{u.context}</p>
              <ul>
                {u.patterns.map((p) => (
                  <li key={p[0]}>
                    <strong className={JA.test(p[0]) ? 'ko-text' : ''} lang={lang.speech}>
                      {p[0]}
                    </strong>{' '}
                    — {p[1]}
                  </li>
                ))}
              </ul>
              <span className="link">{progress.lessons[u.id]?.completed ? (en ? 'Review this workshop' : 'Revoir cet atelier') : en ? 'Study the sentences' : 'Étudier les phrases'} →</span>
            </Link>
          ))}
        </div>
        {!units.length && <p>{en ? 'No workshop found. Try a shorter word or another level.' : 'Aucun atelier trouvé. Essaie un mot plus court ou un autre niveau.'}</p>}
      </div>
    </LangShell>
  )
}

export function LangPractice({ lang }: { lang: LanguageInfo }) {
  const g = grammarContent[lang.id]
  const levels = courseLevels(lang.id)
  const [selected, setSelected] = useState<string | null>(null)
  const [tab, setTab] = useState<'game' | 'oral'>('game')
  const [run, setRun] = useState(1)
  const user = useCurrentUser()
  const p = useProgress()
  if (!g) return <NotFound />
  const en = lang.taughtIn === 'en'
  const scene = g.scenes.find((s) => s.id === selected)
  if (scene)
    return (
      <LangShell lang={lang}>
        <div className="container page narrow">
          <button className="btn ghost small" onClick={() => setSelected(null)}>
            {en ? '← All situations' : '← Toutes les situations'}
          </button>
          <header className="scene-header" style={{ backgroundImage: `linear-gradient(90deg,rgba(9,24,45,.85),rgba(9,24,45,.45)),url(${scene.image})` }}>
            <span className="pill">
              {en ? 'LEVEL' : 'NIVEAU'} {scene.levelIndex} · {en ? 'MISSION IN FRANCE' : `MISSION EN ${lang.name.toUpperCase()}`}
            </span>
            <h1>{scene.title}</h1>
            <p>{scene.setting}</p>
            <div className="oral-tabs">
              <button className={`btn ${tab === 'game' ? '' : 'ghost'}`} onClick={() => setTab('game')}>
                {en ? 'Play the scene' : 'Jouer la scène'}
              </button>
              <button className={`btn ${tab === 'oral' ? '' : 'ghost'}`} onClick={() => setTab('oral')}>
                {en ? 'Speak up' : 'Prendre la parole'}
              </button>
            </div>
          </header>
          {tab === 'game' ? (
            <>
              <div className="card scene-intro">
                <h2>{en ? 'Your turn to answer.' : 'À toi de répondre.'}</h2>
                <p>{en ? 'Read what the other person says, then choose a suitable answer. Mistakes are fine: the correction explains how to keep the conversation going.' : 'Lis la réplique de ton interlocuteur, puis choisis une réponse adaptée. Tu peux te tromper : la correction t’explique comment avancer dans la conversation.'}</p>
                {!user && (
                  <p className="notice">
                    <Link to={`/connexion?next=${lang.path}/pratique`}>{en ? 'Log in' : 'Connecte-toi'}</Link> {en ? 'to keep your missions on all your devices.' : 'pour retrouver tes missions sur tous tes appareils.'}
                  </p>
                )}
              </div>
              <ExerciseRunner
                key={`${scene.id}-${run}`}
                exercises={scene.turns.map((t) => qcm(`${t.speaker} : « ${t.line} » — ${t.fr}`, t.answer, t.wrong, t.explain))}
                seed={run}
                passMark={70}
                onFinish={async (_score, _total, _results, answers, operationId) => {
                  if (user) await mutate('scene', { refId: scene.id, answers }, operationId)
                }}
                onRestart={() => setRun((v) => v + 1)}
              />
              <details className="card mt">
                <summary>{en ? 'Replay the dialogue out loud' : 'Rejouer le dialogue à voix haute'}</summary>
                {scene.turns.map((t, i) => (
                  <div className="scene-dialogue" key={i}>
                    <p>
                      <strong>{t.speaker}</strong> <span lang={lang.speech}>{t.line}</span> <SpeakButton text={t.line} lang={lang.speech} />
                    </p>
                    <p className="small muted">{t.fr}</p>
                    <p>
                      <strong>{en ? 'You' : 'Toi'}</strong> <span lang={lang.speech}>{t.answer}</span> <SpeakButton text={t.answer} lang={lang.speech} />
                    </p>
                    <p className="small muted">{t.translation}</p>
                  </div>
                ))}
              </details>
              <Link className="btn mt" to={`${lang.path}/cours/${levels[scene.levelIndex].id}/${scene.id}`}>
                {en ? 'Study the full workshop' : 'Étudier l’atelier complet'}
              </Link>
            </>
          ) : (
            <OralPractice key={scene.id} id={scene.id} {...scene.speech} tip={scene.pronunciation} />
          )}
        </div>
      </LangShell>
    )
  return (
    <LangShell lang={lang}>
      <div className="container page">
        <div className="page-head">
          <p className="eyebrow">{en ? 'FRENCH OFF THE PAGE' : `LE ${lang.name.toUpperCase()} SORT DU CAHIER`}</p>
          <h1>{en ? 'What if you were in Paris?' : 'Et si tu y étais ?'}</h1>
          <p className="muted">{en ? 'Conversations to play, ideas to share. Try, listen, try again.' : 'Des conversations à jouer, des idées à raconter. Essaie, écoute, recommence.'}</p>
        </div>
        <div className="scenario-grid">
          {g.scenes.map((s) => {
            const attempts = (p.practice ?? []).filter((x) => x.refId === s.id)
            return (
              <article className="scenario-card" key={s.id}>
                <div className="scenario-photo">
                  <img src={s.image} alt="" loading="lazy" />
                  <span className="glass-label">
                    {en ? 'LEVEL' : 'NIVEAU'} {s.levelIndex}
                  </span>
                </div>
                <div className="scenario-content">
                  <h2>{s.title}</h2>
                  <p>{s.setting}</p>
                  <div className="row">
                    <button
                      className="btn"
                      onClick={() => {
                        setSelected(s.id)
                        setTab('game')
                        setRun(1)
                      }}
                    >
                      {en ? 'Play the scene ↗' : 'Jouer la scène ↗'}
                    </button>
                    <button
                      className="btn ghost"
                      onClick={() => {
                        setSelected(s.id)
                        setTab('oral')
                      }}
                    >
                      {en ? 'Speaking studio' : 'Studio oral'}
                    </button>
                  </div>
                  <p className="small muted">
                    {attempts.length
                      ? `${attempts.length} ${en ? 'activit' : 'activité'}${en ? (attempts.length > 1 ? 'ies' : 'y') : attempts.length > 1 ? 's' : ''} ${en ? 'saved' : `enregistrée${attempts.length > 1 ? 's' : ''}`}`
                      : en
                        ? '4 exchanges · 1 short talk · at your own pace'
                        : '4 échanges · 1 prise de parole · à ton rythme'}
                  </p>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </LangShell>
  )
}
