import { Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'

// "Starting at €X / period" — the amount pops, the period is a soft suffix,
// topped by a little heather "Starting at" chip. Shared by the service card and
// service detail. Renders nothing without a price.
const AMOUNT = {
  sm: 'text-3xl',
  lg: 'text-5xl',
} as const

// The leading currency mark, sized down + raised against the big number.
const CURRENCY = {
  sm: 'text-sm',
  lg: 'text-lg',
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
  // Peel the leading currency mark (€, $, £…) off the number for separate styling.
  const match = amount.match(/^(\D*)(.*)$/)
  const currency = match?.[1]?.trim() ?? ''
  const number = match?.[2]?.trim() || amount

  return (
    <div className={cn('leading-none', className)}>
      <span className="inline-flex items-center gap-1 rounded-full bg-amber-100/70 px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-[0.12em] text-amber-800 ring-1 ring-amber-200/60">
        <Sparkles className="h-2.5 w-2.5" /> Starting at
      </span>
      <div className="mt-2 flex items-baseline gap-1">
        <span className="inline-flex items-start">
          {currency && (
            <span
              className={cn(
                'mt-0.5 mr-0.5 font-sans font-bold text-amber-600',
                CURRENCY[size],
              )}
            >
              {currency}
            </span>
          )}
          <span
            className={cn(
              'bg-linear-to-br from-amber-500 via-amber-700 to-amber-950 bg-clip-text font-sans font-black tracking-tight text-transparent',
              AMOUNT[size],
            )}
          >
            {number}
          </span>
        </span>
        {period && <span className="font-mono text-xs font-medium text-stone-400">/ {period}</span>}
      </div>
    </div>
  )
}
