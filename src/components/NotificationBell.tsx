import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { readNotifications, useProgress, type AppNotification } from '../lib/store'
import { useT } from '../lib/i18n'

const SEEN_KEY = 'kc:reminders-seen'
function seenReminders(): string[] {
  try { return JSON.parse(localStorage.getItem(SEEN_KEY) ?? '[]') } catch { return [] }
}

/** Cloche des notifications : rendez-vous, badges, paiements, rappels de cours. */
export function NotificationBell() {
  const t = useT()
  const p = useProgress()
  const [open, setOpen] = useState(false)
  const [toast, setToast] = useState<AppNotification | null>(null)
  const [seen, setSeen] = useState(seenReminders)
  const last = useRef<string | null>(null)

  // Rappels calculés à partir des cours confirmés (aujourd'hui et demain).
  const now = Date.now()
  const reminders: AppNotification[] = p.bookings
    .filter((b) => b.status === 'confirmée')
    .map((b) => ({ b, at: new Date(`${b.date}T${b.time}:00`).getTime() }))
    .filter(({ at }) => at > now && at - now < 36 * 3600000)
    .map(({ b }) => ({
      id: `reminder-${b.id}-${b.date}-${b.time}`,
      date: new Date().toISOString(),
      kind: 'booking' as const,
      title: `⏰ ${t('Rappel : cours', 'Reminder: lesson')} ${new Date(b.date + 'T12:00').toDateString() === new Date().toDateString() ? t('aujourd’hui', 'today') : t('demain', 'tomorrow')} ${t('à', 'at')} ${b.time}`,
      body: b.teacherNote || b.topic,
      link: '/reservations',
      read: seen.includes(`reminder-${b.id}-${b.date}-${b.time}`),
    }))
  const list = [...reminders, ...(p.notifications ?? [])]
  const unread = list.filter((n) => !n.read).length

  // Petite bannière quand une nouvelle notification arrive.
  const newest = list.find((n) => !n.read)
  useEffect(() => {
    if (!newest || newest.id === last.current) return
    if (last.current !== null) {
      setToast(newest)
      const timer = setTimeout(() => setToast(null), 6000)
      last.current = newest.id
      return () => clearTimeout(timer)
    }
    last.current = newest.id
  }, [newest?.id]) // eslint-disable-line react-hooks/exhaustive-deps

  const markAll = () => {
    const ids = reminders.map((r) => r.id)
    setSeen(ids)
    try { localStorage.setItem(SEEN_KEY, JSON.stringify(ids)) } catch { /* préférence facultative */ }
    if ((p.notifications ?? []).some((n) => !n.read)) void readNotifications().catch(() => undefined)
  }

  return (
    <div className="notif">
      <button type="button" className="notif-btn" aria-label={`${t('Notifications', 'Notifications')}${unread ? ` · ${unread} ${t('non lue(s)', 'unread')}` : ''}`} aria-expanded={open} onClick={() => { setOpen(!open); setToast(null) }}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M6 8a6 6 0 1 1 12 0c0 7 3 9 3 9H3s3-2 3-9M10.3 21a1.94 1.94 0 0 0 3.4 0" /></svg>
        {unread > 0 && <span className="notif-count">{unread > 9 ? '9+' : unread}</span>}
      </button>
      {open && (
        <>
          <div className="notif-backdrop" onClick={() => { setOpen(false); markAll() }} />
          <section className="notif-panel" aria-label={t('Notifications', 'Notifications')}>
            <div className="notif-head">
              <strong>{t('Notifications', 'Notifications')}</strong>
              {unread > 0 && <button type="button" className="link small" onClick={markAll}>{t('Tout marquer comme lu', 'Mark all as read')}</button>}
            </div>
            {list.length ? (
              <ul>
                {list.slice(0, 30).map((n) => (
                  <li key={n.id} className={n.read ? '' : 'unread'}>
                    <Link to={n.link ?? '/tableau-de-bord'} onClick={() => { setOpen(false); markAll() }}>
                      <strong>{n.title}</strong>
                      {n.body && <span>{n.body}</span>}
                      <small>{new Date(n.date).toLocaleString(t('fr-FR', 'en-GB'), { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}</small>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="muted small notif-empty">{t('Rien de nouveau pour l’instant. Tes rendez-vous, badges et paiements s’afficheront ici.', 'Nothing new yet. Your lessons, badges and payments will show up here.')}</p>
            )}
          </section>
        </>
      )}
      {toast && !open && (
        <Link to={toast.link ?? '/tableau-de-bord'} className="notif-toast" role="status" onClick={() => setToast(null)}>
          <strong>{toast.title}</strong>
          {toast.body && <span>{toast.body}</span>}
        </Link>
      )}
    </div>
  )
}
