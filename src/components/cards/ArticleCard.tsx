'use client';

import Link from 'next/link';
import Image from 'next/image';
import {ArrowRight, GraduationCap} from 'lucide-react';
import {useHref} from '../../lib/navigation';
import Card from '../ui/card';
import type {BlogPost} from '../../types';

// Shared article card used by every article carousel (home blog list + related
// articles). `slideProps` (from Carousel) guards drag-vs-click.
export default function ArticleCard({
  post,
  slideProps,
  categoryLabel,
  serviceTitle,
}: {
  post: BlogPost;
  slideProps?: Record<string, unknown>;
  categoryLabel?: (c: string) => string;
  serviceTitle?: string; // a related program → cross-sell pill
}) {
  const href = useHref();
  const cat = categoryLabel ? categoryLabel(post.category) : post.category;
  return (
    <Card
      as={Link}
      href={href.post(post.slug)}
      {...slideProps}
      interactive
      className="group flex h-full min-w-0 cursor-pointer flex-col overflow-hidden"
    >
      <div className="relative aspect-video overflow-hidden bg-stone-100">
        {post.imageUrl && (
          <Image
            src={post.imageUrl}
            alt={post.title}
            fill
            sizes="(max-width: 640px) 78vw, (max-width: 1024px) 46vw, 31vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
        )}
      </div>
      <div className="flex flex-1 flex-col p-5 text-left">
        {post.category && <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-amber-800">{cat}</span>}
        <h3 className="mt-1.5 line-clamp-2 font-sans text-base font-bold leading-snug text-stone-900 transition-colors group-hover:text-amber-950">
          {post.title}
        </h3>
        {post.summary && <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-stone-500">{post.summary}</p>}
        {serviceTitle && (
          <span className="mt-3 inline-flex w-fit items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 font-mono text-[10px] font-semibold text-amber-800">
            <GraduationCap className="h-3.5 w-3.5" /> {serviceTitle}
          </span>
        )}
        <div className="mt-auto flex items-center justify-between pt-4 font-mono text-[11px]">
          <span className="inline-flex items-center gap-1 font-bold uppercase tracking-wider text-amber-900">
            Read <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </span>
          {post.readingTime && <span className="text-stone-400">{post.readingTime}</span>}
        </div>
      </div>
    </Card>
  );
}
