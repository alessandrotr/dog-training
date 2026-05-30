'use client';

import {useCallback, useEffect, useRef, useState} from 'react';
import Link from 'next/link';
import useEmblaCarousel from 'embla-carousel-react';
import {storyblokEditable} from '@storyblok/react';
import {ArrowUpRight, ArrowLeft, ArrowRight} from 'lucide-react';
import {useHref} from '../../lib/navigation';
import {usePageData} from '../PageDataProvider';

interface BlogListBlok {
  _uid: string;
  component: string;
  eyebrow?: string;
  headline?: string;
  footer_label?: string;
  limit?: string | number;
}

// Data-bound: pulls blog_post stories from the page route. Rendered as an
// Embla carousel of article cards.
export default function BlogList({blok}: {blok: BlogListBlok}) {
  const href = useHref();
  const {posts} = usePageData();
  const limit = Number(blok.limit) || posts.length;
  const items = posts.slice(0, limit);

  const [emblaRef, emblaApi] = useEmblaCarousel({align: 'start', loop: false, dragFree: false});
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanPrev(emblaApi.canScrollPrev());
    setCanNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect).on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  const prev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const next = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  // Distinguish a click from a drag: only navigate if the pointer barely moved.
  const downX = useRef(0);

  return (
    <section {...storyblokEditable(blok as any)} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
        <div className="space-y-2 text-left">
          {blok.eyebrow && (
            <span className="font-mono text-xs uppercase tracking-widest text-amber-700">{blok.eyebrow}</span>
          )}
          {blok.headline && (
            <h2 className="font-sans text-3xl font-extrabold tracking-tight text-amber-950">{blok.headline}</h2>
          )}
        </div>
        <div className="flex items-center gap-4">
          {blok.footer_label && (
            <Link
              href={href.page('blog')}
              className="inline-flex items-center space-x-1.5 font-mono text-xs font-bold tracking-wider text-amber-900 hover:text-amber-950 transition-colors"
            >
              <span>{blok.footer_label}</span>
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          )}
          <div className="flex items-center gap-2">
            <button
              onClick={prev}
              disabled={!canPrev}
              aria-label="Previous articles"
              className="rounded-full border border-stone-300 bg-white p-2.5 text-stone-600 transition-colors hover:bg-stone-50 hover:text-stone-900 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button
              onClick={next}
              disabled={!canNext}
              aria-label="Next articles"
              className="rounded-full border border-stone-300 bg-white p-2.5 text-stone-600 transition-colors hover:bg-stone-50 hover:text-stone-900 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="overflow-hidden cursor-grab active:cursor-grabbing select-none" ref={emblaRef}>
        <div className="flex gap-6">
          {items.map((post) => (
            <Link
              key={post.id}
              href={href.post(post.slug)}
              onPointerDown={(e) => {
                downX.current = e.clientX;
              }}
              onClick={(e) => {
                // Suppress navigation when the pointer was dragged (carousel swipe).
                if (Math.abs(e.clientX - downX.current) > 8) e.preventDefault();
              }}
              className="group flex flex-[0_0_85%] sm:flex-[0_0_48%] lg:flex-[0_0_32%] min-w-0 cursor-pointer flex-col overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm transition-all hover:shadow-md"
            >
              <div className="relative h-48 overflow-hidden bg-stone-150">
                {post.imageUrl && (
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                )}
              </div>
              <div className="flex flex-1 flex-col justify-between p-5 text-left space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[10px] font-mono text-stone-400">
                    <span className="uppercase text-amber-750 font-bold">{post.category}</span>
                    <span>{post.publishDate}</span>
                  </div>
                  <h3 className="font-sans text-base font-bold text-stone-900 group-hover:text-amber-950 transition-colors leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-xs text-stone-500 line-clamp-3 leading-relaxed">{post.summary}</p>
                </div>
                <div className="flex items-center justify-between border-t border-stone-100 pt-3 text-[11px] font-mono">
                  <span className="text-amber-900 font-semibold group-hover:underline">Read Article →</span>
                  <span className="text-stone-400">{post.readingTime}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
