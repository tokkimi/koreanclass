import { describe, expect, it } from 'vitest'
import { canOpenLesson, hasFullAccess, type PlanInfo } from '../lib/access'

const off: PlanInfo = { enabled: false, monthly: 9.9, yearly: 99 }
const on: PlanInfo = { enabled: true, launch: '2026-11-01', monthly: 9.9, yearly: 99 }
const t = (d: string) => Date.parse(d)
const student = (createdAt: string, extra = {}) => ({ createdAt, role: 'student' as const, ...extra })

describe('subscription access', () => {
  it('everything stays free while subscriptions are not configured', () => {
    expect(canOpenLesson(null, off, 5)).toBe(true)
  })
  it('before the launch date nothing is locked', () => {
    expect(canOpenLesson(student('2026-12-01'), on, 3, t('2026-10-20'))).toBe(true)
  })
  it('after launch: first lesson free, others need a subscription', () => {
    const now = t('2026-12-15')
    expect(canOpenLesson(null, on, 0, now)).toBe(true)
    expect(canOpenLesson(null, on, 1, now)).toBe(false)
    expect(canOpenLesson(student('2026-11-20'), on, 1, now)).toBe(false)
    expect(canOpenLesson(student('2026-11-20', { subscription: { status: 'active', plan: 'monthly', customerId: 'c', subscriptionId: 's', currentPeriodEnd: '2027-01-10T00:00:00Z' } }), on, 1, now)).toBe(true)
    expect(canOpenLesson(student('2026-11-20', { subscription: { status: 'canceled', plan: 'monthly', customerId: 'c', subscriptionId: 's', currentPeriodEnd: '2026-12-01T00:00:00Z' } }), on, 1, now)).toBe(false)
  })
  it('existing students get one free month, admins and unlimited accounts keep access', () => {
    expect(hasFullAccess(student('2026-09-01'), on, t('2026-11-20'))).toBe(true)
    expect(hasFullAccess(student('2026-09-01'), on, t('2026-12-05'))).toBe(false)
    expect(hasFullAccess({ createdAt: '2026-12-01', role: 'admin' }, on, t('2027-01-01'))).toBe(true)
    expect(hasFullAccess({ createdAt: '2026-12-01', isDemo: true }, on, t('2027-01-01'))).toBe(true)
  })
})
