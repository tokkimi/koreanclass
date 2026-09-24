import { Link } from 'react-router-dom'
import { CONTACT_EMAIL, PRICING } from '../config'
import { cancelBooking, useCurrentUser, useProgress } from '../lib/store'
import { bookingMailto } from './Booking'

export default function Bookings() {
  const user = useCurrentUser()!
  const p = useProgress()
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
      <h2>À venir</h2>
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
