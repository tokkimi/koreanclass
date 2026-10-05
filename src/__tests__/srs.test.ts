import { describe, expect, it } from 'vitest'
import { addDays, lessonStatus, newCard, schedule } from '../lib/srs'

describe('spaced repetition', () => {
  it('spaces intervals 1, 3, then by ease, and resets on a lapse', () => {
    let c = newCard('l1', '2026-10-01')
    c = schedule(c, 2, '2026-10-01'); expect([c.interval, c.due]).toEqual([1, '2026-10-02'])
    c = schedule(c, 2, '2026-10-02'); expect([c.interval, c.due]).toEqual([3, '2026-10-05'])
    c = schedule(c, 2, '2026-10-05'); expect(c.interval).toBe(8)
    c = schedule(c, 0, '2026-10-13'); expect([c.interval, c.due, c.lapses, c.reps]).toEqual([0, '2026-10-13', 1, 0])
    expect(c.ease).toBeLessThan(2.5)
  })
  it('handles month boundaries', () => {
    expect(addDays('2026-10-30', 3)).toBe('2026-11-02')
  })
  it('distinguishes viewed, passed and mastered lessons', () => {
    const p = { lessons: {} as Record<string, { completed: boolean }>, viewed: { l1: 'x' } as Record<string, string>, srs: {} as Record<string, ReturnType<typeof newCard>>, mistakes: {} }
    expect(lessonStatus(p, 'l1', 1)).toBe('consultée')
    p.lessons.l1 = { completed: true }
    expect(lessonStatus(p, 'l1', 1)).toBe('réussie')
    p.srs['l1|mot'] = { ...newCard('l1'), interval: 20 }
    expect(lessonStatus(p, 'l1', 1)).toBe('maîtrisée')
    ;(p.mistakes as Record<string, unknown>)['l1#2'] = { ref: 'l1', index: 2, count: 1, lastAt: 'x' }
    expect(lessonStatus(p, 'l1', 1)).toBe('réussie')
  })
})
