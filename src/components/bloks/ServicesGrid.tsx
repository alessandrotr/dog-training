'use client';

import {storyblokEditable} from '@storyblok/react';
import {ArrowRight, CalendarRange, Check} from 'lucide-react';
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
  layout?: 'grid' | 'list';
}

// Data-bound: pulls the service stories prefetched by the page route.
// `grid` = compact preview cards (home); `list` = full alternating sections.
export default function ServicesGrid({blok}: {blok: ServicesGridBlok}) {
  const setCurrentPage = useNavigate();
  const {services} = usePageData();
  const limit = Number(blok.limit) || services.length;
  const items = services.slice(0, limit);
  const isList = blok.layout === 'list';

  const header = (
    <div className={isList ? 'max-w-3xl space-y-4' : 'text-center max-w-3xl mx-auto space-y-4 mb-16'}>
      {blok.eyebrow && (
        <span className="font-mono text-xs font-bold uppercase tracking-widest text-amber-700">{blok.eyebrow}</span>
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
  );

  if (isList) {
    return (
      <section {...storyblokEditable(blok as any)} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16 text-left">
        {header}
        <div className="space-y-20">
          {items.map((svc, sIdx) => {
            const isEven = sIdx % 2 === 0;
            return (
              <div
                key={svc.id}
                className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center border-b border-stone-200/60 pb-16 last:border-b-0"
              >
                <div className={`lg:col-span-5 ${isEven ? 'lg:order-1' : 'lg:order-2'} relative`}>
                  <div className="relative mx-auto max-w-[400px] lg:max-w-none">
                    <div className="absolute -inset-1 rounded-3xl bg-amber-900/10 blur-xl"></div>
                    <div className="relative overflow-hidden rounded-3xl border-4 border-white bg-stone-100 shadow-xl aspect-video max-h-72">
                      {svc.imageUrl && (
                        <img
                          src={svc.imageUrl}
                          alt={svc.title}
                          className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                          referrerPolicy="no-referrer"
                        />
                      )}
                    </div>
                  </div>
                </div>

                <div className={`lg:col-span-7 ${isEven ? 'lg:order-2' : 'lg:order-1'} space-y-6 text-left`}>
                  <div className="flex flex-wrap gap-2">
                    <span className="inline-flex items-center rounded-md bg-stone-150 px-2.5 py-1 text-xs font-mono font-medium text-stone-800">
                      Target Audience: {svc.audience}
                    </span>
                    <span className="inline-flex items-center rounded-md bg-amber-50 px-2.5 py-1 text-xs font-mono font-bold text-amber-900 border border-amber-200/40">
                      Est. {svc.duration}
                    </span>
                  </div>

                  <h3 className="font-sans text-2xl font-bold tracking-tight text-stone-900 sm:text-3xl">{svc.title}</h3>

                  <p className="font-sans text-sm font-semibold text-amber-900 font-mono leading-none">
                    Hourly / Retainer Fee: {svc.price}
                  </p>

                  <p className="font-sans text-sm text-stone-500 leading-relaxed">{svc.longDescription}</p>

                  <div className="space-y-3 pt-2">
                    <h4 className="font-sans text-xs font-extrabold uppercase tracking-widest text-stone-400">Included in Program</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {svc.features.map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-start space-x-2 text-xs text-stone-600 leading-relaxed">
                          <Check className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 flex flex-wrap gap-4">
                    <button
                      onClick={() => setCurrentPage('booking')}
                      className="inline-flex items-center space-x-2 rounded-xl bg-amber-900 px-5 py-3 text-xs font-semibold tracking-wide text-white shadow-sm hover:bg-amber-950 hover:shadow"
                    >
                      <CalendarRange className="h-4 w-4" />
                      <span>Book Free Assessment</span>
                    </button>
                    <a
                      href={`https://wa.me/15550192819?text=Hi%20Sophia!%20I'd%20like%20to%20query%20the%20${encodeURIComponent(svc.title)}%20service.`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center rounded-xl border border-stone-300 bg-white px-5 py-3 text-xs font-semibold text-stone-700 hover:bg-stone-50"
                    >
                      Instant WhatsApp Query
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    );
  }

  return (
    <section {...storyblokEditable(blok as any)} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      {header}
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
