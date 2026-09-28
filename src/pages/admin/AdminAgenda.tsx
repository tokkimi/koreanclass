import { useState } from 'react'
import { languageName, languages } from '../../data/languages'
import { shortRef, type Booking, type Progress, type User } from '../../lib/model'
import { MonthCalendar, statusClass } from '../../components/MonthCalendar'
import type { Payment } from '../../../server/database'

type Row = { user: User; progress: Progress; activeSessions: number }
type Request = (body: Record<string, unknown>) => Promise<boolean>
const STATUS: Record<string, string> = { demandée: 'Demandé par l’élève', proposée: 'Proposé, en attente de l’élève', confirmée: 'Confirmé', annulée: 'Annulé' }
const HOURS = Array.from({ length: 30 }, (_, i) => `${String(7 + Math.floor(i / 2)).padStart(2, '0')}:${i % 2 ? '30' : '00'}`)

/** Proposer un créneau à un élève (il l'accepte ensuite depuis « Mes réservations »). */
export function ProposeForm({ users, request, userId, date }: { users: Row[]; request: Request; userId?: string; date?: string }) {
  const students = users.filter((u) => u.user.role !== 'admin' && !u.user.archived)
  return (
    <form
      className="admin-form"
      onSubmit={async (e) => {
        e.preventDefault()
        const form = e.currentTarget
        const f = new FormData(form)
        if (await request({ action: 'adminPropose', id: userId ?? f.get('user'), date: f.get('date'), time: f.get('time'), language: f.get('language'), topic: f.get('topic'), note: f.get('note') })) form.reset()
      }}
    >
      {!userId && (
        <label>Élève
          <select name="user" className="input" required defaultValue="">
            <option value="" disabled>Choisir…</option>
            {students.map((u) => <option key={u.user.id} value={u.user.id}>{u.user.displayName} · {u.progress.packCredits} h restantes</option>)}
          </select>
        </label>
      )}
      <label>Date<input name="date" type="date" className="input" required defaultValue={date} /></label>
      <label>Heure (Paris)
        <select name="time" className="input" required defaultValue="18:00">{HOURS.map((h) => <option key={h}>{h}</option>)}</select>
      </label>
      <label>Langue
        <select name="language" className="input" defaultValue="coreen">{languages.map((l) => <option key={l.id} value={l.id}>{l.name}</option>)}</select>
      </label>
      <label>Thème<input name="topic" className="input" maxLength={100} placeholder="Conversation, grammaire…" /></label>
      <label>Note pour l’élève<input name="note" className="input" maxLength={500} placeholder="Lien visio, matériel à préparer…" /></label>
      <button className="btn">Proposer ce créneau</button>
    </form>
  )
}

/** Une réservation côté administrateur : valider, déplacer, annuler. */
export function AdminBookingCard({ b, owner, payment, request }: { b: Booking; owner: User; payment?: Payment; request: Request }) {
  const [edit, setEdit] = useState(false)
  const closed = b.status === 'annulée'
  return (
    <article className="card admin-booking">
      <div className="row between">
        <strong>{owner.displayName} · {new Date(b.date + 'T12:00').toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'short' })} à {b.time}</strong>
        <span className={`booking-status ${statusClass(b.status)}`}>{STATUS[b.status] ?? b.status}</span>
      </div>
      <p className="small muted">
        {languageName(b.language)} · {b.topic} · {b.formula === 'single' ? '1 heure' : b.usedCredit ? 'Crédit utilisé' : b.proposedBy === 'teacher' ? 'Crédit débité à l’acceptation' : 'Pack / accès illimité'}
        {b.paymentId && ` · Paiement ${shortRef(b.paymentId)} : ${payment ? { pending: 'à vérifier', paid: 'reçu', refunded: 'remboursé', cancelled: 'annulé' }[payment.status] : '—'}`}
      </p>
      {b.message && <p className="small">« {b.message} »</p>}
      {b.teacherNote && <p className="small">💬 {b.teacherNote}</p>}
      {!closed && (
        <div className="row">
          {b.status !== 'confirmée' && <button className="btn small" onClick={() => void request({ action: 'adminBooking', id: b.id, status: 'confirmée' })}>✓ Valider l’horaire</button>}
          <button className="btn small ghost" onClick={() => setEdit(!edit)}>Déplacer / note</button>
          <button className="btn small ghost" onClick={() => { if (confirm('Annuler ce cours ? Un crédit utilisé sera restitué. Un paiement PayPal doit être remboursé séparément.')) void request({ action: 'adminBooking', id: b.id, status: 'annulée' }) }}>Annuler</button>
        </div>
      )}
      {edit && !closed && (
        <form
          className="admin-form mt"
          onSubmit={async (e) => {
            e.preventDefault()
            const f = new FormData(e.currentTarget)
            if (await request({ action: 'adminBooking', id: b.id, status: b.status, date: f.get('date'), time: f.get('time'), note: f.get('note') })) setEdit(false)
          }}
        >
          <label>Nouvelle date<input name="date" type="date" className="input" defaultValue={b.date} required /></label>
          <label>Heure<select name="time" className="input" defaultValue={b.time}>{[...new Set([b.time, ...HOURS])].map((h) => <option key={h}>{h}</option>)}</select></label>
          <label>Note pour l’élève<input name="note" className="input" defaultValue={b.teacherNote ?? ''} maxLength={500} /></label>
          <button className="btn small">Enregistrer</button>
        </form>
      )}
    </article>
  )
}

export function AdminAgenda({ users, payments, request, initialFilter }: { users: Row[]; payments: Payment[]; request: Request; initialFilter?: string }) {
  const [day, setDay] = useState(new Date().toISOString().slice(0, 10))
  const [filter, setFilter] = useState(initialFilter ?? 'actifs')
  const all = users.flatMap((u) => u.progress.bookings.map((b) => ({ b, owner: u.user })))
  const shown = all.filter(({ b }) => (filter === 'tous' ? true : filter === 'actifs' ? b.status !== 'annulée' : b.status === filter))
  const ofDay = shown.filter(({ b }) => b.date === day).sort((x, y) => x.b.time.localeCompare(y.b.time))
  const waiting = all.filter(({ b }) => b.status === 'demandée').sort((x, y) => (x.b.date + x.b.time).localeCompare(y.b.date + y.b.time))
  return (
    <div className="admin-agenda">
      <div className="stack">
        <div className="course-switch" role="group" aria-label="Filtrer les cours">
          {[['actifs', 'Tous'], ['demandée', `À valider (${all.filter(({ b }) => b.status === 'demandée').length})`], ['proposée', 'Proposés'], ['confirmée', 'Confirmés'], ['tous', '+ annulés']].map(([id, label]) => (
            <button key={id} type="button" className={filter === id ? 'active' : ''} aria-pressed={filter === id} onClick={() => setFilter(id)}>{label}</button>
          ))}
        </div>
        {filter !== 'actifs' && filter !== 'tous' && (
          <section className="stack">
            <h2>{filter === 'demandée' ? 'À valider' : filter === 'proposée' ? 'Proposés, en attente de l’élève' : 'Confirmés à venir'}</h2>
            {shown.filter(({ b }) => filter !== 'confirmée' || b.date >= new Date().toISOString().slice(0, 10)).sort((x, y) => (x.b.date + x.b.time).localeCompare(y.b.date + y.b.time)).map(({ b, owner }) => <AdminBookingCard key={b.id} b={b} owner={owner} payment={payments.find((p) => p.id === b.paymentId)} request={request} />)}
            {!shown.length && <p className="muted">Rien pour le moment.</p>}
          </section>
        )}
        <MonthCalendar events={shown.map(({ b, owner }) => ({ id: b.id, date: b.date, time: b.time, status: b.status, label: owner.displayName }))} selected={day} onSelect={setDay} />
        <h2>{new Date(day + 'T12:00').toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}</h2>
        {ofDay.length ? ofDay.map(({ b, owner }) => <AdminBookingCard key={b.id} b={b} owner={owner} payment={payments.find((p) => p.id === b.paymentId)} request={request} />) : <p className="muted">Aucun cours ce jour-là.</p>}
      </div>
      <div className="stack">
        <details className="card" open>
          <summary><strong>Proposer un créneau à un élève</strong></summary>
          <ProposeForm key={day} users={users} request={request} date={day} />
        </details>
        <section className="card">
          <h2>Demandes à valider ({waiting.length})</h2>
          {waiting.length ? waiting.map(({ b, owner }) => <AdminBookingCard key={b.id} b={b} owner={owner} payment={payments.find((p) => p.id === b.paymentId)} request={request} />) : <p className="muted">Aucune demande en attente.</p>}
        </section>
      </div>
    </div>
  )
}
