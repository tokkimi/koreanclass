import { Link } from 'react-router-dom'
import { useCurrentUser } from '../lib/store'
import { usePlans } from '../lib/plans'
import { useT } from '../lib/i18n'

/** Écran affiché sur un contenu réservé à la formule Autonomie. */
export function Paywall({ what }: { what: string }) {
  const t = useT()
  const user = useCurrentUser()
  const plans = usePlans()
  return (
    <section className="card paywall">
      <p className="hc-eyebrow">🔒 {t('Formule Autonomie', 'Autonomie plan')}</p>
      <h2>{what}</h2>
      <p>{t(`La première leçon de chaque niveau et les tests de positionnement restent gratuits. Pour tout le reste — leçons, tests de niveau, révisions et fiches — passe à l’abonnement Autonomie : ${plans.monthly.toLocaleString('fr-FR')} € par mois ou ${plans.yearly} € par an, sans engagement.`, `The first lesson of each level and the placement tests stay free. For everything else — lessons, level tests, reviews and sheets — choose the Autonomie plan: €${plans.monthly} a month or €${plans.yearly} a year, cancel anytime.`)}</p>
      <div className="row">
        <Link className="btn" to="/abonnement">{t('Voir l’abonnement', 'See the plan')}</Link>
        {!user && <Link className="btn ghost" to="/connexion?next=/abonnement">{t('Se connecter', 'Log in')}</Link>}
      </div>
    </section>
  )
}
