import { ChevronDown, Menu, Phone, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { categories, categoryPath, servicePath, servicesIn, site } from '../../content'
import { Icon } from '../ui/Icon'
import { Logo } from '../ui/Logo'
import { ButtonLink, Container, cx } from '../ui/primitives'

const links = [
  { to: '/treinamentos', label: 'Treinamentos' },
  { to: '/esocial', label: 'eSocial' },
  { to: '/clientes', label: 'Clientes' },
  { to: '/sobre', label: 'Sobre' },
  { to: '/contato', label: 'Contato' },
]

const MENU_HIGHLIGHTS = 4

function MegaMenu({ onNavigate }: { onNavigate: () => void }) {
  return (
    <div className="absolute inset-x-0 top-full border-t border-graphite-100 bg-white shadow-xl shadow-graphite-950/10">
      <Container className="grid grid-cols-5 gap-6 py-8">
        {categories.map((c) => {
          const items = servicesIn(c.slug)
          return (
            <div key={c.slug}>
              <Link
                to={categoryPath(c.slug)}
                onClick={onNavigate}
                className="group mb-3 flex items-start gap-2 font-display font-semibold text-graphite-950 hover:text-brand-700"
              >
                <Icon name={c.icon} className="mt-0.5 size-5 shrink-0 text-brand-700" />
                {c.title}
              </Link>
              <ul className="space-y-1.5 border-l border-graphite-100 pl-4 text-sm">
                {items.slice(0, MENU_HIGHLIGHTS).map((s) => (
                  <li key={s.slug}>
                    <Link to={servicePath(s)} onClick={onNavigate} className="text-graphite-600 hover:text-brand-700">
                      {s.short}
                    </Link>
                  </li>
                ))}
                {items.length > MENU_HIGHLIGHTS && (
                  <li>
                    <Link
                      to={categoryPath(c.slug)}
                      onClick={onNavigate}
                      className="font-semibold text-brand-700 hover:underline"
                    >
                      Ver todos ({items.length})
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          )
        })}
      </Container>
    </div>
  )
}

function MobileNav({ onNavigate }: { onNavigate: () => void }) {
  return (
    <div
      id="menu-mobile"
      className="fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto bg-white px-5 pt-4 pb-28 lg:hidden"
    >
      <p className="eyebrow mb-2 text-brand-700">Serviços</p>
      <div className="divide-y divide-graphite-100 border-y border-graphite-100">
        {categories.map((c) => (
          <details key={c.slug} className="group">
            <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-3 font-display font-semibold text-graphite-950 [&::-webkit-details-marker]:hidden">
              <span className="flex items-center gap-2">
                <Icon name={c.icon} className="size-5 text-brand-700" />
                {c.title}
              </span>
              <ChevronDown className="size-5 transition-transform group-open:rotate-180" aria-hidden="true" />
            </summary>
            <ul className="space-y-1 pb-3 pl-7">
              <li>
                <Link to={categoryPath(c.slug)} onClick={onNavigate} className="block py-1.5 font-semibold text-brand-700">
                  Visão geral
                </Link>
              </li>
              {servicesIn(c.slug).map((s) => (
                <li key={s.slug}>
                  <Link to={servicePath(s)} onClick={onNavigate} className="block py-1.5 text-graphite-600">
                    {s.short}
                  </Link>
                </li>
              ))}
            </ul>
          </details>
        ))}
      </div>
      <ul className="mt-4 space-y-1">
        {links.map((l) => (
          <li key={l.to}>
            <Link to={l.to} onClick={onNavigate} className="block py-2.5 font-display text-lg font-semibold text-graphite-950">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
      <div className="mt-6 grid gap-3">
        <ButtonLink to="/contato" className="w-full">
          Solicitar orçamento
        </ButtonLink>
        <a href={`tel:${site.phoneE164}`} className="flex items-center justify-center gap-2 py-2 text-graphite-600">
          <Phone className="size-4" aria-hidden="true" /> {site.phoneDisplay}
        </a>
      </div>
    </div>
  )
}

export function Header() {
  const [megaOpen, setMegaOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const headerRef = useRef<HTMLElement>(null)
  const servicesButtonRef = useRef<HTMLButtonElement>(null)

  const close = () => {
    setMegaOpen(false)
    setMobileOpen(false)
  }

  useEffect(close, [location.pathname])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!megaOpen && !mobileOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      if (megaOpen) servicesButtonRef.current?.focus()
      close()
    }
    const onClick = (e: MouseEvent) => {
      if (megaOpen && !headerRef.current?.contains(e.target as Node)) setMegaOpen(false)
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('mousedown', onClick)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('mousedown', onClick)
    }
  }, [megaOpen, mobileOpen])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
  }, [mobileOpen])

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    cx(
      'rounded-[var(--radius-control)] px-3 py-2 text-[0.95rem] font-medium transition-colors',
      isActive ? 'text-brand-700' : 'text-graphite-700 hover:text-graphite-950',
    )
  const servicesActive = location.pathname.startsWith('/servicos')

  return (
    <header
      ref={headerRef}
      className={cx(
        'sticky z-50 border-b bg-white/95 backdrop-blur transition-shadow',
        scrolled || megaOpen ? 'border-graphite-100 shadow-sm' : 'border-transparent',
      )}
      style={{ top: 'env(safe-area-inset-top, 0px)' }}
    >
      <Container className="flex h-16 items-center justify-between gap-6 lg:h-[72px]">
        <Link to="/" className="shrink-0" aria-label="ENGTECN — página inicial">
          <Logo className="h-7 w-auto lg:h-8" />
        </Link>

        <nav aria-label="Principal" className="hidden items-center gap-1 lg:flex">
          <button
            ref={servicesButtonRef}
            type="button"
            aria-expanded={megaOpen}
            aria-controls="mega-menu"
            onClick={() => setMegaOpen((v) => !v)}
            className={cx(
              'inline-flex items-center gap-1 rounded-[var(--radius-control)] px-3 py-2 text-[0.95rem] font-medium transition-colors',
              servicesActive || megaOpen ? 'text-brand-700' : 'text-graphite-700 hover:text-graphite-950',
            )}
          >
            Serviços
            <ChevronDown className={cx('size-4 transition-transform', megaOpen && 'rotate-180')} aria-hidden="true" />
          </button>
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} className={navLinkClass}>
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <a href={`tel:${site.phoneE164}`} className="text-sm font-medium text-graphite-600 hover:text-graphite-950">
            {site.phoneDisplay}
          </a>
          <ButtonLink to="/contato">Solicitar orçamento</ButtonLink>
        </div>

        <button
          type="button"
          className="-mr-2 inline-flex size-11 items-center justify-center rounded-[var(--radius-control)] text-graphite-900 lg:hidden"
          aria-expanded={mobileOpen}
          aria-controls="menu-mobile"
          aria-label={mobileOpen ? 'Fechar menu' : 'Abrir menu'}
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </Container>

      <div id="mega-menu" hidden={!megaOpen} className="hidden lg:block">
        {megaOpen && <MegaMenu onNavigate={close} />}
      </div>
      {mobileOpen && <MobileNav onNavigate={close} />}
    </header>
  )
}
