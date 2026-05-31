'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BlogPost } from '../../types';
import { ArrowLeft, Clock, CalendarDays, Share2, Bookmark, Check, CalendarRange, Sparkles } from 'lucide-react';
import { useHref } from '../../lib/navigation';
import Availability from '../bloks/Availability';

interface BlogPostTemplateProps {
  post: BlogPost;
  posts: BlogPost[];
}

export default function BlogPostTemplate({ post, posts }: BlogPostTemplateProps) {
  const [copiedLink, setCopiedLink] = useState(false);
  const href = useHref();
  const blogPosts = posts;

  // Find other posts for Related Section
  const relatedPosts = blogPosts.filter((p) => p.slug !== post.slug);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <article className="py-12 pb-24 text-left">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Heading Container */}
        <div className="max-w-3xl mx-auto space-y-4 mb-10 text-center md:text-left">
          <span className="inline-flex items-center rounded-full bg-amber-50 px-3 py-1 text-xs font-mono font-bold text-amber-700 border border-amber-200/45">
            {post.category}
          </span>
          <h1 className="font-sans text-3xl font-extrabold tracking-tight text-amber-955 sm:text-4xl md:text-5xl leading-tight">
            {post.title}
          </h1>
          
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs font-mono text-stone-450 pt-2 border-t border-stone-100">
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
            
            {/* Table of Contents */}
            {post.tableOfContents && post.tableOfContents.length > 0 && (
              <div className="rounded-2xl border border-stone-200 bg-stone-50 p-6 text-left">
                <h3 className="font-mono text-xs uppercase tracking-widest text-stone-450 mb-4 font-bold">Table of Contents</h3>
                <nav className="space-y-2 text-xs font-sans">
                  {post.tableOfContents.map((toc, tIdx) => (
                    <a
                      key={tIdx}
                      id={`toc-link-${toc.id}`}
                      href={`#${toc.id}`}
                      className="block text-stone-600 hover:text-amber-900 transition-colors py-1 leading-normal"
                    >
                      {toc.text}
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
              className="prose prose-stone max-w-none prose-headings:font-sans prose-headings:font-extrabold prose-headings:text-amber-955 prose-p:leading-relaxed prose-li:my-1.5 prose-p:my-4 prose-p:text-stone-600 prose-li:text-stone-605"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Article tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="mt-12 border-t border-stone-200 pt-8">
                <h4 className="font-mono text-xs uppercase tracking-widest text-stone-400 mb-3 font-semibold">Article Tags</h4>
                <div className="flex flex-wrap gap-2 text-[10px] font-mono">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md bg-stone-100 border border-stone-200 text-stone-600 px-2.5 py-1"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </main>

        </div>

        {/* RELATED ARTICLES FOOTER */}
        {relatedPosts.length > 0 && (
          <div className="mt-24 border-t border-stone-200 pt-16">
            <h3 className="font-sans text-2xl font-extrabold text-amber-955 mb-8">Related Behavioral Studies</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatedPosts.slice(0, 2).map((rel) => (
                <Link
                  key={rel.id}
                  href={href.post(rel.slug)}
                  className="group cursor-pointer rounded-2xl border border-stone-200 bg-white p-4 shadow-sm hover:shadow transition-all flex flex-col md:flex-row gap-4"
                >
                  <div className="md:w-1/3 relative h-32 rounded-xl bg-stone-105 overflow-hidden">
                    <Image
                      src={rel.imageUrl}
                      alt={rel.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="md:w-2/3 text-left flex flex-col justify-between">
                    <div>
                      <span className="text-[9px] font-mono uppercase text-amber-800 font-bold">{rel.category}</span>
                      <h4 className="font-sans text-sm font-bold text-stone-900 group-hover:text-amber-950 transition-colors leading-snug mt-1">
                        {rel.title}
                      </h4>
                    </div>
                    <span className="text-[10px] font-mono text-amber-900 font-bold pt-2 mt-2 border-t border-stone-50">
                      View Study →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

      </div>
    </article>
  );
}
