import { ArrowRight, Check, Mail, MapPin, Phone } from 'lucide-react'
import { Link, useSearchParams } from 'react-router-dom'
import { CtaBand, PageHeader, QuoteButtons, ServiceCard } from '../components/blocks/blocks'
import { QuoteForm } from '../components/forms/QuoteForm'
import { Seo } from '../components/Seo'
import { Container, ExternalButton, Section, SectionHeading } from '../components/ui/primitives'
import { WhatsAppIcon } from '../components/WhatsAppFab'
import { categories, clients, getService, projects, servicePath, site } from '../content'
import { breadcrumbSchema, organizationSchema } from '../lib/schema'
import { buildWhatsAppUrl } from '../lib/whatsapp'

const home = { name: 'Início', path: '/' }

export function AboutPage() {
  const crumbs = [home, { name: 'Sobre', path: '/sobre' }]
  return (
    <>
      <Seo
        title="Sobre a ENGTECN"
        description="Conheça a ENGTECN Soluções: engenharia consultiva em mecânica, estruturas metálicas, segurança do trabalho e prevenção contra incêndio em São João da Boa Vista-SP."
        path="/sobre"
        jsonLd={[organizationSchema(), breadcrumbSchema(crumbs)]}
      />
      <PageHeader
        crumbs={crumbs}
        eyebrow="Sobre a ENGTECN"
        title="Soluções customizadas e integradas para instalações comerciais e industriais"
        image="/images/equipe.webp"
      />
      <Section>
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
          <div className="prose-tech space-y-4 text-graphite-700">
            <h2 className="text-h2 font-bold">Nossa história</h2>
            <p>
              A {site.legalName} tornou-se, ao longo dos anos, uma empresa especializada em instalações comerciais e
              industriais, atuando nos segmentos de engenharia mecânica, segurança do trabalho, sistemas de prevenção
              contra incêndio, hidráulica e estruturas metálicas.
            </p>
            <p>
              Foi fundada pelo sócio-administrador <strong>{site.responsible.name}</strong>, engenheiro mecânico pleno
              formado pela UNIFAE, especialista em Engenharia de Segurança do Trabalho e Produção, com certificação em
              perícia judicial do trabalho.
            </p>
            <p>
              Nosso foco é a prestação de serviços especializados em Engenharia Mecânica e Segurança do Trabalho, com
              soluções customizadas e integradas: engenharia consultiva para o desenvolvimento de projetos, estudos de
              viabilidade técnico-econômica e projetos de engenharia conceitual, básica e detalhada.
            </p>
            <h2 className="pt-6 text-h3 font-bold">Serviços complementares</h2>
            <ul className="grid gap-2 sm:grid-cols-2">
              {[
                'Análise de energia e envoltória',
                'Conforto térmico e engenharia acústica',
                'Testes, ajustes e balanceamento (TAB)',
                'Ventilação mecânica e natural',
                'Engenharia da qualidade (SGQ)',
                'Parecer técnico em projetos contratados',
              ].map((item) => (
                <li key={item} className="flex gap-2">
                  <Check className="mt-1 size-4 shrink-0 text-brand-700" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-5">
            {[
              { title: 'Missão', text: site.mission },
              { title: 'Visão', text: site.vision },
              {
                title: 'Sustentabilidade',
                text: 'Compromisso com práticas que não agridam o meio ambiente e proporcionem melhor qualidade de vida para as gerações futuras.',
              },
            ].map((b) => (
              <div key={b.title} className="rounded-[var(--radius-card)] border border-graphite-200 p-6">
                <p className="eyebrow text-brand-700">{b.title}</p>
                <p className="mt-3 text-graphite-700">{b.text}</p>
              </div>
            ))}
            <div className="rounded-[var(--radius-card)] bg-graphite-950 p-6 text-graphite-200">
              <p className="eyebrow text-brand">Valores</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {site.values.map((v) => (
                  <li key={v} className="rounded-full border border-white/15 px-3 py-1 text-sm text-white">
                    {v}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Section>
      <CtaBand />
    </>
  )
}

export function ClientsPage() {
  const crumbs = [home, { name: 'Clientes', path: '/clientes' }]
  return (
    <>
      <Seo
        title="Clientes e projetos"
        description="Indústrias, comércios, hospitais e condomínios atendidos pela ENGTECN e alguns dos projetos realizados em SP e Minas Gerais."
        path="/clientes"
        jsonLd={[breadcrumbSchema(crumbs)]}
      />
      <PageHeader
        crumbs={crumbs}
        eyebrow="Clientes e projetos"
        title="Parcerias duradouras, dentro da filosofia da melhoria contínua"
        intro="É com satisfação que apresentamos alguns dos clientes, amigos e parceiros que confiam na ENGTECN."
      />
      <Section>
        <SectionHeading eyebrow="Portfólio" title="Projetos realizados" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
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
      <Section tone="light">
        <SectionHeading eyebrow="Clientes" title="Quem confia na ENGTECN" />
        <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-[var(--radius-card)] border border-graphite-200 bg-graphite-200 sm:grid-cols-3 lg:grid-cols-4">
          {clients.map((c) => (
            <li key={c} className="flex min-h-20 items-center justify-center bg-white p-4 text-center font-display font-semibold text-graphite-700">
              {c}
            </li>
          ))}
        </ul>
      </Section>
      <CtaBand />
    </>
  )
}

export function ESocialPage() {
  const crumbs = [home, { name: 'eSocial', path: '/esocial' }]
  const course = getService('gestao-sst-esocial')!
  const offers = [
    {
      title: 'Auditoria para a declaração do eSocial + Plano de Ação',
      items: [
        'Verificação do cumprimento das NRs que influenciam os riscos de insalubridade, periculosidade, ergonômicos e de acidentes',
        'Análise de laudos, programas e registros existentes e dos dados necessários aos eventos de SST',
        'Plano de ação para reduzir vulnerabilidades sem expor fragilidades da empresa',
      ],
    },
    {
      title: 'Plano de Gestão de Segurança e Saúde Ocupacional',
      items: [
        'Auditoria completa de conformidade com as Normas Regulamentadoras',
        'Elaboração ou complementação de laudos (insalubridade, periculosidade, ergonomia) e programas (PGR, PCA, PPR)',
        'Assessoria técnica para solucionar as vulnerabilidades apontadas',
        'Gestão do PCMSO, ASOs e lançamento das informações de SST no eSocial',
      ],
    },
  ]
  return (
    <>
      <Seo
        title="eSocial — Segurança e Saúde no Trabalho"
        description="Auditoria de SST para o eSocial, plano de ação, gestão de laudos e PCMSO e curso para quem envia os eventos S-2210, S-2220 e S-2240."
        path="/esocial"
        jsonLd={[breadcrumbSchema(crumbs)]}
      />
      <PageHeader
        crumbs={crumbs}
        eyebrow="eSocial"
        title="SST no eSocial sem expor vulnerabilidades da sua empresa"
        intro="As informações enviadas ao eSocial ficam disponíveis às autoridades. Riscos sem controle eficaz viram passivos trabalhistas e previdenciários. Ajudamos você a declarar com segurança."
        image="/images/esocial.webp"
      >
        <QuoteButtons />
      </PageHeader>
      <Section>
        <div className="grid gap-6 lg:grid-cols-2">
          {offers.map((o) => (
            <div key={o.title} className="rounded-[var(--radius-card)] border border-graphite-200 p-7">
              <h2 className="text-h3 font-bold">{o.title}</h2>
              <ul className="mt-5 grid gap-3 text-graphite-700">
                {o.items.map((i) => (
                  <li key={i} className="flex gap-3">
                    <Check className="mt-1 size-5 shrink-0 text-brand-700" aria-hidden="true" />
                    {i}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-10 max-w-md">
          <ServiceCard service={course} />
        </div>
      </Section>
      <CtaBand />
    </>
  )
}

export function ContactPage() {
  const [params] = useSearchParams()
  const crumbs = [home, { name: 'Contato', path: '/contato' }]
  const preselected = params.get('servico') ?? undefined
  return (
    <>
      <Seo
        title="Contato e orçamento"
        description={`Solicite um orçamento à ENGTECN: WhatsApp ${site.phoneDisplay}, e-mail ${site.email}. ${site.address.city}-SP.`}
        path="/contato"
        jsonLd={[organizationSchema(), breadcrumbSchema(crumbs)]}
      />
      <PageHeader
        crumbs={crumbs}
        eyebrow="Contato"
        title="Solicite seu orçamento"
        intro="Preencha o formulário ou fale direto com um engenheiro pelo WhatsApp. Respondemos em até 1 dia útil."
      />
      <Container className="grid gap-12 py-16 md:py-20 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
        <div className="rounded-[var(--radius-card)] border border-graphite-200 p-6 md:p-8">
          {/* key forces a fresh form when ?servico= changes on client navigation */}
          <QuoteForm key={preselected ?? 'geral'} defaultService={preselected} />
        </div>
        <aside className="space-y-6">
          <ExternalButton href={buildWhatsAppUrl()} variant="whatsapp" className="w-full">
            <WhatsAppIcon className="size-5" /> Conversar no WhatsApp
          </ExternalButton>
          <ul className="space-y-5 text-graphite-700">
            <li className="flex gap-3">
              <Phone className="mt-1 size-5 shrink-0 text-brand-700" aria-hidden="true" />
              <div>
                <p className="font-semibold text-graphite-950">Telefone / WhatsApp</p>
                <a href={`tel:${site.phoneE164}`} className="hover:text-brand-700">{site.phoneDisplay}</a>
              </div>
            </li>
            <li className="flex gap-3">
              <Mail className="mt-1 size-5 shrink-0 text-brand-700" aria-hidden="true" />
              <div>
                <p className="font-semibold text-graphite-950">E-mail</p>
                <a href={`mailto:${site.email}`} className="break-all hover:text-brand-700">{site.email}</a>
              </div>
            </li>
            <li className="flex gap-3">
              <MapPin className="mt-1 size-5 shrink-0 text-brand-700" aria-hidden="true" />
              <div>
                <p className="font-semibold text-graphite-950">Endereço</p>
                <p>
                  {site.address.street}
                  <br />
                  {site.address.district}, {site.address.city}-{site.address.state} · CEP {site.address.zip}
                </p>
              </div>
            </li>
          </ul>
          <a
            href={site.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group blueprint relative flex aspect-[4/3] items-end overflow-hidden rounded-[var(--radius-card)] p-5 text-white"
          >
            <MapPin className="absolute top-1/2 left-1/2 size-12 -translate-x-1/2 -translate-y-full text-brand drop-shadow" aria-hidden="true" />
            <span className="inline-flex items-center gap-2 font-semibold">
              Abrir no Google Maps <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </span>
          </a>
          <p className="text-xs text-graphite-400">CNPJ {site.cnpj}</p>
        </aside>
      </Container>
    </>
  )
}

export function PrivacyPage() {
  const crumbs = [home, { name: 'Política de privacidade', path: '/politica-de-privacidade' }]
  return (
    <>
      <Seo
        title="Política de privacidade"
        description="Como a ENGTECN coleta, usa e protege os dados enviados pelo site, conforme a LGPD (Lei 13.709/2018)."
        path="/politica-de-privacidade"
      />
      <PageHeader crumbs={crumbs} title="Política de privacidade" />
      <Container className="py-16">
        <div className="prose-tech max-w-prose space-y-4 text-graphite-700 [&_h2]:pt-6 [&_h2]:text-h3 [&_h2]:font-bold">
          <p>
            Esta política explica como a {site.legalName} (CNPJ {site.cnpj}) trata os dados pessoais enviados por
            este site, em conformidade com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018).
          </p>
          <h2>Quais dados coletamos</h2>
          <p>
            Somente os dados que você informa no formulário de orçamento: nome, empresa, e-mail, telefone, cidade,
            serviço de interesse e mensagem.
          </p>
          <h2>Para que usamos</h2>
          <p>
            Exclusivamente para responder à sua solicitação, elaborar propostas comerciais e manter contato sobre o
            serviço solicitado. Não vendemos nem compartilhamos seus dados para fins de marketing de terceiros.
          </p>
          <h2>Com quem compartilhamos</h2>
          <p>
            O envio do formulário é processado pelo serviço Web3Forms, que apenas encaminha a mensagem ao nosso
            e-mail. Ao usar o botão de WhatsApp, a conversa segue os termos do próprio WhatsApp.
          </p>
          <h2>Por quanto tempo guardamos</h2>
          <p>Pelo tempo necessário para atender à solicitação e cumprir obrigações legais.</p>
          <h2>Seus direitos</h2>
          <p>
            Você pode solicitar acesso, correção ou exclusão dos seus dados a qualquer momento pelo e-mail{' '}
            <a href={`mailto:${site.email}`} className="text-brand-700 underline">{site.email}</a>.
          </p>
          <h2>Cookies</h2>
          <p>Este site não utiliza cookies de rastreamento ou publicidade.</p>
        </div>
      </Container>
    </>
  )
}

export function NotFoundPage() {
  return (
    <>
      <Seo title="Página não encontrada" description="A página que você procura não existe ou mudou de endereço." path="/404" noindex />
      <section className="blueprint text-graphite-200">
        <Container className="py-20 md:py-28">
          <p className="font-display text-7xl font-bold text-brand">404</p>
          <h1 className="mt-4 text-h2 font-bold text-white">Esta página não existe ou mudou de endereço</h1>
          <p className="mt-4 max-w-xl text-lg">
            Reorganizamos o site. Escolha uma área abaixo ou fale com a gente.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <QuoteButtons />
          </div>
        </Container>
      </section>
      <Section tone="light">
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c) => (
            <li key={c.slug}>
              <Link
                to={c.slug === 'treinamentos' ? '/treinamentos' : `/servicos/${c.slug}`}
                className="flex min-h-14 items-center justify-between rounded-[var(--radius-card)] border border-graphite-200 bg-white px-5 font-display font-semibold hover:border-graphite-400"
              >
                {c.title}
                <ArrowRight className="size-4 text-brand-700" aria-hidden="true" />
              </Link>
            </li>
          ))}
          <li>
            <Link to={servicePath(getService('avcb-clcb')!)} className="flex min-h-14 items-center justify-between rounded-[var(--radius-card)] border border-graphite-200 bg-white px-5 font-display font-semibold hover:border-graphite-400">
              AVCB e CLCB <ArrowRight className="size-4 text-brand-700" aria-hidden="true" />
            </Link>
          </li>
        </ul>
      </Section>
    </>
  )
}
