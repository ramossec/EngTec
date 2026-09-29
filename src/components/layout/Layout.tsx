import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { WhatsAppFab } from '../WhatsAppFab'
import { Footer } from './Footer'
import { Header } from './Header'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export function Layout() {
  return (
    <>
      <a
        href="#conteudo"
        className="sr-only z-[60] rounded bg-brand-700 px-4 py-2 font-semibold text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Pular para o conteúdo
      </a>
      <ScrollToTop />
      <Header />
      <main id="conteudo" tabIndex={-1} className="outline-none">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppFab />
    </>
  )
}
