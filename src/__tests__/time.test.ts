import { describe, expect, it } from 'vitest'
import { localSlot, parisToUtc, parisToday } from '../lib/time'

describe('Paris time slots', () => {
  it('converts summer and winter Paris times to the right instant', () => {
    expect(parisToUtc('2026-07-10', '18:00').toISOString()).toBe('2026-07-10T16:00:00.000Z')
    expect(parisToUtc('2026-12-10', '18:00').toISOString()).toBe('2026-12-10T17:00:00.000Z')
    expect(parisToUtc('2026-10-25', '09:00').toISOString()).toBe('2026-10-25T08:00:00.000Z')
  })
  it('shows the local time for students in other time zones', () => {
    expect(localSlot('2026-10-12', '18:00', 'Indian/Reunion')).toMatchObject({ time: '20:00', nextDay: false })
    expect(localSlot('2026-10-12', '20:00', 'Asia/Seoul')).toMatchObject({ date: '2026-10-13', time: '03:00', nextDay: true })
    expect(localSlot('2026-10-12', '18:00', 'Europe/Paris')).toBeNull()
  })
  it('gives the Paris calendar day', () => {
    expect(parisToday(new Date('2026-10-01T22:30:00Z'))).toBe('2026-10-02')
  })
})
