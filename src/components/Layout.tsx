import { BookingBubble } from './BookingBubble'
import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { logout, useCurrentUser, useSyncStatus } from '../lib/store'
import { Avatar } from './Avatar'
import { SITE_NAME } from '../config'
import { Icon } from './Icon'

export function Layout() {
  const user = useCurrentUser()
  const sync = useSyncStatus()
  const [open, setOpen] = useState(false)
  const [menu, setMenu] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    setOpen(false)
    setMenu(false)
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <div className="app">
      <header className="header">
        <div className="container header-inner">
          <Link to="/" className="logo">
            <img className="logo-full" src="/talktome-club-logo.png" alt="TalkToMe Club" />
          </Link>
          <button className="burger" aria-label={open ? "Fermer le menu" : "Ouvrir le menu"} aria-controls="main-menu" aria-expanded={open} onClick={() => setOpen(!open)}>
            {open ? "✕ Fermer" : "☰ Menu"}
          </button>
          <nav id="main-menu" className={`nav ${open ? 'open' : ''}`} aria-label="Menu principal" onKeyDown={e=>{if(e.key==='Escape'){setOpen(false);document.querySelector<HTMLButtonElement>('.burger')?.focus()}}}>
            <NavLink to="/" end>Accueil</NavLink>
            <NavLink to="/cours">Cours</NavLink>
            <NavLink to="/alphabet">Hangeul</NavLink>
            <NavLink to="/nombres">Nombres</NavLink>
            <NavLink to="/vocabulaire">Vocabulaire</NavLink>
            <NavLink to="/couleurs">Couleurs</NavLink>
            <NavLink to="/structures">Phrases & grammaire</NavLink>
            <NavLink to="/tests">Tests & QCM</NavLink>
            <NavLink to="/pratique">En situation</NavLink>
            <NavLink to="/reserver" className="nav-cta">
              Cours privé
            </NavLink>
            {user ? (
              <div className="user-menu">
                <button className="user-btn" onClick={() => setMenu(!menu)} aria-haspopup="menu" aria-expanded={menu}>
                  <Avatar user={user} size={34} />
                  <span className="hide-sm">{user.displayName}</span>
                </button>
                {menu && (
                  <div className="dropdown" role="menu">
                    <Link to="/tableau-de-bord">📊 Mon parcours</Link>
                    {user.role==='admin'&&<Link to="/admin">Administration</Link>}
                    <Link to="/profil">👤 Mon profil</Link>
                    <Link to="/profil/modifier">✏️ Modifier le profil</Link>
                    <Link to="/reservations">📅 Mes réservations</Link>
                    <button
                      onClick={async () => {
                        try { await logout(); navigate('/') } catch { /* error displayed globally */ }
                      }}
                    >
                      🚪 Déconnexion
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <NavLink to="/connexion">Connexion</NavLink>
                <Link to="/inscription" className="btn small">
                  S'inscrire
                </Link>
              </>
            )}
          </nav>
        </div>
      </header>
      <BookingBubble />
      <main>
        {sync && sync !== 'Progression sauvegardée en ligne' && sync !== 'Sauvegarde en cours…' && <div className="container sync-status" role="status">{sync}</div>}
        <Outlet />
      </main>
      <nav className="mobile-dock" aria-label="Navigation principale">
        <NavLink to="/" end><Icon name="home" /><span>Accueil</span></NavLink>
        <NavLink to="/cours"><Icon name="book" /><span>Apprendre</span></NavLink>
        <NavLink to="/pratique"><Icon name="quiz" /><span>Jouer</span></NavLink>
        <NavLink to="/tableau-de-bord"><Icon name="chart" /><span>Progrès</span></NavLink>
        <NavLink to={user ? '/profil' : '/connexion'}><Icon name="user" /><span>{user ? 'Profil' : 'Connexion'}</span></NavLink>
      </nav>
      <footer className="footer">
        <div className="container footer-grid">
          <div>
            <div className="logo">
              <img className="logo-full" src="/talktome-club-logo.png" alt="TalkToMe Club" />
            </div>
            <p className="muted small">Le coréen expliqué en français, du hangeul au niveau courant. 화이팅!</p>
          </div>
          <div>
            <h4>Apprendre</h4>
            <Link to="/cours">Tous les cours</Link>
            <Link to="/alphabet">Alphabet coréen</Link>
            <Link to="/pratique">Jeux & studio oral</Link>
            <Link to="/test-de-niveau">Test de positionnement</Link>
          </div>
          <div>
            <h4>Progresser</h4>
            <Link to="/tests">Tests de niveau</Link>
            <Link to="/tableau-de-bord">Mon parcours</Link>
            <Link to="/reserver">Cours particuliers</Link>
          </div>
          <div>
            <h4>Infos</h4>
            <Link to="/#tarifs">Tarifs</Link>
            <Link to="/#faq">FAQ</Link>
            <Link to="/cgv">Conditions de vente & contact</Link>
            <Link to="/confidentialite">Confidentialité</Link>
          </div>
        </div>
        <div className="container muted small footer-bottom">© {new Date().getFullYear()} {SITE_NAME}. Tous droits réservés.</div>
      </footer>
    </div>
  )
}
