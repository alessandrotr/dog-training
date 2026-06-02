'use client'

import { createContext, useContext } from 'react'
import type { AvailabilityData } from '@/types'

// App-wide availability, sourced once from the Site Config and provided here so
// every <Availability /> (home hero, blog sidebar, anywhere) renders the same
// data. Sophia edits it in one place; the whole site updates.
const AvailabilityContext = createContext<AvailabilityData | null>(null)

export function AvailabilityProvider({
  value,
  children,
}: {
  value: AvailabilityData
  children: React.ReactNode
}) {
  return <AvailabilityContext.Provider value={value}>{children}</AvailabilityContext.Provider>
}

export function useAvailability(): AvailabilityData | null {
  return useContext(AvailabilityContext)
}

// Just the open/booked boolean, defaulting to available when no data is set —
// the single rule every booking CTA uses to decide book vs. waitlist.
export function useIsAvailable(): boolean {
  return useAvailability()?.available ?? true
}

// Which lead-dialog tab a booking CTA should open: the scheduler when taking
// clients, otherwise the message/waitlist tab. One rule for every `open(...)`.
export function useBookingMode(): { available: boolean; mode: 'book' | 'contact' } {
  const available = useIsAvailable()
  return { available, mode: available ? 'book' : 'contact' }
}
