import { NavLink } from 'react-router-dom'
import { useT } from '../lib/i18n'
import { languages } from '../data/languages'
import { setLastLang, useLastLang } from '../lib/lastLang'

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

/** Choix du cours affiché dans l'espace personnel : chaque langue a son propre parcours. */
export function CourseSwitch() {
  const t = useT()
  const current = useLastLang()
  return (
    <div className="course-switch" role="group" aria-label={t('Cours affiché', 'Course shown')}>
      {languages.filter((l) => l.available).map((l) => (
        <button key={l.id} type="button" aria-pressed={l.id === current.id} className={l.id === current.id ? 'active' : ''} onClick={() => setLastLang(l.id)}>
          {t(l.name, l.nameEn)}
        </button>
      ))}
    </div>
  )
}
