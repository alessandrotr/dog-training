'use client';

import {storyblokEditable} from '@storyblok/react';
import {ArrowUpRight} from 'lucide-react';
import {useNavigate, usePostNavigate} from '../../lib/navigation';
import {usePageData} from '../PageDataProvider';

interface BlogListBlok {
  _uid: string;
  component: string;
  eyebrow?: string;
  headline?: string;
  footer_label?: string;
  limit?: string | number;
}

// Data-bound: pulls blog_post stories from the page route.
export default function BlogList({blok}: {blok: BlogListBlok}) {
  const setCurrentPage = useNavigate();
  const goToPost = usePostNavigate();
  const {posts} = usePageData();
  const limit = Number(blok.limit) || posts.length;
  const items = posts.slice(0, limit);

  return (
    <section {...storyblokEditable(blok as any)} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
        <div className="space-y-2 text-left">
          {blok.eyebrow && (
            <span className="font-mono text-xs uppercase tracking-widest text-amber-700">{blok.eyebrow}</span>
          )}
          {blok.headline && (
            <h2 className="font-sans text-3xl font-extrabold tracking-tight text-amber-950">{blok.headline}</h2>
          )}
        </div>
        {blok.footer_label && (
          <button
            onClick={() => setCurrentPage('blog')}
            className="mt-4 md:mt-0 inline-flex items-center space-x-1.5 font-mono text-xs font-bold tracking-wider text-amber-900 hover:text-amber-950 transition-colors"
          >
            <span>{blok.footer_label}</span>
            <ArrowUpRight className="h-4 w-4" />
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {items.map((post) => (
          <article
            key={post.id}
            className="group flex flex-col md:flex-row overflow-hidden rounded-2xl border border-stone-200 bg-white p-4 shadow-sm transition-all hover:shadow-md cursor-pointer"
            onClick={() => goToPost(post.slug)}
          >
            <div className="md:w-1/3 relative h-48 md:h-full overflow-hidden rounded-xl bg-stone-150">
              {post.imageUrl && (
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              )}
            </div>
            <div className="md:w-2/3 p-4 flex flex-col justify-between text-left space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[10px] font-mono text-stone-400">
                  <span className="uppercase text-amber-750 font-bold">{post.category}</span>
                  <span>{post.publishDate}</span>
                </div>
                <h3 className="font-sans text-base font-bold text-stone-900 group-hover:text-amber-950 transition-colors leading-snug">
                  {post.title}
                </h3>
                <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed">{post.summary}</p>
              </div>
              <div className="flex items-center justify-between border-t border-stone-100 pt-3 text-[11px] font-mono">
                <span className="text-amber-900 font-semibold group-hover:underline">Read Article →</span>
                <span className="text-stone-400">{post.readingTime}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
