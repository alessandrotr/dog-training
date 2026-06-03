'use client'

import Carousel from '@/components/Carousel'
import CaseStudyCard from '@/components/cards/CaseStudyCard'
import { Section } from '@/components/ui'
import type { TestimonialItem, ServiceItem } from '@/types'

export default function CaseStudyRelated({
  related,
  serviceById,
}: {
  related: TestimonialItem[]
  serviceById: Map<string, ServiceItem>
}) {
  if (related.length === 0) return null
  return (
    <Section className="pt-12">
      <Carousel
        items={related}
        getKey={(r) => r.id}
        size="sm"
        label="case studies"
        headline="More case studies"
        renderItem={(r, slideProps) => (
          <CaseStudyCard
            story={r}
            service={serviceById.get(r.serviceId ?? '')}
            slideProps={slideProps}
          />
        )}
      />
    </Section>
  )
}
