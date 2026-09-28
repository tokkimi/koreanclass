import { languageName } from '../data/languages'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import type { Payment } from '../../server/database'
import { CONTACT_EMAIL, PRICING, PAYMENT_LINK_PACK, PAYMENT_LINK_SINGLE } from '../config'
import { cancelBooking, respondProposal, shortRef, useCurrentUser, useProgress } from '../lib/store'
import { MonthCalendar, statusClass } from '../components/MonthCalendar'
import { bookingMailto } from './Booking'
import { AccountTabs } from '../components/AccountTabs'

export default function Bookings() {
  const user = useCurrentUser()!
  const p = useProgress()
  const [payments,setPayments]=useState<Payment[]>([])
  const [paymentError,setPaymentError]=useState('')
  useEffect(()=>{let active=true;fetch('/api/account?view=payments',{credentials:'same-origin',cache:'no-store'}).then(async r=>{if(!r.ok)throw Error();return r.json()}).then(d=>{if(active)setPayments(d)}).catch(()=>{if(active)setPaymentError('Le statut des règlements est indisponible. Actualise la page pour réessayer.')});return()=>{active=false}},[p.bookings])
  const todayIso = new Date().toISOString().slice(0, 10)
  const upcoming = p.bookings.filter((b) => b.date >= todayIso).sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time))
  const past = p.bookings.filter((b) => b.date < todayIso)
  const proposals = p.bookings.filter((b) => b.status === 'proposée' && b.date >= todayIso)
  const [day, setDay] = useState(todayIso)
  const ofDay = p.bookings.filter((b) => b.date === day).sort((a, b) => a.time.localeCompare(b.time))
  const statusLabel: Record<string, string> = { demandée: 'demandé', proposée: 'proposé par le professeur', confirmée: 'confirmé', annulée: 'annulé' }

  const Row = ({ b }: { b: (typeof p.bookings)[number] }) => (
    <li className={`card booking-row ${b.status === 'annulée' ? 'cancelled' : b.status === 'proposée' ? 'proposal-card' : ''}`}>
      <div className="grow">
        <strong>
          {new Date(b.date + 'T12:00').toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })} à {b.time}
        </strong>
        <div className="small muted">
          {languageName(b.language)} · {b.topic} · {b.formula === 'single' ? `${PRICING.single.label} (${PRICING.single.price} €)` : 'Pack 10 h'} · <span className={`booking-status ${statusClass(b.status)}`}>{statusLabel[b.status] ?? b.status}</span>
        </div>
        {b.message && <div className="small">« {b.message} »</div>}
        {b.teacherNote && <div className="small">💬 Professeur : {b.teacherNote}</div>}
        {b.paymentId&&<div className="mt"><p className="small">Paiement : {({pending:'en attente de vérification',paid:'reçu et validé',refunded:'remboursé',cancelled:'annulé'} as Record<string,string>)[payments.find(x=>x.id===b.paymentId)?.status??'']??'chargement…'}</p>{payments.find(x=>x.id===b.paymentId)?.status==='pending'&&b.status!=='annulée'&&<><a className="btn ghost small" href={b.formula==='single'?PAYMENT_LINK_SINGLE:PAYMENT_LINK_PACK} target="_blank" rel="noreferrer">Payer avec PayPal · {b.formula==='single'?'15':'100'} €</a><p className="small">Indique cette référence dans PayPal : <strong>{shortRef(b.id)}</strong>. Si tu as déjà réglé, attends la validation du professeur.</p></>}</div>}
      </div>
      {b.status === 'proposée' && b.date >= todayIso ? (
        <div className="row">
          <button className="btn small" onClick={async () => { try { await respondProposal(b.id, true) } catch { /* Global status shows the error */ } }}>
            ✓ Accepter
          </button>
          <button className="btn small ghost" onClick={async () => { if (confirm('Refuser ce créneau proposé ?')) { try { await respondProposal(b.id, false) } catch { /* Global status shows the error */ } } }}>
            Refuser
          </button>
        </div>
      ) : b.status !== 'annulée' && b.date >= todayIso && (
        <div className="row">
          {CONTACT_EMAIL && (
            <a className="btn small ghost" href={bookingMailto(user, b)}>
              ✉️ Renvoyer
            </a>
          )}
          <button
            className="btn small danger"
            onClick={async () => {
              if (confirm('Annuler cette réservation ?')) { try { await cancelBooking(b.id) } catch { /* Global status shows the error */ } }
            }}
          >
            Annuler
          </button>
        </div>
      )}
    </li>
  )

  return (
    <div className="container page narrow">
      <AccountTabs />
      <div className="page-head">
        <h1>Mes réservations</h1>
        <p className="muted">
          Crédit d'heures disponible : <strong>{user.isDemo ? '∞' : p.packCredits} h</strong>
        </p>
        <Link to="/reserver" className="btn">
          + Nouvelle réservation
        </Link>
      </div>
      <p className="small"><Link className="link" to="/cgv">Conditions de vente, reports et remboursements</Link></p>
      {(p.packCredits > 0 || user.isDemo) && (
        <div className="card notice-card">
          <strong>🎟️ Tu as {user.isDemo ? 'un accès illimité' : `${p.packCredits} h de cours à planifier`}</strong>
          <p className="small muted">Propose tes créneaux : le professeur les valide ou t’en propose d’autres, que tu acceptes ici.</p>
          <Link to="/reserver" className="btn small">Proposer des créneaux</Link>
        </div>
      )}
      {proposals.length > 0 && (
        <>
          <h2>📩 Créneaux proposés par le professeur</h2>
          <ul className="stack plain">
            {proposals.map((b) => (
              <Row key={b.id} b={b} />
            ))}
          </ul>
        </>
      )}
      <h2 className="mt">🗓️ Mon agenda</h2>
      <MonthCalendar events={p.bookings.filter((b) => b.status !== 'annulée').map((b) => ({ id: b.id, date: b.date, time: b.time, status: b.status, label: b.topic }))} selected={day} onSelect={setDay} />
      <h3 className="mt">{new Date(day + 'T12:00').toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}</h3>
      {ofDay.length ? (
        <ul className="stack plain">
          {ofDay.map((b) => (
            <Row key={b.id} b={b} />
          ))}
        </ul>
      ) : (
        <p className="muted small">Aucun cours ce jour-là.</p>
      )}
      <h2 className="mt">À venir</h2>
      {paymentError&&<p role="alert">{paymentError}</p>}
      {upcoming.length ? (
        <ul className="stack plain">
          {upcoming.map((b) => (
            <Row key={b.id} b={b} />
          ))}
        </ul>
      ) : (
        <p className="muted">Aucune réservation à venir.</p>
      )}
      {past.length > 0 && (
        <>
          <h2 className="mt">Passées</h2>
          <ul className="stack plain">
            {past.map((b) => (
              <Row key={b.id} b={b} />
            ))}
          </ul>
        </>
      )}
    </div>
  )
}
