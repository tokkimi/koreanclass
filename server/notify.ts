import { computeBadges } from '../src/lib/badges.js'
import { levels } from '../src/data/index.js'
import { pushNotification, RANKS, type Booking, type Progress } from '../src/lib/model.js'
import type { Account, Database } from './database.js'

const when = (b: Pick<Booking, 'date' | 'time'>) => `${new Date(b.date + 'T12:00').toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', timeZone: 'Europe/Paris' })} à ${b.time}`
export const bookingWhen = when

/** Prévient tous les administrateurs (sauf l'auteur de l'action). */
export function notifyAdmins(db: Database, except: string, n: Parameters<typeof pushNotification>[1]) {
  for (const a of Object.values(db.accounts)) if (a.user.role === 'admin' && a.user.id !== except) pushNotification(a.progress, n)
}

/** Photographie de ce qui peut déclencher une notification de réussite. */
export function achievements(p: Progress) {
  return {
    badges: new Set(computeBadges(p).filter((b) => b.earned).map((b) => b.id)),
    tests: new Set(Object.entries(p.tests).filter(([, t]) => t.passed).map(([id]) => id)),
    rank: RANKS.filter((r) => p.xp >= r.xp).pop()?.name,
  }
}
/** Compare avant / après une activité et notifie badges, niveaux validés et nouveau rang. */
export function notifyAchievements(account: Account, before: ReturnType<typeof achievements>) {
  const p = account.progress
  for (const b of computeBadges(p)) if (b.earned && !before.badges.has(b.id)) pushNotification(p, { id: `badge-${b.id}`, kind: 'badge', title: `${b.icon} Badge obtenu : ${b.name}`, body: b.desc, link: '/tableau-de-bord' })
  for (const [id, t] of Object.entries(p.tests)) {
    if (!t.passed || before.tests.has(id) || levels.some((l) => l.id === id)) continue
    pushNotification(p, { id: `level-${id}`, kind: 'badge', title: '🎉 Niveau validé !', body: p.history.find((h) => h.refId === id)?.title, link: '/tableau-de-bord' })
  }
  const rank = RANKS.filter((r) => p.xp >= r.xp).pop()
  if (rank && rank.name !== before.rank) pushNotification(p, { id: `rank-${rank.xp}`, kind: 'badge', title: `⭐ Nouveau rang : ${rank.fr}`, body: `${rank.name} · ${p.xp} XP`, link: '/profil' })
}
