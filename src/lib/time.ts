/** Les cours sont planifiés en heure de Paris ; ces fonctions convertissent sans dépendre du fuseau du visiteur. */
export const TEACHER_TZ = 'Europe/Paris'

function parts(at: Date, timeZone: string) {
  const f = new Intl.DateTimeFormat('en-CA', { timeZone, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' })
  const o = Object.fromEntries(f.formatToParts(at).map((p) => [p.type, p.value]))
  return { date: `${o.year}-${o.month}-${o.day}`, time: `${o.hour}:${o.minute}` }
}
/** Décalage (minutes) d'un fuseau par rapport à UTC à un instant donné. */
function offset(at: Date, timeZone: string) {
  const p = parts(at, timeZone)
  return (Date.UTC(+p.date.slice(0, 4), +p.date.slice(5, 7) - 1, +p.date.slice(8, 10), +p.time.slice(0, 2), +p.time.slice(3, 5)) - Math.floor(at.getTime() / 60000) * 60000) / 60000
}
/** Instant réel d'un créneau « date + heure de Paris » (gère l'heure d'été). */
export function parisToUtc(date: string, time: string): Date {
  const naive = Date.UTC(+date.slice(0, 4), +date.slice(5, 7) - 1, +date.slice(8, 10), +time.slice(0, 2), +time.slice(3, 5))
  let guess = naive - offset(new Date(naive), TEACHER_TZ) * 60000
  guess = naive - offset(new Date(guess), TEACHER_TZ) * 60000
  return new Date(guess)
}
/** Date du jour à Paris (AAAA-MM-JJ). */
export const parisToday = (now = new Date()) => parts(now, TEACHER_TZ).date
/** Fuseau du visiteur. */
export const visitorTz = () => { try { return Intl.DateTimeFormat().resolvedOptions().timeZone } catch { return TEACHER_TZ } }
/** Heure locale du visiteur pour un créneau parisien, ou null si même heure. */
export function localSlot(date: string, time: string, timeZone = visitorTz()) {
  const at = parisToUtc(date, time)
  const local = parts(at, timeZone)
  if (local.date === date && local.time === time) return null
  return { ...local, nextDay: local.date > date, prevDay: local.date < date }
}
