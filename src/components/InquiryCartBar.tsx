'use client';

import {ClipboardList, ArrowRight} from 'lucide-react';
import {useInquiryCart} from './InquiryCartProvider';
import {useLeadDialog} from '../stores/lead-dialog';

// Floating inquiry-cart pill (bottom-left, opposite the ConnectFab). Appears
// only when services have been added; opens the Contact dialog to send them.
export default function InquiryCartBar() {
  const {items} = useInquiryCart();
  const {open, isOpen} = useLeadDialog();

  const show = items.length > 0 && !isOpen;

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-[max(1rem,env(safe-area-inset-bottom))] z-40 sm:bottom-6">
      <div className="mx-auto flex max-w-7xl justify-start px-4 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={() => open('contact')}
          aria-label={`Send inquiry about ${items.length} service${items.length > 1 ? 's' : ''}`}
          className={`pointer-events-auto flex items-center gap-2.5 rounded-full border border-stone-200 bg-white py-3 pl-3.5 pr-5 shadow-lg shadow-stone-900/10 transition-all duration-300 ease-out hover:border-stone-300 active:scale-95 ${
            show ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-28 opacity-0'
          }`}
        >
          <span className="relative flex h-7 w-7 items-center justify-center rounded-full bg-amber-700 text-white">
            <ClipboardList className="h-4 w-4" />
            <span className="absolute -right-1.5 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-stone-900 px-1 text-[10px] font-bold text-white">
              {items.length}
            </span>
          </span>
          <span className="text-xs font-mono font-bold uppercase tracking-tight text-amber-950">Send inquiry</span>
          <ArrowRight className="h-4 w-4 text-amber-700" />
        </button>
      </div>
    </div>
  );
}
