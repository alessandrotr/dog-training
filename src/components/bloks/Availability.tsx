'use client';

import Link from 'next/link';
import Image from 'next/image';
import {storyblokEditable} from '@storyblok/react';
import {BadgeCheck, MapPin, Zap, ArrowRight} from 'lucide-react';
import {useHref} from '../../lib/navigation';

interface AvailabilityBlok {
  _uid: string;
  component: string;
  available?: boolean;
  name?: string;
  handle?: string;
  avatar?: {filename?: string; alt?: string};
  verified?: boolean;
  available_status?: string;
  unavailable_status?: string;
  location?: string;
  response_time?: string;
  spots_total?: string | number;
  spots_left?: string | number;
  available_cta_label?: string;
  available_cta_target?: string;
  unavailable_cta_label?: string;
  unavailable_cta_target?: string;
}

export default function Availability({blok}: {blok: AvailabilityBlok}) {
  const href = useHref();
  const available = blok.available !== false; // default available

  const status = (available ? blok.available_status : blok.unavailable_status) ||
    (available ? 'Available for new clients' : 'Fully booked right now');
  const ctaLabel = available ? blok.available_cta_label : blok.unavailable_cta_label;
  const ctaTarget = available ? blok.available_cta_target || 'booking' : blok.unavailable_cta_target || 'contact';

  const spotsTotal = Math.max(1, Number(blok.spots_total) || 5);
  const spotsLeft = Math.max(0, Math.min(spotsTotal, Number(blok.spots_left) || 0));

  return (
    <section {...storyblokEditable(blok as any)} className="mx-auto max-w-md">
      <div className="relative overflow-hidden rounded-3xl border border-stone-200 bg-white p-5 shadow-lg">
        <div className="pointer-events-none absolute -top-16 -right-16 h-40 w-40 rounded-full bg-amber-200/40 blur-3xl" />

        {/* Profile row */}
        <div className="relative flex items-center gap-4">
          <div className="relative shrink-0">
            <div className={`rounded-full p-[2.5px] ${available ? 'bg-[conic-gradient(at_top_right,#d97706,#10b981,#f59e0b,#d97706)]' : 'bg-stone-300'}`}>
              <div className="h-16 w-16 overflow-hidden rounded-full border-2 border-white bg-stone-100">
                {blok.avatar?.filename ? (
                  <Image src={blok.avatar.filename} alt={blok.avatar.alt || blok.name || ''} width={64} height={64} className="h-full w-full object-cover" referrerPolicy="no-referrer" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center font-serif text-xl text-amber-900">
                    {(blok.name || 'S').charAt(0)}
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
              <span className="truncate font-sans font-bold text-stone-900">{blok.name || 'Sophia Binder'}</span>
              {blok.verified && <BadgeCheck className="h-4 w-4 shrink-0 text-amber-600" />}
            </div>
            {blok.handle && <span className="block font-mono text-xs text-stone-400">{blok.handle}</span>}
            <span className={`mt-1.5 inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${available ? 'bg-emerald-50 text-emerald-700' : 'bg-stone-100 text-stone-500'}`}>
              <span className={`h-1.5 w-1.5 rounded-full ${available ? 'bg-emerald-500 animate-pulse' : 'bg-stone-400'}`} />
              {status}
            </span>
          </div>
        </div>

        {/* Meta */}
        {(blok.location || blok.response_time) && (
          <div className="relative mt-4 flex flex-wrap gap-x-4 gap-y-1 font-mono text-xs text-stone-500">
            {blok.location && (
              <span className="inline-flex items-center gap-1"><MapPin className="h-3.5 w-3.5 text-amber-700" />{blok.location}</span>
            )}
            {blok.response_time && (
              <span className="inline-flex items-center gap-1"><Zap className="h-3.5 w-3.5 text-amber-700" />{blok.response_time}</span>
            )}
          </div>
        )}

        {/* Capacity meter (only when available) */}
        {available && spotsLeft > 0 && (
          <div className="relative mt-4 flex items-center gap-2.5">
            <div className="flex gap-1">
              {Array.from({length: spotsTotal}).map((_, i) => (
                <span key={i} className={`h-2 w-2 rounded-full transition-colors ${i < spotsLeft ? 'bg-amber-600' : 'bg-stone-200'}`} />
              ))}
            </div>
            <span className="text-[11px] font-mono font-semibold text-amber-800">
              {spotsLeft} spot{spotsLeft > 1 ? 's' : ''} left this week
            </span>
          </div>
        )}

        {/* CTA */}
        {ctaLabel && (
          <Link
            href={href.page(ctaTarget)}
            className={`group relative mt-5 flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 text-xs font-mono font-bold uppercase tracking-wider transition ${
              available
                ? 'bg-amber-900 text-white shadow-sm hover:bg-amber-950'
                : 'border border-stone-300 bg-white text-stone-700 hover:bg-stone-50'
            }`}
          >
            {ctaLabel}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        )}
      </div>
    </section>
  );
}
