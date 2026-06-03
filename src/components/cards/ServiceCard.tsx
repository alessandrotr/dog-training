'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Sparkles, ClipboardPlus, ClipboardCheck, BookOpen } from 'lucide-react'
import { useHref } from '@/lib/navigation'
import { useInquiryToggle } from '@/features/inquiry/components/InquiryCartProvider'
import { Card, PriceTag, Heading, Text } from '@/components/ui'
import { cn } from '@/lib/utils'
import type { ServiceItem } from '@/types'

// Shared ecommerce-style program card used by both the home carousel and the
// services-page grid. `slideProps` (from useCarousel) is spread onto the link
// in the carousel so drag gestures don't trigger navigation.
export default function ServiceCard({
  svc,
  caseStudies = 0,
  guides = 0,
  className = '',
  slideProps,
}: {
  svc: ServiceItem
  caseStudies?: number // case studies tagged to this service → social proof
  guides?: number // related-article count → "N guides" hint
  className?: string
  slideProps?: Record<string, unknown>
}) {
  const href = useHref()
  const { added, toggle } = useInquiryToggle(svc)
  return (
    <Card
      as={Link}
      href={href.service(svc.slug)}
      {...slideProps}
      interactive
      className={cn('group min-w-0 cursor-pointer flex flex-col overflow-hidden', className)}
    >
      {/* Image with overlaid meta */}
      <div className="relative aspect-4/3 overflow-hidden bg-stone-100">
        {svc.imageUrl && (
          <Image
            src={svc.imageUrl}
            alt={svc.title}
            fill
            sizes="(max-width: 640px) 85vw, (max-width: 1024px) 56vw, 40vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
        )}
        {/* Legibility scrim for the bottom title block (brand heather plum) */}
        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-amber-950/95 via-amber-950/55 to-transparent" />

        {/* Top-left: social-proof counters */}
        {(caseStudies > 0 || guides > 0) && (
          <div className="absolute left-3 top-3 flex items-center gap-1.5">
            {caseStudies > 0 && (
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-950/60 px-2 py-1 font-mono text-[10px] font-bold text-white backdrop-blur">
                <Sparkles className="size-3" /> {caseStudies}
              </span>
            )}
            {guides > 0 && (
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-950/60 px-2 py-1 font-mono text-[10px] font-bold text-white backdrop-blur">
                <BookOpen className="size-3" /> {guides}
              </span>
            )}
          </div>
        )}

        {/* Bottom-left: title + subtitle (over the image) */}
        <div className="absolute inset-x-0 bottom-0 p-4 text-left">
          {/* {svc.audience && (
            <span className="mb-1.5 inline-block max-w-full truncate rounded-full bg-white/15 px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wide text-white backdrop-blur">
              {svc.audience}
            </span>
          )} */}
          <Heading level={3} size="card" tone="inverse" className="leading-snug">
            {svc.title}
          </Heading>
          <Text tone="inverse" className="mt-1 line-clamp-2 text-stone-200">
            {svc.shortDescription}
          </Text>
        </div>
      </div>

      {/* Footer: price ↔ add-to-inquiry */}
      <div className="flex items-center justify-between gap-3 p-4">
        <PriceTag price={svc.price} />
        <button
          type="button"
          aria-label={added ? 'Remove from inquiry' : 'Add to inquiry'}
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            toggle()
          }}
          className={cn(
            'relative z-10 inline-flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2 font-mono text-[11px] font-bold uppercase tracking-wider shadow-sm transition-colors active:scale-95',
            added
              ? 'bg-emerald-600 text-white hover:bg-emerald-700'
              : 'bg-amber-700 text-white hover:bg-amber-950',
          )}
        >
          {added ? (
            <>
              <ClipboardCheck className="size-3.5" /> Added
            </>
          ) : (
            <>
              <ClipboardPlus className="size-3.5" /> Add
            </>
          )}
        </button>
      </div>
    </Card>
  )
}
