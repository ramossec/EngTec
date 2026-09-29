import { describe, expect, it } from 'vitest'
import { existsSync } from 'node:fs'
import { allRoutes, categories, getCategory, services, serviceImage } from '.'

describe('content integrity', () => {
  it('has unique service slugs', () => {
    const slugs = services.map((s) => s.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
  })

  it('assigns every service to an existing category and every category has services', () => {
    for (const s of services) expect(getCategory(s.category)).toBeDefined()
    for (const c of categories) expect(services.some((s) => s.category === c.slug)).toBe(true)
  })

  it('keeps summaries within meta description length', () => {
    const long = services.filter((s) => s.summary.length > 160).map((s) => s.slug)
    expect(long).toEqual([])
  })

  it('references images that exist in public/', () => {
    const images = [...services.map(serviceImage), ...categories.map((c) => c.image)]
    const missing = images.filter((src) => !existsSync(`public${src}`))
    expect(missing).toEqual([])
  })

  it('produces unique routes', () => {
    const routes = allRoutes()
    expect(new Set(routes).size).toBe(routes.length)
  })
})
