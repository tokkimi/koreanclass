import type { Exercise } from '../data/types.js'

export interface QuizAnswer { correct: boolean; given: string }
export interface QuizDraft { signature: string; index: number; answers: QuizAnswer[]; checked: QuizAnswer | null; attempt: string; savedAt: string }
const signatures = new WeakMap<Exercise[], string>()
export function exerciseSignature(exercises: Exercise[]) {
  const cached = signatures.get(exercises)
  if (cached) return cached
  const source = JSON.stringify(exercises)
  let hash = 2166136261
  for (let i = 0; i < source.length; i++) hash = Math.imul(hash ^ source.charCodeAt(i), 16777619)
  const signature = `${exercises.length}-${source.length}-${(hash >>> 0).toString(36)}`
  signatures.set(exercises, signature)
  return signature
}
export function quizStorageKey(refId: string, userId?: string) { return `kc:quiz:v1:${userId ?? 'guest'}:${refId}` }
export function readQuizDraft(refId: string, userId: string | undefined, exercises: Exercise[]): QuizDraft | null {
  try {
    const data = JSON.parse(localStorage.getItem(quizStorageKey(refId, userId)) ?? 'null')
    if (!data || data.signature !== exerciseSignature(exercises) || !Number.isInteger(data.index) || data.index < 0 || data.index >= exercises.length || !Array.isArray(data.answers) || data.answers.length !== data.index || typeof data.attempt !== 'string' || !/^[a-zA-Z0-9-]{10,80}$/.test(data.attempt)) return null
    const isAnswer = (answer: unknown): answer is QuizAnswer => !!answer && typeof answer === 'object' && typeof (answer as QuizAnswer).correct === 'boolean' && typeof (answer as QuizAnswer).given === 'string' && (answer as QuizAnswer).given.length <= 3000
    if (!data.answers.every(isAnswer) || (data.checked !== null && !isAnswer(data.checked)) || (!data.answers.length && !data.checked)) return null
    return data
  } catch { return null }
}
export function saveQuizDraft(refId: string, userId: string | undefined, draft: QuizDraft | null) {
  try { if (draft) localStorage.setItem(quizStorageKey(refId, userId), JSON.stringify(draft)); else localStorage.removeItem(quizStorageKey(refId, userId)) } catch { /* Optional local resume. */ }
}
