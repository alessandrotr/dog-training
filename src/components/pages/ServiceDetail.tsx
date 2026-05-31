'use client';

import Image from 'next/image';
import {Check, Plus, Sparkles, CalendarClock} from 'lucide-react';
import {useInquiryCart} from '../InquiryCartProvider';
import {useLeadDialog} from '../../stores/lead-dialog';
import Carousel from '../Carousel';
import ServiceCard from '../bloks/ServiceCard';
import ArticleCard from '../bloks/ArticleCard';
import CaseStudyCard from '../bloks/CaseStudyCard';
import type {ServiceItem, TestimonialItem, BlogPost} from '../../types';

// One shared, data-driven template for every service (mirrors the blog article
// pattern). Renders from the `service` entry — no bespoke per-service pages.
export default function ServiceDetail({
  service,
  testimonials,
  related,
  posts,
}: {
  service: ServiceItem;
  testimonials: TestimonialItem[];
  related: ServiceItem[];
  posts: BlogPost[];
}) {
  const cart = useInquiryCart();
  const {open} = useLeadDialog();

  const added = cart.has(service.slug);

  // Per-service review stats (avg + count) from all tagged testimonials, so the
  // related-services carousel shows real ratings too — same as ServicesGrid.
  const reviewStats = new Map<string, {avg: number; count: number}>();
  for (const id of new Set(testimonials.map((t) => t.serviceId).filter(Boolean) as string[])) {
    const tagged = testimonials.filter((t) => t.serviceId === id && t.rating > 0);
    if (tagged.length) reviewStats.set(id, {avg: tagged.reduce((s, t) => s + t.rating, 0) / tagged.length, count: tagged.length});
  }

  // Case studies tagged to this service.
  const caseStudiesForSvc = testimonials.filter((t) => t.serviceId === service.id);

  // Article ↔ service relations.
  const relatedArticles = posts.filter((p) => p.serviceIds?.includes(service.id));
  const guidesByService = new Map<string, number>();
  for (const p of posts) for (const id of p.serviceIds ?? []) guidesByService.set(id, (guidesByService.get(id) ?? 0) + 1);

  return (
    <article className="lg:py-8 text-left">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Hero */}
        <div className="mt-6 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center">
          <div className="space-y-5">
            {service.audience && (
              <span className="inline-flex items-center rounded-full font-mono text-xs font-bold uppercase tracking-wide">
                {service.audience}
              </span>
            )}
            <h1 className="font-sans text-4xl font-extrabold leading-tight tracking-tight text-amber-950 sm:text-5xl">
              {service.title}
            </h1>
            <p className="max-w-xl text-lg leading-relaxed text-stone-600">{service.shortDescription}</p>

            {caseStudiesForSvc.length > 0 && (
              <div className="flex flex-wrap items-center gap-4 font-mono text-xs text-amber-800">
                <span className="inline-flex items-center gap-1.5">
                  <Sparkles className="h-4 w-4" />
                  {caseStudiesForSvc.length} case stud{caseStudiesForSvc.length > 1 ? 'ies' : 'y'}
                </span>
              </div>
            )}

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
              <div className="lg:col-span-7">
            {service.longDescription && (
              <p className="whitespace-pre-line text-base leading-relaxed text-stone-600">{service.longDescription}</p>
            )}
          </div>
        </div>

        {/* Case studies for this service */}
        {caseStudiesForSvc.length > 0 && (
          <div className="mt-20 border-t border-stone-200 pt-12">
            <h2 className="mb-8 font-sans text-2xl font-extrabold text-amber-955">Case studies from this service</h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {caseStudiesForSvc.slice(0, 6).map((r) => (
                <CaseStudyCard key={r.id} story={r} />
              ))}
            </div>
          </div>
        )}

        {/* Related articles for this program */}
        {relatedArticles.length > 0 && (
          <div className="mt-20 border-t border-stone-200 pt-12">
            <Carousel
              items={relatedArticles}
              getKey={(p) => p.id}
              size="sm"
              label="articles"
              headline="Guides for this program"
              renderItem={(post, slideProps) => <ArticleCard post={post} slideProps={slideProps} />}
            />
          </div>
        )}

        {/* Related programs — shared Carousel */}
        {related.length > 0 && (
          <div className="mt-20 border-t border-stone-200 pt-12">
            <Carousel
              items={related}
              getKey={(s) => s.id}
              size="lg"
              label="programs"
              headline="Other services"
              renderItem={(svc, slideProps) => <ServiceCard svc={svc} caseStudies={reviewStats.get(svc.id)?.count ?? 0} guides={guidesByService.get(svc.id) ?? 0} slideProps={slideProps} />}
            />
          </div>
        )}
      </div>
    </article>
  );
}
