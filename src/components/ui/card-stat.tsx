import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

// A single count stat shown on cards: icon + number + pluralized noun, e.g.
// "3 case studies", "2 guides", "1 service". One place for the styling so every
// card's counts read identically. `plural` handles irregulars (study → studies).
const TONES = {
  brand: 'text-amber-800',
  muted: 'text-stone-500',
} as const

export default function CardStat({
  icon: Icon,
  count,
  singular,
  plural,
  tone = 'brand',
  className,
}: {
  icon: LucideIcon
  count: number
  singular: string
  plural?: string
  tone?: keyof typeof TONES
  className?: string
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 font-mono text-[11px] font-semibold',
        TONES[tone],
        className,
      )}
    >
      <Icon className="h-3.5 w-3.5" />
      {count} {count === 1 ? singular : plural ?? `${singular}s`}
    </span>
  )
}
