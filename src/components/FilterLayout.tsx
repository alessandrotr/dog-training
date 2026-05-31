'use client';

import {useState} from 'react';
import {SlidersHorizontal, X} from 'lucide-react';

// Listings-style layout (à la ImmoScout): a sticky filter rail on the left with
// the results on the right. On mobile the rail collapses behind a Filters toggle.
export default function FilterLayout({
  sidebar,
  children,
  activeCount = 0,
}: {
  sidebar: React.ReactNode;
  children: React.ReactNode;
  activeCount?: number;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="grid gap-8 lg:grid-cols-[16rem_1fr]">
      {/* Mobile Filters toggle */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="inline-flex w-fit items-center gap-2 rounded-xl border border-stone-300 bg-white px-4 py-2.5 font-mono text-xs font-bold uppercase tracking-wide text-stone-700 lg:hidden"
      >
        {open ? <X className="h-4 w-4" /> : <SlidersHorizontal className="h-4 w-4" />}
        Filters{activeCount ? ` · ${activeCount}` : ''}
      </button>

      <aside className={`${open ? 'block' : 'hidden'} lg:block lg:sticky lg:top-(--nav-offset) lg:h-fit lg:transition-[top] lg:duration-300 lg:ease-out`}>{sidebar}</aside>

      <div className="min-w-0">{children}</div>
    </div>
  );
}
