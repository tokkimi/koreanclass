import type { Database } from './database.js'
import { adminAction } from './admin.js'

/**
 * Opérations de données ponctuelles demandées par l'administratrice, exécutées une seule fois
 * par le site en ligne (même code et mêmes contrôles que l'administration, journalisées).
 */
const MIGRATIONS: { id: string; run: (db: Database) => Promise<boolean> }[] = [
  {
    // Demande du 5 octobre 2026 : fiche Johny Rajalu, formation payée par virement le 4 octobre, cours d'1 h le 4 octobre à 12 h (Paris).
    id: '2026-10-05-johny-rajalu',
    async run(db) {
      const admin = Object.values(db.accounts).find((a) => a.user.role === 'admin' && a.user.username === 'sia') ?? Object.values(db.accounts).find((a) => a.user.role === 'admin')
      if (!admin) return false
      let johny = Object.values(db.accounts).find((a) => a.user.username === 'johny.rajalu')
      if (!johny) {
        await adminAction(db, admin, { action: 'adminCreate', operationId: 'migration-johny-create', displayName: 'Johny Rajalu', username: 'johny.rajalu', email: '' })
        johny = Object.values(db.accounts).find((a) => a.user.username === 'johny.rajalu')!
      }
      const id = johny.user.id
      if (!(db.payments ?? []).some((p) => p.userId === id && p.label === 'Formation Clirus Global'))
        await adminAction(db, admin, { action: 'adminManualPayment', operationId: 'migration-johny-payment', id, label: 'Formation Clirus Global', amount: 7000, method: 'virement', date: '2026-10-04', reference: 'Facture N° UD-2026-012', hours: 0, notify: true })
      if (!johny.progress.bookings.some((b) => b.date === '2026-10-04' && b.time === '12:00'))
        await adminAction(db, admin, { action: 'adminPastLesson', operationId: 'migration-johny-lesson', id, date: '2026-10-04', time: '12:00', topic: 'Formation Clirus Global', note: 'Cours d’1 h · réglé avec la formation (virement)', useCredit: false })
      return true
    },
  },
  {
    // Numéro de facture de l'achat de Johny Rajalu (si l'opération précédente a déjà été appliquée).
    id: '2026-10-05-johny-facture',
    async run(db) {
      const johny = Object.values(db.accounts).find((a) => a.user.username === 'johny.rajalu')
      const pay = johny && (db.payments ?? []).find((p) => p.userId === johny.user.id && p.label === 'Formation Clirus Global')
      if (!pay) return false
      pay.reference = 'Facture N° UD-2026-012'
      for (const l of db.ledger ?? []) if (l.paymentId === pay.id) l.reference = 'Facture N° UD-2026-012'
      return true
    },
  },
]

export const pendingMigrations = (db: Database & { migrations?: string[] }) => MIGRATIONS.filter((m) => !(db.migrations ?? []).includes(m.id))

/** Applique les opérations en attente ; renvoie vrai si la base a changé. */
export async function applyMigrations(db: Database & { migrations?: string[] }) {
  let changed = false
  for (const m of pendingMigrations(db)) {
    if (await m.run(db)) { (db.migrations ??= []).push(m.id); changed = true }
  }
  return changed
}
