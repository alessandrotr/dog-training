'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { Tag } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useHref } from '@/lib/navigation'
import { Eyebrow } from '@/components/ui'
import Availability from '@/features/storyblok/bloks/Availability'
import type { BlogPost } from '@/types'

type TocItem = { id: string; text: string; depth: number }

// Tracks which article heading is currently in the reading band (the ~20–30%
// strip below the navbar), so the ToC can highlight it as you scroll.
function useActiveHeading(ids: string[]): string {
  const [active, setActive] = useState('')
  // Stable key so the observer only re-binds when the id set actually changes.
  const key = ids.join('|')

  useEffect(() => {
    if (ids.length === 0) return
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible.length > 0) setActive(visible[0].target.id)
      },
      { rootMargin: '-20% 0px -70% 0px' },
    )
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[]
    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key])

  return active
}

// Sticky sidebar: table of contents (smooth-scroll + scroll-spy), availability
// card, tags.
export default function BlogPostSidebar({
  toc,
  tags,
  tagLabel,
}: {
  toc: TocItem[]
  tags: BlogPost['tags']
  tagLabel: (t: string) => string
}) {
  const href = useHref()
  const ids = useMemo(() => toc.map((t) => t.id), [toc])
  const activeId = useActiveHeading(ids)

  return (
    <aside className="h-fit space-y-4 lg:sticky lg:top-(--nav-offset) lg:col-span-4 lg:transition-[top] lg:duration-300 lg:ease-out">
      {toc.length > 1 && (
        <div className="rounded-2xl border border-stone-200 bg-stone-50 p-6 text-left">
          <Eyebrow className="mb-4 block">Table of Contents</Eyebrow>
          <nav className="space-y-1 font-sans text-xs">
            {toc.map((item) => {
              const isActive = activeId === item.id
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => {
                    const el = document.getElementById(item.id)
                    if (el) {
                      e.preventDefault()
                      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
                      history.replaceState(null, '', `#${item.id}`)
                    }
                  }}
                  aria-current={isActive ? 'location' : undefined}
                  className={cn(
                    'block border-l-2 py-1 leading-normal transition-colors',
                    item.depth === 3 ? 'pl-5' : 'pl-3 font-medium',
                    isActive
                      ? 'border-amber-700 text-amber-900'
                      : 'border-stone-200 text-stone-600 hover:border-amber-700 hover:text-amber-900',
                  )}
                >
                  {item.text}
                </a>
              )
            })}
          </nav>
        </div>
      )}

      {tags && tags.length > 0 && (
        <div className="rounded-2xl border border-stone-200 bg-stone-50 p-6 text-left">
          <Eyebrow className="mb-3 flex items-center gap-1.5">
            <Tag className="h-3.5 w-3.5 text-amber-700" /> Topics
          </Eyebrow>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Link
                key={tag}
                href={`${href.page('blog')}?tag=${encodeURIComponent(tag)}`}
                className="inline-flex items-center rounded-full border border-amber-200/60 bg-amber-50 px-3 py-1 font-mono text-xs font-bold uppercase tracking-wide text-amber-800 transition-colors hover:border-amber-300 hover:bg-amber-100"
              >
                {tagLabel(tag)}
              </Link>
            ))}
          </div>
        </div>
      )}

      <Availability compact />
    </aside>
  )
}
