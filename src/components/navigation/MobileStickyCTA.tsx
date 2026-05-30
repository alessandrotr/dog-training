import React from 'react';
import Link from 'next/link';
import { CalendarRange, Sparkles } from 'lucide-react';
import { useHref } from '../../lib/navigation';

export default function MobileStickyCTA() {
  const href = useHref();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-stone-50/95 backdrop-blur-md border-t border-stone-200 px-4 py-3.5 shadow-[0_-4px_16px_rgba(0,0,0,0.08)] md:hidden flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <Sparkles className="h-4 w-4 text-amber-800 animate-pulse" />
        <div className="text-left leading-none">
          <p className="text-xs font-bold text-amber-950 font-sans tracking-tight">Free 15-min Consult</p>
          <p className="text-[10px] text-stone-500 font-mono">CCPDT Certified • In-Home</p>
        </div>
      </div>
      
      <Link
        href={href.page('booking')}
        className="flex items-center space-x-1.5 rounded-lg bg-amber-900 px-4 py-2 text-xs font-semibold tracking-wide text-white transition-all active:scale-95"
      >
        <CalendarRange className="h-3.5 w-3.5" />
        <span>Book Slot</span>
      </Link>
    </div>
  );
}
