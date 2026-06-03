import { useMemo } from 'react'
import {
  caseStudiesForService,
  caseStudyCountByService,
  guideCountByService,
} from '@/lib/relations'
import type { ServiceItem, TestimonialItem, BlogPost } from '@/types'

export interface ServiceDetailProps {
  service: ServiceItem
  testimonials: TestimonialItem[]
  related: ServiceItem[]
  posts: BlogPost[]
}

export interface ServiceDetailViewModel {
  caseStudies: TestimonialItem[] // case studies tagged to this service
  articles: BlogPost[] // blog posts related to this service
  relatedServices: ServiceItem[] // other programs to cross-sell
  caseStudyCounts: Map<string, number> // per-service social-proof counts (for the cross-sell cards)
  guideCounts: Map<string, number>
}

// All the data wrangling for the service page in one place, so the view
// components stay purely presentational. Memoized on the inputs.
export function useServiceDetail({
  service,
  testimonials,
  related,
  posts,
}: ServiceDetailProps): ServiceDetailViewModel {
  return useMemo(
    () => ({
      caseStudies: caseStudiesForService(testimonials, service.id),
      articles: posts.filter((p) => p.serviceIds?.includes(service.id)),
      relatedServices: related,
      caseStudyCounts: caseStudyCountByService(testimonials),
      guideCounts: guideCountByService(posts),
    }),
    [service.id, testimonials, related, posts],
  )
}
