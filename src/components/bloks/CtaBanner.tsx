'use client';

import {storyblokEditable} from '@storyblok/react';
import {useNavigate} from '../../lib/navigation';

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
}

export default function CtaBanner({blok}: {blok: CtaBannerBlok}) {
  const setCurrentPage = useNavigate();

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
              <button
                onClick={() => setCurrentPage(blok.primary_target || 'booking')}
                className="rounded-xl bg-amber-800 px-6 py-4 text-xs font-mono font-bold uppercase tracking-wider text-white shadow-md hover:bg-amber-700 transition"
              >
                {blok.primary_label}
              </button>
            )}
            {blok.secondary_label && (
              <button
                onClick={() => setCurrentPage(blok.secondary_target || 'contact')}
                className="rounded-xl border border-stone-700 bg-stone-900 px-6 py-4 text-xs font-mono font-bold uppercase tracking-wider text-stone-200 hover:bg-stone-850 hover:text-white transition"
              >
                {blok.secondary_label}
              </button>
            )}
          </div>
          {blok.note && <p className="text-[10px] text-stone-450 font-mono">{blok.note}</p>}
        </div>
      </div>
    </section>
  );
}
