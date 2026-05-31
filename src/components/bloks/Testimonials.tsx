'use client';

import {useState} from 'react';
import {storyblokEditable} from '@storyblok/react';
import {ArrowLeft, ArrowRight, MessageSquareQuote, Sparkles, ArrowUpRight} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import {useHref} from '../../lib/navigation';
import {usePageData} from '../PageDataProvider';
import CaseStudyCard from './CaseStudyCard';

interface TestimonialsBlok {
  _uid: string;
  component: string;
  footer_label?: string;
  layout?: 'carousel' | 'grid';
}

// Data-bound: pulls case-study stories from the page route.
// `carousel` = single rotating featured story (home); `grid` = full card grid.
export default function Testimonials({blok}: {blok: TestimonialsBlok}) {
  const href = useHref();
  const {testimonials, services} = usePageData();
  const [index, setIndex] = useState(0);

  // Resolve the service each case study is tagged to, so it can link back.
  const serviceById = new Map(services.map((s) => [s.id, s]));

  if (blok.layout === 'grid') {
    return (
      <section {...storyblokEditable(blok as any)} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-left">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {testimonials.map((tItem) => (
            <CaseStudyCard key={tItem.id} story={tItem} service={serviceById.get(tItem.serviceId ?? '')} />
          ))}
        </div>
      </section>
    );
  }

  // carousel — one featured case study at a time
  const active = testimonials[index];
  const activeService = active ? serviceById.get(active.serviceId ?? '') : undefined;
  const prev = () => setIndex((i) => (i === 0 ? testimonials.length - 1 : i - 1));
  const next = () => setIndex((i) => (i === testimonials.length - 1 ? 0 : i + 1));

  return (
    <section
      {...storyblokEditable(blok as any)}
      className="bg-stone-105 border-y border-stone-200/80 py-20 relative overflow-hidden"
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6 text-center">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-amber-150 mb-4 text-amber-900">
          <MessageSquareQuote className="h-6 w-6" />
        </div>

        {active && (
          <div className="min-h-[220px] flex flex-col justify-between max-w-2xl mx-auto space-y-6 pt-4">
            {active.challenge && (
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-stone-400">
                {active.challenge}
              </p>
            )}
            <blockquote className="font-serif text-xl sm:text-2xl font-normal text-amber-950 leading-relaxed italic">
              {active.text}
            </blockquote>

            {active.outcome && (
              <p className="mx-auto inline-flex max-w-xl items-center justify-center gap-1.5 rounded-full bg-amber-50 px-4 py-2 text-sm font-medium text-amber-900 ring-1 ring-amber-200/60">
                <Sparkles className="h-4 w-4 shrink-0 text-amber-700" />
                {active.outcome}
              </p>
            )}

            <div className="flex flex-col items-center space-y-2">
              <div className="flex items-center space-x-3.5">
                {active.imageUrl && (
                  <Image
                    src={active.imageUrl}
                    alt={active.name}
                    width={40}
                    height={40}
                    className="h-10 w-10 rounded-full object-cover border border-stone-200"
                    referrerPolicy="no-referrer"
                  />
                )}
                <div className="text-left font-sans">
                  <Link href={href.caseStudy(active.slug)} className="text-sm font-bold text-stone-900 leading-none transition-colors hover:text-amber-800">
                    {active.name}
                  </Link>
                  {active.dogBreed && <p className="text-xs text-stone-500 font-mono -mt-0.5">{active.dogBreed}</p>}
                </div>
              </div>
              {activeService && (
                <Link
                  href={href.service(activeService.slug)}
                  className="group/chip mt-1 inline-flex items-center gap-1.5 rounded-full bg-stone-100 px-3 py-1.5 font-sans text-xs font-semibold text-stone-700 ring-1 ring-stone-200 transition-colors hover:bg-stone-200/70 hover:text-stone-900"
                >
                  {activeService.title}
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/chip:translate-x-0.5 group-hover/chip:-translate-y-0.5" />
                </Link>
              )}
            </div>
          </div>
        )}

        {testimonials.length > 1 && (
          <div className="flex items-center justify-center space-x-4 mt-8">
            <button onClick={prev} className="rounded-full border border-stone-300 bg-white p-2.5 text-stone-600 hover:bg-stone-50 hover:text-stone-900 transition-colors focus:outline-none" aria-label="Previous case study">
              <ArrowLeft className="h-4 w-4" />
            </button>
            <span className="text-xs font-mono text-stone-400">{index + 1} of {testimonials.length}</span>
            <button onClick={next} className="rounded-full border border-stone-300 bg-white p-2.5 text-stone-600 hover:bg-stone-50 hover:text-stone-900 transition-colors focus:outline-none" aria-label="Next case study">
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        )}

        {blok.footer_label && (
          <div className="mt-8">
            <Link
              href={href.page('testimonials')}
              className="text-xs font-mono tracking-widest font-semibold text-stone-500 hover:text-amber-800 underline underline-offset-4 cursor-pointer"
            >
              {blok.footer_label}
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
