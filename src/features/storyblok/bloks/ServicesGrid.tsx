'use client'

import { storyblokEditable } from '@storyblok/react'
import { useHref } from '@/lib/navigation'
import { usePageData } from '@/features/storyblok/components/PageDataProvider'
import { caseStudyCountByService, guideCountByService } from '@/lib/relations'
import Carousel from '@/components/Carousel'
import { Section } from '@/components/ui'
import ServiceCard from '@/components/cards/ServiceCard'

import type { BlokBase } from '@/types'

interface ServicesGridBlok extends BlokBase {
  eyebrow?: string
  headline?: string
  subheadline?: string
  card_size?: 'lg' | 'sm'
  limit?: string | number
  footer_label?: string
  layout?: 'grid' | 'list'
}

// Data-bound: pulls the service stories prefetched by the page route.
// `grid` = highlighted Carousel of program cards (home); `list` = a plain
// responsive grid of all programs (services page). Both share <ServiceCard>.
export default function ServicesGrid({ blok }: { blok: ServicesGridBlok }) {
  const href = useHref()
  const { services, testimonials, posts } = usePageData()
  const limit = Number(blok.limit) || services.length
  const items = services.slice(0, limit)
  const isList = blok.layout === 'list'

  // Per-service social-proof counts (case studies + related guides).
  const caseStudies = caseStudyCountByService(testimonials)
  const guides = guideCountByService(posts)

  if (isList) {
    return (
      <Section {...storyblokEditable(blok as any)} className="text-left">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((svc) => (
            <ServiceCard
              key={svc.id}
              svc={svc}
              caseStudies={caseStudies.get(svc.id) ?? 0}
              guides={guides.get(svc.id) ?? 0}
            />
          ))}
        </div>
      </Section>
    )
  }

  // Highlighted carousel (home)
  return (
    <Section {...storyblokEditable(blok as any)}>
      <Carousel
        items={items}
        getKey={(s) => s.id}
        size="sm"
        label="programs"
        eyebrow={blok.eyebrow}
        headline={blok.headline}
        subheadline={blok.subheadline}
        footerLabel={blok.footer_label}
        footerHref={href.page('services')}
        renderItem={(svc, slideProps) => (
          <ServiceCard
            svc={svc}
            caseStudies={caseStudies.get(svc.id) ?? 0}
            guides={guides.get(svc.id) ?? 0}
            slideProps={slideProps}
          />
        )}
      />
    </Section>
  )
}
