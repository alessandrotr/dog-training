'use client';

import {useState} from 'react';
import {storyblokEditable} from '@storyblok/react';
import {Star, ArrowLeft, ArrowRight, MessageSquareQuote} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import {useHref} from '../../lib/navigation';
import {usePageData} from '../PageDataProvider';

interface TestimonialsBlok {
  _uid: string;
  component: string;
  footer_label?: string;
  layout?: 'carousel' | 'grid';
}

// Data-bound: pulls testimonial stories from the page route.
// `carousel` = single rotating quote (home); `grid` = full card grid.
export default function Testimonials({blok}: {blok: TestimonialsBlok}) {
  const href = useHref();
  const {testimonials} = usePageData();
  const [index, setIndex] = useState(0);

  if (blok.layout === 'grid') {
    return (
      <section {...storyblokEditable(blok as any)} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-left">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {testimonials.map((tItem) => (
            <div
              key={tItem.id}
              className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center space-x-0.5">
                  {[...Array(tItem.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-500 stroke-none" />
                  ))}
                </div>
                <blockquote className="font-serif text-base text-amber-955 leading-relaxed italic">
                  “{tItem.text}”
                </blockquote>
              </div>
              <div className="flex items-center space-x-3.5 border-t border-stone-100 pt-4">
                {tItem.imageUrl && (
                  <Image
                    src={tItem.imageUrl}
                    alt={tItem.name}
                    width={40}
                    height={40}
                    className="h-10 w-10 rounded-full object-cover border"
                    referrerPolicy="no-referrer"
                  />
                )}
                <div>
                  <p className="text-sm font-bold text-stone-900 leading-none">{tItem.name}</p>
                  <p className="text-[11px] text-stone-500 font-mono -mt-0.5">{tItem.dogBreed}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  // carousel
  const active = testimonials[index];
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
            <blockquote className="font-serif text-xl sm:text-2xl font-normal text-amber-950 leading-relaxed italic">
              “{active.text}”
            </blockquote>
            <div className="flex flex-col items-center space-y-2">
              <div className="flex items-center space-x-0.5">
                {[...Array(active.rating)].map((_, rIdx) => (
                  <Star key={rIdx} className="h-4 w-4 fill-amber-600 stroke-none" />
                ))}
              </div>
              <div className="flex items-center space-x-3.5 pt-1.5">
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
                  <p className="text-sm font-bold text-stone-900 leading-none">{active.name}</p>
                  <p className="text-xs text-stone-500 font-mono -mt-0.5">{active.dogBreed}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {testimonials.length > 1 && (
          <div className="flex items-center justify-center space-x-4 mt-8">
            <button onClick={prev} className="rounded-full border border-stone-300 bg-white p-2.5 text-stone-600 hover:bg-stone-50 hover:text-stone-900 transition-colors focus:outline-none" aria-label="Previous testimonial">
              <ArrowLeft className="h-4 w-4" />
            </button>
            <span className="text-xs font-mono text-stone-400">{index + 1} of {testimonials.length}</span>
            <button onClick={next} className="rounded-full border border-stone-300 bg-white p-2.5 text-stone-600 hover:bg-stone-50 hover:text-stone-900 transition-colors focus:outline-none" aria-label="Next testimonial">
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
