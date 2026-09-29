/**
 * Verifies the static build: one pre-rendered HTML per route with title,
 * description and canonical, no internal link pointing at a missing page, and a
 * redirect page for every legacy URL (GitHub Pages has no server-side redirects).
 */
import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { allRoutes } from '../src/content'
import { buildRedirects, redirectPageFile } from '../src/lib/redirects'

const DIST = 'dist'
const routes = allRoutes()
const errors: string[] = []

const fileFor = (route: string) => (route === '/' ? join(DIST, 'index.html') : join(DIST, `${route}.html`))
const routeSet = new Set(routes)
const staticFiles = (href: string) => existsSync(join(DIST, href)) || existsSync(join(DIST, `${href}.html`))

for (const route of routes) {
  const file = fileFor(route)
  if (!existsSync(file)) {
    errors.push(`${route}: HTML não gerado (${file})`)
    continue
  }
  const html = readFileSync(file, 'utf8')
  if (!/<title[^>]*>[^<]{10,}<\/title>/.test(html)) errors.push(`${route}: <title> ausente`)
  if (!/<meta[^>]*name="description" content="[^"]{50,}"/.test(html)) errors.push(`${route}: meta description ausente/curta`)
  if (!/<link[^>]*rel="canonical" href="https:\/\/www\.engtecnsolucoes\.com\.br[^"]*"/.test(html)) errors.push(`${route}: canonical ausente`)
  if (!/<h1[\s>]/.test(html)) errors.push(`${route}: <h1> ausente no HTML estático`)
  for (const [, href] of html.matchAll(/href="(\/[^"#?]*)/g)) {
    if (href.startsWith('//')) continue
    const clean = href.length > 1 ? href.replace(/\/$/, '') : href
    if (!routeSet.has(clean) && !staticFiles(clean)) errors.push(`${route}: link quebrado → ${href}`)
  }
}

for (const r of buildRedirects()) {
  const file = join(DIST, redirectPageFile(r.from))
  if (!existsSync(file)) errors.push(`redirect ausente: ${r.from} (${file})`)
  else if (!readFileSync(file, 'utf8').includes(`url=${r.to}"`)) errors.push(`redirect errado: ${r.from}`)
}

for (const f of ['sitemap.xml', 'robots.txt', '404.html', 'CNAME', '.nojekyll', '_redirects', '.htaccess']) {
  if (!existsSync(join(DIST, f))) errors.push(`arquivo ausente: ${f}`)
}

if (errors.length) {
  console.error(`✗ ${errors.length} problema(s):\n` + [...new Set(errors)].map((e) => `  - ${e}`).join('\n'))
  process.exit(1)
}
console.log(`✓ ${routes.length} rotas verificadas: HTML estático, SEO e links internos OK`)
