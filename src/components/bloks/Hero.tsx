'use client';

import Link from 'next/link';
import {storyblokEditable} from '@storyblok/react';
import {Award, ArrowRight} from 'lucide-react';
import {useHref} from '../../lib/navigation';

interface HeroBlok {
  _uid: string;
  component: string;
  eyebrow?: string;
  headline?: string;
  headline_highlight?: string;
  headline_suffix?: string;
  subheadline?: string;
  image?: {filename?: string; alt?: string};
  primary_label?: string;
  primary_target?: string;
  secondary_label?: string;
  secondary_target?: string;
  badge_title?: string;
  badge_subtitle?: string;
  availability?: string;
}

export default function Hero({blok}: {blok: HeroBlok}) {
  const href = useHref();

  return (
    <section
      {...storyblokEditable(blok as any)}
      className="relative overflow-hidden bg-gradient-to-b from-stone-100 to-stone-50 pt-8 md:pt-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex max-md:flex-col-reverse gap-12 md:items-center">
          <div className="lg:w-2/3 space-y-6 text-left">
            {blok.eyebrow && (
              <div className="inline-flex items-center space-x-1.5 rounded-full bg-stone-200 px-3.5 py-1 text-xs font-mono text-stone-700">
                <span>{blok.eyebrow}</span>
              </div>
            )}

            <h1 className="font-sans text-4xl font-extrabold tracking-tight text-amber-950 sm:text-5xl md:text-6xl leading-[1.08]">
              {blok.headline}
              {blok.headline_highlight && (
                <>
                  {' '}
                  <span className="text-amber-800 font-serif italic font-normal">
                    {blok.headline_highlight}
                  </span>
                </>
              )}
              {blok.headline_suffix ? ` ${blok.headline_suffix}` : ''}
            </h1>

            {blok.subheadline && (
              <p className="font-sans text-lg text-stone-600 max-w-2xl leading-relaxed">
                {blok.subheadline}
              </p>
            )}

            <div className="flex flex-col sm:flex-row gap-4 pt-3">
              {blok.primary_label && (
                <Link
                  href={href.page(blok.primary_target || 'booking')}
                  className="rounded-xl bg-amber-900 px-6 py-4 text-sm font-semibold text-white shadow-md hover:bg-amber-950 hover:shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-amber-500/50 cursor-pointer flex items-center justify-center space-x-2"
                >
                  <span>{blok.primary_label}</span>
                  <ArrowRight className="h-4.5 w-4.5" />
                </Link>
              )}
              {blok.secondary_label && (
                <Link
                  href={href.page(blok.secondary_target || 'services')}
                  className="rounded-xl border border-stone-300 bg-white px-6 py-4 text-sm font-semibold text-stone-700 hover:bg-stone-50 hover:text-stone-900 transition-all cursor-pointer flex items-center justify-center"
                >
                  {blok.secondary_label}
                </Link>
              )}
            </div>

            {blok.availability && (
              <div className="flex items-center space-x-1.5 text-xs text-stone-400 font-mono">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>{blok.availability}</span>
              </div>
            )}
          </div>

          <div className="lg:max-w-lg relative">
            <div className="relative mx-auto max-w-[420px] lg:max-w-none">
              <div className="absolute -inset-1 rounded-3xl bg-amber-900/10 blur-xl"></div>

              <div className="relative overflow-hidden rounded-3xl border-8 border-white bg-stone-105 shadow-2xl aspect-video">
                {blok.image?.filename && (
                  <img
                    src={blok.image.filename}
                    alt={blok.image.alt || ''}
                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                )}
              </div>

              {(blok.badge_title || blok.badge_subtitle) && (
                <div className="absolute -bottom-6 lg:-left-6 rounded-2xl bg-stone-900 p-4 text-stone-100 shadow-xl border border-stone-800 flex items-center space-x-3.5 max-w-[240px]">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-800 text-amber-100">
                    <Award className="h-5.5 w-5.5" />
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-bold leading-tight font-sans text-stone-100">{blok.badge_title}</p>
                    <p className="text-[10px] font-mono text-stone-400">{blok.badge_subtitle}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
