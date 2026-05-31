'use client';

import Link from 'next/link';
import {storyblokEditable} from '@storyblok/react';
import {ArrowRight, ArrowLeft, CalendarRange, Check, Star, ShoppingBag} from 'lucide-react';
import {useHref} from '../../lib/navigation';
import {useCarousel} from '../../lib/use-carousel';
import {usePageData} from '../PageDataProvider';

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
      <section {...storyblokEditable(blok as any)} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16 text-left">
        <div className="max-w-3xl space-y-4">
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
        <div className="space-y-20">
          {items.map((svc, sIdx) => {
            const isEven = sIdx % 2 === 0;
            return (
              <div
                key={svc.id}
                className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center border-b border-stone-200/60 pb-16 last:border-b-0"
              >
                <div className={`lg:col-span-5 ${isEven ? 'lg:order-1' : 'lg:order-2'} relative`}>
                  <div className="relative mx-auto max-w-[400px] lg:max-w-none">
                    <div className="absolute -inset-1 rounded-3xl bg-amber-900/10 blur-xl"></div>
                    <div className="relative overflow-hidden rounded-3xl border-4 border-white bg-stone-100 shadow-xl aspect-video max-h-72">
                      {svc.imageUrl && (
                        <img
                          src={svc.imageUrl}
                          alt={svc.title}
                          className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                          referrerPolicy="no-referrer"
                        />
                      )}
                    </div>
                  </div>
                </div>

                <div className={`lg:col-span-7 ${isEven ? 'lg:order-2' : 'lg:order-1'} space-y-6 text-left`}>
                  <div className="flex flex-wrap gap-2">
                    <span className="inline-flex items-center rounded-md bg-stone-150 px-2.5 py-1 text-xs font-mono font-medium text-stone-800">
                      Target Audience: {svc.audience}
                    </span>
                    <span className="inline-flex items-center rounded-md bg-amber-50 px-2.5 py-1 text-xs font-mono font-bold text-amber-900 border border-amber-200/40">
                      Est. {svc.duration}
                    </span>
                  </div>

                  <h3 className="font-sans text-2xl font-bold tracking-tight text-stone-900 sm:text-3xl">{svc.title}</h3>

                  <p className="font-mono text-sm font-semibold text-amber-900 leading-none">
                    Hourly / Retainer Fee: {svc.price}
                  </p>

                  <p className="font-sans text-sm text-stone-500 leading-relaxed">{svc.longDescription}</p>

                  <div className="space-y-3 pt-2">
                    <h4 className="font-sans text-xs font-extrabold uppercase tracking-widest text-stone-400">Included in Program</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {svc.features.map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-start space-x-2 text-xs text-stone-600 leading-relaxed">
                          <Check className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 flex flex-wrap gap-4">
                    <Link
                      href={href.slug(svc.slug)}
                      className="group inline-flex items-center space-x-2 rounded-xl bg-amber-900 px-5 py-3 text-xs font-semibold tracking-wide text-white shadow-sm hover:bg-amber-950 hover:shadow"
                    >
                      <span>View Program</span>
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                    <Link
                      href={href.page('booking')}
                      className="inline-flex items-center space-x-2 rounded-xl border border-stone-300 bg-white px-5 py-3 text-xs font-semibold text-stone-700 hover:bg-stone-50"
                    >
                      <CalendarRange className="h-4 w-4" />
                      <span>Book Free Assessment</span>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
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
        <div className="flex items-center gap-2 shrink-0">
          <button onClick={prev} disabled={!canPrev} aria-label="Previous services" className="rounded-full border border-stone-300 bg-white p-2.5 text-stone-600 transition-colors hover:bg-stone-50 hover:text-stone-900 disabled:opacity-40 disabled:cursor-not-allowed">
            <ArrowLeft className="h-4 w-4" />
          </button>
          <button onClick={next} disabled={!canNext} aria-label="Next services" className="rounded-full border border-stone-300 bg-white p-2.5 text-stone-600 transition-colors hover:bg-stone-50 hover:text-stone-900 disabled:opacity-40 disabled:cursor-not-allowed">
            <ArrowRight className="h-4 w-4" />
          </button>
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

      {blok.footer_label && (
        <div className="mt-10 text-center">
          <Link
            href={href.page('services')}
            className="group inline-flex items-center space-x-2 font-mono text-xs font-bold tracking-wider text-amber-900 hover:text-amber-950 transition-colors"
          >
            <span>{blok.footer_label}</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      )}
    </section>
  );
}
