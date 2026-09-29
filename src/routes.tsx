import type { RouteRecord } from 'vite-react-ssg'
import { useParams } from 'react-router-dom'
import { Layout } from './components/layout/Layout'
import { categories, getCategory, getService, servicePath, servicesIn } from './content'
import { CategoryView } from './pages/Category'
import { Component as Home } from './pages/Home'
import { AboutPage, ClientsPage, ContactPage, ESocialPage, NotFoundPage, PrivacyPage } from './pages/other'
import { ServiceView } from './pages/Service'
import { Component as Services } from './pages/Services'

function CategoryRoute() {
  const { categoria } = useParams()
  const category = getCategory(categoria ?? '')
  return category && category.slug !== 'treinamentos' ? <CategoryView category={category} /> : <NotFoundPage />
}

function ServiceRoute({ inCategory }: { inCategory?: string }) {
  const params = useParams()
  const service = getService(params.servico ?? '')
  const expected = inCategory ?? params.categoria
  return service && service.category === expected ? <ServiceView service={service} /> : <NotFoundPage />
}

function TrainingsRoute() {
  return <CategoryView category={getCategory('treinamentos')!} />
}

const strip = (path: string) => path.replace(/^\//, '')

export const routes: RouteRecord[] = [
  {
    path: '/',
    element: <Layout />,
    entry: 'src/components/layout/Layout.tsx',
    children: [
      { index: true, element: <Home /> },
      { path: 'servicos', element: <Services /> },
      {
        path: 'servicos/:categoria',
        element: <CategoryRoute />,
        getStaticPaths: () =>
          categories.filter((c) => c.slug !== 'treinamentos').map((c) => `servicos/${c.slug}`),
      },
      {
        path: 'servicos/:categoria/:servico',
        element: <ServiceRoute />,
        getStaticPaths: () =>
          categories
            .filter((c) => c.slug !== 'treinamentos')
            .flatMap((c) => servicesIn(c.slug).map((s) => strip(servicePath(s)))),
      },
      { path: 'treinamentos', element: <TrainingsRoute /> },
      {
        path: 'treinamentos/:servico',
        element: <ServiceRoute inCategory="treinamentos" />,
        getStaticPaths: () => servicesIn('treinamentos').map((s) => strip(servicePath(s))),
      },
      { path: 'esocial', element: <ESocialPage /> },
      { path: 'sobre', element: <AboutPage /> },
      { path: 'clientes', element: <ClientsPage /> },
      { path: 'contato', element: <ContactPage /> },
      { path: 'politica-de-privacidade', element: <PrivacyPage /> },
      { path: '404', element: <NotFoundPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]
