'use client';

import {CalendarClock} from 'lucide-react';
import {Heading, Text} from '@/components/ui';

// Config-driven scheduler slot. Set NEXT_PUBLIC_SCHEDULER_URL (Cal.com / Calendly
// inline embed URL) to render the real widget; until then shows a friendly
// branded placeholder. `url` can later be sourced from Storyblok site config.
const ENV_URL = process.env.NEXT_PUBLIC_SCHEDULER_URL;
const isDev = process.env.NODE_ENV !== 'production';

export default function Scheduler({url = ENV_URL}: {url?: string}) {
  if (url) {
    return (
      <iframe
        src={url}
        title="Booking scheduler"
        className="h-[460px] w-full rounded-2xl border border-stone-200 sm:h-[520px]"
        loading="lazy"
      />
    );
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-2xl bg-stone-100/70 px-6 py-12 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-700 text-amber-50 shadow-sm ring-1 ring-amber-500/20">
        <CalendarClock className="h-7 w-7" />
      </div>
      <div className="space-y-1.5">
        <Heading level={3} size="cardSm" tone="default">Live booking opens here soon</Heading>
        <Text size="sm" tone="muted" className="mx-auto max-w-xs">
          In the meantime, hop over to the <span className="font-semibold text-amber-800">Message</span> tab and
          Sophia will personally arrange your free consult.
        </Text>
      </div>
      {isDev && (
        <p className="mt-2 max-w-xs font-mono text-[10px] leading-relaxed text-stone-400">
          dev: set <code className="rounded bg-stone-200 px-1">NEXT_PUBLIC_SCHEDULER_URL</code> (Cal.com / Calendly) to embed the live widget.
        </p>
      )}
    </div>
  );
}
