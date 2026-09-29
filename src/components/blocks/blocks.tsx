import { ArrowRight, ArrowUpRight } from 'lucide-react'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import {
  categoryPath,
  clients,
  servicePath,
  serviceImage,
  servicesIn,
  type Category,
  type Service,
} from '../../content'
import { buildWhatsAppUrl } from '../../lib/whatsapp'
import { QuoteForm, hasFormKey } from '../forms/QuoteForm'
import { Breadcrumb, type Crumb } from '../ui/Breadcrumb'
import { Icon } from '../ui/Icon'
import { Badge, ButtonLink, Container, ExternalButton, SectionHeading } from '../ui/primitives'
import { WhatsAppIcon } from '../WhatsAppFab'

/** Dark header used by every inner page. */
export function PageHeader({
  crumbs,
  eyebrow,
  title,
  intro,
  children,
  image,
}: {
  crumbs: Crumb[]
  eyebrow?: string
  title: string
  intro?: ReactNode
  children?: ReactNode
  image?: string
}) {
  return (
    <section className="blueprint relative overflow-hidden text-graphite-200">
      {image && (
        <div className="absolute inset-y-0 right-0 hidden w-[42%] lg:block" aria-hidden="true">
          <img src={image} alt="" className="size-full object-cover opacity-45" loading="eager" />
          <div className="absolute inset-0 bg-gradient-to-r from-graphite-950 via-graphite-950/60 to-transparent" />
        </div>
      )}
      <Container className="relative py-12 md:py-16">
        <Breadcrumb items={crumbs} />
        <div className="mt-8 max-w-3xl">
          {eyebrow && <p className="eyebrow mb-4 text-brand">{eyebrow}</p>}
          <h1 className="text-display font-bold text-white">{title}</h1>
          {intro && <p className="mt-5 max-w-2xl text-lg text-graphite-200">{intro}</p>}
          {children && <div className="mt-8 flex flex-wrap gap-3">{children}</div>}
        </div>
      </Container>
      <div className="h-1 bg-gradient-to-r from-brand via-brand-700 to-transparent" aria-hidden="true" />
    </section>
  )
}

export function QuoteButtons({ service }: { service?: Service }) {
  const to = service ? `/contato?servico=${service.slug}` : '/contato'
  return (
    <>
      <ButtonLink to={to}>
        Solicitar orçamento <ArrowRight className="size-4" aria-hidden="true" />
      </ButtonLink>
      <ExternalButton href={buildWhatsAppUrl(service?.title)} variant="ghost-dark">
        <WhatsAppIcon className="size-5" /> Falar no WhatsApp
      </ExternalButton>
    </>
  )
}

export function CategoryCard({ category }: { category: Category }) {
  const count = servicesIn(category.slug).length
  return (
    <Link
      to={categoryPath(category.slug)}
      className="group relative flex flex-col overflow-hidden rounded-[var(--radius-card)] border border-graphite-200 bg-white transition-all duration-200 hover:-translate-y-0.5 hover:border-graphite-400 hover:shadow-lg hover:shadow-graphite-950/5"
    >
      <div className="relative aspect-[16/9] overflow-hidden bg-graphite-900">
        <img
          src={category.image}
          alt=""
          loading="lazy"
          className="size-full object-cover opacity-85 transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute top-3 left-3 inline-flex size-10 items-center justify-center rounded-[var(--radius-control)] bg-white text-brand-700 shadow">
          <Icon name={category.icon} className="size-5" />
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-lg font-semibold">{category.title}</h3>
        <p className="mt-2 flex-1 text-[0.95rem] text-graphite-600">{category.short}</p>
        <p className="mt-4 flex items-center justify-between text-sm font-semibold text-brand-700">
          {count} {count === 1 ? 'serviço' : 'serviços'}
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
        </p>
      </div>
    </Link>
  )
}

export function ServiceCard({ service, withImage }: { service: Service; withImage?: boolean }) {
  return (
    <Link
      to={servicePath(service)}
      className="group flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] border border-graphite-200 bg-white transition-all duration-200 hover:border-graphite-400 hover:shadow-lg hover:shadow-graphite-950/5"
    >
      {withImage && (
        <div className="aspect-[16/9] overflow-hidden bg-graphite-100">
          <img
            src={serviceImage(service)}
            alt=""
            loading="lazy"
            className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      )}
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-3 flex items-center justify-between gap-3">
          <Icon name={service.icon} className="size-6 text-brand-700" />
          {service.norma && <Badge>{service.norma}</Badge>}
        </div>
        <h3 className="font-display text-[1.05rem] leading-snug font-semibold">{service.title}</h3>
        <p className="mt-2 flex-1 text-sm text-graphite-600">{service.summary}</p>
        <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-700">
          Saiba mais
          <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
        </span>
      </div>
    </Link>
  )
}

export function ClientStrip() {
  return (
    <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3" aria-label="Alguns clientes">
      {clients.slice(0, 12).map((c) => (
        <li key={c} className="font-display text-base font-semibold tracking-tight whitespace-nowrap text-graphite-400">
          {c}
        </li>
      ))}
    </ul>
  )
}

const processSteps = [
  { title: 'Diagnóstico', text: 'Visita técnica e levantamento das necessidades e exigências legais.' },
  { title: 'Proposta', text: 'Escopo claro, prazos e investimento — sem surpresas.' },
  { title: 'Execução', text: 'Projetos, inspeções, laudos e treinamentos por profissionais habilitados.' },
  { title: 'Documentação', text: 'Entrega com ART, memorial e acompanhamento junto aos órgãos.' },
]

export function ProcessSteps() {
  return (
    <ol className="grid gap-px overflow-hidden rounded-[var(--radius-card)] border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
      {processSteps.map((step, i) => (
        <li key={step.title} className="bg-graphite-950/80 p-6 md:p-8">
          <span className="font-display text-sm font-semibold text-brand">0{i + 1}</span>
          <h3 className="mt-3 text-xl font-semibold text-white">{step.title}</h3>
          <p className="mt-2 text-[0.95rem] text-graphite-400">{step.text}</p>
        </li>
      ))}
    </ol>
  )
}

export function CtaBand({ service, title, intro }: { service?: Service; title?: string; intro?: string }) {
  return (
    <section className="bg-graphite-50 py-16 md:py-24" aria-labelledby="cta-orcamento">
      <Container className="grid items-start gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
        <div>
          <SectionHeading
            id="cta-orcamento"
            eyebrow="Orçamento"
            title={title ?? 'Vamos colocar sua empresa em conformidade?'}
            intro={
              intro ??
              'Conte o que você precisa. Um engenheiro da ENGTECN analisa o seu caso e retorna com uma proposta.'
            }
          />
          {hasFormKey && (
            <ExternalButton href={buildWhatsAppUrl(service?.title)} variant="whatsapp" className="-mt-4">
              <WhatsAppIcon className="size-5" /> Prefiro falar pelo WhatsApp
            </ExternalButton>
          )}
        </div>
        <div className="rounded-[var(--radius-card)] border border-graphite-200 bg-white p-6 shadow-sm md:p-8">
          <QuoteForm defaultService={service?.slug} compact />
        </div>
      </Container>
    </section>
  )
}
