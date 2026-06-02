'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, GraduationCap } from 'lucide-react'
import { useHref } from '@/lib/navigation'
import { Card, CardStat, Heading, Text } from '@/components/ui'
import type { BlogPost } from '@/types'

// Shared article card used by every article carousel (home blog list + related
// articles). `slideProps` (from Carousel) guards drag-vs-click.
export default function ArticleCard({
  post,
  slideProps,
  categoryLabel,
}: {
  post: BlogPost
  slideProps?: Record<string, unknown>
  categoryLabel?: (c: string) => string
}) {
  const href = useHref()
  const cat = categoryLabel ? categoryLabel(post.category) : post.category
  const serviceCount = post.serviceIds?.length ?? 0
  return (
    <Card
      as={Link}
      href={href.post(post.slug)}
      {...slideProps}
      interactive
      className="group flex h-full min-w-0 cursor-pointer flex-col overflow-hidden"
    >
      <div className="relative aspect-video overflow-hidden bg-stone-100">
        {post.imageUrl && (
          <Image
            src={post.imageUrl}
            alt={post.title}
            fill
            sizes="(max-width: 640px) 78vw, (max-width: 1024px) 46vw, 31vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
        )}
      </div>
      <div className="flex flex-1 flex-col p-5 text-left">
        {/* Meta row — category + related-services count (mirrors ServiceCard) */}
        {(post.category || serviceCount > 0) && (
          <div className="flex items-center gap-3 font-mono text-[11px]">
            {post.category && (
              <span className="font-bold uppercase tracking-wider text-amber-800">{cat}</span>
            )}
            {serviceCount > 0 && (
              <CardStat
                icon={GraduationCap}
                count={serviceCount}
                singular="service"
                className="ml-auto"
              />
            )}
          </div>
        )}
        <Heading
          level={3}
          size="cardSm"
          className="mt-2.5 line-clamp-2 transition-colors group-hover:text-amber-950"
        >
          {post.title}
        </Heading>
        {post.summary && (
          <Text size="xs" className="mt-1.5 line-clamp-2">
            {post.summary}
          </Text>
        )}
        <div className="mt-auto flex items-center justify-between pt-4 font-mono text-[11px]">
          <span className="inline-flex items-center gap-1 font-bold uppercase tracking-wider text-amber-900">
            Read{' '}
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </span>
          {post.readingTime && <span className="text-stone-400">{post.readingTime}</span>}
        </div>
      </div>
    </Card>
  )
}
