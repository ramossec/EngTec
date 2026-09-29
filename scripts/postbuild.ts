/**
 * Runs after `vite-react-ssg build`: sitemap, robots, 404 page, legacy redirects
 * for Vercel / Netlify / Apache, and the client review list.
 */
import { copyFileSync, existsSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { allRoutes, services, site } from '../src/content'
import { buildRedirects } from '../src/lib/redirects'

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

const notFound = join(DIST, '404', 'index.html')
if (existsSync(notFound)) copyFileSync(notFound, join(DIST, '404.html'))

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
    '',
  ].join('\n'),
)

// Vercel (read from the project root at deploy time)
writeFileSync(
  'vercel.json',
  JSON.stringify(
    {
      $schema: 'https://openapi.vercel.sh/vercel.json',
      buildCommand: 'npm run build',
      outputDirectory: 'dist',
      trailingSlash: false,
      redirects: redirects.map((r) => ({ source: r.from, destination: r.to, permanent: true })),
    },
    null,
    2,
  ) + '\n',
)

// Items the client must validate before launch
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
