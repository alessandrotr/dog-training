'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useHref } from '@/lib/navigation'
import { Avatar, Pill, Card, Heading, Text } from '@/components/ui'
import { cn } from '@/lib/utils'
import type { TestimonialItem, ServiceItem } from '@/types'

// The single case-study card — framed like an Instagram *story* for the dog:
// a full-bleed portrait photo with story progress bars + a ringed-avatar header
// up top, and the caption (challenge → outcome) + service tag overlaid at the
// bottom. The whole card opens the full story; the service tag links out.
export default function CaseStudyCard({
  story,
  service,
  className = '',
  slideProps,
}: {
  story: TestimonialItem
  service?: ServiceItem // the service this case study is about; omit to hide the tag
  className?: string
  slideProps?: Record<string, unknown> // drag-guard from useCarousel (card carousel)
}) {
  const href = useHref()
  const handle = `@${(story.dogBreed || story.name).toLowerCase().replace(/[^a-z0-9]+/g, '') || 'goodboy'}`

  return (
    <Card
      as="figure"
      padding="none"
      interactive
      className={cn('group relative aspect-4/5 overflow-hidden shadow-sm', className)}
    >
      {/* Full-bleed photo */}
      {story.imageUrl && (
        <Image
          src={story.imageUrl}
          alt={story.name}
          fill
          sizes="(max-width: 640px) 85vw, 320px"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          referrerPolicy="no-referrer"
        />
      )}
      {/* Scrims: subtle at top (bars/header), heather-plum at bottom (caption) */}
      <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-stone-950/45 via-transparent to-transparent" />
      <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-amber-950/95 via-amber-950/35 to-transparent" />

      {/* Header: ringed avatar + name + @handle */}
      <div className="absolute inset-x-3 top-3.5 flex items-center gap-2.5">
        <span className="rounded-full bg-linear-to-br from-amber-400 to-amber-700 p-0.5">
          <Avatar src={story.imageUrl} name={story.name} size="sm" className="size-9 border-2 border-white" />
        </span>
        <div className="min-w-0 leading-tight">
          <p className="truncate text-sm font-bold text-white drop-shadow-sm">{story.name}</p>
          <p className="truncate font-mono text-[10px] text-white/70">{handle}</p>
        </div>
      </div>

      {/* Whole-card stretched link → the full story */}
      <Link
        href={href.caseStudy(story.slug)}
        {...slideProps}
        aria-label={`Read ${story.name}'s story`}
        className="absolute inset-0 z-10"
      />

      {/* Caption overlay */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 space-y-2 p-4 text-left">
        {story.challenge && (
          <Heading level={3} size="card" tone="inverse" className="line-clamp-3 leading-snug">
            {story.challenge}
          </Heading>
        )}
        {story.outcome && (
          <Text size="sm" className="line-clamp-2 text-white/80">
            <span className="font-semibold text-emerald-300">Outcome — </span>
            {story.outcome}
          </Text>
        )}
        {service && (
          <Pill
            tone="solid"
            href={href.service(service.slug)}
            title={service.title}
            className="pointer-events-auto relative z-30 mt-1 max-w-full"
          >
            <span className="truncate">#{service.title}</span>
          </Pill>
        )}
      </div>
    </Card>
  )
}
