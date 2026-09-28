import type { Lesson } from '../data/types'
import { ExerciseRunner } from './ExerciseRunner'
import { recordLesson, useCurrentUser } from '../lib/store'
import { useCourseLang } from '../lib/courseLang'
export function SavedQuiz({lesson}:{lesson:Lesson}) {
 const user=useCurrentUser()
 const en=useCourseLang()?.ui==='en'
 return <><p className="muted">{en?(user?'Your result is saved in your progress.':'Play freely. Log in to keep your score on all your devices.'):user?'Ton résultat est enregistré dans ton parcours.':'Tu peux jouer librement. Connecte-toi pour conserver ton score sur tous tes appareils.'}</p><ExerciseRunner key={lesson.id+(user?.id??'guest')} exercises={lesson.exercises} passMark={70} onFinish={async(score,total,_r,answers,id)=>{if(user)await recordLesson(lesson.id,lesson.title,score,total,answers,id)}}/></>
}
