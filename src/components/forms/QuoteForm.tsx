import { CheckCircle2, Loader2 } from 'lucide-react'
import { useId, useState, type FormEvent, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { categories, getService, servicesIn } from '../../content'
import { submitQuote, type QuotePayload } from '../../lib/submitQuote'
import { buildWhatsAppUrl } from '../../lib/whatsapp'
import { WhatsAppIcon } from '../WhatsAppFab'
import { buttonClass, cx } from '../ui/primitives'

type Status = 'idle' | 'sending' | 'success' | 'error'
type Field = 'nome' | 'email' | 'telefone' | 'consentimento'
type Errors = Partial<Record<Field, string>>

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

function validate(form: FormData): Errors {
  const errors: Errors = {}
  if (!String(form.get('nome') ?? '').trim()) errors.nome = 'Informe seu nome.'
  if (!EMAIL_RE.test(String(form.get('email') ?? '').trim())) errors.email = 'Informe um e-mail válido.'
  if (String(form.get('telefone') ?? '').replace(/\D/g, '').length < 10) errors.telefone = 'Informe um telefone com DDD.'
  if (!form.get('consentimento')) errors.consentimento = 'É preciso concordar para enviarmos o orçamento.'
  return errors
}

const inputClass = (invalid?: boolean) =>
  cx(
    'block min-h-11 w-full rounded-[var(--radius-control)] border bg-white px-3.5 py-2.5 text-graphite-950 placeholder:text-graphite-400 transition-colors focus:outline-none focus:ring-2 focus:ring-brand/30',
    invalid ? 'border-brand-700 focus:border-brand-700' : 'border-graphite-200 focus:border-graphite-600',
  )

function FieldShell({
  id,
  label,
  error,
  optional,
  className,
  children,
}: {
  id: string
  label: string
  error?: string
  optional?: boolean
  className?: string
  children: ReactNode
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-graphite-800">
        {label}
        {optional ? <span className="font-normal text-graphite-400"> (opcional)</span> : <span aria-hidden="true"> *</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-erro`} className="mt-1.5 text-sm text-brand-700">
          {error}
        </p>
      )}
    </div>
  )
}

/** True when the Web3Forms key is configured at build time. */
export const hasFormKey = Boolean(import.meta.env.VITE_WEB3FORMS_KEY)

export interface QuoteFormProps {
  /** Service slug to preselect; unknown slugs are ignored. */
  defaultService?: string
  /** Web3Forms key; empty means the form falls back to WhatsApp only. */
  accessKey?: string
  compact?: boolean
}

export function QuoteForm({
  defaultService,
  accessKey = import.meta.env.VITE_WEB3FORMS_KEY ?? '',
  compact = false,
}: QuoteFormProps) {
  const uid = useId()
  const id = (name: string) => `${uid}-${name}`
  const [status, setStatus] = useState<Status>('idle')
  const [errors, setErrors] = useState<Errors>({})
  const initialService = defaultService && getService(defaultService) ? defaultService : ''
  const [serviceSlug, setServiceSlug] = useState(initialService)
  const serviceTitle = getService(serviceSlug)?.title

  if (!accessKey) {
    return (
      <div className="rounded-[var(--radius-card)] border border-graphite-200 bg-white p-6">
        <p className="text-graphite-700">
          Fale direto com nossa equipe técnica pelo WhatsApp e receba seu orçamento.
        </p>
        <a
          href={buildWhatsAppUrl(serviceTitle)}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonClass('whatsapp', 'mt-4 w-full')}
        >
          <WhatsAppIcon className="size-5" /> Pedir orçamento pelo WhatsApp
        </a>
      </div>
    )
  }

  if (status === 'success') {
    return (
      <div role="status" className="rounded-[var(--radius-card)] border border-graphite-200 bg-white p-8 text-center">
        <CheckCircle2 className="mx-auto size-12 text-whatsapp-700" aria-hidden="true" />
        <h3 className="mt-4 text-h3 font-bold">Recebemos sua solicitação!</h3>
        <p className="mt-2 text-graphite-600">
          Nossa equipe técnica vai analisar e retornar em até 1 dia útil. Se preferir, fale agora pelo WhatsApp.
        </p>
        <a
          href={buildWhatsAppUrl(serviceTitle)}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonClass('secondary', 'mt-6')}
        >
          <WhatsAppIcon className="size-5 text-whatsapp-700" /> Abrir WhatsApp
        </a>
      </div>
    )
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const found = validate(form)
    setErrors(found)
    const firstInvalid = (Object.keys(found) as Field[])[0]
    if (firstInvalid) {
      document.getElementById(id(firstInvalid))?.focus()
      return
    }
    if (String(form.get('botcheck') ?? '')) {
      setStatus('success')
      return
    }
    setStatus('sending')
    const payload: QuotePayload = {
      nome: String(form.get('nome')).trim(),
      empresa: String(form.get('empresa') ?? '').trim(),
      email: String(form.get('email')).trim(),
      telefone: String(form.get('telefone')).trim(),
      servico: serviceTitle ?? 'Não informado',
      cidade: String(form.get('cidade') ?? '').trim(),
      mensagem: String(form.get('mensagem') ?? '').trim(),
    }
    setStatus((await submitQuote(accessKey, payload)) ? 'success' : 'error')
  }

  const describedBy = (field: Field) => (errors[field] ? `${id(field)}-erro` : undefined)
  const sending = status === 'sending'

  return (
    <form noValidate onSubmit={onSubmit} className="grid gap-5 sm:grid-cols-2" aria-label="Solicitar orçamento">
      <FieldShell id={id('nome')} label="Nome" error={errors.nome}>
        <input
          id={id('nome')}
          name="nome"
          autoComplete="name"
          className={inputClass(!!errors.nome)}
          aria-invalid={!!errors.nome}
          aria-describedby={describedBy('nome')}
        />
      </FieldShell>
      {!compact && (
        <FieldShell id={id('empresa')} label="Empresa" optional>
          <input id={id('empresa')} name="empresa" autoComplete="organization" className={inputClass()} />
        </FieldShell>
      )}
      <FieldShell id={id('email')} label="E-mail" error={errors.email}>
        <input
          id={id('email')}
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          className={inputClass(!!errors.email)}
          aria-invalid={!!errors.email}
          aria-describedby={describedBy('email')}
        />
      </FieldShell>
      <FieldShell id={id('telefone')} label="Telefone / WhatsApp" error={errors.telefone}>
        <input
          id={id('telefone')}
          name="telefone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="(19) 99999-9999"
          className={inputClass(!!errors.telefone)}
          aria-invalid={!!errors.telefone}
          aria-describedby={describedBy('telefone')}
        />
      </FieldShell>
      <FieldShell id={id('servico')} label="Serviço" optional className={compact ? 'sm:col-span-2' : undefined}>
        <select
          id={id('servico')}
          name="servico"
          value={serviceSlug}
          onChange={(e) => setServiceSlug(e.target.value)}
          className={inputClass()}
        >
          <option value="">Selecione (ou descreva na mensagem)</option>
          {categories.map((c) => (
            <optgroup key={c.slug} label={c.title}>
              {servicesIn(c.slug).map((s) => (
                <option key={s.slug} value={s.slug}>
                  {s.short}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
      </FieldShell>
      {!compact && (
        <FieldShell id={id('cidade')} label="Cidade" optional>
          <input id={id('cidade')} name="cidade" autoComplete="address-level2" className={inputClass()} />
        </FieldShell>
      )}
      <FieldShell id={id('mensagem')} label="Mensagem" optional className="sm:col-span-2">
        <textarea
          id={id('mensagem')}
          name="mensagem"
          rows={compact ? 3 : 5}
          placeholder="Conte brevemente o que você precisa: tipo de imóvel, equipamento, prazo…"
          className={inputClass()}
        />
      </FieldShell>

      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Não preencha este campo
          <input type="text" name="botcheck" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="sm:col-span-2">
        <label className="flex items-start gap-3 text-sm text-graphite-600" htmlFor={id('consentimento')}>
          <input
            id={id('consentimento')}
            name="consentimento"
            type="checkbox"
            className="mt-0.5 size-5 shrink-0 accent-brand-700"
            aria-invalid={!!errors.consentimento}
            aria-describedby={describedBy('consentimento')}
          />
          <span>
            Concordo com o uso dos meus dados para receber o orçamento, conforme a{' '}
            <Link to="/politica-de-privacidade" className="font-medium text-brand-700 underline underline-offset-2">
              política de privacidade
            </Link>
            .
          </span>
        </label>
        {errors.consentimento && (
          <p id={`${id('consentimento')}-erro`} className="mt-1.5 text-sm text-brand-700">
            {errors.consentimento}
          </p>
        )}
      </div>

      {status === 'error' && (
        <div role="alert" className="rounded-[var(--radius-control)] border border-brand-700/30 bg-brand/5 p-4 text-sm text-graphite-800 sm:col-span-2">
          Não foi possível enviar agora. Tente novamente em instantes ou{' '}
          <a
            href={buildWhatsAppUrl(serviceTitle)}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-brand-700 underline underline-offset-2"
          >
            fale conosco pelo WhatsApp
          </a>
          .
        </div>
      )}

      <div className="sm:col-span-2">
        <button type="submit" disabled={sending} className={buttonClass('primary', 'w-full sm:w-auto')}>
          {sending && <Loader2 className="size-4 animate-spin" aria-hidden="true" />}
          {sending ? 'Enviando…' : 'Enviar solicitação'}
        </button>
      </div>
    </form>
  )
}
