'use client';

import {useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {Dialog as DialogPrimitive} from '@base-ui/react/dialog';
import {CalendarClock, MessageCircle, X, PawPrint, Lock} from 'lucide-react';
import {cn} from '@/lib/utils';
import {Tabs, TabsList, TabsTrigger, TabsContent} from '@/components/ui/tabs';
import {useLeadDialog, type LeadMode} from '@/features/lead/stores/lead-dialog';
import {useAvailability} from '@/features/availability/components/AvailabilityProvider';
import {Text} from '@/components/ui';
import AvailabilityPresence from './AvailabilityPresence';
import Scheduler from './Scheduler';
import LeadForm from './LeadForm';

// Branded, responsive lead dialog: a bottom-sheet on mobile that becomes a
// centered card on desktop. Composes the Base UI dialog primitive (focus trap,
// aria-modal, scroll-lock) with fully custom brand styling.
export default function LeadDialog() {
  const {t, i18n} = useTranslation();
  const {isOpen, mode, close, setMode} = useLeadDialog();
  const availability = useAvailability();
  const available = availability?.available ?? true;
  const waitlistLabel = i18n.language === 'de' ? 'Warteliste' : 'Waitlist';
  const title = mode === 'contact' ? t('contact.headline') : t('booking.headline');
  const description = mode === 'contact' ? t('contact.subheadline') : t('booking.subheadline');

  // Fully booked → there are no consult slots, so steer the booking tab to the
  // Message/waitlist tab instead of showing an empty scheduler.
  useEffect(() => {
    if (isOpen && !available && mode === 'book') setMode('contact');
  }, [isOpen, available, mode, setMode]);

  return (
    <DialogPrimitive.Root open={isOpen} onOpenChange={(open) => !open && close()}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Backdrop
          className={cn(
            'fixed inset-0 z-50 bg-stone-950/40 backdrop-blur-[3px]',
            'data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0 duration-200',
          )}
        />
        <DialogPrimitive.Popup
          // Focus the popup itself, not the first field — otherwise the sheet
          // scrolls the Name input flush to the top and clips its label.
          initialFocus={false}
          className={cn(
            'fixed z-50 flex flex-col overflow-hidden bg-stone-50 shadow-2xl outline-none ring-1 ring-stone-900/5',
            // Mobile: bottom sheet
            'inset-x-0 bottom-0 max-h-[92dvh] rounded-t-3xl',
            // Desktop: centered card
            'sm:inset-x-auto sm:bottom-auto sm:left-1/2 sm:top-1/2 sm:max-h-[90dvh] sm:w-[calc(100%-2rem)] sm:max-w-2xl sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-3xl',
            // Entrance / exit
            'duration-200 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-open:slide-in-from-bottom-4',
            'data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95 data-closed:slide-out-to-bottom-4',
          )}
        >
          {/* Header — fills the rounded top of the sheet; the mobile drag
              handle rides on the gradient so there's no off-white seam. */}
          <div className="relative shrink-0 overflow-hidden bg-linear-to-br from-amber-100 via-stone-50 to-stone-50 px-6 pt-4 sm:px-7 sm:pt-7">
            <div className="mx-auto mb-3.5 h-1 w-10 rounded-full bg-stone-300/80 sm:hidden" />
            <PawPrint className="pointer-events-none absolute -right-3 -top-4 h-20 w-20 rotate-12 text-amber-300/40" />
            <div className="relative pr-8">
              {availability ? (
                <>
                  <AvailabilityPresence />
                  {/* Accessible names for the dialog (presence row is the visible header) */}
                  <DialogPrimitive.Title className="sr-only">{`${availability.name} — ${title}`}</DialogPrimitive.Title>
                  <DialogPrimitive.Description className="sr-only">{description}</DialogPrimitive.Description>
                </>
              ) : (
                <div className="min-w-0 space-y-1">
                  <DialogPrimitive.Title className="font-sans text-lg font-extrabold leading-tight tracking-tight text-amber-950">
                    {title}
                  </DialogPrimitive.Title>
                  <DialogPrimitive.Description className="line-clamp-2 text-[13px] leading-relaxed text-stone-500">
                    {description}
                  </DialogPrimitive.Description>
                </div>
              )}
            </div>
            <DialogPrimitive.Close
              aria-label="Close"
              className="absolute right-3.5 top-3.5 flex h-8 w-8 items-center justify-center rounded-full text-stone-500 transition hover:bg-stone-900/5 hover:text-stone-900 focus-visible:ring-2 focus-visible:ring-amber-700/40 focus-visible:outline-none"
            >
              <X className="h-[18px] w-[18px]" />
            </DialogPrimitive.Close>
          </div>

          {/* Body */}
          <div className="flex min-h-0 flex-1 flex-col px-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-4 sm:px-7">
            <Tabs
              value={mode}
              onValueChange={(v) => setMode(v as LeadMode)}
              className="flex min-h-0 w-full flex-1 flex-col gap-4"
            >
              <TabsList className="w-full shrink-0">
                <TabsTrigger value="book" disabled={!available} title={!available ? 'Fully booked right now' : undefined}>
                  {available ? <CalendarClock /> : <Lock />} {t('booking.tab')}
                </TabsTrigger>
                <TabsTrigger value="contact">
                  <MessageCircle /> {available ? t('contact.tab') : waitlistLabel}
                </TabsTrigger>
              </TabsList>

              <div className="-mx-1 min-h-0 flex-1 overflow-y-auto px-1 pt-1 scroll-pt-2">
                <TabsContent value="book">
                  {available ? (
                    <Scheduler />
                  ) : (
                    <div className="flex flex-col items-center gap-3 rounded-2xl bg-stone-100/70 px-6 py-12 text-center">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-700/15 text-amber-800">
                        <Lock className="h-6 w-6" />
                      </div>
                      <Text size="sm" className="font-semibold text-amber-950">{availability?.unavailableStatus ?? 'Fully booked right now'}</Text>
                    </div>
                  )}
                </TabsContent>
                <TabsContent value="contact">
                  <LeadForm available={available} />
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </DialogPrimitive.Popup>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
