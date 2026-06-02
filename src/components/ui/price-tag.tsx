import { Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'

// "Starting at €X / period" — the amount pops, the period is a soft suffix,
// topped by a little heather "Starting at" chip. Shared by the service card and
// service detail. Renders nothing without a price.
const AMOUNT = {
  sm: 'text-2xl',
  lg: 'text-4xl',
} as const

export default function PriceTag({
  price,
  size = 'sm',
  className,
}: {
  price?: string
  size?: keyof typeof AMOUNT
  className?: string
}) {
  if (!price) return null
  // Price reads e.g. "€100 / 2 hours" — split the amount from its period.
  const [amount, ...rest] = price.split(' / ')
  const period = rest.join(' / ')

  return (
    <div className={cn('leading-none', className)}>
      <span className="inline-flex items-center gap-1 rounded-full bg-amber-100/70 px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-[0.12em] text-amber-800 ring-1 ring-amber-200/60">
        <Sparkles className="h-2.5 w-2.5" /> Starting at
      </span>
      <div className="mt-2 flex items-baseline gap-1">
        <span
          className={cn('font-sans font-extrabold tracking-tight text-amber-950', AMOUNT[size])}
        >
          {amount}
        </span>
        {period && <span className="font-mono text-xs font-medium text-stone-400">/ {period}</span>}
      </div>
    </div>
  )
}
