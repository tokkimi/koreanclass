import type { User } from '../lib/store'

const COLORS = ['#e11d48', '#f59e0b', '#10b981', '#06b6d4', '#6366f1', '#a855f7']

export function Avatar({ user, size = 40 }: { user: Pick<User, 'avatar' | 'displayName' | 'username'>; size?: number }) {
  const initial = (user.displayName || user.username || '?').trim().charAt(0).toUpperCase()
  const color = COLORS[(user.username.charCodeAt(0) || 0) % COLORS.length]
  return user.avatar ? (
    <img className="avatar" src={user.avatar} alt={user.displayName} width={size} height={size} style={{ width: size, height: size }} />
  ) : (
    <span className="avatar placeholder" style={{ width: size, height: size, background: color, fontSize: size * 0.42 }} aria-label={user.displayName}>
      {initial}
    </span>
  )
}
