'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { Search, SlidersHorizontal, BookOpen, Clock, Heart, Award, ArrowRight } from 'lucide-react';
import { useHref } from '../../lib/navigation';
import type { BlogPost } from '../../types';

export default function Blog({ posts }: { posts: BlogPost[] }) {
  const href = useHref();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const { t } = useTranslation();
  const blogPosts = posts;

  // Categories extraction
  const categories = useMemo(() => {
    const list = ['All'];
    blogPosts.forEach((post) => {
      if (!list.includes(post.category)) list.push(post.category);
    });
    return list;
  }, [blogPosts]);

  // Filtered list
  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags?.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCat = selectedCategory === 'All' || post.category === selectedCategory;

      return matchesSearch && matchesCat;
    });
  }, [blogPosts, searchQuery, selectedCategory]);

  return (
    <div className="space-y-16 py-12 pb-24 text-left">
      
      {/* Blog Headers */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-4">
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-amber-700">CANINE BEHAVIOR ARTICLES</span>
          <h1 className="font-sans text-4xl font-extrabold tracking-tight text-amber-955 sm:text-5xl leading-tight">
            The Journal of Gentle Education
          </h1>
          <p className="font-sans text-base text-stone-500 max-w-2xl leading-relaxed">
            Discover actionable, evidence-based guides and research studies written directly by certified consultant Sophia. No myths, no corrections. Just science-backed compassion.
          </p>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-b border-stone-200 pb-8">
          
          {/* Search form box */}
          <div className="relative max-w-md w-full">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-4 w-4 text-stone-400" />
            </div>
            <input
              id="blog-search-field"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search reactivity, puppies, recalls..."
              className="block w-full rounded-xl border border-stone-300 bg-white py-3 pl-10 pr-4 text-sm text-stone-900 placeholder-stone-450 focus:border-amber-900 focus:outline-none focus:ring-1 focus:ring-amber-900"
            />
          </div>

          {/* Categories Tab selectors */}
          <div className="flex flex-wrap gap-2 text-xs font-mono font-medium">
            {categories.map((cat) => (
              <button
                key={cat}
                id={`cat-filter-${cat.toLowerCase().replace(/\s+/g, '-')}`}
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-lg px-4 py-2 border transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-amber-950 text-white border-amber-950 font-bold'
                    : 'bg-white text-stone-600 border-stone-200 hover:bg-stone-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

        </div>
      </section>

      {/* Blog Grid Content */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {filteredPosts.length === 0 ? (
          <div className="rounded-2xl border-2 border-dashed border-stone-250 py-16 text-center max-w-md mx-auto space-y-4">
            <BookOpen className="h-10 w-10 text-stone-400 mx-auto" aria-hidden="true" />
            <h3 className="font-sans text-base font-bold text-stone-800">No Articles Found</h3>
            <p className="text-xs text-stone-500 font-sans px-4">
              We couldn't find any guidelines matching your active query "<b>{searchQuery}</b>". Reset your search and filters to view indices.
            </p>
            <button
              id="reset-filters"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="rounded-lg bg-stone-900 px-4 py-2 text-xs font-semibold text-white tracking-wide"
            >
              Reset Search Parameters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-2">
            {filteredPosts.map((post) => (
              <Link
                key={post.id}
                href={href.post(post.slug)}
                className="group cursor-pointer flex flex-col overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm transition-all hover:shadow-md hover:border-amber-900/20"
              >
                
                {/* Upper Thumbnail banner */}
                <div className="relative overflow-hidden bg-stone-100 max-h-64 aspect-video">
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Category marker */}
                  <div className="absolute top-4 left-4 rounded-md bg-stone-900/90 text-[10px] font-mono px-2.5 py-1 uppercase tracking-wider text-stone-100">
                    {post.category}
                  </div>
                </div>

                {/* Lower Typography Content */}
                <div className="flex-1 p-6 flex flex-col justify-between text-left space-y-4">
                  <div className="space-y-2">
                    <p className="text-[10px] text-stone-400 font-mono tracking-wider font-semibold">
                      {post.publishDate}
                    </p>
                    <h3 className="font-sans text-lg font-bold text-stone-900 group-hover:text-amber-950 transition-colors leading-snug">
                      {post.title}
                    </h3>
                    <p className="text-xs text-stone-550 leading-relaxed line-clamp-3">
                      {post.summary}
                    </p>
                  </div>

                  <div className="flex items-center justify-between border-t border-stone-100 pt-4 text-xs font-mono">
                    <span className="text-amber-905 font-bold flex items-center space-x-1">
                      <span>Read Full Entry</span>
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </span>
                    <span className="text-stone-400">{post.readingTime}</span>
                  </div>
                </div>

              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Direct support cta inside blog */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-stone-100 p-6 md:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-start space-x-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-900 shrink-0">
              <Award className="h-5 w-5" />
            </div>
            <div className="text-left font-sans space-y-1">
              <p className="text-sm font-bold text-stone-900">Have specific questions about your dog?</p>
              <p className="text-xs text-stone-500">Every behavior has individual nuances. Our private consults help skip generic templates.</p>
            </div>
          </div>
          <Link
            href={href.page('contact')}
            className="rounded-xl bg-amber-900 text-white px-5 py-3 text-xs font-semibold hover:bg-amber-950 transition"
          >
            Inquire Directly
          </Link>
        </div>
      </section>

    </div>
  );
}
