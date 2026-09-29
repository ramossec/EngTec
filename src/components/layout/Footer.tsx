import { Mail, MapPin, Phone } from 'lucide-react'
import { Link } from 'react-router-dom'
import { categories, categoryPath, site } from '../../content'
import { Logo } from '../ui/Logo'
import { Container } from '../ui/primitives'

const socialLabels = { linkedin: 'LinkedIn', facebook: 'Facebook', instagram: 'Instagram' } as const

export function Footer() {
  const socials = (Object.keys(socialLabels) as (keyof typeof socialLabels)[]).filter((k) => site.social[k])
  const year = new Date().getFullYear()
  return (
    <footer className="blueprint text-graphite-400">
      <Container className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr]">
        <div>
          <Logo variant="light" className="h-8 w-auto" />
          <p className="mt-5 max-w-xs text-sm leading-relaxed">
            Engenharia mecânica, estruturas metálicas, segurança do trabalho e prevenção contra incêndio para
            indústrias, comércios e condomínios.
          </p>
          {socials.length > 0 && (
            <ul className="mt-6 flex gap-4 text-sm">
              {socials.map((k) => (
                <li key={k}>
                  <a href={site.social[k]} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                    {socialLabels[k]}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        <nav aria-label="Serviços">
          <h2 className="font-display text-sm font-semibold tracking-wider text-white uppercase">Serviços</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link to={categoryPath(c.slug)} className="hover:text-white">
                  {c.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Empresa">
          <h2 className="font-display text-sm font-semibold tracking-wider text-white uppercase">Empresa</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li><Link to="/sobre" className="hover:text-white">Sobre a ENGTECN</Link></li>
            <li><Link to="/clientes" className="hover:text-white">Clientes e projetos</Link></li>
            <li><Link to="/esocial" className="hover:text-white">eSocial</Link></li>
            <li><Link to="/contato" className="hover:text-white">Contato e orçamento</Link></li>
            <li><Link to="/politica-de-privacidade" className="hover:text-white">Política de privacidade</Link></li>
          </ul>
        </nav>

        <div>
          <h2 className="font-display text-sm font-semibold tracking-wider text-white uppercase">Contato</h2>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <a href={`tel:${site.phoneE164}`} className="flex items-start gap-3 hover:text-white">
                <Phone className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden="true" />
                {site.phoneDisplay} (WhatsApp)
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="flex items-start gap-3 break-all hover:text-white">
                <Mail className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden="true" />
                {site.email}
              </a>
            </li>
            <li>
              <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 hover:text-white">
                <MapPin className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden="true" />
                <span>
                  {site.address.street}
                  <br />
                  {site.address.district}, {site.address.city}-{site.address.state}
                  <br />
                  CEP {site.address.zip}
                </span>
              </a>
            </li>
          </ul>
        </div>
      </Container>
      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-2 py-6 text-xs sm:flex-row sm:justify-between">
          <p>
            © {year} {site.legalName} · CNPJ {site.cnpj}
          </p>
          <p>Responsável técnico: {site.responsible.name}</p>
        </Container>
      </div>
    </footer>
  )
}
