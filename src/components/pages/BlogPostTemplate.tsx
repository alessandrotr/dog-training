'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BlogPost, BlogTaxonomies, ServiceItem } from '../../types';
import { Clock, CalendarDays, Share2, Bookmark, Check, CalendarRange, Sparkles, Tag } from 'lucide-react';
import { useHref } from '../../lib/navigation';
import Carousel from '../Carousel';
import ArticleCard from '../bloks/ArticleCard';
import ServiceCard from '../bloks/ServiceCard';
import Availability from '../bloks/Availability';

interface BlogPostTemplateProps {
  post: BlogPost;
  posts: BlogPost[];
  taxonomies: BlogTaxonomies;
  services: ServiceItem[];
  serviceReviews: Record<string, {avg: number; count: number}>;
}

export default function BlogPostTemplate({ post, posts, taxonomies, services, serviceReviews }: BlogPostTemplateProps) {
  const [copiedLink, setCopiedLink] = useState(false);
  const href = useHref();
  const blogPosts = posts;
  const catLabel = (c: string) => taxonomies.categories[c] ?? c;
  const tagLabel = (t: string) => taxonomies.tags[t] ?? t;

  // Table of contents is built server-side (ids injected into the article HTML).
  const toc = post.tableOfContents ?? [];

  // Related posts: prefer same category, then fill with the rest.
  const others = blogPosts.filter((p) => p.slug !== post.slug);
  const relatedPosts = [
    ...others.filter((p) => p.category && p.category === post.category),
    ...others.filter((p) => !p.category || p.category !== post.category),
  ];

  // Programs this article relates to + how many guides each program has.
  const relatedServices = services.filter((s) => post.serviceIds?.includes(s.id));
  const guidesByService = new Map<string, number>();
  for (const p of blogPosts) for (const id of p.serviceIds ?? []) guidesByService.set(id, (guidesByService.get(id) ?? 0) + 1);

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
          <aside className="lg:col-span-4 space-y-8 lg:sticky lg:top-(--nav-offset) h-fit lg:transition-[top] lg:duration-300 lg:ease-out">
            
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

        {/* Related programs (cross-sell) */}
        {relatedServices.length > 0 && (
          <div className="pt-12 lg:pt-8">
            <Carousel
              items={relatedServices}
              getKey={(s) => s.id}
              size="lg"
              label="programs"
              headline="Related programs"
              renderItem={(svc, slideProps) => <ServiceCard svc={svc} review={serviceReviews[svc.id]} guides={guidesByService.get(svc.id) ?? 0} slideProps={slideProps} />}
            />
          </div>
        )}

        {/* Related articles — shared Carousel */}
        {relatedPosts.length > 0 && (
          <div className="pt-12 lg:pt-8">
            <Carousel
              items={relatedPosts}
              getKey={(p) => p.id}
              size="sm"
              label="articles"
              headline="Related Articles"
              renderItem={(rel, slideProps) => <ArticleCard post={rel} slideProps={slideProps} categoryLabel={catLabel} />}
            />
          </div>
        )}

      </div>
    </article>
  );
}
