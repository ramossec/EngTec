/**
 * Runs after `vite-react-ssg build`: sitemap, robots, 404 page, legacy redirects
 * for GitHub Pages / Vercel / Netlify / Apache, and the client review list.
 */
import { copyFileSync, existsSync, mkdirSync, statSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { allRoutes, services, site } from '../src/content'
import { buildRedirects, redirectPageFile, redirectPageHtml } from '../src/lib/redirects'

const DIST = 'dist'
const today = new Date().toISOString().slice(0, 10)
const redirects = buildRedirects()

const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...allRoutes().map(
    (r) => `  <url><loc>${site.url}${r === '/' ? '/' : r}</loc><lastmod>${today}</lastmod></url>`,
  ),
  '</urlset>',
].join('\n')
writeFileSync(join(DIST, 'sitemap.xml'), sitemap + '\n')

writeFileSync(join(DIST, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${site.url}/sitemap.xml\n`)

if (!existsSync(join(DIST, '404.html'))) throw new Error('dist/404.html não foi gerado')

// A page that is also a folder (servicos.html + servicos/) gets an index.html twin,
// so hosts that redirect /servicos to /servicos/ still find the page.
for (const route of allRoutes()) {
  const dir = join(DIST, route)
  if (route !== '/' && existsSync(dir) && statSync(dir).isDirectory()) {
    copyFileSync(`${dir}.html`, join(dir, 'index.html'))
  }
}

// GitHub Pages: no server-side redirects, so each legacy URL gets a redirect page.
// Only decoded paths are written; the host decodes percent-encoded requests.
const pageRedirects = redirects.filter((r) => r.from === decodeURI(r.from))
for (const r of pageRedirects) {
  const file = join(DIST, redirectPageFile(r.from))
  mkdirSync(dirname(file), { recursive: true })
  writeFileSync(file, redirectPageHtml(r.to))
}

// Netlify
writeFileSync(join(DIST, '_redirects'), redirects.map((r) => `${r.from}  ${r.to}  301`).join('\n') + '\n')

// Apache / cPanel
const escapeRe = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
writeFileSync(
  join(DIST, '.htaccess'),
  [
    'ErrorDocument 404 /404.html',
    'RewriteEngine On',
    ...redirects.map((r) => `RewriteRule ^${escapeRe(r.from.slice(1))}/?$ ${r.to} [R=301,L,NE]`),
    '# /page → page.html (clean URLs), after the legacy 301s',
    'RewriteCond %{REQUEST_FILENAME} !-f',
    'RewriteCond %{REQUEST_FILENAME}.html -f',
    'RewriteRule ^(.+?)/?$ $1.html [L]',
    '',
  ].join('\n'),
)

// Vercel reads it from the project root; generated on every build and not versioned
writeFileSync(
  'vercel.json',
  JSON.stringify(
    {
      $schema: 'https://openapi.vercel.sh/vercel.json',
      buildCommand: 'npm run build',
      outputDirectory: 'dist',
      cleanUrls: true,
      trailingSlash: false,
      redirects: redirects.map((r) => ({ source: r.from, destination: r.to, permanent: true })),
    },
    null,
    2,
  ) + '\n',
)

// Items the client must validate before launch (local file, not versioned)
mkdirSync('migration', { recursive: true })
const review = services.filter((s) => s.needsReview)
writeFileSync(
  join('migration', 'REVIEW.md'),
  [
    '# Revisão técnica do conteúdo migrado',
    '',
    'Textos atualizados na migração que precisam de validação do responsável técnico antes da publicação.',
    '',
    '| Serviço | Página | Ponto a validar |',
    '|---|---|---|',
    ...review.map((s) => `| ${s.title} | ${s.category}/${s.slug} | ${s.needsReview} |`),
    '',
  ].join('\n'),
)

console.log(`postbuild: ${allRoutes().length} rotas no sitemap, ${redirects.length} redirects, ${review.length} itens para revisão`)
