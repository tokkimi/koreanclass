import { languages } from '../../data/languages'
import type { Progress, User } from '../../lib/model'
import type { LedgerEntry, Payment } from '../../../server/database'

type Row = { user: User; progress: Progress; activeSessions: number }
const money = (n: number) => (n / 100).toLocaleString('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 })
const monthKey = (d: string) => d.slice(0, 7)
const LANG_PREFIX: Record<string, string> = { 'ja-': 'japonais', 'es-': 'espagnol', 'en-': 'anglais', 'fr-': 'francais' }
const langOf = (id: string) => Object.entries(LANG_PREFIX).find(([p]) => id.startsWith(p))?.[1] ?? 'coreen'

/** Histogramme simple (une seule série, une seule échelle) avec info-bulle et tableau équivalent. */
function Bars({ title, data, format }: { title: string; data: { label: string; value: number }[]; format: (n: number) => string }) {
  const max = Math.max(1, ...data.map((d) => d.value))
  const peak = data.reduce((a, d, i) => (d.value > data[a].value ? i : a), 0)
  return (
    <figure className="card admin-chart">
      <figcaption><strong>{title}</strong></figcaption>
      <div className="bars" role="img" aria-label={`${title} : ${data.map((d) => `${d.label} ${format(d.value)}`).join(', ')}`}>
        {data.map((d, i) => (
          <div key={d.label} className="bar-col" title={`${d.label} · ${format(d.value)}`}>
            <span className="bar-value">{(i === peak || i === data.length - 1) && d.value > 0 ? format(d.value) : ''}</span>
            <span className="bar" style={{ height: `${(d.value / max) * 100}%` }} />
            <span className="bar-label">{d.label}</span>
          </div>
        ))}
      </div>
      <details className="small"><summary>Voir le tableau</summary>
        <table><tbody>{data.map((d) => <tr key={d.label}><td>{d.label}</td><td>{format(d.value)}</td></tr>)}</tbody></table>
      </details>
    </figure>
  )
}

export function AdminStats({ users, payments, ledger, onOpenUser, onGo }: { users: Row[]; payments: Payment[]; ledger: LedgerEntry[]; onOpenUser: (id: string) => void; onGo: (tab: string, extra?: Record<string, string>) => void }) {
  const now = new Date()
  const today = now.toISOString().slice(0, 10)
  const thisMonth = monthKey(today)
  const daysAgo = (n: number) => new Date(now.getTime() - n * 86400000).toISOString()
  const students = users.filter((u) => u.user.role !== 'admin' && !u.user.archived)
  const income = ledger.filter((x) => x.kind === 'income')
  const sum = (list: LedgerEntry[]) => list.reduce((n, x) => n + x.amount, 0)
  const refunds = sum(ledger.filter((x) => x.kind === 'refund'))
  const fees = ledger.reduce((n, x) => n + x.fee, 0)
  const expenses = sum(ledger.filter((x) => x.kind === 'expense'))
  const gross = sum(income)
  const paid = payments.filter((p) => p.status === 'paid' || p.status === 'refunded')
  const pending = payments.filter((p) => p.status === 'pending')
  const bookings = students.flatMap((u) => u.progress.bookings.map((b) => ({ ...b, user: u.user })))
  const live = bookings.filter((b) => b.status !== 'annulée')
  const hoursSold = paid.reduce((n, p) => n + (p.amount >= 10000 ? 10 : 1), 0)
  const credits = students.reduce((n, u) => n + u.progress.packCredits, 0)
  const lastActivity = (p: Progress) => [...p.history.map((h) => h.date), ...(p.practice ?? []).map((x) => x.date)].sort().pop() ?? ''
  const active7 = students.filter((u) => lastActivity(u.progress) >= daysAgo(7)).length
  const active30 = students.filter((u) => lastActivity(u.progress) >= daysAgo(30)).length
  const payers = new Set(paid.map((p) => p.userId))
  const lessonsDone = students.reduce((n, u) => n + Object.values(u.progress.lessons).filter((l) => l.completed).length, 0)
  const testsPassed = students.reduce((n, u) => n + Object.values(u.progress.tests).filter((t) => t.passed).length, 0)

  const months = Array.from({ length: 12 }, (_, i) => monthKey(new Date(now.getFullYear(), now.getMonth() - 11 + i, 15).toISOString()))
  const monthLabel = (m: string) => new Date(m + '-15').toLocaleDateString('fr-FR', { month: 'short' })
  const revenueByMonth = months.map((m) => ({ label: monthLabel(m), value: sum(income.filter((x) => monthKey(x.date) === m)) - sum(ledger.filter((x) => x.kind === 'refund' && monthKey(x.date) === m)) }))
  const signupsByMonth = months.map((m) => ({ label: monthLabel(m), value: students.filter((u) => monthKey(u.user.createdAt) === m).length }))
  const lessonsByMonth = months.map((m) => ({ label: monthLabel(m), value: live.filter((b) => b.status === 'confirmée' && monthKey(b.date) === m).length }))

  const learners = languages.map((l) => ({
    label: l.name,
    value: students.filter((u) => Object.keys(u.progress.lessons).some((id) => langOf(id) === l.id)).length,
  }))
  const bookedByLang = languages.map((l) => ({ label: l.name, value: live.filter((b) => (b.language ?? 'coreen') === l.id).length }))
  const spent = new Map<string, number>()
  for (const p of paid) spent.set(p.userId, (spent.get(p.userId) ?? 0) + p.amount - (p.refunded ?? 0))
  const topClients = [...spent.entries()].sort((a, b) => b[1] - a[1]).slice(0, 8)
  const topXp = [...students].sort((a, b) => b.progress.xp - a.progress.xp).slice(0, 8)
  const upcoming = live.filter((b) => b.date >= today).sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time)).slice(0, 8)
  const name = (id: string) => users.find((u) => u.user.id === id)?.user.displayName ?? 'Compte clôturé'

  type Kpi = { value: string; label: string; sub?: string; go: [string, Record<string, string>?]; alert?: boolean }
  const toValidate = live.filter((b) => b.status === 'demandée').length
  // Les cases sont cliquables : chacune ouvre la rubrique qui permet d'agir.
  const kpis: Kpi[] = [
    { value: `${toValidate}`, label: 'Cours à valider', go: ['agenda', { filter: 'demandée' }], alert: toValidate > 0 },
    { value: `${pending.length}`, label: 'Paiements à vérifier', sub: money(pending.reduce((n, p) => n + p.amount, 0)), go: ['payments'], alert: pending.length > 0 },
    { value: `${live.filter((b) => b.status === 'confirmée' && b.date >= today).length}`, label: 'Cours à venir', go: ['agenda', { filter: 'confirmée' }] },
    { value: `${live.filter((b) => b.status === 'proposée').length}`, label: 'Propositions en attente', go: ['agenda', { filter: 'proposée' }] },
    { value: money(sum(income.filter((x) => monthKey(x.date) === thisMonth))), label: 'CA ce mois-ci', go: ['ledger'] },
    { value: money(gross - refunds), label: 'CA total encaissé', sub: `${money(refunds)} remboursés`, go: ['ledger'] },
    { value: money(gross - refunds - fees - expenses), label: 'Résultat net', sub: `${money(fees)} frais · ${money(expenses)} dépenses`, go: ['ledger'] },
    { value: money(sum(income.filter((x) => x.date >= daysAgo(30)))), label: 'CA 30 jours', go: ['ledger'] },
    { value: `${students.length}`, label: 'Élèves', sub: `${students.filter((u) => u.user.createdAt >= daysAgo(30)).length} nouveaux / 30 j`, go: ['users'] },
    { value: `${active7} / ${active30}`, label: 'Actifs 7 j / 30 j', go: ['users'] },
    { value: `${credits} h`, label: 'Heures à planifier', go: ['users'] },
    { value: `${hoursSold} h`, label: 'Heures vendues', go: ['payments'] },
    { value: paid.length ? money(Math.round(gross / paid.length)) : '—', label: 'Panier moyen', go: ['payments'] },
    { value: students.length ? `${Math.round((payers.size / students.length) * 100)} %` : '—', label: 'Clients payants', sub: `${payers.size} client(s)`, go: ['users'] },
    { value: `${live.filter((b) => b.status === 'confirmée' && b.date < today).length}`, label: 'Cours donnés', go: ['bookings'] },
    { value: `${lessonsDone}`, label: 'Leçons terminées', sub: `${testsPassed} niveaux validés`, go: ['users'] },
  ]

  return (
    <div className="stack">
      <div className="admin-kpis">
        {kpis.map((k) => (
          <button type="button" className={`card admin-kpi ${k.alert ? 'alert' : ''}`} key={k.label} onClick={() => onGo(...k.go)}>
            <strong>{k.value}</strong>
            <span>{k.label}</span>
            {k.sub && <small className="muted">{k.sub}</small>}
          </button>
        ))}
      </div>
      <div className="admin-charts">
        <Bars title="Chiffre d’affaires net par mois" data={revenueByMonth} format={money} />
        <Bars title="Cours confirmés par mois" data={lessonsByMonth} format={(n) => `${n} cours`} />
        <Bars title="Nouvelles inscriptions par mois" data={signupsByMonth} format={(n) => `${n}`} />
        <Bars title="Élèves actifs par langue" data={learners} format={(n) => `${n} élève(s)`} />
        <Bars title="Cours réservés par langue" data={bookedByLang} format={(n) => `${n} cours`} />
      </div>
      <div className="admin-charts">
        <section className="card">
          <h2>Prochains cours</h2>
          {upcoming.length ? upcoming.map((b) => (
            <button key={b.id} className="admin-line" onClick={() => onOpenUser(b.user.id)}>
              <strong>{new Date(b.date + 'T12:00').toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'short' })} · {b.time}</strong>
              <span>{b.user.displayName} · {b.status}</span>
            </button>
          )) : <p className="muted">Aucun cours à venir.</p>}
        </section>
        <section className="card">
          <h2>Meilleurs clients</h2>
          {topClients.length ? topClients.map(([id, amount]) => (
            <button key={id} className="admin-line" onClick={() => onOpenUser(id)}><strong>{name(id)}</strong><span>{money(amount)}</span></button>
          )) : <p className="muted">Aucun paiement validé.</p>}
        </section>
        <section className="card">
          <h2>Élèves les plus actifs</h2>
          {topXp.map((u) => (
            <button key={u.user.id} className="admin-line" onClick={() => onOpenUser(u.user.id)}><strong>{u.user.displayName}</strong><span>{u.progress.xp} XP</span></button>
          ))}
        </section>
      </div>
    </div>
  )
}
