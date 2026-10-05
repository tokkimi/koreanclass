import { useEffect, useState } from 'react'

/** Leçons relues et validées (id → date), chargées une fois. */
let cache: Promise<Record<string, string>> | null = null
export function useValidated(lessonId: string) {
  const [date, setDate] = useState<string | null>(null)
  useEffect(() => {
    cache ??= fetch('/api/account?view=content', { cache: 'no-store' }).then((r) => (r.ok ? r.json() : {})).catch(() => ({}))
    let active = true
    void cache.then((m) => { if (active) setDate(m[lessonId] ?? null) })
    return () => { active = false }
  }, [lessonId])
  return date
}
