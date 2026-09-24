import { Navigate, Route, Routes } from 'react-router-dom'
import type { ReactNode } from 'react'
import { Layout } from './components/Layout'
import { useCurrentUser } from './lib/store'
import Home from './pages/Home'
import Courses from './pages/Courses'
import LevelPage from './pages/LevelPage'
import LessonPage from './pages/LessonPage'
import Tests from './pages/Tests'
import LevelTest from './pages/LevelTest'
import Placement from './pages/Placement'
import Alphabet from './pages/Alphabet'
import Booking from './pages/Booking'
import Bookings from './pages/Bookings'
import { Login, Register } from './pages/Auth'
import Dashboard from './pages/Dashboard'
import Profile from './pages/Profile'
import EditProfile from './pages/EditProfile'
import Privacy from './pages/Privacy'
import NotFound from './pages/NotFound'

function RequireAuth({ children }: { children: ReactNode }) {
  const user = useCurrentUser()
  if (!user) return <Navigate to={`/connexion?next=${encodeURIComponent(location.pathname)}`} replace />
  return <>{children}</>
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="cours" element={<Courses />} />
        <Route path="cours/:levelId" element={<LevelPage />} />
        <Route path="cours/:levelId/:lessonId" element={<LessonPage />} />
        <Route path="tests" element={<Tests />} />
        <Route path="tests/:levelId" element={<LevelTest />} />
        <Route path="test-de-niveau" element={<Placement />} />
        <Route path="alphabet" element={<Alphabet />} />
        <Route path="reserver" element={<Booking />} />
        <Route path="reservations" element={<RequireAuth><Bookings /></RequireAuth>} />
        <Route path="connexion" element={<Login />} />
        <Route path="inscription" element={<Register />} />
        <Route path="tableau-de-bord" element={<RequireAuth><Dashboard /></RequireAuth>} />
        <Route path="profil" element={<RequireAuth><Profile /></RequireAuth>} />
        <Route path="profil/modifier" element={<RequireAuth><EditProfile /></RequireAuth>} />
        <Route path="u/:username" element={<Profile />} />
        <Route path="confidentialite" element={<Privacy />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
