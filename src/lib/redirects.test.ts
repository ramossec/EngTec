import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { allRoutes } from '../content'
import { buildRedirects } from './redirects'

const legacyPaths: string[] = readdirSync('migration/pages')
  .map((f) => JSON.parse(readFileSync(join('migration/pages', f), 'utf8')).path as string)
  .filter((p) => p !== '/')

describe('buildRedirects', () => {
  const redirects = buildRedirects()
  const from = new Set(redirects.map((r) => r.from))
  const routes = new Set(allRoutes())

  it('covers every page of the legacy Wix site', () => {
    const missing = legacyPaths.filter((p) => !from.has(p))
    expect(missing).toEqual([])
  })

  it('points only at routes that exist', () => {
    const broken = redirects.filter((r) => !routes.has(r.to))
    expect(broken).toEqual([])
  })

  it('has no self-redirects or chains', () => {
    for (const r of redirects) {
      expect(r.from).not.toBe(r.to)
      expect(from.has(r.to)).toBe(false)
    }
  })

  it('adds a percent-encoded variant for accented paths', () => {
    const decoded = redirects.find((r) => r.from === '/cópia-projetos-de-galpões')
    const encoded = redirects.find((r) => r.from === encodeURI('/cópia-projetos-de-galpões'))
    expect(decoded).toBeDefined()
    expect(encoded?.to).toBe(decoded?.to)
  })

  it('has unique sources', () => {
    expect(from.size).toBe(redirects.length)
  })
})
