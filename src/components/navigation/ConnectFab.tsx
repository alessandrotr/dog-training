'use client';

import {useTranslation} from 'react-i18next';
import {PawPrint} from 'lucide-react';
import {cn} from '@/lib/utils';
import {useLeadDialog} from '@/stores/lead-dialog';

// Fixed bottom-right action that opens the connect dialog. Replaces the old
// full-width mobile sticky banner; shown on every viewport. Tucks away while
// the dialog is open.
export default function ConnectFab() {
  const {t} = useTranslation();
  const {open, isOpen} = useLeadDialog();

  return (
    <button
      type="button"
      onClick={() => open('book')}
      aria-label={t('booking.headline')}
      className={cn(
        'fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-40 flex items-center gap-3.5 rounded-full bg-amber-900 py-3.5 pl-4 pr-5 text-white shadow-lg shadow-amber-950/25 ring-1 ring-amber-500/20 transition-all duration-300 ease-out hover:bg-amber-950 hover:shadow-xl active:scale-95 sm:right-6 sm:bottom-6',
        isOpen ? 'pointer-events-none translate-y-28 opacity-0' : 'translate-y-0 opacity-100',
      )}
    >
      <span className="relative flex h-6 w-6 items-center justify-center">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-300/40 duration-2000 ease-out delay-1000" />
        <PawPrint className="relative h-5 w-5" />
      </span>
      <span className="text-sm font-semibold tracking-tight">{t('booking.tab')}</span>
    </button>
  );
}
