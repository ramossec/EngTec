import { Plus } from 'lucide-react'
import type { Faq } from '../../content/types'

/** Native <details> accordion: accessible and works without JS. */
export function Accordion({ items }: { items: Faq[] }) {
  return (
    <div className="divide-y divide-graphite-200 border-y border-graphite-200">
      {items.map((item) => (
        <details key={item.q} className="group">
          <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 py-4 font-display text-lg font-semibold text-graphite-950 [&::-webkit-details-marker]:hidden">
            {item.q}
            <Plus
              className="size-5 shrink-0 text-brand-700 transition-transform duration-200 group-open:rotate-45"
              aria-hidden="true"
            />
          </summary>
          <p className="pb-5 text-graphite-600">{item.a}</p>
        </details>
      ))}
    </div>
  )
}
