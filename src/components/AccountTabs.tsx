import { NavLink } from 'react-router-dom'
import { useT } from '../lib/i18n'

/** Les 4 onglets de l'espace personnel, toujours en haut de page. */
export function AccountTabs() {
  const t = useT()
  return (
    <nav className="account-tabs" aria-label={t('Mon espace', 'My account')}>
      <NavLink to="/tableau-de-bord">📊<span>{t('Parcours', 'Progress')}</span></NavLink>
      <NavLink to="/profil" end>👤<span>{t('Profil', 'Profile')}</span></NavLink>
      <NavLink to="/profil/modifier">✏️<span>{t('Modifier', 'Edit')}</span></NavLink>
      <NavLink to="/reservations">📅<span>{t('Réservations', 'Bookings')}</span></NavLink>
    </nav>
  )
}

