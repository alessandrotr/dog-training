'use client'

import { useTranslation } from 'react-i18next'

// Shown above the form when fully booked, explaining it's a waitlist join.
export default function WaitlistBanner() {
  const { i18n } = useTranslation()
  const de = i18n.language === 'de'
  return (
    <div className="rounded-2xl border border-amber-200/60 bg-amber-50 p-3.5 text-[13px] leading-relaxed text-amber-900">
      <span className="font-bold">{de ? 'Aktuell ausgebucht.' : 'Currently fully booked.'}</span>{' '}
      {de
        ? 'Trag dich in die Warteliste ein – Sophia meldet sich, sobald ein Platz frei wird.'
        : 'Join the waitlist and Sophia will reach out as soon as a spot opens up.'}
    </div>
  )
}
