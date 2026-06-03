'use client'

import { useAvailability } from './AvailabilityProvider'

// Small "online status" pill driven by the global availability (Site → Availability).
// Green + pulsing when taking clients, muted when not. Client component so it can
// read the context; safe to drop inside server components.
export default function AvailabilityBadge({ className = '' }: { className?: string }) {
  const data = useAvailability()
  if (!data) return null
  const available = data.available
  const text = available ? data.availableStatus : data.unavailableStatus

  return (
    <div
      className={`flex items-center gap-2 rounded-2xl border p-4 shadow-lg ${
        available
          ? 'border-emerald-250 bg-emerald-50 text-emerald-950'
          : 'border-stone-200 bg-stone-50 text-stone-600'
      } ${className}`}
    >
      <span className="relative flex size-2.5">
        {available && (
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
        )}
        <span
          className={`relative inline-flex size-2.5 rounded-full ${
            available ? 'bg-emerald-500' : 'bg-stone-400'
          }`}
        />
      </span>
      <span className="font-mono text-xs font-semibold">{text}</span>
    </div>
  )
}
