import { useRef, useState, type FormEvent } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { changePassword, deleteAccount, resetProgress, updateProfile, useCurrentUser } from '../lib/store'
import { resizeImage } from '../lib/image'
import { Avatar } from '../components/Avatar'

export default function EditProfile() {
  const user = useCurrentUser()!
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const welcome = params.get('bienvenue') === '1'
  const fileRef = useRef<HTMLInputElement>(null)
  const [form, setForm] = useState({
    displayName: user.displayName,
    username: user.username,
    bio: user.bio,
    goal: user.goal,
    location: user.location,
    website: user.website,
  })
  const [avatar, setAvatar] = useState<string | null>(user.avatar)
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null)
  const [pw, setPw] = useState({ current: '', next: '' })
  const [pwMsg, setPwMsg] = useState<{ ok: boolean; text: string } | null>(null)

  async function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0]
    if (!f) return
    try {
      setAvatar(await resizeImage(f))
    } catch (err) {
      setMsg({ ok: false, text: (err as Error).message })
    }
  }

  function save(e: FormEvent) {
    e.preventDefault()
    try {
      updateProfile({ ...form, avatar })
      setMsg({ ok: true, text: 'Profil enregistré ✓' })
      if (welcome) navigate('/tableau-de-bord')
    } catch (err) {
      setMsg({ ok: false, text: (err as Error).message })
    }
  }

  async function savePw(e: FormEvent) {
    e.preventDefault()
    try {
      await changePassword(pw.current, pw.next)
      setPw({ current: '', next: '' })
      setPwMsg({ ok: true, text: 'Mot de passe modifié ✓' })
    } catch (err) {
      setPwMsg({ ok: false, text: (err as Error).message })
    }
  }

  return (
    <div className="container page narrow">
      {welcome && (
        <div className="card notice-card">
          <strong>🎉 Bienvenue {user.displayName} !</strong>
          <p className="small muted">Personnalisez votre profil (photo, bio, objectif), puis commencez votre parcours.</p>
        </div>
      )}
      <form className="card edit-profile" onSubmit={save}>
        <h1>Modifier le profil</h1>
        <div className="avatar-edit">
          <Avatar user={{ ...user, avatar }} size={96} />
          <div>
            <strong>@{form.username}</strong>
            <div className="row">
              <button type="button" className="btn small" onClick={() => fileRef.current?.click()}>
                Changer la photo
              </button>
              {avatar && (
                <button type="button" className="btn small ghost" onClick={() => setAvatar(null)}>
                  Retirer
                </button>
              )}
            </div>
            <input ref={fileRef} type="file" accept="image/*" hidden onChange={onFile} />
          </div>
        </div>
        <label>
          Nom affiché
          <input className="input" value={form.displayName} maxLength={40} onChange={(e) => setForm({ ...form, displayName: e.target.value })} required />
        </label>
        <label>
          Nom d'utilisateur
          <div className="input-prefix">
            <span>@</span>
            <input
              className="input"
              value={form.username}
              maxLength={20}
              onChange={(e) => setForm({ ...form, username: e.target.value.toLowerCase().replace(/[^a-z0-9._]/g, '') })}
              required
            />
          </div>
        </label>
        <label>
          Bio <span className="muted small">({form.bio.length}/150)</span>
          <textarea className="input" rows={3} maxLength={150} value={form.bio} placeholder="J'apprends le coréen pour… 🇰🇷✨" onChange={(e) => setForm({ ...form, bio: e.target.value })} />
        </label>
        <label>
          Mon objectif
          <input className="input" value={form.goal} maxLength={80} placeholder="Ex. : réussir le TOPIK 3 en juin, voyager à Séoul…" onChange={(e) => setForm({ ...form, goal: e.target.value })} />
        </label>
        <div className="grid-2">
          <label>
            Ville
            <input className="input" value={form.location} maxLength={40} placeholder="Paris, France" onChange={(e) => setForm({ ...form, location: e.target.value })} />
          </label>
          <label>
            Site / réseau social
            <input className="input" value={form.website} maxLength={100} placeholder="instagram.com/moncompte" onChange={(e) => setForm({ ...form, website: e.target.value })} />
          </label>
        </div>
        {msg && <p className={msg.ok ? 'success' : 'error'}>{msg.text}</p>}
        <div className="row">
          <button className="btn">Enregistrer</button>
          <Link to="/profil" className="btn ghost">
            Voir mon profil
          </Link>
        </div>
      </form>

      <form className="card mt" onSubmit={savePw}>
        <h2>Mot de passe</h2>
        <div className="grid-2">
          <label>
            Mot de passe actuel
            <input className="input" type="password" value={pw.current} onChange={(e) => setPw({ ...pw, current: e.target.value })} required autoComplete="current-password" />
          </label>
          <label>
            Nouveau mot de passe
            <input className="input" type="password" value={pw.next} onChange={(e) => setPw({ ...pw, next: e.target.value })} required minLength={6} autoComplete="new-password" />
          </label>
        </div>
        {pwMsg && <p className={pwMsg.ok ? 'success' : 'error'}>{pwMsg.text}</p>}
        <button className="btn ghost">Changer le mot de passe</button>
      </form>

      <div className="card mt danger-zone">
        <h2>Zone sensible</h2>
        <div className="row">
          <button
            className="btn ghost"
            onClick={() => {
              if (confirm('Remettre à zéro toute votre progression (leçons, tests, XP) ?')) resetProgress()
            }}
          >
            Réinitialiser ma progression
          </button>
          <button
            className="btn danger"
            onClick={() => {
              if (confirm('Supprimer définitivement votre compte et toutes vos données ?')) {
                deleteAccount()
                navigate('/')
              }
            }}
          >
            Supprimer mon compte
          </button>
        </div>
      </div>
    </div>
  )
}
