'use client'

import Link from 'next/link'
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react'
import { useCarousel } from '@/hooks/use-carousel'
import { SectionHeading, Button } from './ui'

// Slide-width variants: `lg` = prominent (home services), `sm` = compact (articles).
const SIZES = {
  lg: 'flex-[0_0_85%] sm:flex-[0_0_56%] lg:flex-[0_0_40%]',
  sm: 'flex-[0_0_78%] sm:flex-[0_0_46%] lg:flex-[0_0_31%]',
} as const

// The one carousel used across the site (home articles/services, related lists).
// Owns the header (eyebrow/headline + "view all" + prev/next) and the Embla
// track; `renderItem` supplies each slide (and gets the drag-guard slideProps).
export default function Carousel<T>({
  items,
  getKey,
  renderItem,
  eyebrow,
  headline,
  subheadline,
  footerLabel,
  footerHref,
  size = 'sm',
  label = 'items',
}: {
  items: T[]
  getKey: (item: T) => string
  renderItem: (item: T, slideProps: Record<string, unknown>) => React.ReactNode
  eyebrow?: string
  headline?: string
  subheadline?: string
  footerLabel?: string
  footerHref?: string
  size?: keyof typeof SIZES
  label?: string
}) {
  const { emblaRef, prev, next, canPrev, canNext, slideProps } = useCarousel()
  const hasHeader = Boolean(eyebrow || headline || subheadline || footerLabel)

  return (
    <div>
      {hasHeader && (
        <div className="mb-2.5 lg:mb-4 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow={eyebrow}
            headline={headline}
            subheadline={subheadline}
            size={size === 'lg' ? 'lg' : 'md'}
            className="max-w-2xl space-y-2"
          />
          <div className="hidden shrink-0 items-center justify-between gap-3 md:flex">
            {footerLabel && footerHref && (
              <Link
                href={footerHref}
                className="inline-flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-wider text-amber-900 transition-colors hover:text-amber-950"
              >
                <span>{footerLabel}</span>
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            )}
            <div className="flex items-center gap-2">
              <Button
                onClick={prev}
                disabled={!canPrev}
                aria-label={`Previous ${label}`}
                variant="outline"
                size="icon"
                className="rounded-full"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <Button
                onClick={next}
                disabled={!canNext}
                aria-label={`Next ${label}`}
                variant="outline"
                size="icon"
                className="rounded-full"
              >
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}

      <div
        className="overflow-hidden cursor-grab select-none active:cursor-grabbing"
        ref={emblaRef}
      >
        <div className="flex gap-2.5 lg:gap-4 py-1">
          {items.map((item) => (
            <div key={getKey(item)} className={`min-w-0 ${SIZES[size]}`}>
              {renderItem(item, slideProps)}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
