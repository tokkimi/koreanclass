import { useParams } from 'react-router-dom'
import { getLesson } from '../data'
import { languages } from '../data/languages'
import { LessonStudio } from '../components/LessonStudio'
import NotFound from './NotFound'

export default function LessonRoute() {
  const { levelId, lessonId } = useParams()
  const found = getLesson(levelId, lessonId)
  if (!found) return <NotFound />
  const { level, lesson, index } = found
  return (
    <LessonStudio
      key={lesson.id}
      lang={languages[0]}
      level={level}
      lesson={lesson}
      index={index}
      lessonPath={(id) => `/cours/${level.id}/${id}`}
      levelPath={`/cours/${level.id}`}
      coursesPath="/cours"
      testPath={`/tests/${level.id}`}
      historyTitle={`${level.name.split(' —')[0]} · ${lesson.title}`}
    />
  )
}
