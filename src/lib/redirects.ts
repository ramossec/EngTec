import { legacyPageRedirects, servicePath, services } from '../content'

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
