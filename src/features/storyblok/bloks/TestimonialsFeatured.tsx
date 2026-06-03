'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, MessageSquareQuote, Sparkles, ArrowUpRight } from 'lucide-react'
import { useHref } from '@/lib/navigation'
import { Eyebrow, Pill, Button, PersonByline } from '@/components/ui'
import type { TestimonialItem, ServiceItem } from '@/types'

// One rotating featured case study (home). Stateful, so it lives apart from the
// declarative grid/cards layouts. `editable` carries storyblokEditable from the
// parent blok so click-to-edit still targets the section root.
export default function TestimonialsFeatured({
  testimonials,
  serviceById,
  footerLabel,
  editable,
}: {
  testimonials: TestimonialItem[]
  serviceById: Map<string, ServiceItem>
  footerLabel?: string
  editable?: Record<string, unknown>
}) {
  const href = useHref()
  const [index, setIndex] = useState(0)

  const active = testimonials[index]
  const activeService = active ? serviceById.get(active.serviceId ?? '') : undefined
  const prev = () => setIndex((i) => (i === 0 ? testimonials.length - 1 : i - 1))
  const next = () => setIndex((i) => (i === testimonials.length - 1 ? 0 : i + 1))

  return (
    <section
      {...editable}
      className="bg-stone-100 border-y border-stone-200/80 py-20 relative overflow-hidden"
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6 text-center">
        <div className="inline-flex size-12 items-center justify-center rounded-full bg-amber-100 mb-4 text-amber-900">
          <MessageSquareQuote className="size-6" />
        </div>

        {active && (
          <div className="min-h-[220px] flex flex-col justify-between max-w-2xl mx-auto space-y-6 pt-4">
            {active.challenge && <Eyebrow>{active.challenge}</Eyebrow>}
            <blockquote className="font-serif text-xl sm:text-2xl font-normal text-amber-950 leading-relaxed italic">
              {active.text}
            </blockquote>

            {active.outcome && (
              <p className="mx-auto inline-flex max-w-xl items-center justify-center gap-1.5 rounded-full bg-amber-50 px-4 py-2 text-sm font-medium text-amber-900 ring-1 ring-amber-200/60">
                <Sparkles className="size-4 shrink-0 text-amber-700" />
                {active.outcome}
              </p>
            )}

            <div className="flex flex-col items-center space-y-2">
              <PersonByline
                name={active.name}
                breed={active.dogBreed}
                imageUrl={active.imageUrl}
                href={href.caseStudy(active.slug)}
              />
              {activeService && (
                <Pill
                  tone="stone"
                  href={href.service(activeService.slug)}
                  className="group/chip mt-1"
                >
                  {activeService.title}
                  <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover/chip:translate-x-0.5 group-hover/chip:-translate-y-0.5" />
                </Pill>
              )}
            </div>
          </div>
        )}

        {testimonials.length > 1 && (
          <div className="flex items-center justify-center space-x-4 mt-8">
            <Button
              onClick={prev}
              variant="outline"
              size="icon"
              className="rounded-full"
              aria-label="Previous case study"
            >
              <ArrowLeft className="size-4" />
            </Button>
            <span className="text-xs font-mono text-stone-400">
              {index + 1} of {testimonials.length}
            </span>
            <Button
              onClick={next}
              variant="outline"
              size="icon"
              className="rounded-full"
              aria-label="Next case study"
            >
              <ArrowRight className="size-4" />
            </Button>
          </div>
        )}

        {footerLabel && (
          <div className="mt-8">
            <Link
              href={href.page('testimonials')}
              className="text-xs font-mono tracking-widest font-semibold text-stone-500 hover:text-amber-800 underline underline-offset-4 cursor-pointer"
            >
              {footerLabel}
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
