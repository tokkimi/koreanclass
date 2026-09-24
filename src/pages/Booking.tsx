import { useMemo, useState, type FormEvent } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { CONTACT_EMAIL, PAYMENT_LINK_PACK, PAYMENT_LINK_SINGLE, PRICING, TIME_SLOTS } from '../config'
import { addBooking, bookWithCredit, useCurrentUser, useProgress, type Booking as BookingT, type User } from '../lib/store'

type Choice = 'single' | 'pack10' | 'credit'

const TOPICS = ['Conversation', 'Grammaire', 'Préparation TOPIK', 'Prononciation', 'Voyage en Corée', 'Hangeul (débutant)', 'Autre']

function nextDays(n: number) {
  const out: Date[] = []
  const d = new Date()
  d.setHours(12, 0, 0, 0)
  for (let i = 1; i <= n; i++) out.push(new Date(d.getTime() + i * 86400000))
  return out
}
const iso = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`

export function bookingMailto(user: User, b: BookingT) {
  const formula = b.formula === 'single' ? `${PRICING.single.label} (${PRICING.single.price} €)` : `${PRICING.pack10.label} (${PRICING.pack10.price} €)`
  const subject = `Réservation cours de coréen — ${b.date} ${b.time}`
  const body = [
    `Bonjour,`,
    ``,
    `Je souhaite réserver un cours particulier :`,
    `• Formule : ${formula}`,
    `• Date : ${new Date(b.date + 'T12:00').toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}`,
    `• Heure : ${b.time} (heure de Paris)`,
    `• Thème : ${b.topic}`,
    b.message ? `• Message : ${b.message}` : '',
    ``,
    `Nom : ${user.displayName} (@${user.username})`,
    `E-mail : ${user.email}`,
    `Référence : ${b.id}`,
  ]
    .filter((l) => l !== '')
    .join('\n')
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

export default function Booking() {
  const user = useCurrentUser()
  const progress = useProgress()
  const [params] = useSearchParams()
  const initial = (params.get('formule') as Choice) || (progress.packCredits > 0 ? 'credit' : 'single')
  const [choice, setChoice] = useState<Choice>(initial)
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [topic, setTopic] = useState(TOPICS[0])
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [confirmed, setConfirmed] = useState<BookingT | null>(null)
  const days = useMemo(() => nextDays(28), [])
  const taken = new Set(progress.bookings.filter((b) => b.status !== 'annulée').map((b) => `${b.date} ${b.time}`))

  function submit(e: FormEvent) {
    e.preventDefault()
    setError('')
    if (!user) return setError('Connectez-vous pour réserver.')
    if (!date || !time) return setError('Choisissez une date et un créneau.')
    try {
      const b =
        choice === 'credit'
          ? bookWithCredit({ date, time, topic, message })
          : addBooking({ formula: choice, date, time, topic, message })
      setConfirmed(b)
      window.scrollTo(0, 0)
    } catch (err) {
      setError((err as Error).message)
    }
  }

  if (confirmed && user) {
    const payLink = choice === 'single' ? PAYMENT_LINK_SINGLE : choice === 'pack10' ? PAYMENT_LINK_PACK : ''
    return (
      <div className="container page narrow">
        <div className="card result-card">
          <div className="feature-icon">📅</div>
          <h1>Demande de réservation enregistrée</h1>
          <p>
            {new Date(confirmed.date + 'T12:00').toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })} à <strong>{confirmed.time}</strong> — {confirmed.topic}
          </p>
          <p className="muted small">
            {choice === 'pack10'
              ? `Pack 10 h : cette séance est réservée et 9 heures ont été ajoutées à votre crédit.`
              : choice === 'credit'
                ? `1 heure a été déduite de votre crédit (reste ${progress.packCredits} h).`
                : `Cours à l'unité : ${PRICING.single.price} €.`}
          </p>
          {CONTACT_EMAIL && (
            <>
              <p className="small">Dernière étape : envoyez la demande au professeur pour qu'il confirme le créneau et vous envoie le lien de visio.</p>
              <a className="btn big" href={bookingMailto(user, confirmed)}>
                ✉️ Envoyer la demande au professeur
              </a>
            </>
          )}
          {payLink && (
            <a className="btn big ghost" href={payLink} target="_blank" rel="noreferrer noopener">
              💳 Payer en ligne ({choice === 'pack10' ? PRICING.pack10.price : PRICING.single.price} €)
            </a>
          )}
          <div className="row center gap">
            <Link to="/reservations" className="btn ghost">
              Mes réservations
            </Link>
            <button className="btn ghost" onClick={() => setConfirmed(null)}>
              Réserver un autre créneau
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container page">
      <div className="page-head">
        <h1>Réserver un cours particulier</h1>
        <p className="muted">1 heure en visio avec un professeur, adaptée à votre niveau et à vos objectifs.</p>
      </div>

      <form className="booking-layout" onSubmit={submit}>
        <div className="stack">
          <div className="card">
            <h2>1. Formule</h2>
            <div className="formulas">
              <label className={`formula ${choice === 'single' ? 'active' : ''}`}>
                <input type="radio" name="f" checked={choice === 'single'} onChange={() => setChoice('single')} />
                <strong>{PRICING.single.label}</strong>
                <span className="price-sm">{PRICING.single.price} €</span>
                <small className="muted">Une séance, sans engagement</small>
              </label>
              <label className={`formula ${choice === 'pack10' ? 'active' : ''}`}>
                <input type="radio" name="f" checked={choice === 'pack10'} onChange={() => setChoice('pack10')} />
                <strong>{PRICING.pack10.label}</strong>
                <span className="price-sm">{PRICING.pack10.price} €</span>
                <small className="muted">10 €/h · 1re séance maintenant, 9 h en crédit</small>
              </label>
              {progress.packCredits > 0 && (
                <label className={`formula ${choice === 'credit' ? 'active' : ''}`}>
                  <input type="radio" name="f" checked={choice === 'credit'} onChange={() => setChoice('credit')} />
                  <strong>Utiliser mon crédit</strong>
                  <span className="price-sm">{progress.packCredits} h</span>
                  <small className="muted">Heures restantes de votre pack</small>
                </label>
              )}
            </div>
          </div>

          <div className="card">
            <h2>2. Date</h2>
            <div className="days">
              {days.map((d) => {
                const v = iso(d)
                return (
                  <button type="button" key={v} className={`day ${date === v ? 'active' : ''}`} onClick={() => setDate(v)}>
                    <small>{d.toLocaleDateString('fr-FR', { weekday: 'short' })}</small>
                    <strong>{d.getDate()}</strong>
                    <small>{d.toLocaleDateString('fr-FR', { month: 'short' })}</small>
                  </button>
                )
              })}
            </div>
          </div>

          <div className="card">
            <h2>3. Créneau (heure de Paris)</h2>
            {!date ? (
              <p className="muted small">Choisissez d'abord une date.</p>
            ) : (
              <div className="slots">
                {TIME_SLOTS.map((t) => {
                  const busy = taken.has(`${date} ${t}`)
                  return (
                    <button type="button" key={t} disabled={busy} className={`slot ${time === t ? 'active' : ''}`} onClick={() => setTime(t)}>
                      {t}
                      {busy && ' · déjà réservé'}
                    </button>
                  )
                })}
              </div>
            )}
          </div>

          <div className="card">
            <h2>4. Vos objectifs</h2>
            <label>
              Thème du cours
              <select className="input" value={topic} onChange={(e) => setTopic(e.target.value)}>
                {TOPICS.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </label>
            <label>
              Message pour le professeur (facultatif)
              <textarea className="input" rows={3} maxLength={500} value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Mon niveau, ce que je veux travailler…" />
            </label>
          </div>
        </div>

        <aside className="card sticky booking-summary">
          <h2>Récapitulatif</h2>
          <ul>
            <li>
              <span>Formule</span>
              <strong>{choice === 'single' ? PRICING.single.label : choice === 'pack10' ? PRICING.pack10.label : 'Crédit pack'}</strong>
            </li>
            <li>
              <span>Date</span>
              <strong>{date ? new Date(date + 'T12:00').toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' }) : '—'}</strong>
            </li>
            <li>
              <span>Heure</span>
              <strong>{time || '—'}</strong>
            </li>
            <li>
              <span>Durée</span>
              <strong>1 heure</strong>
            </li>
            <li className="total">
              <span>Total</span>
              <strong>{choice === 'single' ? `${PRICING.single.price} €` : choice === 'pack10' ? `${PRICING.pack10.price} €` : '0 € (crédit)'}</strong>
            </li>
          </ul>
          {error && <p className="error">{error}</p>}
          {user ? (
            <button className="btn full big" disabled={!date || !time}>
              Confirmer la réservation
            </button>
          ) : (
            <>
              <p className="small muted">Un compte est nécessaire pour réserver et suivre vos cours.</p>
              <Link to="/connexion?next=/reserver" className="btn full">
                Se connecter
              </Link>
              <Link to="/inscription?next=/reserver" className="btn full ghost">
                Créer un compte
              </Link>
            </>
          )}
          <p className="small muted">Le professeur confirme chaque créneau par e-mail. Annulation gratuite jusqu'à 24 h avant.</p>
        </aside>
      </form>
    </div>
  )
}
