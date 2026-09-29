import { describe, expect, it } from 'vitest'
import { allRoutes } from '../content'
import { legacyWixPaths } from '../content/legacy'
import { buildRedirects, redirectPageFile, redirectPageHtml } from './redirects'

describe('static redirect pages (GitHub Pages has no server-side 301)', () => {
  it('builds an HTML page that redirects with a relative URL and an absolute canonical', () => {
    const html = redirectPageHtml('/servicos/prevencao-incendio/avcb-clcb')
    const target = 'https://www.engtecnsolucoes.com.br/servicos/prevencao-incendio/avcb-clcb'
    expect(html).toContain('<meta http-equiv="refresh" content="0; url=/servicos/prevencao-incendio/avcb-clcb">')
    expect(html).toContain(`<link rel="canonical" href="${target}">`)
    expect(html).toContain('<meta name="robots" content="noindex">')
    expect(html).toContain('location.replace("/servicos/prevencao-incendio/avcb-clcb" + location.search + location.hash)')
  })

  it('maps legacy paths to a .html file, keeping accents decoded', () => {
    expect(redirectPageFile('/copia-ppra-nr-9')).toBe('copia-ppra-nr-9.html')
    expect(redirectPageFile('/cópia-projetos-de-galpões')).toBe('cópia-projetos-de-galpões.html')
  })

  it('does not collide with a real route', () => {
    const routes = new Set(allRoutes())
    const collisions = buildRedirects().filter((r) => routes.has(r.from))
    expect(collisions).toEqual([])
  })
})

describe('buildRedirects', () => {
  const redirects = buildRedirects()
  const from = new Set(redirects.map((r) => r.from))
  const routes = new Set(allRoutes())

  it('covers every page of the legacy Wix site', () => {
    const missing = legacyWixPaths.filter((p) => !from.has(p))
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
