'use client';

import Link from 'next/link';
import {storyblokEditable} from '@storyblok/react';
import {ArrowRight, ArrowLeft, ArrowUpRight, CalendarRange, Star, ShoppingBag} from 'lucide-react';
import {useHref} from '../../lib/navigation';
import {useCarousel} from '../../lib/use-carousel';
import {usePageData} from '../PageDataProvider';

interface ServicesGridBlok {
  _uid: string;
  component: string;
  limit?: string | number;
  footer_label?: string;
  layout?: 'grid' | 'list';
}

// Data-bound: pulls the service stories prefetched by the page route.
// `grid` = highlighted carousel of program cards (home); `list` = full
// alternating sections (services page).
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
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {items.map((svc) => {
            const review = reviews.get(svc.id);
            return (
              <Link
                key={svc.id}
                href={href.slug(svc.slug)}
                className="group cursor-pointer flex flex-col overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm transition-all hover:shadow-md hover:border-amber-900/20"
              >
                {/* Thumbnail banner */}
                <div className="relative overflow-hidden bg-stone-100 max-h-64 aspect-video">
                  {svc.imageUrl && (
                    <img
                      src={svc.imageUrl}
                      alt={svc.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                  )}
                  {svc.audience && (
                    <div className="absolute top-4 left-4 rounded-md bg-stone-900/90 text-[10px] font-mono px-2.5 py-1 uppercase tracking-wider text-stone-100">
                      {svc.audience}
                    </div>
                  )}
                  {svc.price && (
                    <div className="absolute top-4 right-4 rounded-md bg-amber-50/95 text-[11px] font-mono font-bold px-2.5 py-1 text-amber-900 shadow-sm backdrop-blur">
                      {svc.price}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 p-6 flex flex-col justify-between text-left space-y-4">
                  <div className="space-y-2">
                    {/* Rating row (0 stars if no reviews) */}
                    <div className="flex items-center gap-1.5">
                      <div className="flex">
                        {Array.from({length: 5}).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3.5 w-3.5 ${i < Math.round(review?.avg ?? 0) ? 'fill-amber-400 text-amber-400' : 'fill-stone-200 text-stone-200'}`}
                          />
                        ))}
                      </div>
                      <span className="font-mono text-[11px] text-stone-400">
                        {review ? `${review.avg.toFixed(1)} (${review.count})` : '(0)'}
                      </span>
                    </div>

                    <h3 className="font-sans text-lg font-bold text-stone-900 group-hover:text-amber-950 transition-colors leading-snug">
                      {svc.title}
                    </h3>
                    <p className="text-xs text-stone-550 leading-relaxed line-clamp-3">
                      {svc.shortDescription}
                    </p>
                  </div>

                  <div className="flex items-center justify-between border-t border-stone-100 pt-4 text-xs font-mono">
                    <span className="text-amber-905 font-bold flex items-center space-x-1">
                      <span>View Program</span>
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </span>
                    {svc.duration && (
                      <span className="inline-flex items-center gap-1 text-stone-400">
                        <CalendarRange className="h-3.5 w-3.5" />
                        {svc.duration}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    );
  }

  // Highlighted carousel (home)
  return (
    <section {...storyblokEditable(blok as any)} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-end mb-10 gap-3">
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
          {items.map((svc) => {
            const review = reviews.get(svc.id);
            return (
            <Link
              key={svc.id}
              href={href.slug(svc.slug)}
              {...slideProps}
              className="group flex flex-[0_0_85%] sm:flex-[0_0_56%] lg:flex-[0_0_40%] min-w-0 cursor-pointer flex-col overflow-hidden rounded-2xl border border-stone-200 bg-white transition-colors hover:border-stone-300"
            >
              {/* Product image */}
              <div className="relative aspect-4/3 overflow-hidden bg-stone-100">
                {svc.imageUrl && (
                  <img
                    src={svc.imageUrl}
                    alt={svc.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                )}
                {/* Category tag */}
                {svc.audience && (
                  <span className="absolute top-3 left-3 rounded-full bg-white/95 px-3 py-1 text-[10px] font-mono font-semibold uppercase tracking-wide text-stone-700 shadow-sm backdrop-blur">
                    {svc.audience}
                  </span>
                )}
              </div>

              {/* Product body */}
              <div className="flex flex-1 flex-col p-5 text-left">
                {/* Rating row — real reviews tagged to this service (0 stars if none) */}
                <div className="flex items-center gap-1.5">
                  <div className="flex">
                    {Array.from({length: 5}).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3.5 w-3.5 ${i < Math.round(review?.avg ?? 0) ? 'fill-amber-400 text-amber-400' : 'fill-stone-200 text-stone-200'}`}
                      />
                    ))}
                  </div>
                  <span className="font-mono text-[11px] text-stone-400">
                    {review ? `${review.avg.toFixed(1)} (${review.count})` : '(0)'}
                  </span>
                  {svc.duration && (
                    <span className="ml-auto inline-flex items-center gap-1 font-mono text-[11px] text-stone-400">
                      <CalendarRange className="h-3.5 w-3.5" />
                      {svc.duration}
                    </span>
                  )}
                </div>

                <h3 className="mt-2.5 font-sans text-lg font-bold leading-snug text-stone-900 group-hover:text-amber-900 transition-colors">
                  {svc.title}
                </h3>
                <p className="mt-1.5 text-sm text-stone-500 leading-relaxed line-clamp-2">{svc.shortDescription}</p>

                {/* Price + add-to-cart footer */}
                <div className="mt-auto flex items-end justify-between pt-5">
                  <div className="leading-none">
                    <span className="block font-mono text-[10px] uppercase tracking-wider text-stone-400">Starting at</span>
                    <span className="mt-1 block font-sans text-xl font-extrabold text-amber-950">{svc.price}</span>
                  </div>
                  <span className="inline-flex items-center gap-1.5 rounded-xl bg-amber-900 px-4 py-2.5 text-xs font-semibold text-white shadow-sm transition-all group-hover:bg-amber-950 group-hover:shadow">
                    <ShoppingBag className="h-4 w-4" />
                    View
                  </span>
                </div>
              </div>
            </Link>
            );
          })}
        </div>
      </div>

    </section>
  );
}
