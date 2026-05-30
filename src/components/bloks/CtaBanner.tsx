'use client';

import Link from 'next/link';
import {storyblokEditable} from '@storyblok/react';
import {Award} from 'lucide-react';
import {useHref} from '../../lib/navigation';

interface CtaBannerBlok {
  _uid: string;
  component: string;
  headline?: string;
  description?: string;
  primary_label?: string;
  primary_target?: string;
  secondary_label?: string;
  secondary_target?: string;
  note?: string;
  variant?: 'dark' | 'light';
}

export default function CtaBanner({blok}: {blok: CtaBannerBlok}) {
  const href = useHref();

  if (blok.variant === 'light') {
    return (
      <section {...storyblokEditable(blok as any)} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-stone-200 bg-gradient-to-r from-stone-50 to-stone-100 p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-start space-x-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-900 border border-amber-200/50">
              <Award className="h-5.5 w-5.5" />
            </div>
            <div className="text-left font-sans space-y-1">
              {blok.headline && <h3 className="text-base font-bold text-stone-900">{blok.headline}</h3>}
              {blok.description && <p className="text-xs text-stone-500">{blok.description}</p>}
            </div>
          </div>
          <div className="flex flex-wrap gap-3 justify-center">
            {blok.primary_label && (
              <Link
                href={href.page(blok.primary_target || 'booking')}
                className="rounded-xl bg-amber-900 px-5 py-3 text-xs font-mono font-bold uppercase tracking-wider text-white shadow-sm hover:bg-amber-950 hover:shadow transition"
              >
                {blok.primary_label}
              </Link>
            )}
            {blok.secondary_label && (
              <Link
                href={href.page(blok.secondary_target || 'contact')}
                className="rounded-xl border border-stone-300 bg-white px-5 py-3 text-xs font-mono font-bold uppercase tracking-wider text-stone-700 hover:bg-stone-50 transition"
              >
                {blok.secondary_label}
              </Link>
            )}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section {...storyblokEditable(blok as any)} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-3xl bg-amber-950 px-6 py-16 text-center text-stone-100 shadow-xl md:px-12 md:py-20">
        <div className="absolute top-0 right-0 h-64 w-64 bg-amber-900/20 blur-3xl rounded-full"></div>
        <div className="relative z-10 max-w-3xl mx-auto space-y-6">
          {blok.headline && (
            <h2 className="font-sans text-3xl font-extrabold tracking-tight sm:text-4xl text-stone-50">
              {blok.headline}
            </h2>
          )}
          {blok.description && (
            <p className="font-sans text-base text-stone-300 max-w-xl mx-auto leading-relaxed">
              {blok.description}
            </p>
          )}
          <div className="pt-4 flex flex-col sm:flex-row justify-center gap-4">
            {blok.primary_label && (
              <Link
                href={href.page(blok.primary_target || 'booking')}
                className="rounded-xl bg-amber-800 px-6 py-4 text-xs font-mono font-bold uppercase tracking-wider text-white shadow-md hover:bg-amber-700 transition"
              >
                {blok.primary_label}
              </Link>
            )}
            {blok.secondary_label && (
              <Link
                href={href.page(blok.secondary_target || 'contact')}
                className="rounded-xl border border-stone-700 bg-stone-900 px-6 py-4 text-xs font-mono font-bold uppercase tracking-wider text-stone-200 hover:bg-stone-850 hover:text-white transition"
              >
                {blok.secondary_label}
              </Link>
            )}
          </div>
          {blok.note && <p className="text-[10px] text-stone-450 font-mono">{blok.note}</p>}
        </div>
      </div>
    </section>
  );
}
