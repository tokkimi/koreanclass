import { useState } from 'react'
import { Link } from 'react-router-dom'
import type { LanguageInfo } from '../data/languages'
import type { Lesson, Level } from '../data/types'
import { setGoal, useProgress } from '../lib/store'
import { findLesson, GOAL_KEYWORDS, sceneLang } from '../lib/lessonIndex'
import { isDue, isMastered, lessonOfCard } from '../lib/srs'
import { parisToday } from '../lib/time'
import { ProgressBar } from './ProgressBar'

const PURPOSES = [['voyage', '✈️ Voyage'], ['quotidien', '🏠 Vie quotidienne'], ['travail', '💼 Travail'], ['examen', '🎓 Examen']] as const

/** Bloc « Aujourd'hui » : prochaine action, objectif du jour, difficultés, compétences mesurées, programme selon l'objectif. */
export function TodayPanel({ lang, list, base, next }: { lang: LanguageInfo; list: Level[]; base: string; next?: { level: Level; lesson: Lesson } }) {
  const p = useProgress()
  const today = parisToday()
  const [editGoal, setEditGoal] = useState(false)
  const inLang = (id: string) => findLesson(id)?.lang === lang.id
  const cards = Object.entries(p.srs ?? {}).filter(([k]) => inLang(lessonOfCard(k)))
  const due = cards.filter(([, c]) => isDue(c, today)).length
  const mistakes = Object.values(p.mistakes ?? {}).filter((m) => !m.resolved && inLang(m.ref))
  const byLesson = new Map<string, number>()
  for (const m of mistakes) byLesson.set(m.ref, (byLesson.get(m.ref) ?? 0) + m.count)
  const hardest = [...byLesson.entries()].sort((a, b) => b[1] - a[1]).slice(0, 3)
  const goal = p.goal?.dailyReviews ?? 20
  const daily = p.daily?.day === today ? p.daily : { reviews: 0, activities: 0 }
  const activity = p.activity && p.activity.path.startsWith(lang.id === 'coreen' ? '/cours' : lang.path) ? p.activity : null
  const lessonPath = (lv: Level, l: Lesson) => `${base}/cours/${lv.id}/${l.id}`

  // Prochaine action : révisions dues > erreurs > reprise > leçon suivante.
  const action = due > 0
    ? { label: `Réviser ${Math.min(due, goal)} mot(s) prévus aujourd’hui`, to: '/revisions', why: 'Les révisions espacées sont plus efficaces le jour prévu.' }
    : hardest.length
      ? { label: `Retravailler : ${findLesson(hardest[0][0])!.lesson.title}`, to: `/revisions?erreurs=${encodeURIComponent(hardest[0][0])}`, why: 'Ta notion la plus difficile en ce moment.' }
      : activity
        ? { label: `Reprendre : ${activity.title}`, to: activity.path, why: 'Ta dernière leçon ouverte.' }
        : next
          ? { label: `Leçon suivante : ${next.lesson.title}`, to: lessonPath(next.level, next.lesson), why: next.level.name }
          : null

  // Compétences réellement mesurées par les activités du site.
  const lessons = list.flatMap((lv) => lv.lessons)
  const scores = lessons.map((l) => p.lessons[l.id]?.bestScore).filter((x): x is number => x !== undefined)
  const oral = (p.practice ?? []).filter((x) => x.kind === 'oral' && x.mode === 'repeat' && x.score !== null && sceneLang(x.refId) === lang.id)
  const scenes = (p.practice ?? []).filter((x) => x.kind === 'scene' && x.total > 0 && sceneLang(x.refId) === lang.id)
  const skills = [
    { name: 'Vocabulaire mémorisé', value: cards.length ? Math.round((cards.filter(([, c]) => isMastered(c)).length / cards.length) * 100) : null, detail: `${cards.filter(([, c]) => isMastered(c)).length}/${cards.length} mots (intervalle ≥ 14 j)` },
    { name: 'Grammaire et écrit', value: scores.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : null, detail: `meilleur score moyen sur ${scores.length} leçon(s)` },
    { name: 'Compréhension en situation', value: scenes.length ? Math.round((scenes.reduce((a, x) => a + (x.score ?? 0) / x.total, 0) / scenes.length) * 100) : null, detail: `${scenes.length} scène(s) jouée(s)` },
    { name: 'Oral (correspondance textuelle)', value: oral.length ? Math.round(oral.reduce((a, x) => a + (x.score ?? 0), 0) / oral.length) : null, detail: `${oral.length} répétition(s) enregistrée(s) · pas une note de prononciation` },
  ]

  const purpose = p.goal?.purpose
  const suggestions = purpose ? lessons.filter((l) => !p.lessons[l.id]?.completed && GOAL_KEYWORDS[purpose].test(`${l.title} ${l.objectives.join(' ')}`)).slice(0, 4) : []
  const levelOf = (id: string) => list.find((lv) => lv.lessons.some((l) => l.id === id))!

  return (
    <section className="today card">
      <div className="today-grid">
        <div>
          <p className="eyebrow">AUJOURD’HUI</p>
          {action ? (
            <>
              <h2>{action.label}</h2>
              <p className="small muted">{action.why}</p>
              <Link className="btn" to={action.to}>C’est parti →</Link>
            </>
          ) : (
            <h2>Tout est à jour 🎉</h2>
          )}
        </div>
        <div>
          <div className="row between small"><strong>Objectif du jour</strong><button className="link" onClick={() => setEditGoal(!editGoal)}>{editGoal ? 'Fermer' : 'Modifier'}</button></div>
          <ProgressBar value={Math.min(100, Math.round((daily.reviews / goal) * 100))} />
          <p className="small muted">{daily.reviews}/{goal} révisions · {daily.activities} activité(s) aujourd’hui</p>
          {editGoal && (
            <form className="goal-form" onSubmit={(e) => { e.preventDefault(); const f = new FormData(e.currentTarget); void setGoal(String(f.get('purpose')), Number(f.get('daily'))).then(() => setEditGoal(false)).catch(() => undefined) }}>
              <label>Mon objectif<select name="purpose" className="input" defaultValue={purpose ?? 'quotidien'}>{PURPOSES.map(([v, l]) => <option key={v} value={v}>{l}</option>)}</select></label>
              <label>Révisions par jour<input name="daily" type="number" min={5} max={100} defaultValue={goal} className="input" /></label>
              <button className="btn small">Enregistrer</button>
            </form>
          )}
        </div>
      </div>

      {hardest.length > 0 && (
        <div className="mt">
          <strong className="small">À retravailler</strong>
          <ul className="plain small">{hardest.map(([id, n]) => <li key={id}><Link className="link" to={`/revisions?erreurs=${encodeURIComponent(id)}`}>{findLesson(id)!.lesson.title}</Link> · {n} erreur(s)</li>)}</ul>
        </div>
      )}

      <div className="skills mt">
        {skills.map((s) => (
          <div key={s.name} className="skill">
            <div className="row between small"><strong>{s.name}</strong><span>{s.value === null ? '—' : `${s.value} %`}</span></div>
            <ProgressBar value={s.value ?? 0} />
            <small className="muted">{s.value === null ? 'Pas encore de données' : s.detail}</small>
          </div>
        ))}
      </div>

      {purpose && (
        <div className="mt">
          <strong className="small">Suggestions pour ton objectif « {PURPOSES.find(([v]) => v === purpose)![1]} »</strong>
          {suggestions.length ? (
            <ul className="plain small">{suggestions.map((l) => <li key={l.id}><Link className="link" to={lessonPath(levelOf(l.id), l)}>{l.title}</Link> <span className="muted">· {levelOf(l.id).name}</span></li>)}</ul>
          ) : <p className="small muted">Pas de leçon correspondante non terminée dans ce cours.</p>}
          {purpose === 'examen' && <p className="small muted">Les tests de niveau du site préparent aux examens ({list.map((l) => l.topik).filter(Boolean).slice(1, 3).join(', ')}…) mais ne sont pas des examens officiels.</p>}
        </div>
      )}
    </section>
  )
}
