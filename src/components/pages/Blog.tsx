'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import { Search, BookOpen, ArrowRight, Award, Tag, X } from 'lucide-react';
import { useQueryState } from 'nuqs';
import { useHref } from '../../lib/navigation';
import FilterLayout from '../FilterLayout';
import Section from '../ui/section';
import Card from '../ui/card';
import type { BlogPost, BlogTaxonomies } from '../../types';

export default function Blog({ posts, taxonomies }: { posts: BlogPost[]; taxonomies: BlogTaxonomies }) {
  const href = useHref();
  const catLabel = (c: string) => taxonomies.categories[c] ?? c;
  const tagLabel = (t: string) => taxonomies.tags[t] ?? t;
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  // Active tag lives in the URL (?tag=…) so article tag chips can deep-link here.
  const [activeTag, setActiveTag] = useQueryState('tag');
  const { t } = useTranslation();
  const blogPosts = posts;

  // Controlled vocabularies, derived from the posts that actually exist.
  const categories = useMemo(() => {
    const list = ['All'];
    blogPosts.forEach((post) => {
      if (post.category && !list.includes(post.category)) list.push(post.category);
    });
    return list;
  }, [blogPosts]);

  const tags = useMemo(() => {
    const set = new Set<string>();
    blogPosts.forEach((post) => post.tags?.forEach((tag) => set.add(tag)));
    return [...set];
  }, [blogPosts]);

  // Filtered list
  const filteredPosts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return blogPosts.filter((post) => {
      const matchesSearch =
        !q ||
        post.title.toLowerCase().includes(q) ||
        post.summary.toLowerCase().includes(q) ||
        post.tags?.some((tag) => tag.toLowerCase().includes(q));

      const matchesCat = selectedCategory === 'All' || post.category === selectedCategory;
      const matchesTag = !activeTag || post.tags?.includes(activeTag);

      return matchesSearch && matchesCat && matchesTag;
    });
  }, [blogPosts, searchQuery, selectedCategory, activeTag]);

  return (
    <div className="space-y-16 pt-4 lg:py-12 pb-8 text-left">
      
      {/* Blog Headers */}
      <Section>
        <div className="max-w-3xl space-y-4">
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-amber-700">CANINE BEHAVIOR ARTICLES</span>
          <h1 className="font-sans text-4xl font-extrabold tracking-tight text-amber-955 sm:text-5xl leading-tight">
            The Journal of Gentle Education
          </h1>
          <p className="font-sans text-base text-stone-500 max-w-2xl leading-relaxed">
            Discover actionable, evidence-based guides and research studies written directly by certified consultant Sophia. No myths, no corrections. Just science-backed compassion.
          </p>
        </div>
      </Section>

      {/* Filters (left rail) + results */}
      <Section>
        <FilterLayout
          activeCount={(selectedCategory !== 'All' ? 1 : 0) + (activeTag ? 1 : 0) + (searchQuery ? 1 : 0)}
          sidebar={
            <Card padding="sm" className="space-y-6">
              {/* Search */}
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Search className="h-4 w-4 text-stone-400" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search articles…"
                  className="block w-full rounded-xl border border-stone-300 bg-white py-2.5 pl-9 pr-3 text-sm text-stone-900 placeholder-stone-400 focus:border-amber-900 focus:outline-none focus:ring-1 focus:ring-amber-900"
                />
              </div>

              {/* Category */}
              <div className="space-y-1.5">
                <h3 className="font-mono text-[11px] font-bold uppercase tracking-widest text-stone-400">Category</h3>
                <div className="space-y-1">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`block w-full rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                        selectedCategory === cat ? 'bg-amber-700 font-semibold text-white' : 'text-stone-600 hover:bg-stone-100'
                      }`}
                    >
                      {cat === 'All' ? cat : catLabel(cat)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Topics */}
              {tags.length > 0 && (
                <div className="space-y-2">
                  <h3 className="flex items-center gap-1.5 font-mono text-[11px] font-bold uppercase tracking-widest text-stone-400">
                    <Tag className="h-3.5 w-3.5" /> Topics
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {tags.map((tag) => {
                      const active = activeTag === tag;
                      return (
                        <button
                          key={tag}
                          onClick={() => setActiveTag(active ? null : tag)}
                          className={`rounded-full border px-3 py-1 font-mono text-xs font-bold uppercase tracking-wide transition-colors ${
                            active
                              ? 'border-amber-700 bg-amber-700 text-white'
                              : 'border-amber-200/60 bg-amber-50 text-amber-800 hover:border-amber-300 hover:bg-amber-100'
                          }`}
                        >
                          {tagLabel(tag)}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {(activeTag || selectedCategory !== 'All' || searchQuery) && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('All');
                    setActiveTag(null);
                  }}
                  className="inline-flex items-center gap-1 font-mono text-[11px] font-bold uppercase tracking-wide text-stone-500 transition-colors hover:text-stone-900"
                >
                  <X className="h-3.5 w-3.5" /> Clear all
                </button>
              )}
            </Card>
          }
        >
        {filteredPosts.length === 0 ? (
          <div className="rounded-2xl border-2 border-dashed border-stone-250 py-16 text-center space-y-4">
            <BookOpen className="h-10 w-10 text-stone-400 mx-auto" aria-hidden="true" />
            <h3 className="font-sans text-base font-bold text-stone-800">No Articles Found</h3>
            <p className="text-xs text-stone-500 font-sans px-4">
              Nothing matches your filters. Try clearing them.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setActiveTag(null);
              }}
              className="rounded-lg bg-stone-900 px-4 py-2 text-xs font-semibold text-white tracking-wide"
            >
              Reset filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {filteredPosts.map((post) => (
              <Card
                as={Link}
                key={post.id}
                href={href.post(post.slug)}
                interactive
                className="group flex flex-col overflow-hidden shadow-sm"
              >

                {/* Upper Thumbnail banner */}
                <div className="relative overflow-hidden bg-stone-100 max-h-64 aspect-video">
                  <Image
                    src={post.imageUrl}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Category marker */}
                  <div className="absolute top-4 left-4 rounded-md bg-stone-900/90 text-[10px] font-mono px-2.5 py-1 uppercase tracking-wider text-stone-100">
                    {catLabel(post.category)}
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

              </Card>
            ))}
          </div>
        )}
        </FilterLayout>
      </Section>

    </div>
  );
}
