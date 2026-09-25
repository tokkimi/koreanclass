import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import type { Payment } from '../../server/database'
import { CONTACT_EMAIL, PRICING, PAYMENT_LINK_PACK, PAYMENT_LINK_SINGLE } from '../config'
import { cancelBooking, useCurrentUser, useProgress } from '../lib/store'
import { bookingMailto } from './Booking'

export default function Bookings() {
  const user = useCurrentUser()!
  const p = useProgress()
  const [payments,setPayments]=useState<Payment[]>([])
  const [paymentError,setPaymentError]=useState('')
  useEffect(()=>{let active=true;fetch('/api/account?view=payments',{credentials:'same-origin',cache:'no-store'}).then(async r=>{if(!r.ok)throw Error();return r.json()}).then(d=>{if(active)setPayments(d)}).catch(()=>{if(active)setPaymentError('Le statut des règlements est indisponible. Actualise la page pour réessayer.')});return()=>{active=false}},[p.bookings])
  const todayIso = new Date().toISOString().slice(0, 10)
  const upcoming = p.bookings.filter((b) => b.date >= todayIso).sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time))
  const past = p.bookings.filter((b) => b.date < todayIso)

  const Row = ({ b }: { b: (typeof p.bookings)[number] }) => (
    <li className={`card booking-row ${b.status === 'annulée' ? 'cancelled' : ''}`}>
      <div className="grow">
        <strong>
          {new Date(b.date + 'T12:00').toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })} à {b.time}
        </strong>
        <div className="small muted">
          {b.topic} · {b.formula === 'single' ? `${PRICING.single.label} (${PRICING.single.price} €)` : 'Pack 10 h'} · statut : <em>{b.status}</em>
        </div>
        {b.message && <div className="small">« {b.message} »</div>}
        {b.paymentId&&<div className="mt"><p className="small">Paiement : {({pending:'en attente de vérification',paid:'reçu et validé',refunded:'remboursé',cancelled:'annulé'} as Record<string,string>)[payments.find(x=>x.id===b.paymentId)?.status??'']??'chargement…'}</p>{payments.find(x=>x.id===b.paymentId)?.status==='pending'&&b.status!=='annulée'&&<><a className="btn ghost small" href={b.formula==='single'?PAYMENT_LINK_SINGLE:PAYMENT_LINK_PACK} target="_blank" rel="noreferrer">Payer avec PayPal · {b.formula==='single'?'15':'100'} €</a><p className="small">Indique cette référence dans PayPal : {b.id}. Si tu as déjà réglé, attends la validation du professeur.</p></>}</div>}
      </div>
      {b.status !== 'annulée' && b.date >= todayIso && (
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
      <div className="page-head">
        <h1>Mes réservations</h1>
        <p className="muted">
          Crédit d'heures disponible : <strong>{user.isDemo ? '∞' : p.packCredits} h</strong>
        </p>
        <Link to="/reserver" className="btn">
          + Nouvelle réservation
        </Link>
      </div>
      <p className="small"><Link className="link" to="/cgv">Conditions de vente, reports et remboursements</Link></p><h2>À venir</h2>
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
