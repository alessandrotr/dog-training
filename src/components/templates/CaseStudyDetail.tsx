'use client'

import Image from 'next/image'
import { Sparkles } from 'lucide-react'
import { useParallax } from '@/hooks/use-parallax'
import CaseStudyCard from '@/components/cards/CaseStudyCard'
import ServiceCard from '@/components/cards/ServiceCard'
import Carousel from '@/components/Carousel'
import { Section, Eyebrow, PersonByline, Heading, Prose } from '@/components/ui'
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
  // Parallax: the oversized label glides upward as the page scrolls down (and
  // back down when scrolling up) — counter to the page for an obvious drift.
  const labelRef = useParallax<HTMLSpanElement>(0, -220, 600)
  const paragraphs = story.text
    .split('\n')
    .map((p) => p.trim())
    .filter(Boolean)

  return (
    <article className="relative overflow-hidden pb-8 text-left">
      {/* Oversized page label, blended into the background behind the header. */}
      <span
        ref={labelRef}
        aria-hidden="true"
        className="pointer-events-none absolute top-[-0.12em] left-1/2 flex w-full -translate-x-1/2 select-none flex-col items-center bg-linear-to-b from-amber-700/12 via-amber-700/6 to-transparent bg-clip-text text-center font-sans text-[27vw] font-black uppercase leading-[0.82] tracking-tighter text-transparent sm:w-auto sm:flex-row sm:gap-[0.18em] sm:whitespace-nowrap sm:text-[20vw] sm:leading-none lg:text-[15rem]"
      >
        <span>Case</span>
        <span>Study</span>
      </span>

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

        {/* The service this case study belonged to */}
        {service && (
          <div className="mt-10">
            <Eyebrow className="mb-3 block">This was part of</Eyebrow>
            <ServiceCard svc={service} className="max-w-lg" />
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
