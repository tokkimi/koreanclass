import { useEffect } from 'react'
import { setLastLang } from '../lib/lastLang'
import { Link, useParams } from 'react-router-dom'
import { useCurrentUser, useProgress } from '../lib/store'
import { learningActivity, practiceUrl, resultUrl } from '../lib/activityLinks'
import { exerciseSignature, readQuizDraft } from '../lib/quizDraft'
import { checkFill } from '../lib/grading'
import type { Exercise } from '../data/types'
import { correctAnswer } from '../components/ExerciseRunner'
import { ProgressBar } from '../components/ProgressBar'
import { AssessmentProgress } from '../components/ActivityProgress'
import { languages } from '../data/languages'
import { RichText } from '../components/RichText'

function isCorrect(exercise: Exercise, answer: string) {
  if (exercise.type === 'fill') return checkFill(exercise, answer)
  if (exercise.type === 'match') return JSON.stringify(answer.split(' · ').sort()) === JSON.stringify(exercise.pairs.map(([a,b])=>`${a} = ${b}`).sort())
  return answer === correctAnswer(exercise)
}

export default function ActivityResult() {
  const { resultId } = useParams()
  const user = useCurrentUser()
  const p = useProgress()
  const entry = p.history.find((h) => h.id === resultId)
  const activity = entry && learningActivity(entry.kind, entry.refId)
  useEffect(() => { if (activity) setLastLang(activity.lang) }, [activity?.lang])
  if (!entry) return <div className="container page narrow"><h1>Bilan introuvable</h1><p>Ce résultat ne figure pas dans l’historique de ce compte. Les 200 tentatives les plus récentes sont conservées.</p><Link className="btn" to="/profil?onglet=resultats">Mes résultats</Link></div>
  const language = languages.find((l) => l.id === activity?.lang)
  const pct = entry.total > 0 ? Math.round(entry.score / entry.total * 100) : 0
  const attempts = p.history.filter((h) => h.kind === entry.kind && h.refId === entry.refId)
  const detailed = activity && entry.answers?.length === activity.exercises.length && entry.exerciseSignature === exerciseSignature(activity.exercises)
  const draft = activity && readQuizDraft(activity.refId, user?.id, activity.exercises)
  return <div className="container page narrow activity-result"><Link className="link small" to="/profil?onglet=resultats">← Mes résultats</Link><header className="page-head"><p className="eyebrow">{language?.name ?? 'MON PARCOURS'} · BILAN DE TENTATIVE</p><h1>{entry.title}</h1><p className="muted">Le {new Date(entry.date).toLocaleString('fr-FR', { dateStyle:'long',timeStyle:'short' })}</p></header><section className="result-score"><strong>{pct} %</strong><ProgressBar value={pct} label="Score de cette tentative" /><p>{entry.score} bonne(s) réponse(s) sur {entry.total}.</p></section>{entry.kind !== 'lesson' && activity && <AssessmentProgress kind={entry.kind} refId={entry.refId} />}
    {activity && <div className="activity-actions"><Link className="btn" to={activity.url}>{entry.kind === 'lesson' ? 'Revoir ou continuer le cours' : draft ? `Reprendre le test · question ${draft.index + 1}` : 'Revenir au test'}</Link>{entry.kind === 'lesson' && <Link className="btn ghost" to={practiceUrl(activity)}>Reprendre les exercices</Link>}<Link className="btn ghost" to={activity.lang === 'coreen' ? '/tests' : `/${activity.lang}/tests`}>Tous mes tests</Link></div>}
    <section className="card mt"><h2>Mes réponses et les corrections</h2>{detailed ? <ol className="answer-review">{activity.exercises.map((exercise,index) => { const correct = isCorrect(exercise,entry.answers![index]); return <li key={index}><strong>{exercise.q}</strong><p className={correct?'is-correct':'is-wrong'}>{correct?'✓ Réponse correcte':'À retravailler'} · Ta réponse : {entry.answers![index] || 'Sans réponse'}</p>{!correct && <p>Réponse attendue : {correctAnswer(exercise)}</p>}{'explain' in exercise && exercise.explain && <RichText text={exercise.explain}/>}</li>})}</ol> : <p className="muted">Le score de cette tentative est conservé. Le détail des réponses n’était pas enregistré, ou le contenu de l’exercice a changé depuis. Les nouvelles tentatives conservent leurs réponses pour permettre de les revoir ici.</p>}</section>
    <section className="card mt"><h2>Historique de cette activité</h2><ul className="results-list">{attempts.map((attempt) => <li key={attempt.id}><Link className="result-history-link" aria-current={attempt.id===entry.id?'page':undefined} to={resultUrl(attempt.id)}><span>{new Date(attempt.date).toLocaleString('fr-FR')}</span><strong>{attempt.score}/{attempt.total} · {Math.round(attempt.score/attempt.total*100)} %</strong><span>Voir →</span></Link></li>)}</ul></section>
  </div>
}
