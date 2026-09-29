import { site } from '../content/site'

export function buildWhatsAppUrl(serviceTitle?: string): string {
  const text = serviceTitle
    ? `Olá! Vim pelo site da ENGTECN e gostaria de um orçamento para: ${serviceTitle}.`
    : 'Olá! Vim pelo site da ENGTECN e gostaria de solicitar um orçamento.'
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`
}
