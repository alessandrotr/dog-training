'use client'

import type { ComponentProps, ReactNode } from 'react'
import { ScrollArea as Base } from '@base-ui/react/scroll-area'
import { cn } from '@/lib/utils'

// Themed scroll container built on Base UI's ScrollArea (same primitive family
// as our Accordion/Dialog). Constrain the height with `className`
// (e.g. `max-h-72`) and the viewport scrolls once content exceeds it. The thin
// overlay scrollbar fades in while hovering or scrolling, so it never crowds
// the content at rest. `viewportClassName` styles the inner scroll region.
export default function ScrollArea({
  className,
  viewportClassName,
  children,
  ...props
}: ComponentProps<typeof Base.Root> & {
  viewportClassName?: string
  children?: ReactNode
}) {
  return (
    <Base.Root className={cn('relative overflow-hidden', className)} {...props}>
      <Base.Viewport
        // The viewport (overflow: scroll) carries the height cap itself via
        // `max-h-[inherit]` — it inherits whatever `max-h-*` is set on the Root.
        // `h-full` alone can't resolve against a max-height-only parent, so the
        // viewport would never scroll without this.
        className={cn(
          'h-full max-h-[inherit] w-full overscroll-contain rounded-[inherit]',
          viewportClassName,
        )}
      >
        {children}
      </Base.Viewport>
      <Base.Scrollbar
        orientation="vertical"
        className="m-0.5 flex w-1.5 touch-none select-none justify-center opacity-0 transition-opacity duration-200 ease-out data-hovering:opacity-100 data-scrolling:opacity-100"
      >
        <Base.Thumb className="w-full rounded-full bg-stone-300 transition-colors hover:bg-stone-400" />
      </Base.Scrollbar>
      <Base.Corner />
    </Base.Root>
  )
}
