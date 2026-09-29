import { categories } from './categories'
import { engenhariaMecanica } from './services/engenharia-mecanica'
import { estruturasMetalicas } from './services/estruturas-metalicas'
import { prevencaoIncendio } from './services/prevencao-incendio'
import { segurancaDoTrabalho } from './services/seguranca-do-trabalho'
import { treinamentos } from './services/treinamentos'
import type { Category, CategorySlug, Service } from './types'

export { categories }
export * from './types'
export { site, clients, projects } from './site'

export const services: Service[] = [
  ...engenhariaMecanica,
  ...estruturasMetalicas,
  ...segurancaDoTrabalho,
  ...prevencaoIncendio,
  ...treinamentos,
]

export function categoryPath(slug: CategorySlug): string {
  return slug === 'treinamentos' ? '/treinamentos' : `/servicos/${slug}`
}

export function servicePath(service: Pick<Service, 'slug' | 'category'>): string {
  return `${categoryPath(service.category)}/${service.slug}`
}

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug)
}

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug)
}

export function servicesIn(slug: CategorySlug): Service[] {
  return services.filter((s) => s.category === slug)
}

export function featuredServices(): Service[] {
  return services.filter((s) => s.featured)
}

/** Other services in the same category, featured first. */
export function relatedServices(service: Service, limit = 3): Service[] {
  return servicesIn(service.category)
    .filter((s) => s.slug !== service.slug)
    .sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)))
    .slice(0, limit)
}

export function serviceImage(service: Service): string {
  return service.image ?? getCategory(service.category)!.image
}

/** Static (non-service) routes, used by the router, sitemap and checks. */
export const staticPages = [
  '/',
  '/servicos',
  '/treinamentos',
  '/esocial',
  '/sobre',
  '/clientes',
  '/contato',
  '/politica-de-privacidade',
] as const

export function allRoutes(): string[] {
  return [
    ...staticPages,
    ...categories.filter((c) => c.slug !== 'treinamentos').map((c) => categoryPath(c.slug)),
    ...services.map(servicePath),
  ]
}

/** Legacy Wix pages that are not a single service. */
export const legacyPageRedirects: Record<string, string> = {
  '/copia-inicio': '/servicos/engenharia-mecanica',
  '/copia-engenharia-mecanica-1': '/servicos/seguranca-do-trabalho',
  '/copia-servicos': '/servicos/seguranca-do-trabalho',
  '/copia-projetos-estruturais': '/esocial',
  '/copia-projeto-estrutural-cype-3d-1': '/treinamentos',
  '/cópia-nr-13-operador-de-caldeira': '/servicos',
  '/copia-pericia-judicial-do-trabalho': '/servicos/seguranca-do-trabalho',
  '/clients': '/clientes',
  '/contact': '/contato',
}
