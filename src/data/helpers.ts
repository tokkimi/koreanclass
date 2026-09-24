import type { Exercise } from './types.js'

/** QCM : la bonne réponse est toujours passée en premier, puis mélangée de façon déterministe. */
export function qcm(q: string, correct: string, wrong: string[], explain?: string): Exercise {
  const options = [correct, ...wrong]
  // rotation déterministe selon la longueur de la question pour varier la position de la bonne réponse
  const shift = hash(q) % options.length
  const rotated = options.map((_, i) => options[(i + shift) % options.length])
  return { type: 'qcm', q, options: rotated, answer: rotated.indexOf(correct), explain }
}

export function fill(q: string, answers: string | string[], hint?: string, explain?: string): Exercise {
  return { type: 'fill', q, answers: Array.isArray(answers) ? answers : [answers], hint, explain }
}

export function match(q: string, pairs: [string, string][]): Exercise {
  return { type: 'match', q, pairs }
}

export function order(q: string, sentence: string, fr?: string, explain?: string): Exercise {
  return { type: 'order', q, words: sentence.split(' '), fr, explain }
}

function hash(s: string): number {
  let h = 0
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0
  return h
}
