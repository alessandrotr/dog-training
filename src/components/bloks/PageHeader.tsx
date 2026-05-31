'use client';

import {storyblokEditable} from '@storyblok/react';

interface PageHeaderBlok {
  _uid: string;
  component: string;
  eyebrow?: string;
  headline?: string;
  subheadline?: string;
}

// Standalone page title block (blog-style): drop it at the top of any page to
// get a consistent eyebrow + large headline + intro paragraph.
export default function PageHeader({blok}: {blok: PageHeaderBlok}) {
  return (
    <section {...storyblokEditable(blok as any)} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-3xl space-y-4 text-left">
        {blok.eyebrow && (
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-amber-700">
            {blok.eyebrow}
          </span>
        )}
        {blok.headline && (
          <h1 className="font-sans text-4xl font-extrabold tracking-tight text-amber-950 sm:text-5xl leading-tight">
            {blok.headline}
          </h1>
        )}
        {blok.subheadline && (
          <p className="font-sans text-base text-stone-500 max-w-2xl leading-relaxed">
            {blok.subheadline}
          </p>
        )}
      </div>
    </section>
  );
}
