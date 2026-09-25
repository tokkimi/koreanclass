import type { Lesson } from '../data/types'
import { ExerciseRunner } from './ExerciseRunner'
import { recordLesson, useCurrentUser } from '../lib/store'
export function SavedQuiz({lesson}:{lesson:Lesson}) {
 const user=useCurrentUser()
 return <><p className="muted">{user?'Ton résultat est enregistré dans ton parcours.':'Tu peux jouer librement. Connecte-toi pour conserver ton score sur tous tes appareils.'}</p><ExerciseRunner key={lesson.id+(user?.id??'guest')} exercises={lesson.exercises} passMark={70} onFinish={async(score,total,_r,answers,id)=>{if(user)await recordLesson(lesson.id,lesson.title,score,total,answers,id)}}/></>
}
