'use client'

import { useTranslation } from 'react-i18next'
import { CalendarClock, BellPlus } from 'lucide-react'
import { cn } from '@/lib/utils'
import CtaDecor from '@/components/ui/cta-decor'
import { useHideOnScroll } from '@/hooks/use-hide-on-scroll'
import { useBookingMode } from '@/features/availability/components/AvailabilityProvider'
import { useLeadDialog } from '@/features/lead/stores/lead-dialog'

// Fixed bottom-right action that opens the connect dialog. Tucks away while the
// dialog is open, and slides down on scroll-down / back up on scroll-up
// (mirrors the Navbar's hide-on-scroll behaviour).
export default function ConnectFab() {
  const { t } = useTranslation()
  const { open, isOpen } = useLeadDialog()
  const { hidden } = useHideOnScroll()
  // Fully booked → there are no consult slots, so the FAB becomes a waitlist
  // join that drops straight into the Message tab.
  const { available, mode } = useBookingMode()
  const label = available ? t('booking.tab') : t('booking.waitlist')

  return (
    <button
      type="button"
      onClick={() => open(mode)}
      aria-label={label}
      className={cn(
        'fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-40 isolate flex items-center gap-4 overflow-hidden rounded-full py-3.5 pl-4 pr-5 text-white ring-1 ring-amber-400/30 shadow-sm shadow-amber-950/15 transition-all duration-300 ease-out hover:brightness-105 hover:shadow-md active:scale-95 sm:right-6 sm:bottom-6 [background-image:radial-gradient(circle,rgba(255,255,255,0.08)_1.5px,transparent_1.5px),linear-gradient(to_bottom_right,var(--color-amber-500),var(--color-amber-600),var(--color-amber-800))] [background-size:16px_16px,100%_100%]',
        isOpen || hidden
          ? 'pointer-events-none translate-y-28 opacity-0'
          : 'translate-y-0 opacity-100',
      )}
    >
      <CtaDecor />
      <span className="relative flex h-6 w-6 items-center justify-center">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-300/40 duration-2000 ease-out delay-1000" />
        {available ? (
          <CalendarClock className="relative h-5 w-5" />
        ) : (
          <BellPlus className="relative h-5 w-5" />
        )}
      </span>
      <span className="text-xs font-mono uppercase font-bold tracking-tight">{label}</span>
    </button>
  )
}
