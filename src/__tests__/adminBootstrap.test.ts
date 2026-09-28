import { describe, expect, it } from 'vitest'
import { shortRef, shouldPromote, type User } from '../lib/model'

const user = (username: string, createdAt: string, role?: User['role']): User => ({ id: 'x', username, email: 'x@example.com', displayName: 'X', createdAt, role, avatar: null, bio: '', goal: '', location: '', website: '' })

describe('administrator bootstrap and payment reference', () => {
  it('promotes only the existing @sia account, not a later account reusing the name', () => {
    expect(shouldPromote(user('sia', '2026-09-01T10:00:00.000Z'))).toBe(true)
    expect(shouldPromote(user('sia', '2026-10-01T10:00:00.000Z'))).toBe(false)
    expect(shouldPromote(user('lea', '2026-09-01T10:00:00.000Z'))).toBe(false)
    expect(shouldPromote(user('sia', '2026-09-01T10:00:00.000Z', 'admin'))).toBe(false)
  })
  it('builds a short readable PayPal reference', () => {
    expect(shortRef('5886688b-cb10-4a8d-9fe9-58917c1e7de9')).toBe('TTM-5886688B')
  })
})
