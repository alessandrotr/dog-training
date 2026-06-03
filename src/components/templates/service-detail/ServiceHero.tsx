'use client'

import type { Ref } from 'react'
import Image from 'next/image'
import { ClipboardPlus, ClipboardCheck, CalendarClock, BellPlus } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useInquiryToggle } from '@/features/inquiry/components/InquiryCartProvider'
import { useBookingMode } from '@/features/availability/components/AvailabilityProvider'
import { useLeadDialog } from '@/features/lead/stores/lead-dialog'
import { Button, PriceTag, Heading, Text } from '@/components/ui'
import type { ServiceItem } from '@/types'

export default function ServiceHero({
  service,
  heroRef,
}: {
  service: ServiceItem
  heroRef: Ref<HTMLElement>
}) {
  const { t } = useTranslation()
  const { open } = useLeadDialog()
  const { available, mode } = useBookingMode()
  const { added, toggle } = useInquiryToggle(service)

  return (
    <section
      ref={heroRef}
      className="relative -mt-16 overflow-hidden bg-linear-to-b from-amber-200 to-amber-50"
    >
      {service.imageUrl && (
        <>
          <Image
            src={service.imageUrl}
            alt={service.title}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-85"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-linear-to-r from-stone-50/95 via-stone-50/80 to-stone-50/40" />
        </>
      )}
      {/* Seamless fade into the body (stone-50) */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-linear-to-b from-transparent to-stone-50 md:h-32" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 pt-24 pb-12 sm:px-6 md:pt-36 md:pb-20 lg:px-8">
        <div className="flex max-w-2xl flex-col gap-4 max-lg:mb-4 lg:gap-8">
          <Heading level={1} size="display">
            {service.title}
          </Heading>
          <Text size="base" tone="default" className="max-w-xl text-lg">
            {service.shortDescription}
          </Text>

          <PriceTag price={service.price} size="lg" />

          <div className="flex flex-col gap-3 pt-2 sm:flex-row">
            <Button
              type="button"
              variant="cta"
              size="xl"
              onClick={toggle}
              className={added ? 'bg-emerald-600 hover:bg-emerald-700' : ''}
            >
              {added ? (
                <>
                  <ClipboardCheck className="h-4 w-4" /> Added to inquiry
                </>
              ) : (
                <>
                  <ClipboardPlus className="h-4 w-4" /> Add to inquiry
                </>
              )}
            </Button>
            <Button type="button" variant="ctaOutline" size="xl" onClick={() => open(mode)}>
              {available ? <CalendarClock className="h-4 w-4" /> : <BellPlus className="h-4 w-4" />}{' '}
              {available ? 'Book a consult' : t('booking.waitlist')}
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
