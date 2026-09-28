/**
 * Textes français écrits directement dans les pages et composants (JSX, messages d'erreur).
 * Les textes déjà bilingues — t('fr', 'en') ou en ? 'en' : 'fr' — sont ignorés.
 * Usage : npx tsx scripts/i18n-extract-ui.ts [sortie.json]
 */
import ts from 'typescript'
import { readdirSync, readFileSync, writeFileSync, existsSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { templateSlots } from '../src/i18n/translate'

const ROOTS = ['src/pages', 'src/components', 'src/lib', 'src/App.tsx', 'server', 'api', 'src/data/languages.ts', 'src/data/colors.ts']
const SKIP_DIRS = ['src/pages/lang']
const SKIP_ATTR = new Set(['className', 'to', 'href', 'src', 'key', 'id', 'role', 'type', 'lang', 'style', 'name', 'autoComplete', 'inputMode', 'method', 'target', 'rel', 'htmlFor', 'd', 'viewBox', 'fill', 'stroke'])
const files: string[] = []
const visit = (p: string) => {
  if (SKIP_DIRS.includes(p)) return
  if (statSync(p).isDirectory()) readdirSync(p).forEach((f) => visit(join(p, f)))
  else if (/\.tsx?$/.test(p) && !p.includes('__tests__')) files.push(p)
}
ROOTS.forEach((r) => existsSync(r) && visit(r))

const out = new Set<string>()
const FRENCH = /[àâçéèêëîïôûùœ]|\b(le|la|les|des|du|un|une|de|tu|ton|ta|tes|vos|votre|et|ou|pour|avec|dans|sur|est|pas|ce|cette|mon|ma|mes|ici|plus|au|aux|en)\b/i
function add(raw: string) {
  const s = raw.replace(/\s+/g, ' ').trim()
  if (!s || !/\p{Script=Latin}/u.test(s) || !FRENCH.test(s) || /^[./@#]|^https?:|^[a-z-]+(\s[a-z-]+)*$/.test(s) && !/[àâçéèêëîïôûùœ]/.test(s)) return
  const slots = templateSlots(s)
  if (slots) return slots.forEach(add)
  out.add(s)
}
function bilingual(n: ts.Node): boolean {
  for (let p: ts.Node | undefined = n.parent; p; p = p.parent) {
    if (ts.isCallExpression(p) && ts.isIdentifier(p.expression) && p.expression.text === 't' && p.arguments.length === 2) return true
    if (ts.isConditionalExpression(p) && /\b(en|isEn)\b/.test(p.condition.getText())) return true
    if (ts.isPropertyAssignment(p) && ['en', 'nameEn', 'pitchEn', 'levelsEn', 'topicsEn'].includes(p.name.getText())) return true
    if (ts.isImportDeclaration(p) || ts.isExportDeclaration(p)) return true
    if (ts.isJsxAttribute(p) && SKIP_ATTR.has(p.name.getText())) return true
    if (ts.isElementAccessExpression(p) || (ts.isCallExpression(p) && /\.(startsWith|endsWith|includes|getItem|setItem|split|replace|querySelector|get)$/.test(p.expression.getText()))) return true
  }
  return false
}
for (const f of files) {
  const src = ts.createSourceFile(f, readFileSync(f, 'utf8'), ts.ScriptTarget.Latest, true, f.endsWith('x') ? ts.ScriptKind.TSX : ts.ScriptKind.TS)
  const walk = (n: ts.Node) => {
    if (ts.isJsxText(n)) add(n.text)
    else if ((ts.isStringLiteral(n) || ts.isNoSubstitutionTemplateLiteral(n)) && !bilingual(n)) add(n.text)
    else if (ts.isTemplateExpression(n) && !bilingual(n)) [n.head.text, ...n.templateSpans.map((s) => s.literal.text)].forEach(add)
    ts.forEachChild(n, walk)
  }
  walk(src)
}

const dir = 'src/i18n/en'
const known = new Set<string>()
if (existsSync(dir)) for (const f of readdirSync(dir)) if (f.endsWith('.json')) Object.keys(JSON.parse(readFileSync(`${dir}/${f}`, 'utf8'))).forEach((k) => known.add(k))
const todo = [...out].filter((s) => !known.has(s))
if (process.argv[2]) writeFileSync(process.argv[2], JSON.stringify(todo, null, 1))
console.log(`${files.length} fichiers, ${out.size} textes, ${todo.length} à traduire, ${todo.join('').length} caractères`)
