# ENGTECN Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans (native, chosen by user: "executar agora"). Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the Wix site with a static, SEO-friendly, lead-focused institutional site for ENGTECN.

**Architecture:** Vite + React 18 + react-router-dom 6 pre-rendered by vite-react-ssg into one HTML file per route. All content lives in typed TS modules under `src/content/`; routes, menus, sitemap and legacy redirects are derived from that content. Pure helpers in `src/lib/` are unit-tested with Vitest.

**Tech Stack:** Vite 8, React 18.3, react-router-dom 6.30, vite-react-ssg 0.9, Tailwind CSS 4 (`@tailwindcss/vite`), lucide-react, Fontsource (Inter variable, Space Grotesk), Vitest + Testing Library + jsdom, tsx (scripts), cheerio + sharp (one-off migration).

**Spec:** `docs/superpowers/specs/2026-09-29-engtecn-site-redesign-design.md`

## Global Constraints

- Language `pt-BR`; all UI copy in Portuguese.
- Colors: graphite 950 `#0E1012`, 900 `#171A1D`, 800 `#23272B`, 600 `#4A5058`, 400 `#8A919A`, 100 `#EEF0F2`, 50 `#F7F8F9`; brand-red `#ED1C24` (decorative/large only); red-700 `#C4141B` (buttons, text links).
- Fonts: Space Grotesk 600/700 headings, Inter body.
- Container max 1200px; section padding 96px desktop / 64px mobile; radius 6–10px.
- Focus ring 2px red with offset; touch targets ≥ 44px; `prefers-reduced-motion` respected.
- WhatsApp number `5519997459888`.
- Form: Web3Forms, key from `VITE_WEB3FORMS_KEY`; missing key ⇒ show WhatsApp CTA only.
- Every legacy Wix URL gets a 301 to its new equivalent.
- React 18 (vite-react-ssg uses react-helmet-async 1.x and react-router 6).

## Review Focus

1. Legacy URL with accent (`/cópia-projetos-de-galpões`) — redirect must match both raw and percent-encoded forms.
2. `?servico=` with unknown slug on /contato — select falls back to empty, no crash.
3. Service name with accents/`&` in WhatsApp message — must be URL-encoded correctly.
4. Web3Forms returns `success:false` with HTTP 200 — form must show error state, not success.
5. Honeypot filled — submission silently ignored (no network call), shows success.

---

### Task 1: Scaffold + design tokens + logo

**Files:** `package.json`, `vite.config.ts`, `tsconfig.json`, `index.html`, `src/main.tsx`, `src/routes.tsx`, `src/styles/global.css`, `src/components/ui/Logo.tsx`, `.gitignore`, `vitest.setup.ts`

- [ ] Install deps; `build` = `vite-react-ssg build && tsx scripts/postbuild.ts`, `dev` = `vite`, `test` = `vitest run`.
- [ ] Tailwind 4 `@theme` tokens for the palette, fonts, container.
- [ ] SVG wordmark Logo (ENG graphite / TECN red, `variant="light|dark"`).
- [ ] `npm run build` produces `dist/index.html` with rendered markup. Commit.

### Task 2: Wix migration scrape

**Files:** `scripts/scrape-wix.ts`, output `migration/pages/*.json`, `migration/images/*`, `migration/INVENTORY.md`

- [ ] Fetch home, collect internal links, fetch each page, extract title + visible rich text (cheerio on `[data-testid="richTextElement"]`) + image URLs.
- [ ] Download images at full resolution into `migration/images` and convert to WebP (sharp, max width 1600).
- [ ] Write INVENTORY.md (old URL, title, text length, duplicates by identical text). Commit.

### Task 3: Content model + lib helpers (TDD)

**Files:** `src/content/types.ts`, `src/content/site.ts`, `src/content/categories.ts`, `src/content/services/*.ts`, `src/content/index.ts`, `src/lib/whatsapp.ts`, `src/lib/schema.ts`, `src/lib/redirects.ts`, tests in `src/lib/*.test.ts`, `src/content/content.test.ts`

**Interfaces (Produces):**
```ts
type CategorySlug = 'engenharia-mecanica' | 'estruturas-metalicas' | 'seguranca-do-trabalho' | 'prevencao-incendio' | 'treinamentos'
interface Category { slug: CategorySlug; title: string; short: string; description: string; icon: string }
interface Service { slug: string; category: CategorySlug; title: string; short: string; summary: string;
  norma?: string; whatIs: string[]; whenRequired?: string[]; deliverables: string[]; steps?: string[];
  faq?: { q: string; a: string }[]; legacyUrls: string[]; needsReview?: string; featured?: boolean; image?: string }
servicePath(s: Service): string            // /servicos/<cat>/<slug>, or /treinamentos/<slug> for treinamentos
categoryPath(c: CategorySlug): string      // /servicos/<cat>, treinamentos -> /treinamentos
buildWhatsAppUrl(serviceTitle?: string): string
buildRedirects(): { from: string; to: string }[]  // raw + encoded variants, deduped, no self/loop
organizationSchema(), serviceSchema(s), breadcrumbSchema(items), faqSchema(faq)
```
- [ ] Tests first: whatsapp encoding (accents, `&`), redirects (accent variants, every INVENTORY URL covered, no loops, targets exist as routes), content integrity (unique slugs, each service's category exists), schema shapes.
- [ ] Implement; write service content from migration text (reorganized, PPRA→PGR etc. with `needsReview`). Commit.

### Task 4: Layout + UI kit

**Files:** `src/components/layout/{Layout,Header,MegaMenu,MobileNav,Footer,SkipLink}.tsx`, `src/components/ui/{Button,Container,Section,Badge,Breadcrumb,Accordion,Icon}.tsx`, `src/components/Seo.tsx`, `src/components/WhatsAppFab.tsx`

- [ ] Header sticky with mega-menu (keyboard: Esc closes, focus management), mobile drawer with accordion.
- [ ] Footer dark with blueprint grid, contact, CNPJ, links. Seo with Head (title, description, canonical, OG, JSON-LD). Commit.

### Task 5: Quote form (TDD)

**Files:** `src/lib/submitQuote.ts`, `src/components/forms/QuoteForm.tsx`, `src/components/forms/QuoteForm.test.tsx`

- [ ] Tests: required validation, honeypot ⇒ no fetch + success, 200 `success:false` ⇒ error with WhatsApp link, success state, no key ⇒ WhatsApp-only, `?servico=` unknown ⇒ empty select.
- [ ] Implement. Commit.

### Task 6: Pages

**Files:** `src/pages/{Home,Services,Category,Service,Trainings,ESocial,About,Clients,Contact,Privacy,NotFound}.tsx`, `src/components/blocks/*`

- [ ] Home sections per spec §6; service template with sticky sidebar CTA, FAQ, related; category & hubs; contact with form + static map link; 404. Commit.

### Task 7: SEO + redirects + verification scripts

**Files:** `scripts/postbuild.ts` (sitemap.xml, robots.txt, `dist/_redirects`, `dist/.htaccess`, `vercel.json` at root generated by `scripts/gen-redirects.ts`), `scripts/check-dist.ts`, `migration/REVIEW.md` generator

- [ ] postbuild writes sitemap/robots/redirect files; check-dist asserts one HTML per route with title/description/canonical and no broken internal links. Commit.

### Task 8: QA

- [ ] `npm test`, `npm run build`, `npm run check`, preview smoke; Lighthouse if Chrome available. Fix issues. Commit.
