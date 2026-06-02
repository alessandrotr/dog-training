'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'motion/react'
import { Sparkles, Plus, Check } from 'lucide-react'
import { useHref } from '@/lib/navigation'
import {useInquiryToggle} from '@/features/inquiry/components/InquiryCartProvider';import CaseStudyCard from '@/components/cards/CaseStudyCard'
import Carousel from '@/components/Carousel'
import { Section, Eyebrow, PersonByline, Heading, Text, Prose, Pill, PriceTag } from '@/components/ui'
import type { TestimonialItem, ServiceItem } from '@/types'

// Full case-study page: the dog, the challenge, what was done, the outcome,
// and the service it belonged to. Mirrors the service/blog detail pattern.
export default function CaseStudyDetail({
  story,
  service,
  related,
  serviceById,
}: {
  story: TestimonialItem
  service?: ServiceItem
  related: TestimonialItem[]
  serviceById: Map<string, ServiceItem>
}) {
  const href = useHref()
  const { added: inquiryAdded, toggle: toggleInquiry } = useInquiryToggle(service)
  // Parallax: the oversized label glides upward as the page scrolls down (and
  // back down when scrolling up) — counter to the page for an obvious drift.
  const { scrollY } = useScroll()
  const labelY = useTransform(scrollY, [0, 600], [0, -220])
  const paragraphs = story.text
    .split('\n')
    .map((p) => p.trim())
    .filter(Boolean)

  return (
    <article className="relative overflow-hidden pb-8 text-left">
      {/* Oversized page label, blended into the background behind the header. */}
      <motion.span
        aria-hidden="true"
        style={{ y: labelY }}
        className="pointer-events-none absolute top-[-0.12em] left-1/2 flex w-full -translate-x-1/2 select-none flex-col items-center bg-linear-to-b from-amber-700/12 via-amber-700/6 to-transparent bg-clip-text text-center font-sans text-[27vw] font-black uppercase leading-[0.82] tracking-tighter text-transparent sm:w-auto sm:flex-row sm:gap-[0.18em] sm:whitespace-nowrap sm:text-[20vw] sm:leading-none lg:text-[15rem]"
      >
        <span>Case</span>
        <span>Study</span>
      </motion.span>

      <div className="relative z-10 mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Header — clears the stacked label on mobile, tucks behind it on desktop */}
        <header className="mt-[27vw] sm:mt-[10vw] space-y-5 lg:mt-25">
          <PersonByline
            name={story.name}
            breed={story.dogBreed}
            imageUrl={story.imageUrl}
            size="lg"
          />

          {story.challenge && (
            <Heading level={1} size="title" className="leading-tight">
              {story.challenge}
            </Heading>
          )}
        </header>

        {/* Hero image */}
        {story.imageUrl && (
          <div className="relative mt-8 aspect-video w-full overflow-hidden rounded-3xl bg-stone-100 shadow-lg">
            <Image
              src={story.imageUrl}
              alt={story.name}
              fill
              sizes="(max-width: 1024px) 100vw, 768px"
              className="object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        )}

        {/* The story */}
        <div className="mt-10 space-y-4">
          <Eyebrow>What we did</Eyebrow>
          <Prose>
            {paragraphs.length ? paragraphs.map((p, i) => <p key={i}>{p}</p>) : <p>{story.text}</p>}
          </Prose>
        </div>

        {/* The outcome */}
        {story.outcome && (
          <div className="mt-10 rounded-2xl bg-amber-50 p-6 ring-1 ring-amber-200/60">
            <Eyebrow tone="brand" className="flex items-center gap-2">
              <Sparkles className="h-4 w-4" /> The outcome
            </Eyebrow>
            <p className="mt-2 font-serif text-xl italic leading-relaxed text-amber-950">
              {story.outcome}
            </p>
          </div>
        )}

        {/* The service this belonged to — full-width program CTA banner. Whole
            banner links to the service; the + toggles it in the inquiry. */}
        {service && (
          <div className="mt-10">
            <Eyebrow>This was part of</Eyebrow>
            <div className="group relative mt-3 flex flex-col overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm transition-colors hover:border-stone-300 sm:flex-row">
              {service.imageUrl && (
                <div className="relative aspect-16/10 shrink-0 overflow-hidden bg-stone-100 sm:aspect-auto sm:w-2/5">
                  <Image
                    src={service.imageUrl}
                    alt={service.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 320px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  {service.audience && (
                    <Pill
                      tone="solid"
                      className="absolute bottom-3 left-3 max-w-[calc(100%-1.5rem)] truncate font-mono text-[10px] uppercase tracking-wide shadow-sm backdrop-blur"
                    >
                      {service.audience}
                    </Pill>
                  )}
                </div>
              )}

              <div className="flex flex-1 flex-col gap-3 p-6">
                <div>
                  <Link
                    href={href.service(service.slug)}
                    className="before:absolute before:inset-0 before:content-['']"
                  >
                    <Heading
                      level={3}
                      size="card"
                      className="transition-colors group-hover:text-amber-900"
                    >
                      {service.title}
                    </Heading>
                  </Link>
                  {service.shortDescription && (
                    <Text className="mt-1.5 line-clamp-2">{service.shortDescription}</Text>
                  )}
                </div>

                <div className="mt-auto flex items-end justify-between gap-4">
                  <PriceTag price={service.price} />
                  <button
                    type="button"
                    aria-label={inquiryAdded ? 'Remove from inquiry' : 'Add to inquiry'}
                    onClick={toggleInquiry}
                    className={`relative z-10 inline-flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2 font-mono text-[11px] font-bold uppercase tracking-wider shadow-sm transition-colors active:scale-95 ${
                      inquiryAdded
                        ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                        : 'bg-amber-700 text-white hover:bg-amber-950'
                    }`}
                  >
                    {inquiryAdded ? (
                      <>
                        <Check className="h-3.5 w-3.5" /> Added
                      </>
                    ) : (
                      <>
                        <Plus className="h-3.5 w-3.5" /> Add to inquiry
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Related case studies */}
      {related.length > 0 && (
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
      )}
    </article>
  )
}
