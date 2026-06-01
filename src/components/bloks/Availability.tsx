'use client';

import Link from 'next/link';
import Image from 'next/image';
import {storyblokEditable} from '@storyblok/react';
import {MapPin, Zap, ArrowRight, Languages} from 'lucide-react';
import {useHref} from '../../lib/navigation';
import {useAvailability} from '../AvailabilityProvider';
import {Button} from '../ui';

// Languages Sophia speaks (hardcoded for now; could become a Storyblok field).
const SPOKEN_LANGUAGES = [
  {flag: '🇬🇧', name: 'English', level: 'Native'},
  {flag: '🇩🇪', name: 'German', level: 'Native'},
  {flag: '🇮🇹', name: 'Italian', level: 'C1'},
  {flag: '🇸🇦', name: 'Arabic', level: 'C1'},
];

// Data comes from the single global source (Site Config → useAvailability), so
// every instance stays in sync. `blok` is optional and only used to enable
// click-to-edit when this is placed via the page builder.
export default function Availability({blok}: {blok?: {_uid?: string; component?: string; [key: string]: unknown}}) {
  const href = useHref();
  const data = useAvailability();
  if (!data) return null;

  const available = data.available;
  const status = available ? data.availableStatus : data.unavailableStatus;
  const ctaLabel = available ? data.availableCtaLabel : data.unavailableCtaLabel;
  const ctaTarget = available ? data.availableCtaTarget || 'booking' : data.unavailableCtaTarget || 'contact';
  const editable = blok ? storyblokEditable(blok as never) : {};

  return (
    <section {...editable} className="mx-auto max-w-md">
      <div className="relative overflow-hidden rounded-3xl border border-stone-200 bg-white p-5 shadow-lg">
        <div className="pointer-events-none absolute -top-16 -right-16 h-40 w-40 rounded-full bg-amber-200/40 blur-3xl" />

        {/* Profile row */}
        <div className="relative flex items-center gap-4">
          <div className="relative shrink-0">
            <div className={`rounded-full p-[2.5px] ${available ? 'bg-[conic-gradient(at_top_right,#d97706,#10b981,#f59e0b,#d97706)]' : 'bg-stone-300'}`}>
              <div className="h-16 w-16 overflow-hidden rounded-full border-2 border-white bg-stone-100">
                {data.avatar ? (
                  <Image src={data.avatar} alt={data.name} width={64} height={64} className="h-full w-full object-cover" referrerPolicy="no-referrer" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center font-serif text-xl text-amber-900">
                    {(data.name || 'S').charAt(0)}
                  </div>
                )}
              </div>
            </div>
            {/* online dot */}
            <span className="absolute bottom-0.5 right-0.5 flex h-4 w-4">
              {available && <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />}
              <span className={`relative inline-flex h-4 w-4 rounded-full border-2 border-white ${available ? 'bg-emerald-500' : 'bg-stone-400'}`} />
            </span>
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-1">
              <Link href={href.page('about')} className="truncate font-sans font-bold text-stone-700 hover:text-stone-900">{data.name || 'Sophia Binder'}</Link>
            </div>
            {data.handle && <span className="block font-mono text-xs text-stone-400">{data.handle}</span>}
            <span className={`mt-1.5 inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${available ? 'bg-emerald-50 text-emerald-700' : 'bg-stone-100 text-stone-500'}`}>
              <span className={`h-1.5 w-1.5 rounded-full ${available ? 'bg-emerald-500 animate-pulse' : 'bg-stone-400'}`} />
              {status}
            </span>
          </div>
        </div>

        {/* Meta */}
        {(data.location || data.responseTime) && (
          <div className="relative mt-4 flex flex-wrap gap-x-4 gap-y-1 font-mono text-xs text-stone-500">
            {data.location && (
              <span className="inline-flex items-center gap-1"><MapPin className="h-3.5 w-3.5 text-amber-700" />{data.location}</span>
            )}
            {data.responseTime && (
              <span className="inline-flex items-center gap-1"><Zap className="h-3.5 w-3.5 text-amber-700" />{data.responseTime}</span>
            )}
          </div>
        )}

        {/* Languages spoken */}
        <div className="relative mt-4 flex items-center gap-2.5">
          <Languages className="h-3.5 w-3.5 shrink-0 text-amber-700" />
          <div className="flex -space-x-1.5">
            {SPOKEN_LANGUAGES.map((lang) => (
              <span key={lang.name} className="group/lang relative">
                <span className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-stone-50 text-sm shadow-sm ring-1 ring-stone-200 transition-transform duration-150 hover:z-10 hover:-translate-y-0.5 hover:scale-110">
                  {lang.flag}
                </span>
                <span
                  role="tooltip"
                  className="pointer-events-none absolute -top-9 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded-lg bg-stone-900 px-2 py-1 text-[10px] font-semibold text-white opacity-0 shadow-md transition-opacity duration-150 group-hover/lang:opacity-100"
                >
                  {lang.name} · {lang.level}
                  <span className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-stone-900" />
                </span>
              </span>
            ))}
          </div>
        </div>

        {/* CTA */}
        {ctaLabel && (
          <Button
            render={<Link href={href.page(ctaTarget)} />}
            variant={available ? 'cta' : 'ctaOutline'}
            size="xl"
            className="mt-5 w-full px-5 py-3"
          >
            {ctaLabel}
            <ArrowRight className="h-4 w-4 transition-transform group-hover/button:translate-x-1" />
          </Button>
        )}
      </div>
    </section>
  );
}
