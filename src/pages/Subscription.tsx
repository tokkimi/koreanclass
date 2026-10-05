import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { mutate, useCurrentUser } from '../lib/store'
import { usePlans } from '../lib/plans'
import { hasFullAccess, inTransition, subscriptionActive, TRANSITION_DAYS } from '../lib/access'
import { OFFERS } from '../lib/pricing'
import { useT } from '../lib/i18n'

/** Formules Découverte / Autonomie et gestion de l'abonnement (Stripe). */
export default function Subscription() {
  const t = useT()
  const user = useCurrentUser()
  const plans = usePlans()
  const [params] = useSearchParams()
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const sub = user?.subscription
  const active = subscriptionActive(user)
  const go = async (action: 'checkout' | 'portal', plan?: 'monthly' | 'yearly') => {
    setBusy(true); setError('')
    try { const r = (await mutate(action, plan ? { plan } : {})) as unknown as { url?: string }; if (r.url) window.location.href = r.url }
    catch (e) { setError((e as Error).message) }
    finally { setBusy(false) }
  }
  const euro = (n: number) => n.toLocaleString('fr-FR', { minimumFractionDigits: n % 1 ? 2 : 0 }) + ' €'
  return (
    <div className="container page subscription">
      <p className="hc-eyebrow">TalkToMe Club</p>
      <h1>{t('Choisis ta formule', 'Choose your plan')}</h1>
      {params.get('statut') === 'ok' && <p className="notice">{t('Merci ! Ton paiement est en cours de confirmation par Stripe : l’accès s’active automatiquement dans quelques secondes (recharge la page si besoin).', 'Thank you! Stripe is confirming your payment: access unlocks automatically within seconds (reload if needed).')}</p>}
      {params.get('statut') === 'annule' && <p className="notice">{t('Paiement annulé : rien n’a été débité.', 'Payment cancelled: nothing was charged.')}</p>}
      {!plans.enabled && <p className="notice">{t('L’abonnement Autonomie ouvre bientôt. Pour l’instant, tous les cours en autonomie restent gratuits.', 'The Autonomie plan opens soon. For now, all self-study courses remain free.')}</p>}
      {plans.enabled && user && inTransition(user, plans) && <p className="notice">{t(`Merci d’être là depuis le début : tu profites de ${TRANSITION_DAYS} jours offerts après l’ouverture de l’abonnement.`, `Thanks for being here from the start: you get ${TRANSITION_DAYS} free days after the plan opens.`)}</p>}

      <div className="plans">
        <section className="card plan">
          <h2>{t('Découverte', 'Discovery')}</h2>
          <p className="plan-price">{t('Gratuit', 'Free')}</p>
          <ul>
            <li>{t('La première leçon de chaque niveau, dans les 5 langues', 'The first lesson of each level, in all 5 languages')}</li>
            <li>{t('Les tests de positionnement', 'Placement tests')}</li>
            <li>{t('Alphabet, nombres, vocabulaire et mises en situation', 'Alphabet, numbers, vocabulary and real-life scenes')}</li>
          </ul>
        </section>
        <section className="card plan featured">
          <h2>Autonomie</h2>
          <p className="plan-price">{euro(plans.monthly)} <small>/ {t('mois', 'month')}</small></p>
          <p className="small muted">{t(`ou ${euro(plans.yearly)} par an (2 mois offerts)`, `or ${euro(plans.yearly)} a year (2 months free)`)}</p>
          <ul>
            <li>{t('Toutes les leçons des 6 niveaux, dans les 5 langues', 'Every lesson of the 6 levels, in all 5 languages')}</li>
            <li>{t('Tests de fin de niveau et badges', 'End-of-level tests and badges')}</li>
            <li>{t('Révisions espacées, flashcards, carnet d’erreurs', 'Spaced reviews, flashcards, mistake notebook')}</li>
            <li>{t('Fiches imprimables avec corrigé', 'Printable sheets with answers')}</li>
            <li>{t('Sans engagement, résiliable à tout moment', 'No commitment, cancel anytime')}</li>
          </ul>
          {!plans.enabled ? (
            <p className="small muted">{t('Bientôt disponible.', 'Coming soon.')}</p>
          ) : !user ? (
            <Link className="btn" to="/inscription?next=/abonnement">{t('Créer mon compte', 'Create my account')}</Link>
          ) : active ? (
            <>
              <p className="small">✓ {t(`Abonnement ${sub!.plan === 'yearly' ? 'annuel' : 'mensuel'} actif jusqu’au`, `${sub!.plan === 'yearly' ? 'Yearly' : 'Monthly'} plan active until`)} {new Date(sub!.currentPeriodEnd).toLocaleDateString(t('fr-FR', 'en-GB'))}{sub!.cancelAtPeriodEnd ? t(' (résiliation programmée)', ' (cancellation scheduled)') : ''}</p>
              <button className="btn ghost" disabled={busy} onClick={() => go('portal')}>{t('Gérer / résilier mon abonnement', 'Manage / cancel my plan')}</button>
            </>
          ) : user.role === 'admin' || user.isDemo ? (
            <p className="small">{t('Ton compte a déjà un accès complet.', 'Your account already has full access.')}</p>
          ) : (
            <div className="row">
              <button className="btn" disabled={busy} onClick={() => go('checkout', 'monthly')}>{t(`S’abonner · ${euro(plans.monthly)}/mois`, `Subscribe · ${euro(plans.monthly)}/month`)}</button>
              <button className="btn ghost" disabled={busy} onClick={() => go('checkout', 'yearly')}>{t(`Annuel · ${euro(plans.yearly)}`, `Yearly · ${euro(plans.yearly)}`)}</button>
            </div>
          )}
          {error && <p className="error small">{error}</p>}
        </section>
        <section className="card plan">
          <h2>{t('Avec un professeur', 'With a teacher')}</h2>
          <p className="plan-price">{euro(OFFERS.single.price)} <small>/ h</small></p>
          <p className="small muted">{t(`ou ${OFFERS.pack10.hours} heures pour ${euro(OFFERS.pack10.price)}`, `or ${OFFERS.pack10.hours} hours for ${euro(OFFERS.pack10.price)}`)}</p>
          <ul><li>{t('Cours particulier en visio, dans la langue de ton choix', 'Private video lesson, in the language of your choice')}</li></ul>
          <Link className="btn ghost" to="/reserver">{t('Réserver un cours', 'Book a lesson')}</Link>
        </section>
      </div>
      {plans.enabled && <p className="small muted mt">{t('Paiement sécurisé par Stripe. Renouvellement automatique jusqu’à résiliation ; la résiliation prend effet à la fin de la période payée.', 'Secure payment by Stripe. Renews automatically until cancelled; cancellation takes effect at the end of the paid period.')} <Link className="link" to="/cgv">{t('Conditions', 'Terms')}</Link></p>}
      {hasFullAccess(user, plans) && plans.enabled && !active && <p className="small mt">{t('Tu as actuellement accès à tous les cours.', 'You currently have access to every course.')}</p>}
    </div>
  )
}
