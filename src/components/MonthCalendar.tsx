import { useState } from 'react'
import { useT } from '../lib/i18n'

export interface CalendarEvent {
  id: string
  date: string
  time: string
  status: string
  label: string
}

const iso = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`

/** Agenda mensuel : un point par cours, couleur selon le statut. Le jour choisi est remonté au parent. */
export function MonthCalendar({ events, selected, onSelect }: { events: CalendarEvent[]; selected: string; onSelect: (date: string) => void }) {
  const t = useT()
  const [month, setMonth] = useState(() => {
    const d = selected ? new Date(selected + 'T12:00') : new Date()
    return new Date(d.getFullYear(), d.getMonth(), 1)
  })
  const locale = t('fr-FR', 'en-GB')
  const start = new Date(month)
  start.setDate(1 - ((month.getDay() + 6) % 7))
  const days = Array.from({ length: 42 }, (_, i) => new Date(start.getFullYear(), start.getMonth(), start.getDate() + i))
  const weeks = days[35].getMonth() === month.getMonth() ? 6 : 5
  const today = iso(new Date())
  const byDay = new Map<string, CalendarEvent[]>()
  for (const e of events) byDay.set(e.date, [...(byDay.get(e.date) ?? []), e])
  const move = (n: number) => setMonth(new Date(month.getFullYear(), month.getMonth() + n, 1))
  const weekdays = Array.from({ length: 7 }, (_, i) => new Date(2024, 0, 1 + i).toLocaleDateString(locale, { weekday: 'narrow' }))

  return (
    <div className="calendar card">
      <div className="calendar-head">
        <button type="button" className="btn ghost small" onClick={() => move(-1)} aria-label={t('Mois précédent', 'Previous month')}>‹</button>
        <strong>{month.toLocaleDateString(locale, { month: 'long', year: 'numeric' })}</strong>
        <button type="button" className="btn ghost small" onClick={() => move(1)} aria-label={t('Mois suivant', 'Next month')}>›</button>
      </div>
      <div className="calendar-grid" role="grid">
        {weekdays.map((w, i) => <span key={i} className="calendar-wd" aria-hidden="true">{w}</span>)}
        {days.slice(0, weeks * 7).map((d) => {
          const key = iso(d)
          const list = byDay.get(key) ?? []
          return (
            <button
              type="button"
              key={key}
              className={['calendar-day', d.getMonth() !== month.getMonth() && 'out', key === today && 'today', key === selected && 'selected'].filter(Boolean).join(' ')}
              onClick={() => onSelect(key)}
              aria-label={`${d.toLocaleDateString(locale, { weekday: 'long', day: 'numeric', month: 'long' })}${list.length ? ` · ${list.length} ${t('cours', 'lesson(s)')}` : ''}`}
              aria-pressed={key === selected}
            >
              <span>{d.getDate()}</span>
              {list.length > 0 && (
                <span className="calendar-dots" aria-hidden="true">
                  {list.slice(0, 3).map((e) => <i key={e.id} className={`dot-${statusClass(e.status)}`} />)}
                </span>
              )}
            </button>
          )
        })}
      </div>
      <div className="calendar-legend small muted">
        <span><i className="dot-confirmed" /> {t('Confirmé', 'Confirmed')}</span>
        <span><i className="dot-requested" /> {t('Demandé', 'Requested')}</span>
        <span><i className="dot-proposed" /> {t('Proposé par le prof', 'Proposed by teacher')}</span>
      </div>
    </div>
  )
}

export const statusClass = (s: string) => (s === 'confirmée' ? 'confirmed' : s === 'proposée' ? 'proposed' : s === 'annulée' ? 'cancelled' : 'requested')
