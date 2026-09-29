import { CtaBand, PageHeader, QuoteButtons, ServiceCard } from '../components/blocks/blocks'
import { Seo } from '../components/Seo'
import { Section } from '../components/ui/primitives'
import { categoryPath, servicesIn, type Category } from '../content'
import { breadcrumbSchema } from '../lib/schema'

export function CategoryView({ category }: { category: Category }) {
  const path = categoryPath(category.slug)
  const crumbs =
    category.slug === 'treinamentos'
      ? [
          { name: 'Início', path: '/' },
          { name: category.title, path },
        ]
      : [
          { name: 'Início', path: '/' },
          { name: 'Serviços', path: '/servicos' },
          { name: category.title, path },
        ]
  const items = servicesIn(category.slug)
  return (
    <>
      <Seo
        title={category.title}
        description={category.description.slice(0, 158)}
        path={path}
        image={category.image}
        jsonLd={[breadcrumbSchema(crumbs)]}
      />
      <PageHeader crumbs={crumbs} eyebrow={`${items.length} serviços`} title={category.title} intro={category.description} image={category.image}>
        <QuoteButtons />
      </PageHeader>
      <Section tone="light">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((s) => (
            <ServiceCard key={s.slug} service={s} withImage />
          ))}
        </div>
      </Section>
      <CtaBand />
    </>
  )
}
