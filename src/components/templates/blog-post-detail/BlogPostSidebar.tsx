'use client'

import Link from 'next/link'
import { Tag } from 'lucide-react'
import { useHref } from '@/lib/navigation'
import { Eyebrow } from '@/components/ui'
import Availability from '@/features/storyblok/bloks/Availability'
import type { BlogPost } from '@/types'

type TocItem = { id: string; text: string; depth: number }

// Sticky sidebar: table of contents (smooth-scroll), availability card, tags.
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
  return (
    <aside className="h-fit space-y-4 lg:sticky lg:top-(--nav-offset) lg:col-span-4 lg:transition-[top] lg:duration-300 lg:ease-out">
      {toc.length > 1 && (
        <div className="rounded-2xl border border-stone-200 bg-stone-50 p-6 text-left">
          <Eyebrow className="mb-4 block">Table of Contents</Eyebrow>
          <nav className="space-y-1 font-sans text-xs">
            {toc.map((item) => (
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
                className={`block border-l-2 py-1 leading-normal text-stone-600 transition-colors hover:border-amber-700 hover:text-amber-900 ${
                  item.depth === 3 ? 'border-stone-200 pl-5' : 'border-stone-300 pl-3 font-medium'
                }`}
              >
                {item.text}
              </a>
            ))}
          </nav>
        </div>
      )}

      {/* Trainer availability (global, synced from Site Config) */}
      <Availability />

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
    </aside>
  )
}
