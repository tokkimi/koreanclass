import Terms from './pages/Terms'
import Colors from './pages/Colors'
import Vocabulary from './pages/Vocabulary'
import { Navigate, Route, Routes } from 'react-router-dom'
import type { ReactNode } from 'react'
import { Layout } from './components/Layout'
import { useCurrentUser, useReady } from './lib/store'
import Home from './pages/Home'
import LanguagesHome from './pages/LanguagesHome'
import LanguagePage from './pages/LanguagePage'
import { languages } from './data/languages'
import { LangCourses, LangLesson, LangLevel, LangTest } from './pages/lang/LangCourse'
import { LangHome, LangPlacement, LangTests } from './pages/lang/LangPortal'
import { LangColors, LangNumbers, LangWriting } from './pages/lang/LangAnnex'
import { LangVocabulary } from './pages/lang/LangVocabulary'
import { LangPractice, LangStructures } from './pages/lang/LangGrammar'
import Practice from './pages/Practice'
import Admin from './pages/Admin'
import Structures from './pages/Structures'
import Courses from './pages/Courses'
import LevelPage from './pages/LevelPage'
import LessonPage from './pages/LessonPage'
import Tests from './pages/Tests'
import LevelTest from './pages/LevelTest'
import Placement from './pages/Placement'
import Alphabet from './pages/Alphabet'
import Numbers from './pages/Numbers'
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
  const ready = useReady()
  if (!ready) return <div className="container page"><p role="status">On retrouve ton parcours…</p></div>
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<LanguagesHome />} />
        <Route path="coreen" element={<Home />} />
        {languages
          .filter((l) => l.id !== 'coreen')
          .flatMap((l) => [
            <Route key={l.id} path={l.path.slice(1)} element={l.available ? <LangHome lang={l} /> : <LanguagePage lang={l} />} />,
            <Route key={`${l.id}-tests`} path={`${l.path.slice(1)}/tests`} element={<LangTests lang={l} />} />,
            <Route key={`${l.id}-ecriture`} path={`${l.path.slice(1)}/ecriture`} element={<LangWriting lang={l} />} />,
            <Route key={`${l.id}-nombres`} path={`${l.path.slice(1)}/nombres`} element={<LangNumbers lang={l} />} />,
            <Route key={`${l.id}-vocabulaire`} path={`${l.path.slice(1)}/vocabulaire`} element={<LangVocabulary lang={l} />} />,
            <Route key={`${l.id}-structures`} path={`${l.path.slice(1)}/structures`} element={<LangStructures lang={l} />} />,
            <Route key={`${l.id}-pratique`} path={`${l.path.slice(1)}/pratique`} element={<LangPractice lang={l} />} />,
            <Route key={`${l.id}-couleurs`} path={`${l.path.slice(1)}/couleurs`} element={<LangColors lang={l} />} />,
            <Route key={`${l.id}-positionnement`} path={`${l.path.slice(1)}/test-de-niveau`} element={<LangPlacement lang={l} />} />,
            <Route key={`${l.id}-cours`} path={`${l.path.slice(1)}/cours`} element={<LangCourses lang={l} />} />,
            <Route key={`${l.id}-niveau`} path={`${l.path.slice(1)}/cours/:levelId`} element={<LangLevel lang={l} />} />,
            <Route key={`${l.id}-lecon`} path={`${l.path.slice(1)}/cours/:levelId/:lessonId`} element={<LangLesson lang={l} />} />,
            <Route key={`${l.id}-test`} path={`${l.path.slice(1)}/tests/:levelId`} element={<LangTest lang={l} />} />,
          ])}
        <Route path="cours" element={<Courses />} />
        <Route path="cours/:levelId" element={<LevelPage />} />
        <Route path="cours/:levelId/:lessonId" element={<LessonPage />} />
        <Route path="tests" element={<Tests />} />
        <Route path="tests/:levelId" element={<LevelTest />} />
        <Route path="test-de-niveau" element={<Placement />} />
        <Route path="pratique" element={<Practice />} />
        <Route path="admin" element={<RequireAuth><Admin /></RequireAuth>} />
        <Route path="structures" element={<Structures />} />
        <Route path="alphabet" element={<Alphabet />} />
        <Route path="couleurs" element={<Colors />} />
        <Route path="vocabulaire" element={<Vocabulary />} />
        <Route path="nombres" element={<Numbers />} />
        <Route path="reserver" element={<Booking />} />
        <Route path="reservations" element={<RequireAuth><Bookings /></RequireAuth>} />
        <Route path="connexion" element={<Login />} />
        <Route path="inscription" element={<Register />} />
        <Route path="tableau-de-bord" element={<RequireAuth><Dashboard /></RequireAuth>} />
        <Route path="profil" element={<RequireAuth><Profile /></RequireAuth>} />
        <Route path="profil/modifier" element={<RequireAuth><EditProfile /></RequireAuth>} />
        <Route path="u/:username" element={<Profile />} />
        <Route path="cgv" element={<Terms />} />
        <Route path="confidentialite" element={<Privacy />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
