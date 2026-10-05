import { describe, expect, it } from 'vitest'
import { applyMigrations, pendingMigrations } from '../../server/migrations'
import type { Account, Database } from '../../server/database'
import { emptyProgress } from '../lib/model'

const account = (id: string, admin = false): Account => ({ user: { id, email: id + '@example.com', username: id, displayName: id, role: admin ? 'admin' : 'student', createdAt: '2026-09-01', avatar: null, bio: '', goal: '', location: '', website: '' }, password: 'x', salt: 'x', sessions: {}, operations: [], progress: emptyProgress() })

describe('one-time data operation: Johny Rajalu', () => {
  it('creates the client, the 70 € bank-transfer purchase and yesterday’s lesson exactly once', async () => {
    const db: Database & { migrations?: string[] } = { version: 1, accounts: { sia: account('sia', true), lea: account('lea') }, limits: {} }
    expect(await applyMigrations(db)).toBe(true)
    expect(await applyMigrations(db)).toBe(false)
    expect(pendingMigrations(db)).toHaveLength(0)
    const johny = Object.values(db.accounts).filter((a) => a.user.username === 'johny.rajalu')
    expect(johny).toHaveLength(1)
    expect(johny[0].user.displayName).toBe('Johny Rajalu')
    const pay = db.payments!.filter((p) => p.userId === johny[0].user.id)
    expect(pay).toHaveLength(1)
    expect(pay[0]).toMatchObject({ amount: 7000, method: 'virement', status: 'paid', label: 'Formation Clirus Global', paidAt: '2026-10-04T12:00:00.000Z', reference: 'Facture N° UD-2026-012' })
    expect(db.ledger!.find((l) => l.paymentId === pay[0].id)!.reference).toBe('Facture N° UD-2026-012')
    expect(johny[0].progress.bookings).toHaveLength(1)
    expect(johny[0].progress.bookings[0]).toMatchObject({ date: '2026-10-04', time: '12:00', status: 'confirmée', usedCredit: false })
    expect(johny[0].progress.notifications![0].title).toContain('virement')
    expect(db.ledger!.filter((l) => l.paymentId === pay[0].id)).toHaveLength(1)
    expect(Object.keys(db.accounts)).toHaveLength(3) // rien d'autre n'est touché
    expect(db.accounts.lea.progress).toEqual(emptyProgress())
  })
  it('does nothing without an administrator', async () => {
    const db: Database & { migrations?: string[] } = { version: 1, accounts: { lea: account('lea') }, limits: {} }
    expect(await applyMigrations(db)).toBe(false)
    expect(Object.keys(db.accounts)).toHaveLength(1)
  })
})
