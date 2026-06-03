'use client'

import { ClipboardPlus, ClipboardCheck } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useHideOnScroll } from '@/hooks/use-hide-on-scroll'
import { useInquiryToggle } from '@/features/inquiry/components/InquiryCartProvider'
import { Button } from '@/components/ui'
import type { ServiceItem } from '@/types'

export default function ServiceStickyBar({
  service,
  heroInView,
}: {
  service: ServiceItem
  heroInView: boolean
}) {
  const { added, toggle } = useInquiryToggle(service)
  const { hidden: navHidden } = useHideOnScroll()

  return (
    <div
      className={cn(
        'fixed inset-x-0 z-30 border-b border-stone-200 bg-stone-50/90 backdrop-blur-md transition-[top,translate] duration-300 ease-out',
        // top-0 while hidden (so the full-height translate clears the screen) or
        // when the navbar is hidden; otherwise tuck below the navbar.
        heroInView || navHidden ? 'top-0' : 'top-16',
        heroInView ? '-translate-y-full' : 'translate-y-0',
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2.5 sm:px-6 lg:px-8">
        <div className="flex min-w-0 flex-col leading-tight sm:flex-row sm:items-baseline sm:gap-2.5 sm:leading-normal">
          <span className="truncate font-sans text-sm font-bold text-amber-950">
            {service.title}
          </span>
          <span className="shrink-0 font-sans text-xs font-bold text-amber-700 sm:text-sm">
            {service.price}
          </span>
        </div>
        <Button
          type="button"
          variant="cta"
          size="lg"
          onClick={toggle}
          className={cn('shrink-0', added && 'bg-emerald-600 hover:bg-emerald-700')}
        >
          {added ? (
            <>
              <ClipboardCheck className="h-4 w-4" /> Added
            </>
          ) : (
            <>
              <ClipboardPlus className="h-4 w-4" /> Add to inquiry
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
