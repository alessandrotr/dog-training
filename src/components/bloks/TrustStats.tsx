import {storyblokEditable} from '@storyblok/react/rsc';
import {ShieldCheck, Star} from 'lucide-react';
import {Section} from '../ui';

import type {BlokBase} from '../../types';

interface TrustStatsBlok extends BlokBase {
  stat1_value?: string;
  stat1_label?: string;
  stat1_note?: string;
  stat2_value?: string;
  stat2_label?: string;
  stat2_note?: string;
  stat3_value?: string;
  stat3_label?: string;
  stat3_note?: string;
  badges_title?: string;
  badges?: string; // one per line
}

const lines = (s?: string) =>
  s ? s.split('\n').map((l) => l.trim()).filter(Boolean) : [];

export default function TrustStats({blok}: {blok: TrustStatsBlok}) {
  const stats = [
    {value: blok.stat1_value, label: blok.stat1_label, note: blok.stat1_note},
    {value: blok.stat2_value, label: blok.stat2_label, note: blok.stat2_note},
    {value: blok.stat3_value, label: blok.stat3_label, note: blok.stat3_note, rating: true},
  ];

  return (
    <Section {...storyblokEditable(blok as any)}>
      <div className="rounded-3xl bg-stone-100 p-8 md:p-12 border border-stone-200/60 shadow-sm">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:divide-x md:divide-stone-200">
          {stats.map((s, i) => (
            <div key={i} className="flex flex-col items-center text-center px-4 space-y-2">
              <span className="font-serif italic text-4xl font-semibold text-amber-950 flex items-center justify-center">
                {s.value}
                {s.rating && <Star className="h-5 w-5 fill-amber-600 stroke-none ml-1 shrink-0" />}
              </span>
              <p className="font-sans text-sm text-stone-600 font-medium">{s.label}</p>
              <p className="font-mono text-[10px] text-stone-400 uppercase tracking-wider">{s.note}</p>
            </div>
          ))}
        </div>

        {(blok.badges_title || lines(blok.badges).length > 0) && (
          <div className="mt-8 border-t border-stone-200/80 pt-8 text-center">
            {blok.badges_title && (
              <p className="font-sans text-xs font-semibold text-stone-400 uppercase tracking-widest mb-4">
                {blok.badges_title}
              </p>
            )}
            <div className="flex flex-wrap justify-center gap-6 md:gap-12 text-stone-400 text-xs font-mono">
              {lines(blok.badges).map((b, i) => (
                <div key={i} className="flex items-center space-x-1.5">
                  <ShieldCheck className="h-4 w-4 text-amber-700" />
                  <span>{b}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Section>
  );
}
