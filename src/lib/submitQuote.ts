export const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit'

export interface QuotePayload {
  nome: string
  empresa: string
  email: string
  telefone: string
  servico: string
  cidade: string
  mensagem: string
}

/** Sends the quote to Web3Forms. Resolves true only when the API confirms success. */
export async function submitQuote(accessKey: string, data: QuotePayload): Promise<boolean> {
  try {
    const res = await fetch(WEB3FORMS_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        access_key: accessKey,
        subject: `Orçamento pelo site — ${data.servico || 'Contato geral'}`,
        from_name: 'Site ENGTECN',
        replyto: data.email,
        ...data,
      }),
    })
    if (!res.ok) return false
    const json = (await res.json()) as { success?: boolean }
    return json.success === true
  } catch {
    return false
  }
}
