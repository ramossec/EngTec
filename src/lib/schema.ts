import { servicePath } from '../content'
import { site } from '../content/site'
import type { Faq, Service } from '../content/types'

export const absoluteUrl = (path: string) => (path === '/' ? site.url : `${site.url}${path}`)

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${site.url}/#empresa`,
    name: site.name,
    legalName: site.legalName,
    url: site.url,
    logo: `${site.url}/favicon.svg`,
    image: `${site.url}/og-image.jpg`,
    email: site.email,
    telephone: site.phoneE164,
    taxID: site.cnpj,
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.state,
      postalCode: site.address.zip,
      addressCountry: 'BR',
    },
    areaServed: ['São Paulo', 'Minas Gerais'],
  }
}

export function serviceSchema(service: Service) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.summary,
    url: absoluteUrl(servicePath(service)),
    serviceType: service.short,
    areaServed: ['São Paulo', 'Minas Gerais'],
    provider: { '@type': 'ProfessionalService', '@id': `${site.url}/#empresa`, name: site.name },
  }
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  }
}

export function faqSchema(faq: Faq[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  }
}
