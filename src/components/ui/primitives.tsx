import type { ComponentProps, ReactNode } from 'react'
import { Link } from 'react-router-dom'

export function cx(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(' ')
}

export function Container({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cx('mx-auto w-full max-w-[1200px] px-5 sm:px-8', className)}>{children}</div>
}

type Tone = 'white' | 'light' | 'dark'

const toneClasses: Record<Tone, string> = {
  white: 'bg-white',
  light: 'bg-graphite-50',
  dark: 'blueprint text-graphite-200',
}

export function Section({
  tone = 'white',
  className,
  children,
  id,
  labelledBy,
}: {
  tone?: Tone
  className?: string
  children: ReactNode
  id?: string
  labelledBy?: string
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cx('py-16 md:py-24', toneClasses[tone], className)}
    >
      <Container>{children}</Container>
    </section>
  )
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  id,
  dark,
  align = 'left',
}: {
  eyebrow?: string
  title: string
  intro?: ReactNode
  id?: string
  dark?: boolean
  align?: 'left' | 'center'
}) {
  return (
    <div className={cx('mb-10 max-w-2xl md:mb-14', align === 'center' && 'mx-auto text-center')}>
      {eyebrow && (
        <p className={cx('eyebrow mb-4', dark ? 'text-brand' : 'text-brand-700')}>{eyebrow}</p>
      )}
      <h2 id={id} className={cx('text-h2 font-bold', dark && 'text-white')}>
        {title}
      </h2>
      {intro && (
        <p className={cx('mt-4 text-lg', dark ? 'text-graphite-200' : 'text-graphite-600')}>{intro}</p>
      )}
    </div>
  )
}

type Variant = 'primary' | 'secondary' | 'ghost-dark' | 'whatsapp'

const variantClasses: Record<Variant, string> = {
  primary: 'bg-brand-700 text-white hover:bg-brand-800 shadow-sm',
  secondary: 'border border-graphite-200 bg-white text-graphite-900 hover:border-graphite-400 hover:bg-graphite-50',
  'ghost-dark': 'border border-white/25 text-white hover:border-white/60 hover:bg-white/5',
  whatsapp: 'bg-whatsapp-700 text-white hover:bg-[#12713a] shadow-sm',
}

const buttonBase =
  'inline-flex min-h-11 items-center justify-center gap-2 rounded-[var(--radius-control)] px-5 py-2.5 font-semibold text-[0.95rem] transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-60'

export function buttonClass(variant: Variant = 'primary', className?: string) {
  return cx(buttonBase, variantClasses[variant], className)
}

export function ButtonLink({
  to,
  variant = 'primary',
  className,
  children,
}: {
  to: string
  variant?: Variant
  className?: string
  children: ReactNode
}) {
  return (
    <Link to={to} className={buttonClass(variant, className)}>
      {children}
    </Link>
  )
}

export function ExternalButton({
  variant = 'primary',
  className,
  children,
  ...props
}: ComponentProps<'a'> & { variant?: Variant }) {
  return (
    <a target="_blank" rel="noopener noreferrer" className={buttonClass(variant, className)} {...props}>
      {children}
    </a>
  )
}

export function Badge({ children, dark }: { children: ReactNode; dark?: boolean }) {
  return (
    <span
      className={cx(
        'inline-flex items-center rounded-[4px] px-2 py-0.5 font-display text-xs font-semibold tracking-wide',
        dark ? 'bg-white/10 text-white' : 'bg-graphite-100 text-graphite-700',
      )}
    >
      {children}
    </span>
  )
}
