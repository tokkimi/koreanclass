import { describe, expect, it } from 'vitest'
import { achievements, notifyAchievements } from '../../server/notify'
import { emptyProgress } from '../lib/model'
import type { Account } from '../../server/database'

describe('achievement notifications', () => {
  it('announces a newly earned badge and rank once', () => {
    const account = { user: { id: 'a', username: 'a', email: 'a@example.com', displayName: 'A', createdAt: '2026-01-01', avatar: null, bio: '', goal: '', location: '', website: '' }, progress: emptyProgress(), password: '', salt: '', sessions: {}, operations: [] } as Account
    const before = achievements(account.progress)
    account.progress.lessons['h1'] = { completed: true, bestScore: 100, lastScore: 100, attempts: 1, lastAt: '2026-09-01' }
    account.progress.xp = 350
    notifyAchievements(account, before)
    notifyAchievements(account, before)
    const titles = account.progress.notifications!.map((n) => n.title)
    expect(titles.filter((t) => t.includes('Premier pas'))).toHaveLength(1)
    expect(titles.some((t) => t.includes('Sans faute'))).toBe(true)
    expect(titles.some((t) => t.includes('Nouveau rang'))).toBe(true)
  })
})
