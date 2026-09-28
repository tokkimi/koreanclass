import { BookingBubble } from './BookingBubble'
import { languages, type LanguageInfo } from '../data/languages'
import { isBuilt, portalFor, type PortalPage } from '../data/portal'
import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { logout, useCurrentUser, useSyncStatus } from '../lib/store'
import { Avatar } from './Avatar'
import { SITE_NAME } from '../config'
import { Icon } from './Icon'
import { setUiLang, useSiteLang } from '../lib/i18n'
import { baseOf, setLastLang, useLastLang } from '../lib/lastLang'

const FLAGS: Record<string, string> = { coreen: '🇰🇷', japonais: '🇯🇵', espagnol: '🇪🇸', anglais: '🇬🇧', francais: '🇫🇷' }

/** Pages du parcours coréen (le coréen garde ses adresses historiques). */
const KOREAN_PATHS = ['/coreen', '/cours', '/tests', '/test-de-niveau', '/pratique', '/structures', '/alphabet', '/couleurs', '/vocabulaire', '/nombres']
/** Espace personnel : les 4 onglets du haut remplacent la bulle de réservation. */
const ACCOUNT_PATHS = ['/tableau-de-bord', '/profil', '/profil/modifier', '/reservations']
/** Langue de la page affichée : le menu ne montre que cette langue. */
function sectionOf(pathname: string): LanguageInfo | 'coreen' | null {
  const inPath = (p: string) => pathname === p || pathname.startsWith(`${p}/`)
  if (KOREAN_PATHS.some(inPath)) return 'coreen'
  return languages.find((l) => l.id !== 'coreen' && inPath(l.path)) ?? null
}

export function Layout() {
  const user = useCurrentUser()
  const sync = useSyncStatus()
  const [open, setOpen] = useState(false)
  const [langs, setLangs] = useState(false)
  const [picker, setPicker] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const last = useLastLang()
  const inAccount = ACCOUNT_PATHS.includes(location.pathname)
  // Dans l'espace personnel, le menu reste celui de la dernière langue étudiée.
  const section = sectionOf(location.pathname) ?? (inAccount ? (last.id === 'coreen' ? 'coreen' : last) : null)
  const current = section && section !== 'coreen' ? section : null
  const site = useSiteLang()
  // Le cours de français est toujours en anglais ; ailleurs, on suit le choix FR / EN du visiteur.
  const en = current?.taughtIn === 'en' || site === 'en'
  const t = (fr: string, english: string) => (en ? english : fr)
  const portal = current?.available ? portalFor(current.id, en ? 'en' : 'fr') : undefined
  const name = (l: LanguageInfo) => (en ? l.nameEn : l.name)
  const built = (page: PortalPage) => !!current && isBuilt(current.id, page)

  const visited = sectionOf(location.pathname)
  // Langue du bouton en bas à gauche : celle de la page, sinon la dernière étudiée.
  const dockLang = visited === 'coreen' ? languages[0] : visited ?? last
  useEffect(() => {
    if (visited) setLastLang(visited === 'coreen' ? 'coreen' : visited.id)
  }, [visited])

  useEffect(() => {
    setOpen(false)
    setLangs(false)
    setPicker(false)
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <div className="app">
      <header className="header">
        <div className="container header-inner">
          <Link to="/" className="logo">
            <img className="logo-full" src="/talktome-club-logo.png" alt="TalkToMe Club" />
          </Link>
          <button className="burger" aria-label={open ? t("Fermer le menu", "Close the menu") : t("Ouvrir le menu", "Open the menu")} aria-controls="main-menu" aria-expanded={open} onClick={() => setOpen(!open)}>
            {open ? t("✕ Fermer", "✕ Close") : "☰ Menu"}
          </button>
          <nav id="main-menu" className={`nav ${open ? 'open' : ''}`} aria-label={t("Menu principal", "Main menu")} onKeyDown={e=>{if(e.key==='Escape'){setOpen(false);document.querySelector<HTMLButtonElement>('.burger')?.focus()}}}>
            {section === 'coreen' ? (
              <>
                {!inAccount && <NavLink to="/" end className="nav-back">{t('← Toutes les langues', '← All languages')}</NavLink>}
                <span className="nav-group">{t('Coréen', 'Korean')}</span>
                <NavLink to="/coreen">{t('Accueil coréen', 'Korean home')}</NavLink>
                <NavLink to="/cours">{t('Cours', 'Lessons')}</NavLink>
                <NavLink to="/alphabet">{t('Hangeul', 'Hangul')}</NavLink>
                <NavLink to="/nombres">{t('Nombres', 'Numbers')}</NavLink>
                <NavLink to="/vocabulaire">{t('Vocabulaire', 'Vocabulary')}</NavLink>
                <NavLink to="/couleurs">{t('Couleurs', 'Colours')}</NavLink>
                <NavLink to="/structures">{t('Phrases & grammaire', 'Sentences & grammar')}</NavLink>
                <NavLink to="/tests">{t('Tests & QCM', 'Tests & quizzes')}</NavLink>
                <NavLink to="/pratique">{t('En situation', 'Real-life practice')}</NavLink>
              </>
            ) : current ? (
              <>
                {!inAccount && <NavLink to="/" end className="nav-back">{portal?.nav.back ?? '← Toutes les langues'}</NavLink>}
                <span className="nav-group">{name(current)}</span>
                <NavLink to={current.path} end>{portal?.nav.home ?? name(current)}</NavLink>
                {current.available && <NavLink to={`${current.path}/cours`}>{portal?.nav.courses ?? 'Cours'}</NavLink>}
                {portal && built('ecriture') && <NavLink to={`${current.path}/ecriture`}>{portal.writing.menu}</NavLink>}
                {portal && built('nombres') && <NavLink to={`${current.path}/nombres`}>{portal.nav.numbers}</NavLink>}
                {portal && built('vocabulaire') && <NavLink to={`${current.path}/vocabulaire`}>{portal.nav.vocabulary}</NavLink>}
                {portal && built('couleurs') && <NavLink to={`${current.path}/couleurs`}>{portal.nav.colors}</NavLink>}
                {portal && built('structures') && <NavLink to={`${current.path}/structures`}>{portal.nav.structures}</NavLink>}
                {portal && built('tests') && <NavLink to={`${current.path}/tests`}>{portal.nav.tests}</NavLink>}
                {portal && built('pratique') && <NavLink to={`${current.path}/pratique`}>{portal.nav.practice}</NavLink>}
              </>
            ) : (
              <>
                <NavLink to="/" end>{t('Accueil', 'Home')}</NavLink>
                <button type="button" className="nav-group nav-toggle" aria-expanded={langs} aria-controls="nav-langs" onClick={() => setLangs(!langs)}>
                  {t('Nos langues', 'Our languages')} <span aria-hidden="true">{langs ? '▴' : '▾'}</span>
                </button>
                {langs && (
                  <div id="nav-langs" className="nav-langs">
                    {languages.map((l) => (
                      <NavLink key={l.id} to={l.path}>
                        {name(l)}
                      </NavLink>
                    ))}
                  </div>
                )}
              </>
            )}
            <NavLink to={current ? `/reserver?langue=${current.id}` : section === 'coreen' ? '/reserver?langue=coreen' : '/reserver'} className="nav-cta">
              {portal?.nav.teacher ?? t('Cours privé', 'Private lesson')}
            </NavLink>
            {user ? (
              <div className="nav-account">
                <NavLink to="/tableau-de-bord" className="nav-account-link">
                  <Avatar user={user} size={30} />
                  <span>{t('Mon espace', 'My account')}</span>
                </NavLink>
                {user.role === 'admin' && <NavLink to="/admin">{t('Administration', 'Admin')}</NavLink>}
                <button
                  type="button"
                  className="nav-logout"
                  onClick={async () => {
                    try { await logout(); navigate('/') } catch { /* error displayed globally */ }
                  }}
                >
                  {t('Déconnexion', 'Log out')}
                </button>
              </div>
            ) : (
              <>
                <NavLink to="/connexion">{t('Connexion', 'Log in')}</NavLink>
                <Link to="/inscription" className="btn small">
                  {t('S’inscrire', 'Sign up')}
                </Link>
              </>
            )}
            {current?.taughtIn !== 'en' && (
              <div className="lang-toggle" role="group" aria-label={t('Langue du site', 'Site language')}>
                <button type="button" aria-pressed={site === 'fr'} className={site === 'fr' ? 'active' : ''} onClick={() => setUiLang('fr')}>
                  FR
                </button>
                <button type="button" aria-pressed={site === 'en'} className={site === 'en' ? 'active' : ''} onClick={() => setUiLang('en')}>
                  EN
                </button>
              </div>
            )}
          </nav>
        </div>
      </header>
      {!open && !picker && !inAccount && <BookingBubble />}
      <main>
        {sync && sync !== 'Progression sauvegardée en ligne' && sync !== 'Sauvegarde en cours…' && <div className="container sync-status" role="status">{sync}</div>}
        <Outlet />
      </main>
      {picker && (
        <div className="dock-picker-backdrop" onClick={() => setPicker(false)}>
          <div id="dock-langs" className="dock-picker" role="group" aria-label={t('Choisir la langue', 'Choose the language')} onClick={(e) => e.stopPropagation()}>
            <p className="dock-picker-title">{t('Quelle langue ?', 'Which language?')}</p>
            {languages.map((l) => (
              <button key={l.id} type="button" className={l.id === dockLang.id ? 'active' : ''} aria-pressed={l.id === dockLang.id} onClick={() => { setLastLang(l.id); setPicker(false); navigate(l.path) }}>
                <span className="dock-flag" aria-hidden="true">{FLAGS[l.id]}</span>
                <span>{name(l)}</span>
              </button>
            ))}
          </div>
        </div>
      )}
      <nav className="mobile-dock" aria-label={t("Navigation principale", "Main navigation")}>
        <button type="button" className={`dock-lang ${picker ? 'active' : ''}`} aria-haspopup="true" aria-expanded={picker} aria-controls="dock-langs" onClick={() => setPicker(!picker)}>
          <span className="dock-flag" aria-hidden="true">{FLAGS[dockLang.id]}</span>
          <span>{name(dockLang)}</span>
        </button>
        <NavLink to={`${baseOf(dockLang)}/cours`}><Icon name="book" /><span>{t('Apprendre', 'Learn')}</span></NavLink>
        <NavLink to={`${baseOf(dockLang)}/pratique`}><Icon name="quiz" /><span>{t('Jouer', 'Play')}</span></NavLink>
        <NavLink to="/tableau-de-bord"><Icon name="chart" /><span>{t('Progrès', 'Progress')}</span></NavLink>
        <NavLink to={user ? '/profil' : '/connexion'}><Icon name="user" /><span>{user ? t('Profil', 'Profile') : t('Connexion', 'Log in')}</span></NavLink>
      </nav>
      <footer className="footer">
        <div className="container footer-grid">
          <div>
            <div className="logo">
              <img className="logo-full" src="/talktome-club-logo.png" alt="TalkToMe Club" />
            </div>
            <p className="muted small">{t('Coréen, japonais, espagnol, anglais et français : du premier mot au niveau courant.', 'Korean, Japanese, Spanish, English and French: from your first word to fluency.')}</p>
          </div>
          <div>
            <h4>{t('Apprendre', 'Learn')}</h4>
            {languages.map((l) => (
              <Link key={l.id} to={l.path}>
                {name(l)}
              </Link>
            ))}
          </div>
          <div>
            <h4>{t('Progresser', 'Progress')}</h4>
            <Link to="/tableau-de-bord">{t('Mon parcours', 'My progress')}</Link>
            <Link to="/reserver">{t('Cours particuliers', 'Private lessons')}</Link>
            <Link to="/reservations">{t('Mes réservations', 'My bookings')}</Link>
          </div>
          <div>
            <h4>{t('Infos', 'Info')}</h4>
            <Link to="/#tarifs">{t('Tarifs', 'Prices')}</Link>
            <Link to="/#faq">FAQ</Link>
            <Link to="/cgv">{t('Conditions de vente & contact', 'Terms of sale & contact')}</Link>
            <Link to="/confidentialite">{t('Confidentialité', 'Privacy')}</Link>
          </div>
        </div>
        <div className="container muted small footer-bottom">© {new Date().getFullYear()} {SITE_NAME}. {t('Tous droits réservés.', 'All rights reserved.')}</div>
      </footer>
    </div>
  )
}
