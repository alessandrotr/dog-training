'use client'

import Image from 'next/image'
import { Check, Plus, Sparkles, CalendarClock } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import {useInquiryToggle} from '@/features/inquiry/components/InquiryCartProvider';import {useBookingMode} from '@/features/availability/components/AvailabilityProvider';import {useLeadDialog} from '@/features/lead/stores/lead-dialog';import Carousel from '@/components/Carousel'
import ServiceCard from '@/components/cards/ServiceCard'
import ArticleCard from '@/components/cards/ArticleCard'
import CaseStudyCard from '@/components/cards/CaseStudyCard'
import {
  caseStudyCountByService,
  guideCountByService,
  caseStudiesForService,
} from '@/lib/relations'
import { Section, Eyebrow, CardStat, Button, PriceTag, Heading, Text } from '@/components/ui'
import type { ServiceItem, TestimonialItem, BlogPost } from '@/types'

// One shared, data-driven template for every service (mirrors the blog article
// pattern). Renders from the `service` entry — no bespoke per-service pages.
export default function ServiceDetail({
  service,
  testimonials,
  related,
  posts,
}: {
  service: ServiceItem
  testimonials: TestimonialItem[]
  related: ServiceItem[]
  posts: BlogPost[]
}) {
  const { t } = useTranslation()
  const { open } = useLeadDialog()
  const { available, mode } = useBookingMode()
  const { added, toggle } = useInquiryToggle(service)

  // Per-service social-proof counts + this service's case studies / guides.
  const caseStudyCounts = caseStudyCountByService(testimonials)
  const guidesByService = guideCountByService(posts)
  const caseStudiesForSvc = caseStudiesForService(testimonials, service.id)
  const relatedArticles = posts.filter((p) => p.serviceIds?.includes(service.id))

  return (
    <article className="lg:py-8 text-left">
      <Section as="div">
        {/* Hero */}
        <div className="mt-6 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center">
          <div className="space-y-5">
            {service.audience && <Eyebrow tone="brand">{service.audience}</Eyebrow>}
            <Heading level={1} size="display">
              {service.title}
            </Heading>
            <Text size="base" tone="default" className="max-w-xl text-lg">
              {service.shortDescription}
            </Text>

            {caseStudiesForSvc.length > 0 && (
              <CardStat
                icon={Sparkles}
                count={caseStudiesForSvc.length}
                singular="case study"
                plural="case studies"
              />
            )}

            <PriceTag price={service.price} size="lg" />

            <div className="flex flex-col gap-3 pt-2 sm:flex-row">
              <Button
                type="button"
                variant="cta"
                size="xl"
                onClick={toggle}
                className={added ? 'bg-emerald-600 hover:bg-emerald-700' : ''}
              >
                {added ? (
                  <>
                    <Check className="h-4 w-4" /> Added to inquiry
                  </>
                ) : (
                  <>
                    <Plus className="h-4 w-4" /> Add to inquiry
                  </>
                )}
              </Button>
              <Button
                type="button"
                variant="ctaOutline"
                size="xl"
                onClick={() => open(mode)}
              >
                <CalendarClock className="h-4 w-4" />{' '}
                {available ? 'Book a consult' : t('booking.waitlist')}
              </Button>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-lg">
            <div className="absolute -inset-1 rounded-3xl bg-amber-700/10 blur-xl" />
            <div className="relative aspect-4/3 overflow-hidden rounded-3xl border-8 border-white bg-stone-100 shadow-2xl">
              {service.imageUrl && (
                <Image
                  src={service.imageUrl}
                  alt={service.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                  referrerPolicy="no-referrer"
                  priority
                />
              )}
            </div>
          </div>
        </div>

        {/* Body: long description + features */}
        <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-12">
          {service.features.length > 0 && (
            <aside className="lg:col-span-5">
              <div className="rounded-2xl border border-stone-200 bg-stone-50 p-6">
                <Eyebrow className="mb-4 block">What&apos;s included</Eyebrow>
                <ul className="space-y-3">
                  {service.features.map((f, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2.5 text-sm leading-relaxed text-stone-600"
                    >
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          )}
          <div className="lg:col-span-7">
            {service.longDescription && (
              <Text size="base" tone="default" className="whitespace-pre-line">
                {service.longDescription}
              </Text>
            )}
          </div>
        </div>

        {/* Case studies for this service */}
        {caseStudiesForSvc.length > 0 && (
          <div className="pt-12 lg:pt-8">
            <Carousel
              items={caseStudiesForSvc}
              getKey={(s) => s.id}
              size="sm"
              label="case studies"
              headline="Case studies from this service"
              renderItem={(s, slideProps) => <CaseStudyCard story={s} slideProps={slideProps} />}
            />
          </div>
        )}

        {/* Related articles for this program */}
        {relatedArticles.length > 0 && (
          <div className="pt-12 lg:pt-8">
            <Carousel
              items={relatedArticles}
              getKey={(p) => p.id}
              size="sm"
              label="articles"
              headline="Guides for this program"
              renderItem={(post, slideProps) => <ArticleCard post={post} slideProps={slideProps} />}
            />
          </div>
        )}

        {/* Related programs — shared Carousel */}
        {related.length > 0 && (
          <div className="pt-12 lg:pt-8">
            <Carousel
              items={related}
              getKey={(s) => s.id}
              size="sm"
              label="programs"
              headline="Other services"
              renderItem={(svc, slideProps) => (
                <ServiceCard
                  svc={svc}
                  caseStudies={caseStudyCounts.get(svc.id) ?? 0}
                  guides={guidesByService.get(svc.id) ?? 0}
                  slideProps={slideProps}
                />
              )}
            />
          </div>
        )}
      </Section>
    </article>
  )
}
