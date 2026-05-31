'use client';

import {useMemo, useState} from 'react';
import Link from 'next/link';
import {storyblokEditable} from '@storyblok/react';
import {ArrowLeft, ArrowRight, ArrowUpRight, Search, PawPrint} from 'lucide-react';
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
// `grid` = highlighted carousel of program cards (home); `list` = searchable,
// filterable grid (services page). Both share <ServiceCard>.
export default function ServicesGrid({blok}: {blok: ServicesGridBlok}) {
  const href = useHref();
  const {services, testimonials} = usePageData();
  const {emblaRef, prev, next, canPrev, canNext, slideProps} = useCarousel();
  const [query, setQuery] = useState('');
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

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter(
      (s) =>
        s.title.toLowerCase().includes(q) ||
        s.shortDescription.toLowerCase().includes(q) ||
        s.audience.toLowerCase().includes(q),
    );
  }, [items, query]);

  if (isList) {
    return (
      <section {...storyblokEditable(blok as any)} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-left">
        {/* Search (blog-style) */}
        <div className="mb-12 -mt-12 border-b border-stone-200 pb-8">
          <div className="relative w-full max-w-md">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-4 w-4 text-stone-400" />
            </div>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search programs, puppies, reactivity..."
              className="block w-full rounded-xl border border-stone-300 bg-white py-3 pl-10 pr-4 text-sm text-stone-900 placeholder-stone-400 focus:border-amber-900 focus:outline-none focus:ring-1 focus:ring-amber-900"
            />
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="mx-auto max-w-md space-y-4 rounded-2xl border-2 border-dashed border-stone-200 py-16 text-center">
            <PawPrint className="mx-auto h-10 w-10 text-stone-300" aria-hidden="true" />
            <h3 className="font-sans text-base font-bold text-stone-800">No programs found</h3>
            <p className="px-4 font-sans text-xs text-stone-500">
              Nothing matches your search. Try a different term.
            </p>
            <button
              onClick={() => setQuery('')}
              className="rounded-lg bg-stone-900 px-4 py-2 text-xs font-semibold tracking-wide text-white"
            >
              Clear search
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {filtered.map((svc) => (
              <ServiceCard key={svc.id} svc={svc} review={reviews.get(svc.id)} />
            ))}
          </div>
        )}
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
