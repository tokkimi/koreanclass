/**
 * Liste les textes français du contenu (cours, ateliers, vocabulaire, pages annexes)
 * qui n'ont pas encore de traduction anglaise dans src/i18n/en/*.json.
 * Usage : npx tsx scripts/i18n-extract.ts [sortie.json]
 * Le cours de français n'est pas extrait : il est déjà expliqué en anglais.
 */
import { readdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs'
import { levels, placementTest } from '../src/data/index'
import { structureUnits, structureLessons } from '../src/data/structures'
import { workshops, workshopLesson } from '../src/data/workshops'
import { vocabularyThemes, words } from '../src/data/vocabulary'
import { vocabularyLessons } from '../src/data/vocabularyQuizzes'
import { colors, colorLesson } from '../src/data/colors'
import { numberLessons } from '../src/data/numberPractice'
import { recognition } from '../src/data/recognition'
import { photoQuiz, colorQuiz } from '../src/data/visualQuizzes'
import { courseLevels, coursePlacement } from '../src/data/courses/index'
import { portalContent, grammarContent } from '../src/data/portal-content/index'
import { vocabContent, vocabWords } from '../src/data/portal-content/vocab'

import { templateSlots } from '../src/i18n/translate'

const dir = 'src/i18n/en'
const known = new Set<string>()
if (existsSync(dir)) for (const f of readdirSync(dir)) if (f.endsWith('.json')) Object.keys(JSON.parse(readFileSync(`${dir}/${f}`, 'utf8'))).forEach((k) => known.add(k))
const skip = existsSync(`${dir}/.same`) ? new Set(readFileSync(`${dir}/.same`, 'utf8').split('\n')) : new Set<string>()
const has = (s: string) => known.has(s) || known.has(s + '.') || (s.endsWith('.') && known.has(s.slice(0, -1)))
const out = new Set<string>()
const TARGET = /^[\s\d\p{P}\p{S}]*$|^https?:|^\/|^#[0-9a-f]{3,8}$/iu
function add(s: string) {
  const t = s.replace(/\s+/g, ' ').trim()
  if (!t || TARGET.test(t) || !/\p{L}/u.test(t)) return
  if (has(t)) return
  const slots = templateSlots(t)
  if (slots) return slots.forEach(add)
  if (/^[\p{Script=Hangul}\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Han}\s\d\p{P}\p{S}ー]+$/u.test(t)) return
  out.add(t)
}
function walk(v: unknown, seen = new Set<unknown>()) {
  if (typeof v === 'string') {
    // Texte sur plusieurs lignes : traduit ligne par ligne (comme RichText l'affiche)
    if (v.includes('\n')) v.split(/\n+/).forEach((l) => add(l.replace(/^\s*(•|\d+\.)\s/, '')))
    else add(v)
    return
  }
  if (!v || typeof v !== 'object' || seen.has(v)) return
  seen.add(v)
  if (Array.isArray(v)) v.forEach((x) => walk(x, seen))
  else Object.entries(v).forEach(([k, x]) => k !== 'id' && !(k === 'items' && typeof x === 'string') && k !== 'image' && k !== 'photo' && k !== 'swatch' && walk(x, seen))
}

walk([levels, placementTest, structureUnits, structureLessons, workshops, workshops.map(workshopLesson), vocabularyThemes, words, vocabularyLessons, colors, colorLesson, numberLessons, recognition, photoQuiz, colorQuiz])
for (const lang of ['japonais', 'espagnol', 'anglais']) {
  walk([courseLevels(lang), coursePlacement(lang), portalContent[lang], grammarContent[lang], vocabContent[lang], vocabWords(lang)])
}

const todo = [...out].filter((s) => !has(s) && !skip.has(s))
const file = process.argv[2]
if (file) writeFileSync(file, JSON.stringify(todo, null, 1))
console.log(`${out.size} textes, ${todo.length} à traduire, ${todo.join('').length} caractères`)
