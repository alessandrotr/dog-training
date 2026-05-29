import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BlogPost } from '../../types';
import { BLOG_POSTS } from '../../data';
import { ArrowLeft, Clock, CalendarDays, Share2, Bookmark, Check, CalendarRange, Sparkles } from 'lucide-react';
import { useNavigate, usePostNavigate } from '../../lib/navigation';

interface BlogPostTemplateProps {
  post: BlogPost;
}

export default function BlogPostTemplate({ post }: BlogPostTemplateProps) {
  const [copiedLink, setCopiedLink] = useState(false);
  const { t, i18n } = useTranslation();
  const lang = (i18n.language === 'de' ? 'de' : 'en') as 'en' | 'de';
  const blogPosts = BLOG_POSTS[lang];
  const setCurrentPage = useNavigate();
  const goToPost = usePostNavigate();

  const onBack = () => setCurrentPage('blog');
  const onNavigate = (slug: string) => goToPost(slug);

  // Find other posts for Related Section
  const relatedPosts = blogPosts.filter((p) => p.slug !== post.slug);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleBook = () => {
    setCurrentPage('booking');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <article className="py-12 pb-24 text-left">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Back Button Grid */}
        <div className="mb-8 flex items-center justify-between border-b border-stone-200 pb-4">
          <button
            id="blog-back-btn"
            onClick={onBack}
            className="flex items-center space-x-2 text-xs font-mono font-bold uppercase tracking-wider text-stone-500 hover:text-stone-900 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Journal</span>
          </button>

          {/* Core tools */}
          <div className="flex items-center space-x-3 text-stone-400">
            <button
              id="copy-blog-link"
              onClick={handleCopyLink}
              className="p-2 hover:bg-stone-100 rounded-lg text-stone-600 transition-colors flex items-center space-x-1.5 text-xs font-mono"
              aria-label="Copy article link"
            >
              <Share2 className="h-3.5 w-3.5" />
              <span>{copiedLink ? 'Copied' : 'Share'}</span>
            </button>
          </div>
        </div>

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
            <div className="flex items-center space-x-1">
              <span>Author: <b>{post.author.name}</b></span>
            </div>
          </div>
        </div>

        {/* Big visual header */}
        <div className="relative overflow-hidden rounded-3xl bg-stone-100 shadow-lg mb-12 max-h-[420px] aspect-[16/9] w-full">
          <img
            src={post.imageUrl}
            alt={post.title}
            className="h-full w-full object-cover"
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

            {/* Author Profile */}
            <div className="rounded-2xl border border-stone-200 bg-white p-6 text-left space-y-4 shadow-sm">
              <div className="flex items-center space-x-3.5">
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="h-12 w-12 rounded-full object-cover border"
                  referrerPolicy="no-referrer"
                />
                <div className="font-sans">
                  <p className="text-sm font-bold text-stone-900">{post.author.name}</p>
                  <p className="text-[10px] font-mono text-amber-800 -mt-0.5">{post.author.role}</p>
                </div>
              </div>
              {post.author.bio && (
                <p className="text-xs text-stone-500 font-sans leading-relaxed">
                  {post.author.bio}
                </p>
              )}
            </div>

            {/* In-article CTA widget */}
            <div className="rounded-2xl bg-amber-955 p-6 text-stone-100 shadow-md space-y-4 text-left">
              <Sparkles className="h-6 w-6 text-amber-500" />
              <h4 className="font-sans text-sm font-bold text-stone-50">Struggling with similar behaviors?</h4>
              <p className="text-xs text-stone-400 leading-normal">
                Don’t rely on general templates. Speak directly with head behaviorist Clara to customize your training plan.
              </p>
              <button
                id="in-article-booking-btn"
                onClick={handleBook}
                className="w-full text-center rounded-xl bg-amber-800 text-white font-mono text-[10px] font-bold uppercase tracking-wider py-3 hover:bg-amber-700 shadow"
              >
                Book 15-Min Assessment Call
              </button>
            </div>

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
                <div
                  key={rel.id}
                  id={`related-card-${rel.id}`}
                  onClick={() => onNavigate(rel.slug)}
                  className="group cursor-pointer rounded-2xl border border-stone-200 bg-white p-4 shadow-sm hover:shadow transition-all flex flex-col md:flex-row gap-4"
                >
                  <div className="md:w-1/3 relative h-32 rounded-xl bg-stone-105 overflow-hidden">
                    <img
                      src={rel.imageUrl}
                      alt={rel.title}
                      className="h-full w-full object-cover transition-transform group-hover:scale-105"
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
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </article>
  );
}
