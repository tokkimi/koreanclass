import { expect, it } from 'vitest'
import { existsSync, readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import ts from 'typescript'

// Vite tolerates extensionless paths; deployed Node ESM functions do not.
it('keeps the progression API dependency graph compatible with Node ESM', () => {
  const visited = new Set<string>()
  function visit(file: string) {
    if (visited.has(file)) return
    visited.add(file)
    const source = ts.createSourceFile(file, readFileSync(file, 'utf8'), ts.ScriptTarget.Latest, true)
    for (const node of source.statements) {
      if (!ts.isImportDeclaration(node) && !ts.isExportDeclaration(node)) continue
      if (ts.isImportDeclaration(node) && node.importClause?.isTypeOnly) continue
      if (ts.isExportDeclaration(node) && node.isTypeOnly) continue
      if (!node.moduleSpecifier || !ts.isStringLiteral(node.moduleSpecifier)) continue
      const specifier = node.moduleSpecifier.text
      if (!specifier.startsWith('.')) continue
      expect(specifier, `Node runtime import in ${file}`).toMatch(/\.js$/)
      const target = resolve(dirname(file), specifier.replace(/\.js$/, '.ts'))
      expect(existsSync(target), `Missing source for ${specifier} in ${file}`).toBe(true)
      visit(target)
    }
  }
  visit(fileURLToPath(new URL('../../server/progress.ts', import.meta.url)))
})
