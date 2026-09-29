import { Head } from 'vite-react-ssg'
import { site } from '../content/site'
import { absoluteUrl } from '../lib/schema'

interface SeoProps {
  title: string
  description: string
  path: string
  image?: string
  jsonLd?: object[]
  noindex?: boolean
}

export function Seo({ title, description, path, image = '/og-image.jpg', jsonLd = [], noindex }: SeoProps) {
  const fullTitle = path === '/' ? title : `${title} | ${site.name}`
  const url = absoluteUrl(path)
  // Social crawlers handle JPEG/PNG reliably; WebP falls back to the default card.
  const imageUrl = absoluteUrl(image.endsWith('.webp') ? '/og-image.jpg' : image)
  return (
    <Head>
      <html lang="pt-BR" />
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex" />}
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="pt_BR" />
      <meta property="og:site_name" content={site.name} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={imageUrl} />
      <meta name="twitter:card" content="summary_large_image" />
      {jsonLd.map((data, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(data)}
        </script>
      ))}
    </Head>
  )
}
