import { Link } from 'react-router-dom'
import type { Level } from '../data/types'
import type { Progress, ResultEntry } from '../lib/model'
import { levelStats } from '../lib/model'
import { learningActivity, resultUrl } from '../lib/activityLinks'
import { readQuizDraft } from '../lib/quizDraft'
import { useCurrentUser, useProgress } from '../lib/store'
import { ProgressBar } from './ProgressBar'
import { PASS_MARK } from '../lib/grading'
import './ActivityProgress.css'

export function AssessmentProgress({ refId, kind = 'test' }: { refId: string; kind?: ResultEntry['kind'] }) {
  const user = useCurrentUser()
  const p = useProgress()
  const activity = learningActivity(kind, refId)
  if (!activity) return null
  const records = p.history.filter((h) => h.kind === kind && h.refId === refId)
  const latest = records[0]
  const result = kind === 'test' ? p.tests[refId] : undefined
  if (!latest && !result) return null
  const best = result?.best ?? Math.max(...records.map((h) => Math.round(h.score / h.total * 100)))
  const last = result?.last ?? Math.round(latest!.score / latest!.total * 100)
  return <div className="assessment-progress"><div className="row between small"><strong>Meilleur score · {best} %</strong><span>Dernier score · {last} %</span></div><ProgressBar value={best} label="Meilleur score au test" /><p className="small muted">{result?.attempts ?? records.length} tentative(s){result?.lastAt && ` · ${new Date(result.lastAt).toLocaleDateString('fr-FR')}`}</p>{latest && user && <Link className="link small" to={resultUrl(latest.id)}>Voir mon bilan et les tentatives →</Link>}</div>
}

export function LevelProgressCard({ stat, base, progress, userId, expandedLessons = false }: {
  stat: ReturnType<typeof levelStats>[number]; base: string; progress: Progress; userId?: string; expandedLessons?: boolean
}) {
  const { level, done, total, pct, avg, test } = stat
  const testActivity = learningActivity('test', level.id)!
  const draft = readQuizDraft(level.id, userId, level.test)
  const latest = progress.history.find((h) => h.kind === 'test' && h.refId === level.id)
  const lesson = level.lessons.find((l) => progress.viewed?.[l.id] && !progress.lessons[l.id]?.completed) ?? level.lessons.find((l) => !progress.lessons[l.id]?.completed) ?? level.lessons[0]
  return <section className="card profile-level activity-level" style={{ ['--accent' as string]: level.color }}>
    <Link className="activity-level-head" to={`${base}/cours/${level.id}`}><strong>{level.name}</strong><span className="small muted">{done}/{total} leçons →</span></Link>
    <Link className="activity-meter" to={`${base}/cours/${level.id}`} aria-label={`Ouvrir les leçons : ${level.name}`}><div className="row between small"><strong>Leçons terminées</strong><span>{pct} % →</span></div><ProgressBar value={pct} color={level.color} label="Leçons terminées" /><small>{avg !== null ? `Score moyen des leçons : ${avg} %` : 'Leçons à découvrir'}</small></Link>
    <Link className="activity-meter" to={testActivity.url}><div className="row between small"><strong>Test de fin de niveau</strong><span>{test ? `${test.best} %` : 'À commencer'} →</span></div><ProgressBar value={test?.best ?? 0} color={test?.passed ? '#43825a' : level.color} label="Meilleur score du test" threshold={PASS_MARK} /><small>{test ? `${test.passed ? 'Validé' : 'À retravailler'} · dernier : ${test.last} % · ${test.attempts} tentative(s)` : 'Pas encore passé'} · seuil : {PASS_MARK} %</small></Link>
    <div className="activity-actions"><Link className="btn ghost small" to={`${base}/cours/${level.id}/${lesson.id}`}>{done === total ? 'Revoir les cours' : `${done || progress.viewed?.[lesson.id] ? 'Reprendre' : 'Commencer'} : ${lesson.title}`}</Link><Link className="btn ghost small" to={testActivity.url}>{draft ? `Reprendre le test · question ${draft.index + 1}` : test ? 'Refaire le test' : 'Passer le test'}</Link><Link className="link small" to={`${base}/cours/${level.id}`}>Voir le niveau →</Link>{latest && <Link className="link small" to={resultUrl(latest.id)}>Mon bilan →</Link>}</div>
    {expandedLessons && <details className="activity-lessons"><summary>Voir mes {total} leçons et leurs scores</summary><ul>{level.lessons.map((l) => <LessonProgressLink key={l.id} lesson={l} level={level} base={base} progress={progress} />)}</ul></details>}
  </section>
}
function LessonProgressLink({ lesson, level, base, progress }: { lesson: Level['lessons'][number]; level: Level; base: string; progress: Progress }) {
  const record = progress.lessons[lesson.id]
  return <li><Link to={`${base}/cours/${level.id}/${lesson.id}`}><span>{record?.completed ? '✓' : progress.viewed?.[lesson.id] ? 'En cours' : 'À découvrir'} · {lesson.title}</span><small>{record ? `${record.bestScore} %` : 'Ouvrir →'}</small></Link></li>
}

export function ResultHistoryLink({ entry }: { entry: ResultEntry }) {
  const pct = entry.total > 0 ? Math.round(entry.score / entry.total * 100) : 0
  return <Link className="result-history-link" to={resultUrl(entry.id)}><span className={`score ${pct >= 70 ? 'ok' : 'ko'}`}>{pct} %</span><div className="grow"><strong>{entry.title}</strong><small>{entry.kind === 'lesson' ? 'Leçon' : entry.kind === 'test' ? 'Test' : 'Positionnement'} · {new Date(entry.date).toLocaleString('fr-FR', { dateStyle: 'medium', timeStyle: 'short' })}</small><ProgressBar value={pct} label="Score de cette tentative" /></div><span className="small">{entry.score}/{entry.total}<small>Voir le bilan →</small></span></Link>
}

export function KoreanSpecialProgress() {
  const p = useProgress()
  const user = useCurrentUser()
  return <details className="card activity-special"><summary><strong>Mes tests de tournures de phrases</strong><span>6 paliers · voir les jauges et reprendre →</span></summary>{Array.from({ length: 6 }, (_, index) => {
    const refId = `ko-sentence-stage-${index}`
    const activity = learningActivity('test', refId)!
    const record = p.tests[refId]
    const draft = readQuizDraft(refId, user?.id, activity.exercises)
    const latest = p.history.find((h) => h.refId === refId && h.kind === 'test')
    return <div className="activity-special-row" key={refId}><Link className="activity-meter" to={activity.url}><strong>{activity.title}</strong><ProgressBar value={record?.best ?? 0} label={`Tournures de phrases : palier ${index + 1}`} /><small>{record ? `Meilleur : ${record.best} % · dernier : ${record.last} %` : draft ? `En cours · question ${draft.index + 1}` : 'Pas encore passé'} · Ouvrir →</small></Link>{latest && <Link className="link small" to={resultUrl(latest.id)}>Voir mon bilan →</Link>}</div>
  })}</details>
}
