import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { AccountTabs } from '../components/AccountTabs'
import { Flashcards, type Card } from '../components/Flashcards'
import { ExerciseRunner } from '../components/ExerciseRunner'
import { addCards, drill, reviewCard, useCurrentUser, useProgress } from '../lib/store'
import { useLastLang } from '../lib/lastLang'
import { findLesson, lessonUrl } from '../lib/lessonIndex'
import { addDays, isDue, isMastered, lessonOfCard, wordOfCard } from '../lib/srs'
import { parisToday } from '../lib/time'
import { useT } from '../lib/i18n'
import { CourseShell } from './lang/LangCourse'
import type { ReactNode } from 'react'

function Shell({ lang, children }: { lang: ReturnType<typeof useLastLang>; children: ReactNode }) {
  return lang.id === 'coreen' ? <>{children}</> : <CourseShell lang={lang}>{children}</CourseShell>
}

/** Mes révisions : file du jour (répétition espacée), carnet d'erreurs, mots à ajouter. */
export default function Reviews() {
  const t = useT()
  const user = useCurrentUser()
  const p = useProgress()
  const lang = useLastLang()
  const [params, setParams] = useSearchParams()
  const [session, setSession] = useState<Card[] | null>(null)
  const today = parisToday()
  const drillLesson = params.get('erreurs')

  const cards = useMemo(
    () => Object.entries(p.srs ?? {}).map(([key, c]) => ({ key, c, found: findLesson(lessonOfCard(key)) })).filter((x) => x.found && x.found.lang === lang.id),
    [p.srs, lang.id],
  )
  // Priorité aux mots les plus souvent oubliés, puis aux plus en retard.
  const due = cards.filter((x) => isDue(x.c, today)).sort((a, b) => b.c.lapses - a.c.lapses || a.c.due.localeCompare(b.c.due))
  const mastered = cards.filter((x) => isMastered(x.c)).length
  const week = Array.from({ length: 7 }, (_, i) => addDays(today, i + 1)).map((d) => ({ d, n: cards.filter((x) => x.c.due === d).length }))
  const goal = p.goal?.dailyReviews ?? 20
  const doneToday = p.daily?.day === today ? p.daily.reviews : 0

  const mistakes = Object.values(p.mistakes ?? {}).filter((m) => !m.resolved).map((m) => ({ m, found: findLesson(m.ref) })).filter((x) => x.found && x.found.lang === lang.id)
  const byLesson = new Map<string, { title: string; indexes: number[]; count: number }>()
  for (const { m, found } of mistakes) {
    const e = byLesson.get(m.ref) ?? { title: found!.lesson.title, indexes: [], count: 0 }
    e.indexes.push(m.index); e.count += m.count
    byLesson.set(m.ref, e)
  }
  const hardest = [...byLesson.entries()].sort((a, b) => b[1].count - a[1].count)
  const missing = Object.entries(p.lessons).filter(([id, l]) => l.completed && findLesson(id)?.lang === lang.id && !cards.some((x) => lessonOfCard(x.key) === id)).map(([id]) => id)

  if (!user) return <div className="container page"><h1>{t('Mes révisions', 'My reviews')}</h1><p>{t('Connecte-toi pour enregistrer tes révisions sur tous tes appareils.', 'Log in to keep your reviews on all your devices.')}</p><Link className="btn" to="/connexion?next=/revisions">{t('Se connecter', 'Log in')}</Link></div>

  if (session) {
    return (
      <div className="container page narrow">
        <h1>🔁 {t('Révision du jour', 'Today’s review')}</h1>
        <p className="small muted">{t('Rappelle-toi la réponse avant de retourner la carte, puis note-toi honnêtement : la date de la prochaine révision en dépend.', 'Recall the answer before flipping the card, then rate yourself honestly: the next review date depends on it.')}</p>
        <Flashcards cards={session} lang={lang} onGrade={(c, g) => reviewCard(c.key!, g)} onDone={() => setSession(null)} />
        <button className="btn ghost small mt" onClick={() => setSession(null)}>{t('← Retour', '← Back')}</button>
      </div>
    )
  }

  if (drillLesson && byLesson.get(drillLesson)) {
    const entry = byLesson.get(drillLesson)!
    const found = findLesson(drillLesson)!
    const indexes = entry.indexes.slice(0, 15)
    return (
      <Shell lang={lang}>
        <div className="container page narrow">
          <h1>📒 {t('Retravailler mes erreurs', 'Work on my mistakes')}</h1>
          <p className="muted">{found.lesson.title} · {indexes.length} {t('exercice(s)', 'exercise(s)')}</p>
          <p className="small muted">{t('Les réponses ne sont visibles qu’après ta tentative. Un exercice réussi sort du carnet.', 'Answers are only shown after your attempt. A passed exercise leaves the notebook.')}</p>
          <ExerciseRunner
            exercises={indexes.map((i) => found.lesson.exercises[i])}
            onFinish={async (_s, _t, _r, answers, op) => { await drill(drillLesson, indexes, answers, op) }}
            onRestart={() => setParams({})}
            finishLabel={t('Terminer', 'Finish')}
          />
          <button className="btn ghost small mt" onClick={() => setParams({})}>{t('← Mes révisions', '← My reviews')}</button>
        </div>
      </Shell>
    )
  }

  return (
    <div className="container page narrow">
      <AccountTabs />
      <h1>🔁 {t('Mes révisions', 'My reviews')} · {t(lang.name, lang.nameEn)}</h1>

      <div className="admin-kpis">
        <div className="card admin-kpi"><strong>{due.length}</strong><span>{t('Mots à revoir aujourd’hui', 'Words due today')}</span></div>
        <div className="card admin-kpi"><strong>{doneToday} / {goal}</strong><span>{t('Objectif du jour', 'Daily goal')}</span></div>
        <div className="card admin-kpi"><strong>{mastered} / {cards.length}</strong><span>{t('Mots mémorisés', 'Words memorised')}</span><small className="muted">{t('intervalle ≥ 14 jours', 'interval ≥ 14 days')}</small></div>
        <div className="card admin-kpi"><strong>{mistakes.length}</strong><span>{t('Erreurs à retravailler', 'Mistakes to work on')}</span></div>
      </div>

      <section className="card mt">
        <h2>{t('File du jour', 'Today’s queue')}</h2>
        {due.length ? (
          <>
            <p className="small">{t('Les mots que tu oublies le plus passent en premier.', 'The words you forget most come first.')}</p>
            <button className="btn" onClick={() => setSession(due.slice(0, Math.max(goal, 10)).map(({ key }) => { const f = findLesson(lessonOfCard(key))!; const v = f.lesson.vocab.find((x) => x.ko === wordOfCard(key))!; return { key, front: v.ko, back: v.fr, rom: v.rom, lessonId: f.lesson.id } }))}>
              {t(`Réviser ${Math.min(due.length, Math.max(goal, 10))} mots`, `Review ${Math.min(due.length, Math.max(goal, 10))} words`)}
            </button>
          </>
        ) : cards.length ? (
          <p className="muted">{t('Rien à revoir aujourd’hui. Reviens demain !', 'Nothing due today. Come back tomorrow!')}</p>
        ) : (
          <p className="muted">{t('Ta file est vide : termine une leçon pour y ajouter ses mots.', 'Your queue is empty: finish a lesson to add its words.')}</p>
        )}
        {cards.length > 0 && (
          <div className="week-due small">
            {week.map(({ d, n }) => <span key={d}><b>{n}</b>{new Date(d + 'T12:00').toLocaleDateString(t('fr-FR', 'en-GB'), { weekday: 'short' })}</span>)}
          </div>
        )}
        {missing.length > 0 && (
          <p className="small mt">
            {t(`${missing.length} leçon(s) réussie(s) avant la mise en place des révisions.`, `${missing.length} lesson(s) passed before reviews existed.`)}{' '}
            <button className="link" onClick={() => void addCards(missing)}>{t('Ajouter leurs mots à ma file', 'Add their words to my queue')}</button>
          </p>
        )}
      </section>

      <section className="card mt">
        <h2>📒 {t('Carnet d’erreurs', 'Mistake notebook')}</h2>
        {hardest.length ? (
          <ul className="plain stack">
            {hardest.map(([id, e]) => {
              const f = findLesson(id)!
              return (
                <li key={id} className="row between">
                  <span><strong>{e.title}</strong><br /><small className="muted">{e.indexes.length} {t('exercice(s)', 'exercise(s)')} · {e.count} {t('erreur(s)', 'mistake(s)')} · <Link className="link" to={lessonUrl(f, lang.path)}>{t('revoir la leçon', 'revisit the lesson')}</Link></small></span>
                  <button className="btn small" onClick={() => setParams({ erreurs: id })}>{t('Retravailler', 'Work on it')}</button>
                </li>
              )
            })}
          </ul>
        ) : (
          <p className="muted small">{t('Aucune erreur en attente. Les exercices manqués dans les leçons et les tests apparaîtront ici.', 'No pending mistakes. Exercises missed in lessons and tests will appear here.')}</p>
        )}
      </section>
    </div>
  )
}
