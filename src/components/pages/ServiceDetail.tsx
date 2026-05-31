'use client';

import Image from 'next/image';
import {Check, Plus, Sparkles, CalendarClock} from 'lucide-react';
import {useInquiryCart} from '../InquiryCartProvider';
import {useLeadDialog} from '../../stores/lead-dialog';
import Carousel from '../Carousel';
import ServiceCard from '../cards/ServiceCard';
import ArticleCard from '../cards/ArticleCard';
import CaseStudyCard from '../cards/CaseStudyCard';
import {caseStudyCountByService, guideCountByService, caseStudiesForService} from '../../lib/relations';
import Section from '../ui/section';
import Eyebrow from '../ui/eyebrow';
import {Button} from '../ui/button';
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

  // Per-service social-proof counts + this service's case studies / guides.
  const caseStudyCounts = caseStudyCountByService(testimonials);
  const guidesByService = guideCountByService(posts);
  const caseStudiesForSvc = caseStudiesForService(testimonials, service.id);
  const relatedArticles = posts.filter((p) => p.serviceIds?.includes(service.id));

  return (
    <article className="lg:py-8 text-left">
      <Section as="div">

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
              <Button
                type="button"
                variant="cta"
                size="xl"
                onClick={() =>
                  cart.toggle({
                    slug: service.slug,
                    title: service.title,
                    imageUrl: service.imageUrl,
                    shortDescription: service.shortDescription,
                    price: service.price,
                    audience: service.audience,
                  })
                }
                className={added ? 'bg-emerald-600 hover:bg-emerald-700' : ''}
              >
                {added ? <><Check className="h-4 w-4" /> Added to inquiry</> : <><Plus className="h-4 w-4" /> Add to inquiry</>}
              </Button>
              <Button type="button" variant="ctaOutline" size="xl" onClick={() => open('book')}>
                <CalendarClock className="h-4 w-4" /> Book a consult
              </Button>
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
                <Eyebrow className="mb-4 block">What&apos;s included</Eyebrow>
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
              renderItem={(svc, slideProps) => <ServiceCard svc={svc} caseStudies={caseStudyCounts.get(svc.id) ?? 0} guides={guidesByService.get(svc.id) ?? 0} slideProps={slideProps} />}
            />
          </div>
        )}
      </Section>
    </article>
  );
}
