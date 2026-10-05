import { useEffect, useState } from 'react'
import type { PlanInfo } from './access'
import { canOpenLesson, hasFullAccess } from './access'
import { useCurrentUser } from './store'
import { SUBSCRIPTION } from './pricing'

const OFF: PlanInfo = { enabled: false, monthly: SUBSCRIPTION.monthly, yearly: SUBSCRIPTION.yearly }
let cache: Promise<PlanInfo> | null = null
/** Configuration publique de l'abonnement (désactivé tant que Stripe n'est pas configuré). */
export function usePlans() {
  const [plans, setPlans] = useState<PlanInfo>(OFF)
  useEffect(() => {
    cache ??= fetch('/api/account?view=plans', { cache: 'no-store' }).then((r) => (r.ok ? r.json() : OFF)).catch(() => OFF)
    let active = true
    void cache.then((p) => { if (active) setPlans(p) })
    return () => { active = false }
  }, [])
  return plans
}
export function useFullAccess() {
  const user = useCurrentUser()
  return hasFullAccess(user, usePlans())
}
export function useLessonAccess(indexInLevel: number) {
  const user = useCurrentUser()
  return canOpenLesson(user, usePlans(), indexInLevel)
}
