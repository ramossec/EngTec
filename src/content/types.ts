export type CategorySlug =
  | 'engenharia-mecanica'
  | 'estruturas-metalicas'
  | 'seguranca-do-trabalho'
  | 'prevencao-incendio'
  | 'treinamentos'

export type IconName =
  | 'cog'
  | 'building'
  | 'hard-hat'
  | 'flame'
  | 'graduation-cap'
  | 'file-check'
  | 'gauge'
  | 'wind'
  | 'snowflake'
  | 'droplets'
  | 'volume'
  | 'clipboard'
  | 'scale'
  | 'zap'
  | 'shield'
  | 'users'
  | 'map'
  | 'accessibility'
  | 'truck'
  | 'factory'
  | 'door'
  | 'lungs'
  | 'alert'
  | 'hammer'
  | 'arrow-up-down'

export interface Category {
  slug: CategorySlug
  title: string
  /** Card text, one sentence. */
  short: string
  /** Intro paragraph for the category page. */
  description: string
  icon: IconName
  image: string
}

export interface Faq {
  q: string
  a: string
}

export interface Service {
  slug: string
  category: CategorySlug
  title: string
  /** Menu/card label, one line. */
  short: string
  /** Header summary and meta description (≤ 160 chars). */
  summary: string
  /** Applicable standard, e.g. "NR-12". */
  norma?: string
  icon: IconName
  image?: string
  whatIs: string[]
  whenRequired?: string[]
  deliverables: string[]
  steps?: string[]
  faq?: Faq[]
  /** Legacy Wix paths (decoded) that redirect here. */
  legacyUrls: string[]
  /** Note for the client's technical review; listed in migration/REVIEW.md. */
  needsReview?: string
  featured?: boolean
}
