'use client';

import Link from 'next/link';
import {Quote, Sparkles, ArrowUpRight} from 'lucide-react';
import {useHref} from '../../lib/navigation';
import Eyebrow from '../ui/eyebrow';
import Pill from '../ui/pill';
import Avatar from '../ui/avatar';
import Card from '../ui/card';
import {cn} from '../../lib/utils';
import type {TestimonialItem, ServiceItem} from '../../types';

// The single case-study card used everywhere a client story is shown.
// Order: dog/owner → the challenge → the story → the outcome → the service.
export default function CaseStudyCard({
  story,
  service,
  className = '',
  slideProps,
}: {
  story: TestimonialItem;
  service?: ServiceItem; // the service this case study is about; omit to hide the link
  className?: string;
  slideProps?: Record<string, unknown>; // drag-guard from useCarousel (card carousel)
}) {
  const href = useHref();

  return (
    <Card as="figure" padding="md" interactive className={cn('group relative flex h-full flex-col shadow-sm', className)}>
      {/* 1. The dog / owner — the name is the stretched link to the full case study */}
      <figcaption className="flex items-center gap-3">
        <Avatar src={story.imageUrl} name={story.name} size="sm" />
        <div className="min-w-0">
          <Link
            href={href.caseStudy(story.slug)}
            {...slideProps}
            className="truncate text-sm font-bold leading-tight text-stone-900 transition-colors before:absolute before:inset-0 before:content-[''] group-hover:text-amber-900"
          >
            {story.name}
          </Link>
          {story.dogBreed && <p className="truncate font-mono text-[11px] text-stone-500">{story.dogBreed}</p>}
        </div>
      </figcaption>

      {/* 2. The challenge */}
      {story.challenge && (
        <div className="mt-4">
          <Eyebrow>The challenge</Eyebrow>
          <p className="mt-1 text-sm font-semibold leading-snug text-stone-700">{story.challenge}</p>
        </div>
      )}

      {/* 3. The story */}
      <Quote className="mt-4 h-5 w-5 shrink-0 fill-amber-200 text-amber-200" />
      <blockquote className="mt-2 flex-1 font-serif text-base italic leading-relaxed text-amber-955">
        {story.text}
      </blockquote>

      {/* 4. The outcome */}
      {story.outcome && (
        <div className="mt-4 rounded-xl bg-amber-50 p-3.5 ring-1 ring-amber-200/60">
          <Eyebrow tone="brand" className="flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5" /> The outcome
          </Eyebrow>
          <p className="mt-1 text-sm font-medium leading-snug text-amber-900">{story.outcome}</p>
        </div>
      )}

      {/* 5. The service + read-more affordance */}
      <div className="mt-5 flex items-end justify-between gap-5 border-t border-stone-100 pt-4">
        {service ? (
          <div className="flex min-w-0 flex-col gap-1.5">
            <Eyebrow>Service</Eyebrow>
            <Pill
              tone="stone"
              href={href.service(service.slug)}
              title={service.title}
              className="group/chip relative z-10 max-w-full"
            >
              <span className="truncate">{service.title}</span>
              <ArrowUpRight className="h-3.5 w-3.5 shrink-0 transition-transform duration-300 group-hover/chip:translate-x-0.5 group-hover/chip:-translate-y-0.5" />
            </Pill>
          </div>
        ) : (
          <span />
        )}
        <span className="inline-flex shrink-0 items-center gap-1 font-mono text-[11px] font-semibold uppercase tracking-wider text-amber-800 transition-transform duration-300 group-hover:translate-x-0.5">
          Read story <ArrowUpRight className="h-3.5 w-3.5" />
        </span>
      </div>
    </Card>
  );
}
