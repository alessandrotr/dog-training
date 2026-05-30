'use client';

import {storyblokEditable} from '@storyblok/react';
import {ArrowRight} from 'lucide-react';
import {useNavigate} from '../../lib/navigation';
import {usePageData} from '../PageDataProvider';

interface ServicesGridBlok {
  _uid: string;
  component: string;
  eyebrow?: string;
  headline?: string;
  subheadline?: string;
  limit?: string | number;
  footer_label?: string;
}

// Data-bound: pulls the service stories prefetched by the page route.
export default function ServicesGrid({blok}: {blok: ServicesGridBlok}) {
  const setCurrentPage = useNavigate();
  const {services} = usePageData();
  const limit = Number(blok.limit) || services.length;
  const items = services.slice(0, limit);

  return (
    <section {...storyblokEditable(blok as any)} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
        {blok.eyebrow && (
          <span className="font-mono text-xs uppercase tracking-widest text-amber-700">{blok.eyebrow}</span>
        )}
        {blok.headline && (
          <h2 className="font-sans text-3xl font-extrabold tracking-tight text-amber-950 sm:text-4xl">
            {blok.headline}
          </h2>
        )}
        {blok.subheadline && (
          <p className="font-sans text-stone-500 text-base leading-relaxed">{blok.subheadline}</p>
        )}
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {items.map((svc) => (
          <div
            key={svc.id}
            className="group flex flex-col overflow-hidden rounded-2xl border border-stone-200 bg-white p-5 shadow-sm transition-all hover:shadow-md hover:border-amber-900/20"
          >
            <div className="relative overflow-hidden rounded-xl bg-stone-100 mb-5 max-h-48 aspect-video">
              {svc.imageUrl && (
                <img
                  src={svc.imageUrl}
                  alt={svc.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              )}
              <div className="absolute top-3 left-3 rounded-md bg-stone-900/90 text-stone-100 text-[10px] font-mono px-2 py-1 uppercase tracking-wide">
                {svc.duration}
              </div>
            </div>

            <div className="flex-1 space-y-2 text-left">
              <h3 className="font-sans text-lg font-bold text-stone-900 group-hover:text-amber-950 transition-colors">
                {svc.title}
              </h3>
              <p className="text-xs font-mono text-amber-850 font-semibold">{svc.price}</p>
              <p className="text-sm text-stone-500 leading-relaxed">{svc.shortDescription}</p>
            </div>

            <ul className="my-4 space-y-1.5 border-t border-stone-100 pt-4 text-left">
              {svc.features.slice(0, 3).map((feat, fIdx) => (
                <li key={fIdx} className="flex items-center space-x-2 text-xs text-stone-600">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-amber-800"></span>
                  <span className="truncate">{feat}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => setCurrentPage('services')}
              className="mt-2 flex w-full items-center justify-center space-x-1 rounded-xl bg-stone-50 py-2.5 text-xs font-semibold text-stone-700 transition-colors group-hover:bg-amber-900 group-hover:text-white"
            >
              <span>View Details</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        ))}
      </div>

      {blok.footer_label && (
        <div className="mt-12 text-center">
          <button
            onClick={() => setCurrentPage('services')}
            className="inline-flex items-center space-x-2 font-mono text-xs font-bold tracking-wider text-amber-900 hover:text-amber-950 transition-colors cursor-pointer group"
          >
            <span>{blok.footer_label}</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      )}
    </section>
  );
}
