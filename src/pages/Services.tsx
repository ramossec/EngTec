import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { CtaBand, PageHeader, QuoteButtons } from '../components/blocks/blocks'
import { Seo } from '../components/Seo'
import { Icon } from '../components/ui/Icon'
import { Section } from '../components/ui/primitives'
import { categories, categoryPath, servicePath, servicesIn } from '../content'
import { breadcrumbSchema } from '../lib/schema'

export function Component() {
  const crumbs = [
    { name: 'Início', path: '/' },
    { name: 'Serviços', path: '/servicos' },
  ]
  return (
    <>
      <Seo
        title="Serviços de engenharia e segurança do trabalho"
        description="Todos os serviços da ENGTECN: engenharia mecânica, estruturas metálicas, segurança do trabalho, prevenção contra incêndio e treinamentos."
        path="/servicos"
        jsonLd={[breadcrumbSchema(crumbs)]}
      />
      <PageHeader
        crumbs={crumbs}
        eyebrow="Serviços"
        title="Tudo o que sua empresa precisa em engenharia e segurança"
        intro="Encontre o serviço pela área de atuação. Não achou o que procura? Fale com a nossa equipe."
      >
        <QuoteButtons />
      </PageHeader>
      <Section>
        <div className="grid gap-x-10 gap-y-14 md:grid-cols-2">
          {categories.map((c) => (
            <div key={c.slug}>
              <Link to={categoryPath(c.slug)} className="group flex items-center gap-3">
                <span className="inline-flex size-11 items-center justify-center rounded-[var(--radius-control)] bg-graphite-950 text-brand">
                  <Icon name={c.icon} className="size-5" />
                </span>
                <h2 className="text-h3 font-bold group-hover:text-brand-700">{c.title}</h2>
              </Link>
              <p className="mt-3 text-graphite-600">{c.short}</p>
              <ul className="mt-5 grid gap-x-6 border-t border-graphite-100 pt-4 sm:grid-cols-2">
                {servicesIn(c.slug).map((s) => (
                  <li key={s.slug}>
                    <Link
                      to={servicePath(s)}
                      className="flex min-h-10 items-center gap-2 py-1 text-[0.95rem] text-graphite-700 hover:text-brand-700"
                    >
                      <ArrowRight className="size-3.5 shrink-0 text-brand-700" aria-hidden="true" />
                      {s.short}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>
      <CtaBand />
    </>
  )
}
