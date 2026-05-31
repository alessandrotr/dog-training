'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BlogPost, BlogTaxonomies } from '../../types';
import { ArrowLeft, ArrowRight, Clock, CalendarDays, Share2, Bookmark, Check, CalendarRange, Sparkles, Tag } from 'lucide-react';
import { useHref } from '../../lib/navigation';
import { useCarousel } from '../../lib/use-carousel';
import Availability from '../bloks/Availability';

interface BlogPostTemplateProps {
  post: BlogPost;
  posts: BlogPost[];
  taxonomies: BlogTaxonomies;
}

export default function BlogPostTemplate({ post, posts, taxonomies }: BlogPostTemplateProps) {
  const [copiedLink, setCopiedLink] = useState(false);
  const href = useHref();
  const blogPosts = posts;
  const catLabel = (c: string) => taxonomies.categories[c] ?? c;
  const tagLabel = (t: string) => taxonomies.tags[t] ?? t;
  const {emblaRef, prev, next, canPrev, canNext, slideProps} = useCarousel();

  // Table of contents is built server-side (ids injected into the article HTML).
  const toc = post.tableOfContents ?? [];

  // Related posts: prefer same category, then fill with the rest.
  const others = blogPosts.filter((p) => p.slug !== post.slug);
  const relatedPosts = [
    ...others.filter((p) => p.category && p.category === post.category),
    ...others.filter((p) => !p.category || p.category !== post.category),
  ];

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <article className="py-8 text-left">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Heading Container */}
        <div className="max-w-3xl mx-auto space-y-4 mb-10 text-center md:text-left">
          <span className="inline-flex items-center rounded-full font-mono uppercase bg-amber-700 px-3 py-1 text-xs font-bold text-white border border-amber-200/45">
            {catLabel(post.category)}
          </span>
          <h1 className="font-sans text-3xl font-extrabold tracking-tight text-amber-955 sm:text-4xl md:text-5xl leading-tight">
            {post.title}
          </h1>
          
          <div className="flex flex-wrap items-center justify-center md:justify-between gap-4 text-xs font-mono text-stone-450 pt-4 border-t border-stone-100">
            <div className="flex items-center space-x-1">
              <CalendarDays className="h-3.5 w-3.5 text-amber-700" />
              <span>Published: {post.publishDate}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="h-3.5 w-3.5 text-amber-700" />
              <span>{post.readingTime}</span>
            </div>
          </div>
        </div>

        {/* Big visual header */}
        <div className="relative overflow-hidden rounded-3xl bg-stone-100 shadow-lg mb-12 max-h-[420px] aspect-[16/9] w-full">
          <Image
            src={post.imageUrl}
            alt={post.title}
            fill
            sizes="(max-width: 1024px) 100vw, 80vw"
            className="object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Main Body Split (Sidebar / Content) */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          
          {/* LEFT: Sidebar with Author & TOC */}
          <aside className="lg:col-span-4 space-y-8 lg:sticky lg:top-24 h-fit">
            
            {/* Table of Contents (auto-generated from the article headings) */}
            {toc.length > 1 && (
              <div className="rounded-2xl border border-stone-200 bg-stone-50 p-6 text-left">
                <h3 className="font-mono text-xs uppercase tracking-widest text-stone-450 mb-4 font-bold">Table of Contents</h3>
                <nav className="space-y-1 text-xs font-sans">
                  {toc.map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      onClick={(e) => {
                        const el = document.getElementById(item.id);
                        if (el) {
                          e.preventDefault();
                          el.scrollIntoView({behavior: 'smooth', block: 'start'});
                          history.replaceState(null, '', `#${item.id}`);
                        }
                      }}
                      className={`block border-l-2 py-1 leading-normal text-stone-600 transition-colors hover:border-amber-700 hover:text-amber-900 ${
                        item.depth === 3 ? 'border-stone-200 pl-5' : 'border-stone-300 pl-3 font-medium'
                      }`}
                    >
                      {item.text}
                    </a>
                  ))}
                </nav>
              </div>
            )}

            {/* Trainer availability (global, synced from Site Config) */}
            <Availability />


          </aside>

          {/* RIGHT: Document Text markdown-body typography */}
          <main className="lg:col-span-8">
            <div
              className="prose prose-stone max-w-none prose-headings:font-sans prose-headings:font-extrabold prose-headings:text-amber-955 prose-headings:scroll-mt-24 prose-p:leading-relaxed prose-li:my-1.5 prose-p:my-4 prose-p:text-stone-600 prose-li:text-stone-605"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Article tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="mt-12 border-t border-stone-200 pt-8">
                <h4 className="mb-3 flex items-center gap-1.5 font-mono text-xs font-semibold uppercase tracking-widest text-stone-400">
                  <Tag className="h-3.5 w-3.5 text-amber-700" /> Topics
                </h4>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Link
                      key={tag}
                      href={`${href.page('blog')}?tag=${encodeURIComponent(tag)}`}
                      className="inline-flex items-center rounded-full border border-amber-200/60 bg-amber-50 px-3 py-1 font-mono text-xs font-bold uppercase tracking-wide text-amber-800 transition-colors hover:border-amber-300 hover:bg-amber-100"
                    >
                      {tagLabel(tag)}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </main>

        </div>

        {/* RELATED ARTICLES — carousel (mirrors the home articles carousel) */}
        {relatedPosts.length > 0 && (
          <div className="pt-12 lg:pt-8">
            <div className="mb-8 flex items-end justify-between gap-4">
              <h3 className="font-sans text-2xl font-extrabold text-amber-955">Related Articles</h3>
              <div className="flex items-center gap-2 shrink-0">
                <button onClick={prev} disabled={!canPrev} aria-label="Previous articles" className="rounded-full border border-stone-300 bg-white p-2 text-stone-600 transition-colors hover:bg-stone-50 hover:text-stone-900 disabled:opacity-40 disabled:cursor-not-allowed">
                  <ArrowLeft className="h-3.5 w-3.5" />
                </button>
                <button onClick={next} disabled={!canNext} aria-label="Next articles" className="rounded-full border border-stone-300 bg-white p-2 text-stone-600 transition-colors hover:bg-stone-50 hover:text-stone-900 disabled:opacity-40 disabled:cursor-not-allowed">
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            <div className="overflow-hidden cursor-grab active:cursor-grabbing select-none" ref={emblaRef}>
              <div className="flex gap-6 py-1">
                {relatedPosts.map((rel) => (
                  <Link
                    key={rel.id}
                    href={href.post(rel.slug)}
                    {...slideProps}
                    className="group flex flex-[0_0_80%] sm:flex-[0_0_46%] lg:flex-[0_0_31%] min-w-0 cursor-pointer flex-col overflow-hidden rounded-2xl border border-stone-200 bg-white transition-colors hover:border-stone-300"
                  >
                    <div className="relative aspect-video overflow-hidden bg-stone-100">
                      <Image
                        src={rel.imageUrl}
                        alt={rel.title}
                        fill
                        sizes="(max-width: 640px) 80vw, (max-width: 1024px) 46vw, 31vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-5 text-left">
                      {rel.category && (
                        <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-amber-800">{catLabel(rel.category)}</span>
                      )}
                      <h4 className="mt-1.5 font-sans text-base font-bold leading-snug text-stone-900 group-hover:text-amber-950 transition-colors line-clamp-2">
                        {rel.title}
                      </h4>
                      <span className="mt-auto inline-flex items-center gap-1.5 pt-4 font-mono text-[11px] font-bold uppercase tracking-wider text-amber-900">
                        Read Study
                        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>
    </article>
  );
}
