'use client'

import { useTranslation } from 'react-i18next'
import { CheckCircle2 } from 'lucide-react'
import { Button, Heading, Text } from '@/components/ui'

// Confirmation state shown after a successful submit, with a "send another"
// reset. Copy adapts to the waitlist (fully booked) framing.
export default function LeadFormSuccess({
  waitlist,
  onReset,
}: {
  waitlist: boolean
  onReset: () => void
}) {
  const { t, i18n } = useTranslation()
  const de = i18n.language === 'de'
  return (
    <div className="flex flex-col items-center gap-3 py-8 text-center">
      <div className="flex size-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
        <CheckCircle2 className="size-7" />
      </div>
      <Heading level={3} size="card">
        {waitlist
          ? de
            ? 'Du bist auf der Warteliste!'
            : "You're on the waitlist!"
          : t('contact.successTitle')}
      </Heading>
      <Text className="max-w-sm">
        {waitlist
          ? de
            ? 'Sophia meldet sich, sobald ein Platz frei wird.'
            : 'Sophia will reach out as soon as a spot opens up.'
          : t('contact.successText')}
      </Text>
      <Button variant="outline" onClick={onReset}>
        {t('contact.sendAnother')}
      </Button>
    </div>
  )
}
