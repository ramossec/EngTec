import { legacyPageRedirects, servicePath, services } from '../content'
import { absoluteUrl } from './schema'

/** File (relative to dist/) that serves a legacy path on static hosts: /old → old.html. */
export function redirectPageFile(from: string): string {
  return `${decodeURI(from).replace(/^\//, '')}.html`
}

/**
 * Minimal page for hosts without server redirects (GitHub Pages). The redirect is
 * relative so it also works on the temporary *.github.io address.
 */
export function redirectPageHtml(to: string): string {
  const target = absoluteUrl(to)
  return `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<title>Página movida — ENGTECN Soluções</title>
<meta name="robots" content="noindex">
<link rel="canonical" href="${target}">
<meta http-equiv="refresh" content="0; url=${to}">
<script>location.replace(${JSON.stringify(to)} + location.search + location.hash)</script>
</head>
<body>
<p>Esta página mudou de endereço: <a href="${to}">${target}</a></p>
</body>
</html>
`
}

export interface Redirect {
  from: string
  to: string
}

/** Legacy Wix URLs → new routes. Accented paths get a percent-encoded twin. */
export function buildRedirects(): Redirect[] {
  const pairs: Redirect[] = [
    ...services.flatMap((s) => s.legacyUrls.map((from) => ({ from, to: servicePath(s) }))),
    ...Object.entries(legacyPageRedirects).map(([from, to]) => ({ from, to })),
  ]
  const seen = new Map<string, string>()
  for (const { from, to } of pairs) {
    for (const variant of new Set([from, encodeURI(from)])) {
      if (!seen.has(variant)) seen.set(variant, to)
    }
  }
  return [...seen].map(([from, to]) => ({ from, to }))
}
