'use client';

import {useState} from 'react';
import {storyblokEditable} from '@storyblok/react';
import {ArrowLeft, ArrowRight, MessageSquareQuote, Sparkles, ArrowUpRight} from 'lucide-react';
import Link from 'next/link';
import {useHref} from '../../lib/navigation';
import {usePageData} from '../PageDataProvider';
import {mapById} from '../../lib/relations';
import Carousel from '../Carousel';
import Section from '../ui/section';
import Eyebrow from '../ui/eyebrow';
import Pill from '../ui/pill';
import Avatar from '../ui/avatar';
import {Button} from '../ui/button';
import CaseStudyCard from './CaseStudyCard';
import type {BlokBase} from '../../types';

interface TestimonialsBlok extends BlokBase {
  eyebrow?: string;
  headline?: string;
  subheadline?: string;
  footer_label?: string;
  layout?: 'carousel' | 'cards' | 'grid';
}

// Data-bound: pulls case-study stories from the page route.
// `carousel` = single rotating featured story (home); `grid` = full card grid.
export default function Testimonials({blok}: {blok: TestimonialsBlok}) {
  const href = useHref();
  const {testimonials, services} = usePageData();
  const [index, setIndex] = useState(0);

  // Resolve the service each case study is tagged to, so it can link back.
  const serviceById = mapById(services);

  if (blok.layout === 'grid') {
    return (
      <Section {...storyblokEditable(blok as any)} className="text-left">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {testimonials.map((tItem) => (
            <CaseStudyCard key={tItem.id} story={tItem} service={serviceById.get(tItem.serviceId ?? '')} />
          ))}
        </div>
      </Section>
    );
  }

  if (blok.layout === 'cards') {
    return (
      <Section {...storyblokEditable(blok as any)}>
        <Carousel
          items={testimonials}
          getKey={(t) => t.id}
          size="sm"
          label="case studies"
          eyebrow={blok.eyebrow}
          headline={blok.headline}
          subheadline={blok.subheadline}
          footerLabel={blok.footer_label}
          footerHref={href.page('testimonials')}
          renderItem={(t, slideProps) => (
            <CaseStudyCard story={t} service={serviceById.get(t.serviceId ?? '')} slideProps={slideProps} />
          )}
        />
      </Section>
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
              <Eyebrow>{active.challenge}</Eyebrow>
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
                <Avatar src={active.imageUrl} name={active.name} size="sm" />
                <div className="text-left font-sans">
                  <Link href={href.caseStudy(active.slug)} className="text-sm font-bold text-stone-900 leading-none transition-colors hover:text-amber-800">
                    {active.name}
                  </Link>
                  {active.dogBreed && <p className="text-xs text-stone-500 font-mono -mt-0.5">{active.dogBreed}</p>}
                </div>
              </div>
              {activeService && (
                <Pill tone="stone" href={href.service(activeService.slug)} className="group/chip mt-1">
                  {activeService.title}
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/chip:translate-x-0.5 group-hover/chip:-translate-y-0.5" />
                </Pill>
              )}
            </div>
          </div>
        )}

        {testimonials.length > 1 && (
          <div className="flex items-center justify-center space-x-4 mt-8">
            <Button onClick={prev} variant="outline" size="icon" className="rounded-full" aria-label="Previous case study">
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <span className="text-xs font-mono text-stone-400">{index + 1} of {testimonials.length}</span>
            <Button onClick={next} variant="outline" size="icon" className="rounded-full" aria-label="Next case study">
              <ArrowRight className="h-4 w-4" />
            </Button>
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
