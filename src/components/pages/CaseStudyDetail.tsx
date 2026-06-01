'use client';

import Link from 'next/link';
import Image from 'next/image';
import {ArrowLeft, Sparkles, ArrowUpRight} from 'lucide-react';
import {useHref} from '../../lib/navigation';
import CaseStudyCard from '../cards/CaseStudyCard';
import Carousel from '../Carousel';
import {Section, Eyebrow, Button, PersonByline, Heading, Prose} from '../ui';
import type {TestimonialItem, ServiceItem} from '../../types';

// Full case-study page: the dog, the challenge, what was done, the outcome,
// and the service it belonged to. Mirrors the service/blog detail pattern.
export default function CaseStudyDetail({
  story,
  service,
  related,
  serviceById,
}: {
  story: TestimonialItem;
  service?: ServiceItem;
  related: TestimonialItem[];
  serviceById: Map<string, ServiceItem>;
}) {
  const href = useHref();
  const paragraphs = story.text.split('\n').map((p) => p.trim()).filter(Boolean);

  return (
    <article className="pb-8 text-left">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="mt-8 space-y-5">
          <PersonByline name={story.name} breed={story.dogBreed} imageUrl={story.imageUrl} size="lg" />

          {story.challenge && (
            <Heading level={1} size="title" className="leading-tight">
              {story.challenge}
            </Heading>
          )}
        </header>

        {/* Hero image */}
        {story.imageUrl && (
          <div className="relative mt-8 aspect-[16/9] w-full overflow-hidden rounded-3xl bg-stone-100 shadow-lg">
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
            <p className="mt-2 font-serif text-xl italic leading-relaxed text-amber-955">{story.outcome}</p>
          </div>
        )}

        {/* The service this belonged to */}
        {service && (
          <div className="mt-10 flex flex-col gap-3 rounded-2xl border border-stone-200 bg-white p-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <Eyebrow>This was part of</Eyebrow>
              <p className="mt-1 font-sans text-lg font-bold text-stone-900">{service.title}</p>
            </div>
            <Button render={<Link href={href.service(service.slug)} />} variant="cta" size="lg" className="w-fit rounded-full px-4">
              Explore the service
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover/button:translate-x-0.5 group-hover/button:-translate-y-0.5" />
            </Button>
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
              <CaseStudyCard story={r} service={serviceById.get(r.serviceId ?? '')} slideProps={slideProps} />
            )}
          />
        </Section>
      )}
    </article>
  );
}
