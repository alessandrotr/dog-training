'use client';

import Link from 'next/link';
import {storyblokEditable} from '@storyblok/react';
import {ArrowUpRight, ArrowLeft, ArrowRight} from 'lucide-react';
import {useHref} from '../../lib/navigation';
import {useCarousel} from '../../lib/use-carousel';
import {usePageData} from '../PageDataProvider';

interface BlogListBlok {
  _uid: string;
  component: string;
  eyebrow?: string;
  headline?: string;
  footer_label?: string;
  limit?: string | number;
}

// Data-bound: pulls blog_post stories from the page route. Compact carousel of
// article cards (secondary to the highlighted services carousel).
export default function BlogList({blok}: {blok: BlogListBlok}) {
  const href = useHref();
  const {posts} = usePageData();
  const {emblaRef, prev, next, canPrev, canNext, slideProps} = useCarousel();
  const limit = Number(blok.limit) || posts.length;
  const items = posts.slice(0, limit);

  return (
    <section {...storyblokEditable(blok as any)} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div className="space-y-1.5 text-left">
          {blok.eyebrow && (
            <span className="font-mono text-[11px] uppercase tracking-widest text-amber-700">{blok.eyebrow}</span>
          )}
          {blok.headline && (
            <h2 className="font-sans text-2xl font-bold tracking-tight text-amber-950">{blok.headline}</h2>
          )}
        </div>
        <div className="flex items-center gap-3">
          {blok.footer_label && (
            <Link
              href={href.page('blog')}
              className="inline-flex items-center space-x-1.5 font-mono text-[11px] font-bold tracking-wider text-amber-900 hover:text-amber-950 transition-colors"
            >
              <span>{blok.footer_label}</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          )}
          <div className="flex items-center gap-2">
            <button onClick={prev} disabled={!canPrev} aria-label="Previous articles" className="rounded-full border border-stone-300 bg-white p-2 text-stone-600 transition-colors hover:bg-stone-50 hover:text-stone-900 disabled:opacity-40 disabled:cursor-not-allowed">
              <ArrowLeft className="h-3.5 w-3.5" />
            </button>
            <button onClick={next} disabled={!canNext} aria-label="Next articles" className="rounded-full border border-stone-300 bg-white p-2 text-stone-600 transition-colors hover:bg-stone-50 hover:text-stone-900 disabled:opacity-40 disabled:cursor-not-allowed">
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>

      <div className="overflow-hidden cursor-grab active:cursor-grabbing select-none" ref={emblaRef}>
        <div className="flex gap-4">
          {items.map((post) => (
            <Link
              key={post.id}
              href={href.post(post.slug)}
              {...slideProps}
              className="group flex flex-[0_0_64%] sm:flex-[0_0_34%] lg:flex-[0_0_23%] min-w-0 cursor-pointer flex-col overflow-hidden rounded-xl border border-stone-200 bg-white shadow-sm transition-all hover:shadow-md"
            >
              <div className="relative h-24 overflow-hidden bg-stone-150">
                {post.imageUrl && (
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                )}
              </div>
              <div className="flex flex-1 flex-col justify-between p-3 text-left space-y-2">
                <div className="space-y-1">
                  <span className="block text-[9px] font-mono font-bold uppercase text-amber-750">{post.category}</span>
                  <h3 className="font-sans text-xs font-bold text-stone-900 group-hover:text-amber-950 transition-colors leading-snug line-clamp-2">
                    {post.title}
                  </h3>
                </div>
                <div className="flex items-center justify-between border-t border-stone-100 pt-2 text-[9px] font-mono">
                  <span className="text-amber-900 font-semibold group-hover:underline">Read →</span>
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
