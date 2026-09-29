import { ArrowRight, BadgeCheck, FileSignature, MapPin, ShieldCheck } from 'lucide-react'
import { Link } from 'react-router-dom'
import {
  CategoryCard,
  ClientStrip,
  CtaBand,
  ProcessSteps,
  QuoteButtons,
  ServiceCard,
} from '../components/blocks/blocks'
import { Seo } from '../components/Seo'
import { Container, Section, SectionHeading } from '../components/ui/primitives'
import { categories, featuredServices, projects, site } from '../content'
import { organizationSchema } from '../lib/schema'

const trust = [
  { icon: FileSignature, label: 'Projetos e laudos com ART' },
  { icon: BadgeCheck, label: 'Engenheiro mecânico e de segurança' },
  { icon: ShieldCheck, label: 'Conformidade com NRs e Corpo de Bombeiros' },
  { icon: MapPin, label: 'Atendimento em SP e Sul de Minas' },
]

export function Component() {
  const featured = featuredServices().slice(0, 6)
  return (
    <>
      <Seo
        title="ENGTECN Soluções — Engenharia, Segurança do Trabalho e AVCB em São João da Boa Vista"
        description="Engenharia mecânica, NR-12, NR-13, estruturas metálicas, PGR, LTCAT, laudos e AVCB/CLCB para indústrias e comércios em São João da Boa Vista, SP e Sul de Minas."
        path="/"
        jsonLd={[organizationSchema()]}
      />

      {/* Hero */}
      <section className="blueprint relative overflow-hidden text-graphite-200">
        <div className="absolute inset-0 lg:left-[45%]" aria-hidden="true">
          <img
            src="/images/hero-industria.webp"
            alt=""
            className="size-full object-cover opacity-30 lg:opacity-70"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-graphite-950 via-graphite-950/85 to-graphite-950/20 lg:via-graphite-950/40" />
        </div>
        <Container className="relative py-20 md:py-28 lg:py-32">
          <div className="max-w-2xl animate-rise">
            <p className="eyebrow mb-6 text-brand">Engenharia consultiva · {site.address.city}-SP</p>
            <h1 className="text-display font-bold text-white">
              Engenharia e segurança do trabalho para sua empresa operar{' '}
              <span className="text-brand">em conformidade</span>.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-graphite-200">
              Projetos mecânicos e estruturais, NR-12, NR-13, PGR, laudos técnicos e AVCB/CLCB — do diagnóstico à
              documentação com ART, para indústrias, comércios e condomínios.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <QuoteButtons />
            </div>
          </div>
        </Container>
        <div className="relative border-t border-white/10 bg-graphite-950/60 backdrop-blur-sm">
          <Container>
            <ul className="grid grid-cols-1 gap-4 py-6 sm:grid-cols-2 lg:grid-cols-4">
              {trust.map(({ icon: TrustIcon, label }) => (
                <li key={label} className="flex items-center gap-3 text-sm font-medium text-graphite-200">
                  <TrustIcon className="size-5 shrink-0 text-brand" aria-hidden="true" />
                  {label}
                </li>
              ))}
            </ul>
          </Container>
        </div>
      </section>

      {/* Clients */}
      <section className="border-b border-graphite-100 bg-white py-10" aria-label="Clientes">
        <Container>
          <p className="mb-6 text-center text-sm font-medium text-graphite-400">
            Indústrias, comércios e instituições que confiam na ENGTECN
          </p>
          <ClientStrip />
        </Container>
      </section>

      {/* Categories */}
      <Section labelledBy="areas">
        <SectionHeading
          id="areas"
          eyebrow="Áreas de atuação"
          title="Soluções completas em engenharia e segurança"
          intro="Uma única equipe técnica para projetos, inspeções, laudos, regularização e treinamentos."
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c) => (
            <CategoryCard key={c.slug} category={c} />
          ))}
          <Link
            to="/esocial"
            className="group flex flex-col justify-between rounded-[var(--radius-card)] border border-dashed border-graphite-200 bg-graphite-50 p-6 transition-colors hover:border-graphite-400"
          >
            <div>
              <p className="eyebrow text-brand-700">eSocial</p>
              <h3 className="mt-3 font-display text-lg font-semibold">SST no eSocial sem vulnerabilidades</h3>
              <p className="mt-2 text-[0.95rem] text-graphite-600">
                Auditoria dos seus laudos e programas, plano de ação e curso para quem envia os eventos.
              </p>
            </div>
            <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-brand-700">
              Conhecer <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </span>
          </Link>
        </div>
      </Section>

      {/* Process */}
      <Section tone="dark" labelledBy="como-trabalhamos">
        <SectionHeading
          id="como-trabalhamos"
          eyebrow="Como trabalhamos"
          title="Do diagnóstico à ART, com um só parceiro"
          intro="Processo transparente e documentado em cada etapa."
          dark
        />
        <ProcessSteps />
      </Section>

      {/* Featured services */}
      <Section tone="light" labelledBy="destaques">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            id="destaques"
            eyebrow="Mais procurados"
            title="Serviços em destaque"
            intro="As demandas mais frequentes de fiscalização, seguradoras e clientes."
          />
          <Link to="/servicos" className="mb-10 inline-flex items-center gap-1 font-semibold text-brand-700 hover:underline md:mb-14">
            Todos os serviços <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((s) => (
            <ServiceCard key={s.slug} service={s} />
          ))}
        </div>
      </Section>

      {/* About + values */}
      <Section labelledBy="sobre-home">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="relative">
            <img
              src="/images/engenheiro.webp"
              alt={`${site.responsible.name}, engenheiro responsável da ENGTECN`}
              loading="lazy"
              className="aspect-[4/3] w-full rounded-[var(--radius-card)] object-cover"
            />
            <div className="absolute -bottom-6 left-6 max-w-[16rem] rounded-[var(--radius-card)] bg-graphite-950 p-5 text-white shadow-xl">
              <p className="font-display text-sm font-semibold">{site.responsible.name}</p>
              <p className="mt-1 text-xs text-graphite-400">{site.responsible.role}</p>
            </div>
          </div>
          <div>
            <SectionHeading
              id="sobre-home"
              eyebrow="Sobre a ENGTECN"
              title="Engenharia próxima, técnica e responsável"
              intro={site.mission}
            />
            <ul className="-mt-4 flex flex-wrap gap-2">
              {site.values.map((v) => (
                <li key={v} className="rounded-full border border-graphite-200 px-4 py-1.5 text-sm font-medium text-graphite-700">
                  {v}
                </li>
              ))}
            </ul>
            <Link to="/sobre" className="mt-8 inline-flex items-center gap-1 font-semibold text-brand-700 hover:underline">
              Conheça a empresa <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </Section>

      {/* Projects */}
      <Section tone="light" labelledBy="projetos">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading id="projetos" eyebrow="Portfólio" title="Projetos recentes" />
          <Link to="/clientes" className="mb-10 inline-flex items-center gap-1 font-semibold text-brand-700 hover:underline md:mb-14">
            Ver clientes e projetos <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {projects.slice(0, 3).map((p) => (
            <figure key={p.title} className="overflow-hidden rounded-[var(--radius-card)] border border-graphite-200 bg-white">
              <img src={p.image} alt={p.title} loading="lazy" className="aspect-[4/3] w-full object-cover" />
              <figcaption className="p-5">
                <p className="text-xs font-semibold tracking-wide text-brand-700 uppercase">
                  {p.client} · {p.place}
                </p>
                <h3 className="mt-2 font-display font-semibold">{p.title}</h3>
                <p className="mt-1.5 text-sm text-graphite-600">{p.description}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </Section>

      <CtaBand />
    </>
  )
}
