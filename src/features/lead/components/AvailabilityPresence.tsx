'use client'

import { MapPin } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Avatar } from '@/components/ui'
import { useAvailability } from '@/features/availability/components/AvailabilityProvider'

// Live "presence" row for the lead dialog header: trainer avatar + name, the
// location line, and an animated status badge (pulsing emerald when taking
// clients, steady amber when booked). All from the global availability record
// Sophia edits once in Storyblok.
export default function AvailabilityPresence() {
  const a = useAvailability()
  if (!a) return null
  const { available } = a

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3.5">
        <Avatar src={a.avatar} name={a.name} size="lg" />
        <div className="min-w-0">
          <div className="flex flex-wrap items-baseline gap-x-2">
            <span className="font-sans text-base font-bold leading-tight text-amber-950">
              {a.name}
            </span>
          </div>
          {a.location && (
            <span className="mt-1 flex items-center gap-1 font-mono text-xs text-stone-500">
              <MapPin className="h-3 w-3 text-amber-700" />
              {a.location}
            </span>
          )}
          <span
            className={cn(
              'mt-1.5 inline-flex items-center gap-1.5 font-mono text-[11px] font-semibold uppercase tracking-wide',
              available ? 'text-emerald-700' : 'text-amber-800',
            )}
          >
            <span className="relative flex h-2 w-2">
              {available && (
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/70" />
              )}
              <span
                className={cn(
                  'relative inline-flex h-2 w-2 rounded-full',
                  available ? 'bg-emerald-500' : 'bg-amber-500',
                )}
              />
            </span>
            {available ? a.availableStatus : a.unavailableStatus}
          </span>
        </div>
      </div>
    </div>
  )
}
