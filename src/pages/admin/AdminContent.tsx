import { useState } from 'react'
import { languages } from '../../data/languages'
import { lessonsOf } from '../../lib/lessonIndex'
import type { ContentReport, EditorialState } from '../../../server/database'

type Request = (body: Record<string, unknown>) => Promise<boolean>
const STATUSES = ['brouillon', 'à relire', 'validé'] as const

/** Signalements d'erreurs et statut éditorial des leçons (seul « validé » est affiché aux élèves). */
export function AdminContent({ reports, editorial, request }: { reports: ContentReport[]; editorial: Record<string, EditorialState>; request: Request }) {
  const [lang, setLang] = useState('coreen')
  const [filter, setFilter] = useState('')
  const [limit, setLimit] = useState(20)
  const [only, setOnly] = useState<'tous' | 'aucun' | (typeof STATUSES)[number]>('tous')
  const open = reports.filter((r) => r.status === 'nouveau')
  const list = lessonsOf(lang).filter(({ lesson }) => `${lesson.id} ${lesson.title}`.toLowerCase().includes(filter.toLowerCase()) && (only === 'tous' || (only === 'aucun' ? !editorial[lesson.id] : editorial[lesson.id]?.status === only)))
  const all = lessonsOf(lang)
  const count = (s: string) => all.filter(({ lesson }) => editorial[lesson.id]?.status === s).length
  return (
    <div className="stack">
      <section className="card">
        <h2>🚩 Erreurs signalées ({open.length} à traiter)</h2>
        {!reports.length && <p className="muted">Aucun signalement.</p>}
        {reports.map((r) => (
          <article key={r.id} className={`admin-booking ${r.status === 'nouveau' ? '' : 'muted'}`}>
            <div className="row between"><strong>{r.title}</strong><span className={`booking-status ${r.status === 'nouveau' ? 'requested' : 'confirmed'}`}>{r.status}</span></div>
            <p className="small muted">{r.name} · {new Date(r.date).toLocaleDateString('fr-FR')} · {r.lessonId}</p>
            <p>« {r.message} »</p>
            {r.reply && <p className="small">Réponse : {r.reply}</p>}
            {r.status === 'nouveau' && (
              <form className="row" onSubmit={(e) => { e.preventDefault(); const f = new FormData(e.currentTarget); void request({ action: 'adminReport', id: r.id, status: 'traité', reply: f.get('reply') }) }}>
                <input name="reply" className="input" placeholder="Réponse à l’élève (facultatif)" maxLength={500} />
                <button className="btn small">Marquer traité</button>
              </form>
            )}
          </article>
        ))}
        <p className="small muted">Corriger le contenu se fait dans les fichiers de cours (src/data) puis par une nouvelle mise en ligne.</p>
      </section>

      <section className="card">
        <h2>✍️ Statut éditorial des leçons</h2>
        <p className="small muted">Le badge « relu et validé » n’apparaît sur une leçon que si tu l’as marquée « validé ». Les autres statuts restent internes.</p>
        <div className="course-switch">{languages.map((l) => <button key={l.id} type="button" className={l.id === lang ? 'active' : ''} onClick={() => setLang(l.id)}>{l.name}</button>)}</div>
        <p className="small">{all.length} leçons · {count('validé')} validées · {count('à relire')} à relire · {count('brouillon')} brouillons · {all.length - count('validé') - count('à relire') - count('brouillon')} sans statut</p>
        <div className="row">
          <input className="input" placeholder="Chercher une leçon…" value={filter} onChange={(e) => setFilter(e.target.value)} />
          <select className="input" value={only} onChange={(e) => setOnly(e.target.value as typeof only)}><option value="tous">Tous</option><option value="aucun">Sans statut</option>{STATUSES.map((s) => <option key={s}>{s}</option>)}</select>
        </div>
        <ul className="plain stack mt">
          {list.slice(0, limit).map(({ lesson, level }) => (
            <li key={lesson.id} className="row between editorial-row">
              <span><strong>{lesson.title}</strong><br /><small className="muted">{level.name} · {lesson.id}{editorial[lesson.id] ? ` · ${editorial[lesson.id].status} par ${editorial[lesson.id].by} le ${new Date(editorial[lesson.id].date).toLocaleDateString('fr-FR')}` : ''}</small></span>
              <span className="row">{STATUSES.map((s) => <button key={s} className={`btn small ${editorial[lesson.id]?.status === s ? '' : 'ghost'}`} onClick={() => void request({ action: 'adminEditorial', id: lesson.id, status: s })}>{s}</button>)}</span>
            </li>
          ))}
        </ul>
        {list.length > limit && <button className="btn ghost small" onClick={() => setLimit(limit + 20)}>Afficher plus ({list.length - limit} restantes)</button>}
      </section>
    </div>
  )
}
