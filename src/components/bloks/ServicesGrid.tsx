'use client';

import Link from 'next/link';
import {storyblokEditable} from '@storyblok/react';
import {ArrowLeft, ArrowRight, ArrowUpRight} from 'lucide-react';
import {useHref} from '../../lib/navigation';
import {useCarousel} from '../../lib/use-carousel';
import {usePageData} from '../PageDataProvider';
import ServiceCard from './ServiceCard';

interface ServicesGridBlok {
  _uid: string;
  component: string;
  eyebrow?: string;
  headline?: string;
  subheadline?: string;
  limit?: string | number;
  footer_label?: string;
  layout?: 'grid' | 'list';
}

// Data-bound: pulls the service stories prefetched by the page route.
// `grid` = highlighted carousel of program cards (home); `list` = a plain
// responsive grid of all programs (services page). Both share <ServiceCard>.
export default function ServicesGrid({blok}: {blok: ServicesGridBlok}) {
  const href = useHref();
  const {services, testimonials} = usePageData();
  const {emblaRef, prev, next, canPrev, canNext, slideProps} = useCarousel();
  const limit = Number(blok.limit) || services.length;
  const items = services.slice(0, limit);
  const isList = blok.layout === 'list';

  // Aggregate real review stats per service from testimonials tagged to it.
  const reviews = new Map<string, {avg: number; count: number}>();
  for (const svc of services) {
    const tagged = testimonials.filter((t) => t.serviceId === svc.id && t.rating > 0);
    if (tagged.length) {
      const avg = tagged.reduce((sum, t) => sum + t.rating, 0) / tagged.length;
      reviews.set(svc.id, {avg, count: tagged.length});
    }
  }

  if (isList) {
    return (
      <section {...storyblokEditable(blok as any)} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-left">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((svc) => (
            <ServiceCard key={svc.id} svc={svc} review={reviews.get(svc.id)} />
          ))}
        </div>
      </section>
    );
  }

  // Highlighted carousel (home)
  return (
    <section {...storyblokEditable(blok as any)} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
        <div className="max-w-2xl space-y-3 text-left">
          {blok.eyebrow && (
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-amber-700">{blok.eyebrow}</span>
          )}
          {blok.headline && (
            <h2 className="font-sans text-3xl font-extrabold tracking-tight text-amber-950 sm:text-4xl">{blok.headline}</h2>
          )}
          {blok.subheadline && (
            <p className="font-sans text-stone-500 text-base leading-relaxed">{blok.subheadline}</p>
          )}
        </div>
        <div className="flex items-center gap-3 shrink-0">
          {blok.footer_label && (
            <Link
              href={href.page('services')}
              className="inline-flex items-center space-x-1.5 font-mono text-xs font-bold tracking-wider text-amber-900 hover:text-amber-950 transition-colors"
            >
              <span>{blok.footer_label}</span>
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          )}
          <div className="flex items-center gap-2">
            <button onClick={prev} disabled={!canPrev} aria-label="Previous services" className="rounded-full border border-stone-300 bg-white p-2.5 text-stone-600 transition-colors hover:bg-stone-50 hover:text-stone-900 disabled:opacity-40 disabled:cursor-not-allowed">
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button onClick={next} disabled={!canNext} aria-label="Next services" className="rounded-full border border-stone-300 bg-white p-2.5 text-stone-600 transition-colors hover:bg-stone-50 hover:text-stone-900 disabled:opacity-40 disabled:cursor-not-allowed">
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="overflow-hidden cursor-grab active:cursor-grabbing select-none" ref={emblaRef}>
        <div className="flex gap-6 py-2">
          {items.map((svc) => (
            <ServiceCard
              key={svc.id}
              svc={svc}
              review={reviews.get(svc.id)}
              slideProps={slideProps}
              className="flex-[0_0_85%] sm:flex-[0_0_56%] lg:flex-[0_0_40%]"
            />
          ))}
        </div>
      </div>

    </section>
  );
}
