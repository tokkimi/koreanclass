import { useState, type FormEvent } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { login, register } from '../lib/store'

function useNext() {
  const [params] = useSearchParams()
  const next = params.get('next')
  return next && next.startsWith('/') ? next : '/tableau-de-bord'
}

export function Login() {
  const navigate = useNavigate()
  const next = useNext()
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function submit(e: FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(identifier, password)
      navigate(next)
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container page auth">
      <form className="card auth-card" onSubmit={submit}>
        <h1>Connexion</h1>
        <p className="muted">
          다시 만나서 반가워요! <br />
          Heureux de vous revoir.
        </p>
        <label>
          E-mail ou nom d'utilisateur
          <input className="input" value={identifier} onChange={(e) => setIdentifier(e.target.value)} autoComplete="username" required />
        </label>
        <label>
          Mot de passe
          <input className="input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" required />
        </label>
        {error && <p className="error">{error}</p>}
        <button className="btn full" disabled={loading}>
          {loading ? 'Connexion…' : 'Se connecter'}
        </button>
        <p className="small center">
          Pas encore de compte ? <Link to={`/inscription?next=${encodeURIComponent(next)}`}>S'inscrire gratuitement</Link>
        </p>
      </form>
    </div>
  )
}

export function Register() {
  const navigate = useNavigate()
  const next = useNext()
  const [form, setForm] = useState({ displayName: '', username: '', email: '', password: '', confirm: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, [k]: e.target.value })

  async function submit(e: FormEvent) {
    e.preventDefault()
    setError('')
    if (form.password !== form.confirm) return setError('Les mots de passe ne correspondent pas.')
    setLoading(true)
    try {
      await register(form)
      navigate(next === '/tableau-de-bord' ? '/profil/modifier?bienvenue=1' : next)
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container page auth">
      <form className="card auth-card" onSubmit={submit}>
        <h1>Créer un compte</h1>
        <p className="muted">Gratuit — suivez votre progression, vos résultats et réservez vos cours.</p>
        <label>
          Prénom ou pseudo affiché
          <input className="input" value={form.displayName} onChange={set('displayName')} required maxLength={40} />
        </label>
        <label>
          Nom d'utilisateur
          <div className="input-prefix">
            <span>@</span>
            <input
              className="input"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value.toLowerCase().replace(/[^a-z0-9._]/g, '') })}
              required
              minLength={3}
              maxLength={20}
              autoComplete="username"
            />
          </div>
        </label>
        <label>
          E-mail
          <input className="input" type="email" value={form.email} onChange={set('email')} required autoComplete="email" />
        </label>
        <label>
          Mot de passe (6 caractères min.)
          <input className="input" type="password" value={form.password} onChange={set('password')} required minLength={6} autoComplete="new-password" />
        </label>
        <label>
          Confirmer le mot de passe
          <input className="input" type="password" value={form.confirm} onChange={set('confirm')} required autoComplete="new-password" />
        </label>
        {error && <p className="error">{error}</p>}
        <button className="btn full" disabled={loading}>
          {loading ? 'Création…' : 'Créer mon compte'}
        </button>
        <p className="small muted center">
          Vos données sont enregistrées sur cet appareil (voir <Link to="/confidentialite">confidentialité</Link>).
        </p>
        <p className="small center">
          Déjà inscrit(e) ? <Link to={`/connexion?next=${encodeURIComponent(next)}`}>Se connecter</Link>
        </p>
      </form>
    </div>
  )
}
