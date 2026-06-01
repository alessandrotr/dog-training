'use client';

import {Clock, MapPin} from 'lucide-react';
import {cn} from '@/lib/utils';
import {Avatar, Pill} from '@/components/ui';
import {useAvailability} from '@/components/AvailabilityProvider';

// Live "presence" row for the lead dialog header: trainer avatar + name/handle,
// an animated status badge (pulsing emerald when taking clients, steady amber
// when booked) and response-time / location chips. All from the global
// availability record Sophia edits once in Storyblok.
export default function AvailabilityPresence() {
  const a = useAvailability();
  if (!a) return null;
  const {available} = a;

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3.5">
        <Avatar src={a.avatar} name={a.name} size="lg" />
        <div className="min-w-0">
          <div className="flex flex-wrap items-baseline gap-x-2">
            <span className="font-sans text-base font-bold leading-tight text-amber-950">{a.name}</span>
            {a.handle && <span className="font-mono text-[11px] text-stone-400">{a.handle}</span>}
          </div>
          <span
            className={cn(
              'mt-1.5 inline-flex items-center gap-1.5 font-mono text-[11px] font-semibold uppercase tracking-wide',
              available ? 'text-emerald-700' : 'text-amber-800',
            )}
          >
            <span className="relative flex h-2 w-2">
              {available && (
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/70" />
              )}
              <span className={cn('relative inline-flex h-2 w-2 rounded-full', available ? 'bg-emerald-500' : 'bg-amber-500')} />
            </span>
            {available ? a.availableStatus : a.unavailableStatus}
          </span>
        </div>
      </div>

      {(a.responseTime || a.location) && (
        <div className="flex flex-wrap gap-2">
          {a.responseTime && (
            <Pill tone="stone" className="gap-1 px-2.5 py-1 text-[11px] font-medium">
              <Clock className="h-3 w-3" /> {a.responseTime}
            </Pill>
          )}
          {a.location && (
            <Pill tone="stone" className="gap-1 px-2.5 py-1 text-[11px] font-medium">
              <MapPin className="h-3 w-3" /> {a.location}
            </Pill>
          )}
        </div>
      )}
    </div>
  );
}
