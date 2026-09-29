import { describe, expect, it } from 'vitest'
import { services } from '../content'
import { breadcrumbSchema, faqSchema, organizationSchema, serviceSchema } from './schema'

describe('JSON-LD builders', () => {
  it('describes the company as a ProfessionalService with address and phone', () => {
    const org = organizationSchema()
    expect(org['@type']).toBe('ProfessionalService')
    expect(org.telephone).toBe('+5519997459888')
    expect(org.address.addressLocality).toBe('São João da Boa Vista')
    expect(org.address.postalCode).toBe('13870-100')
  })

  it('builds a Service with absolute URL and provider', () => {
    const s = services[0]
    const json = serviceSchema(s)
    expect(json['@type']).toBe('Service')
    expect(json.name).toBe(s.title)
    expect(json.url).toMatch(/^https:\/\/www\.engtecnsolucoes\.com\.br\/servicos\//)
    expect(json.provider.name).toBe('ENGTECN Soluções')
  })

  it('builds breadcrumbs with 1-based positions and absolute URLs', () => {
    const json = breadcrumbSchema([
      { name: 'Início', path: '/' },
      { name: 'Serviços', path: '/servicos' },
    ])
    expect(json.itemListElement[1]).toEqual({
      '@type': 'ListItem',
      position: 2,
      name: 'Serviços',
      item: 'https://www.engtecnsolucoes.com.br/servicos',
    })
  })

  it('builds FAQPage entries', () => {
    const json = faqSchema([{ q: 'Pergunta?', a: 'Resposta.' }])
    expect(json.mainEntity[0]).toEqual({
      '@type': 'Question',
      name: 'Pergunta?',
      acceptedAnswer: { '@type': 'Answer', text: 'Resposta.' },
    })
  })
})
