import ServiceCard from '@/components/cards/ServiceCard'
import { Eyebrow } from '@/components/ui'
import CaseStudyLabel from './CaseStudyLabel'
import CaseStudyHeader from './CaseStudyHeader'
import CaseStudyStory from './CaseStudyStory'
import CaseStudyRelated from './CaseStudyRelated'
import type { TestimonialItem, ServiceItem } from '@/types'

export interface CaseStudyDetailProps {
  story: TestimonialItem
  service?: ServiceItem
  related: TestimonialItem[]
  serviceById: Map<string, ServiceItem>
}

export default function CaseStudyDetail({
  story,
  service,
  related,
  serviceById,
}: CaseStudyDetailProps) {
  return (
    <article className="relative overflow-hidden pb-8 text-left">
      <CaseStudyLabel />

      <div className="relative z-10 mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <CaseStudyHeader story={story} />
        <CaseStudyStory story={story} />

        {service && (
          <div className="mt-10">
            <Eyebrow className="mb-3 block">This was part of</Eyebrow>
            <ServiceCard svc={service} className="max-w-lg" />
          </div>
        )}
      </div>

      <CaseStudyRelated related={related} serviceById={serviceById} />
    </article>
  )
}
