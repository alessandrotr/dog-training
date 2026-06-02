'use client';

import {ArrowUpRight} from 'lucide-react';
import {useHref} from '../../lib/navigation';
import {Eyebrow, Pill, Card, PersonByline, Text} from '../ui';
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
    <Card as="figure" padding="md" interactive className={cn('group relative flex flex-col shadow-sm', className)}>
      {/* 1. The dog / owner — the name is the stretched link to the full case study */}
      <PersonByline
        name={story.name}
        breed={story.dogBreed}
        imageUrl={story.imageUrl}
        href={href.caseStudy(story.slug)}
        stretched
        slideProps={slideProps}
      />

      {/* 2. The challenge */}
      {story.challenge && (
        <div className="mt-4">
          <Eyebrow>The challenge</Eyebrow>
          <Text size="sm" className="mt-1 font-semibold leading-snug text-stone-700">{story.challenge}</Text>
        </div>
      )}

      {/* The outcome — styled like the challenge */}
      {story.outcome && (
        <div className="mt-4">
          <Eyebrow>The outcome</Eyebrow>
          <Text size="sm" className="mt-1 font-semibold leading-snug text-stone-700">{story.outcome}</Text>
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
        <span className="hidden shrink-0 items-center gap-1 font-mono text-[11px] font-semibold uppercase tracking-wider text-amber-800 transition-transform duration-300 group-hover:translate-x-0.5 sm:inline-flex">
          Read story <ArrowUpRight className="h-3.5 w-3.5" />
        </span>
      </div>
    </Card>
  );
}
