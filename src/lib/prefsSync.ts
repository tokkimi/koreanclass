/**
 * Préférences suivies d'un appareil à l'autre : langue étudiée, langue du site, étape de chaque leçon.
 * Envoyées au serveur (compte connecté) avec un léger délai pour regrouper les changements.
 */
export interface Prefs { lang?: string; ui?: 'fr' | 'en'; step?: { lesson: string; step: string } }
let pending: Prefs = {}
let timer: ReturnType<typeof setTimeout> | null = null
let lastLocal = 0

function send(keepalive = false) {
  if (timer) { clearTimeout(timer); timer = null }
  const body = pending
  pending = {}
  if (!Object.keys(body).length || typeof fetch === 'undefined') return
  void fetch('/api/account', {
    method: 'POST', credentials: 'same-origin', keepalive,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action: 'prefs', ...body, operationId: crypto.randomUUID() }),
  }).catch(() => undefined) // non connecté ou hors ligne : la préférence reste sur l'appareil
}

/** Enregistre un changement local (envoyé au serveur 1,5 s plus tard, ou tout de suite si `now`). */
export function syncPref(patch: Prefs, now = false) {
  lastLocal = Date.now()
  pending = { ...pending, ...patch }
  if (now) return send(true)
  if (timer) clearTimeout(timer)
  timer = setTimeout(() => send(), 1500)
}
/** Un changement local récent ne doit pas être écrasé par une réponse serveur plus ancienne. */
export const recentLocalChange = () => Date.now() - lastLocal < 30000
if (typeof window !== 'undefined') window.addEventListener('pagehide', () => send(true))
