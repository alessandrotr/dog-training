'use client';

import Link from 'next/link';
import Image from 'next/image';
import {Check, Plus, Star, ArrowLeft, ArrowRight, CalendarRange, CalendarClock, MessageSquareQuote} from 'lucide-react';
import {useHref} from '../../lib/navigation';
import {useCarousel} from '../../lib/use-carousel';
import {useInquiryCart} from '../InquiryCartProvider';
import {useLeadDialog} from '../../stores/lead-dialog';
import ServiceCard from '../bloks/ServiceCard';
import type {ServiceItem, TestimonialItem} from '../../types';

// One shared, data-driven template for every service (mirrors the blog article
// pattern). Renders from the `service` entry — no bespoke per-service pages.
export default function ServiceDetail({
  service,
  reviews,
  related,
}: {
  service: ServiceItem;
  reviews: TestimonialItem[];
  related: ServiceItem[];
}) {
  const href = useHref();
  const cart = useInquiryCart();
  const {open} = useLeadDialog();
  const {emblaRef, prev, next, canPrev, canNext, slideProps} = useCarousel();

  const added = cart.has(service.slug);
  const reviewsForSvc = reviews.filter((r) => r.rating > 0);
  const avg = reviewsForSvc.length ? reviewsForSvc.reduce((s, r) => s + r.rating, 0) / reviewsForSvc.length : 0;

  return (
    <article className="py-8 text-left">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Back link */}
        <Link href={href.page('services')} className="inline-flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-wider text-stone-500 transition-colors hover:text-amber-900">
          <ArrowLeft className="h-3.5 w-3.5" /> All Programs
        </Link>

        {/* Hero */}
        <div className="mt-6 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center">
          <div className="space-y-5">
            {service.audience && (
              <span className="inline-flex items-center rounded-full bg-amber-700 px-3 py-1 font-mono text-xs font-bold uppercase tracking-wide text-white">
                {service.audience}
              </span>
            )}
            <h1 className="font-sans text-4xl font-extrabold leading-tight tracking-tight text-amber-950 sm:text-5xl">
              {service.title}
            </h1>
            <p className="max-w-xl text-lg leading-relaxed text-stone-600">{service.shortDescription}</p>

            <div className="flex flex-wrap items-center gap-4 font-mono text-xs text-stone-500">
              {service.duration && (
                <span className="inline-flex items-center gap-1.5"><CalendarRange className="h-4 w-4 text-amber-700" />{service.duration}</span>
              )}
              {reviewsForSvc.length > 0 && (
                <span className="inline-flex items-center gap-1.5">
                  <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                  {avg.toFixed(1)} ({reviewsForSvc.length})
                </span>
              )}
            </div>

            {service.price && (
              <div className="leading-none">
                <span className="block font-mono text-[10px] uppercase tracking-wider text-stone-400">Starting at</span>
                <span className="mt-1 block font-sans text-3xl font-extrabold text-amber-950">{service.price}</span>
              </div>
            )}

            <div className="flex flex-col gap-3 pt-2 sm:flex-row">
              <button
                type="button"
                onClick={() => cart.toggle({slug: service.slug, title: service.title})}
                className={`inline-flex items-center justify-center gap-2 rounded-xl px-6 py-4 text-xs font-mono font-bold uppercase tracking-wider shadow-sm transition ${
                  added ? 'bg-emerald-600 text-white hover:bg-emerald-700' : 'bg-amber-900 text-white hover:bg-amber-950'
                }`}
              >
                {added ? <><Check className="h-4 w-4" /> Added to inquiry</> : <><Plus className="h-4 w-4" /> Add to inquiry</>}
              </button>
              <button
                type="button"
                onClick={() => open('book')}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-stone-300 bg-white px-6 py-4 text-xs font-mono font-bold uppercase tracking-wider text-stone-700 transition hover:bg-stone-50"
              >
                <CalendarClock className="h-4 w-4" /> Book a consult
              </button>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-lg">
            <div className="absolute -inset-1 rounded-3xl bg-amber-700/10 blur-xl" />
            <div className="relative aspect-4/3 overflow-hidden rounded-3xl border-8 border-white bg-stone-100 shadow-2xl">
              {service.imageUrl && (
                <Image src={service.imageUrl} alt={service.title} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" referrerPolicy="no-referrer" priority />
              )}
            </div>
          </div>
        </div>

        {/* Body: long description + features */}
        <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            {service.longDescription && (
              <p className="whitespace-pre-line text-base leading-relaxed text-stone-600">{service.longDescription}</p>
            )}
          </div>
          {service.features.length > 0 && (
            <aside className="lg:col-span-5">
              <div className="rounded-2xl border border-stone-200 bg-stone-50 p-6">
                <h2 className="mb-4 font-mono text-xs font-bold uppercase tracking-widest text-stone-450">What&apos;s included</h2>
                <ul className="space-y-3">
                  {service.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm leading-relaxed text-stone-600">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          )}
        </div>

        {/* Reviews for this service */}
        {reviewsForSvc.length > 0 && (
          <div className="mt-20 border-t border-stone-200 pt-12">
            <h2 className="mb-8 font-sans text-2xl font-extrabold text-amber-955">What clients say</h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {reviewsForSvc.slice(0, 6).map((r) => (
                <figure key={r.id} className="rounded-2xl border border-stone-200 bg-white p-6">
                  <MessageSquareQuote className="h-5 w-5 text-amber-700" />
                  <div className="mt-3 flex">
                    {Array.from({length: 5}).map((_, i) => (
                      <Star key={i} className={`h-3.5 w-3.5 ${i < Math.round(r.rating) ? 'fill-amber-400 text-amber-400' : 'fill-stone-200 text-stone-200'}`} />
                    ))}
                  </div>
                  <blockquote className="mt-3 font-serif text-base italic leading-relaxed text-amber-955">“{r.text}”</blockquote>
                  <figcaption className="mt-4 text-sm font-bold text-stone-900">
                    {r.name}
                    {r.dogBreed && <span className="block font-mono text-[11px] font-normal text-stone-400">{r.dogBreed}</span>}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        )}

        {/* Related programs carousel */}
        {related.length > 0 && (
          <div className="mt-20 border-t border-stone-200 pt-12">
            <div className="mb-8 flex items-end justify-between gap-4">
              <h2 className="font-sans text-2xl font-extrabold text-amber-955">Other programs</h2>
              <div className="flex items-center gap-2 shrink-0">
                <button onClick={prev} disabled={!canPrev} aria-label="Previous" className="rounded-full border border-stone-300 bg-white p-2 text-stone-600 transition-colors hover:bg-stone-50 disabled:opacity-40 disabled:cursor-not-allowed">
                  <ArrowLeft className="h-3.5 w-3.5" />
                </button>
                <button onClick={next} disabled={!canNext} aria-label="Next" className="rounded-full border border-stone-300 bg-white p-2 text-stone-600 transition-colors hover:bg-stone-50 disabled:opacity-40 disabled:cursor-not-allowed">
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
            <div className="overflow-hidden cursor-grab active:cursor-grabbing select-none" ref={emblaRef}>
              <div className="flex gap-6 py-1">
                {related.map((svc) => (
                  <ServiceCard key={svc.id} svc={svc} slideProps={slideProps} className="flex-[0_0_80%] sm:flex-[0_0_46%] lg:flex-[0_0_31%]" />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
