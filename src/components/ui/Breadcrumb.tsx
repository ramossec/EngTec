import { ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export interface Crumb {
  name: string
  path: string
}

export function Breadcrumb({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Você está em" className="text-sm text-graphite-400">
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((item, i) => {
          const last = i === items.length - 1
          return (
            <li key={item.path} className="flex items-center gap-1.5">
              {last ? (
                <span aria-current="page" className="text-graphite-200">
                  {item.name}
                </span>
              ) : (
                <>
                  <Link to={item.path} className="hover:text-white">
                    {item.name}
                  </Link>
                  <ChevronRight className="size-3.5" aria-hidden="true" />
                </>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
