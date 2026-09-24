import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="container page center">
      <div className="hero-hangul">404</div>
      <h1>Page introuvable</h1>
      <p className="muted ko-text">페이지를 찾을 수 없어요.</p>
      <Link to="/" className="btn">
        Retour à l'accueil
      </Link>
    </div>
  )
}
