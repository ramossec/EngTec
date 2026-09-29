import { Check } from 'lucide-react'
import type { ReactNode } from 'react'
import { PageHeader, QuoteButtons, ServiceCard } from '../components/blocks/blocks'
import { QuoteForm, hasFormKey } from '../components/forms/QuoteForm'
import { Seo } from '../components/Seo'
import { Accordion } from '../components/ui/Accordion'
import { Badge, Container, ExternalButton, SectionHeading } from '../components/ui/primitives'
import { WhatsAppIcon } from '../components/WhatsAppFab'
import {
  categoryPath,
  getCategory,
  relatedServices,
  servicePath,
  serviceImage,
  site,
  type Service,
} from '../content'
import { breadcrumbSchema, faqSchema, serviceSchema } from '../lib/schema'
import { buildWhatsAppUrl } from '../lib/whatsapp'

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="border-t border-graphite-100 pt-10 first:border-0 first:pt-0">
      <h2 className="text-h3 font-bold">{title}</h2>
      <div className="mt-5">{children}</div>
    </section>
  )
}

function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="grid gap-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <Check className="mt-1 size-5 shrink-0 text-brand-700" aria-hidden="true" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

export function ServiceView({ service }: { service: Service }) {
  const category = getCategory(service.category)!
  const path = servicePath(service)
  const crumbs = [
    { name: 'Início', path: '/' },
    ...(service.category === 'treinamentos' ? [] : [{ name: 'Serviços', path: '/servicos' }]),
    { name: category.title, path: categoryPath(category.slug) },
    { name: service.short, path },
  ]
  const jsonLd: object[] = [serviceSchema(service), breadcrumbSchema(crumbs)]
  if (service.faq?.length) jsonLd.push(faqSchema(service.faq))
  const related = relatedServices(service)

  return (
    <>
      <Seo title={service.title} description={service.summary} path={path} image={serviceImage(service)} jsonLd={jsonLd} />
      <PageHeader
        crumbs={crumbs}
        eyebrow={category.title}
        title={service.title}
        intro={service.summary}
        image={serviceImage(service)}
      >
        <QuoteButtons service={service} />
      </PageHeader>

      <Container className="grid gap-12 py-16 md:py-20 lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-16">
        <article className="space-y-10 text-graphite-700">
          <Block title="O que é">
            {service.norma && (
              <p className="mb-4">
                <Badge>Norma aplicável: {service.norma}</Badge>
              </p>
            )}
            <div className="prose-tech max-w-prose">
              {service.whatIs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </Block>
          {service.whenRequired && (
            <Block title="Quando é obrigatório">
              <CheckList items={service.whenRequired} />
            </Block>
          )}
          <Block title="O que entregamos">
            <CheckList items={service.deliverables} />
          </Block>
          {service.steps && (
            <Block title="Como funciona">
              <ol className="grid gap-4 sm:grid-cols-2">
                {service.steps.map((step, i) => (
                  <li key={step} className="rounded-[var(--radius-card)] border border-graphite-200 p-5">
                    <span className="font-display text-sm font-semibold text-brand-700">0{i + 1}</span>
                    <p className="mt-2 font-medium text-graphite-900">{step}</p>
                  </li>
                ))}
              </ol>
            </Block>
          )}
          {service.faq && (
            <Block title="Perguntas frequentes">
              <Accordion items={service.faq} />
            </Block>
          )}
        </article>

        <aside aria-label="Solicitar orçamento" className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-[var(--radius-card)] border border-graphite-200 bg-graphite-50 p-6">
            <h2 className="font-display text-xl font-bold">Solicite um orçamento</h2>
            <p className="mt-1.5 mb-5 text-sm text-graphite-600">Retorno em até 1 dia útil.</p>
            <QuoteForm defaultService={service.slug} compact />
            {hasFormKey && (
            <div className="mt-5 border-t border-graphite-200 pt-5">
              <ExternalButton href={buildWhatsAppUrl(service.title)} variant="whatsapp" className="w-full">
                <WhatsAppIcon className="size-5" /> WhatsApp {site.phoneDisplay}
              </ExternalButton>
            </div>
            )}
          </div>
        </aside>
      </Container>

      {related.length > 0 && (
        <section className="bg-graphite-50 py-16 md:py-20" aria-labelledby="relacionados">
          <Container>
            <SectionHeading id="relacionados" eyebrow={category.title} title="Serviços relacionados" />
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((s) => (
                <ServiceCard key={s.slug} service={s} />
              ))}
            </div>
          </Container>
        </section>
      )}
    </>
  )
}
