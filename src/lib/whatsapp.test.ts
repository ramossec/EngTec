import { describe, expect, it } from 'vitest'
import { buildWhatsAppUrl } from './whatsapp'

describe('buildWhatsAppUrl', () => {
  it('uses the company number and a generic message without a service', () => {
    const url = new URL(buildWhatsAppUrl())
    expect(url.origin + url.pathname).toBe('https://wa.me/5519997459888')
    expect(url.searchParams.get('text')).toBe(
      'Olá! Vim pelo site da ENGTECN e gostaria de solicitar um orçamento.',
    )
  })

  it('mentions the service in the message', () => {
    const url = new URL(buildWhatsAppUrl('AVCB e CLCB — Alvará do Corpo de Bombeiros'))
    expect(url.searchParams.get('text')).toBe(
      'Olá! Vim pelo site da ENGTECN e gostaria de um orçamento para: AVCB e CLCB — Alvará do Corpo de Bombeiros.',
    )
  })

  it('encodes accents and reserved characters', () => {
    const url = buildWhatsAppUrl('Ruídos & Vibrações #1?')
    expect(url).not.toContain(' ')
    expect(url).not.toContain('&V')
    expect(url).toContain('%26')
    expect(new URL(url).searchParams.get('text')).toContain('Ruídos & Vibrações #1?')
  })
})
