import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { QuoteForm } from './QuoteForm'

function renderForm(props: Partial<Parameters<typeof QuoteForm>[0]> = {}) {
  return render(
    <MemoryRouter>
      <QuoteForm accessKey="test-key" {...props} />
    </MemoryRouter>,
  )
}

async function fillValid(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText(/^nome/i), 'Maria Silva')
  await user.type(screen.getByLabelText(/e-mail/i), 'maria@empresa.com.br')
  await user.type(screen.getByLabelText(/telefone/i), '(19) 99999-0000')
  await user.click(screen.getByLabelText(/concordo/i))
}

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('QuoteForm', () => {
  it('shows inline errors and does not submit when required fields are empty', async () => {
    const fetchMock = vi.fn()
    vi.stubGlobal('fetch', fetchMock)
    const user = userEvent.setup()
    renderForm()
    await user.click(screen.getByRole('button', { name: /enviar/i }))
    expect(screen.getByText('Informe seu nome.')).toBeInTheDocument()
    expect(screen.getByText('Informe um e-mail válido.')).toBeInTheDocument()
    expect(screen.getByText('Informe um telefone com DDD.')).toBeInTheDocument()
    expect(screen.getByText('É preciso concordar para enviarmos o orçamento.')).toBeInTheDocument()
    expect(screen.getByLabelText(/^nome/i)).toHaveAttribute('aria-invalid', 'true')
    expect(fetchMock).not.toHaveBeenCalled()
  })

  it('posts to Web3Forms and shows success', async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ success: true }) })
    vi.stubGlobal('fetch', fetchMock)
    const user = userEvent.setup()
    renderForm({ defaultService: 'avcb-clcb' })
    await fillValid(user)
    await user.click(screen.getByRole('button', { name: /enviar/i }))
    await waitFor(() => expect(screen.getByRole('status')).toHaveTextContent(/recebemos sua solicitação/i))
    expect(fetchMock).toHaveBeenCalledTimes(1)
    const [url, init] = fetchMock.mock.calls[0]
    expect(url).toBe('https://api.web3forms.com/submit')
    const body = JSON.parse(init.body)
    expect(body.access_key).toBe('test-key')
    expect(body.nome).toBe('Maria Silva')
    expect(body.servico).toBe('AVCB e CLCB — Alvará do Corpo de Bombeiros')
    expect(body.subject).toContain('AVCB')
  })

  it('shows an error with WhatsApp fallback when the API answers success:false', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true, json: async () => ({ success: false }) }))
    const user = userEvent.setup()
    renderForm()
    await fillValid(user)
    await user.click(screen.getByRole('button', { name: /enviar/i }))
    const alert = await screen.findByRole('alert')
    expect(alert).toHaveTextContent(/não foi possível enviar/i)
    expect(screen.getByRole('link', { name: /whatsapp/i })).toHaveAttribute('href', expect.stringContaining('wa.me'))
  })

  it('shows an error when the network fails', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new TypeError('offline')))
    const user = userEvent.setup()
    renderForm()
    await fillValid(user)
    await user.click(screen.getByRole('button', { name: /enviar/i }))
    expect(await screen.findByRole('alert')).toHaveTextContent(/não foi possível enviar/i)
  })

  it('silently drops submissions with the honeypot filled', async () => {
    const fetchMock = vi.fn()
    vi.stubGlobal('fetch', fetchMock)
    const user = userEvent.setup()
    const { container } = renderForm()
    await fillValid(user)
    const honeypot = container.querySelector<HTMLInputElement>('input[name="botcheck"]')!
    honeypot.value = 'spam'
    await user.click(screen.getByRole('button', { name: /enviar/i }))
    expect(await screen.findByRole('status')).toHaveTextContent(/recebemos sua solicitação/i)
    expect(fetchMock).not.toHaveBeenCalled()
  })

  it('falls back to WhatsApp only when no access key is configured', () => {
    renderForm({ accessKey: '' })
    expect(screen.queryByRole('button', { name: /enviar/i })).not.toBeInTheDocument()
    expect(screen.getByRole('link', { name: /whatsapp/i })).toBeInTheDocument()
  })

  it('ignores an unknown default service', () => {
    renderForm({ defaultService: 'nao-existe' })
    expect(screen.getByLabelText(/serviço/i)).toHaveValue('')
  })

  it('preselects a known default service', () => {
    renderForm({ defaultService: 'ltcat' })
    expect(screen.getByLabelText(/serviço/i)).toHaveValue('ltcat')
  })
})
