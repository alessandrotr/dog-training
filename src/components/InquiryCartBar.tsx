'use client';

import {ClipboardList, X} from 'lucide-react';
import {useInquiryCart} from './InquiryCartProvider';
import {useLeadDialog} from '../stores/lead-dialog';

// Floating inquiry-cart pill (bottom-left, opposite the ConnectFab). Appears
// only when services have been added; opens the Contact dialog to send them,
// with a built-in clear (✕) to empty the inquiry without opening it.
export default function InquiryCartBar() {
  const {items, clear} = useInquiryCart();
  const {open, isOpen} = useLeadDialog();

  const show = items.length > 0 && !isOpen;

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-[max(1rem,env(safe-area-inset-bottom))] z-40 sm:bottom-6">
      <div className="mx-auto flex max-w-7xl justify-start px-4 sm:px-6 lg:px-8">
        <div
          className={`pointer-events-auto flex items-center gap-1 rounded-full border border-stone-200 bg-white py-1.5 pl-2 pr-1.5 shadow-lg shadow-stone-900/10 transition-all duration-300 ease-out ${
            show ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-28 opacity-0'
          }`}
        >
          <button
            type="button"
            onClick={() => open('contact')}
            aria-label={`Send inquiry about ${items.length} service${items.length > 1 ? 's' : ''}`}
            className="group flex items-center gap-2.5 rounded-full py-1.5 pl-1.5 pr-3 transition-colors hover:bg-stone-50 active:scale-95"
          >
            <span className="relative flex h-7 w-7 items-center justify-center rounded-full bg-amber-700 text-white">
              <ClipboardList className="h-4 w-4" />
              <span className="absolute -right-1.5 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-stone-900 px-1 text-[10px] font-bold text-white">
                {items.length}
              </span>
            </span>
            <span className="text-xs font-mono font-bold uppercase tracking-tight text-amber-950">Send inquiry</span>
          </button>
          <button
            type="button"
            onClick={clear}
            aria-label="Clear inquiry"
            title="Clear inquiry"
            className="flex h-8 w-8 items-center justify-center rounded-full text-stone-400 transition-colors hover:bg-stone-100 hover:text-stone-700 active:scale-90"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
