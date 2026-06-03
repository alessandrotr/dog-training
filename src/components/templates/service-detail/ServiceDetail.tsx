'use client'

import { useIntersectionObserver } from 'usehooks-ts'
import { Section } from '@/components/ui'
import { useServiceDetail, type ServiceDetailProps } from './use-service-detail'
import ServiceStickyBar from './ServiceStickyBar'
import ServiceHero from './ServiceHero'
import ServiceOverview from './ServiceOverview'
import ServiceRelated from './ServiceRelated'

// One shared, data-driven template for every service. Pure composition: data
// comes from `useServiceDetail`, each section owns its own presentation.
export default function ServiceDetail(props: ServiceDetailProps) {
  const { service } = props
  const { caseStudies, articles, relatedServices, caseStudyCounts, guideCounts } =
    useServiceDetail(props)
  // The hero's visibility drives the sticky bar. Assume in-view initially (the
  // page loads at the top) so the bar starts hidden — no mount-time flash.
  const { ref: heroRef, isIntersecting: heroInView } = useIntersectionObserver({
    threshold: 0,
    initialIsIntersecting: true,
  })

  return (
    <article className="pb-8 text-left">
      <ServiceStickyBar service={service} heroInView={heroInView} />
      <ServiceHero service={service} heroRef={heroRef} />

      <Section as="div">
        <ServiceOverview service={service} />
        <ServiceRelated
          caseStudies={caseStudies}
          articles={articles}
          relatedServices={relatedServices}
          caseStudyCounts={caseStudyCounts}
          guideCounts={guideCounts}
        />
      </Section>
    </article>
  )
}
