import type { ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

const TONES = {
  amber: 'bg-amber-50 text-amber-700 ring-amber-200/50',
  stone: 'bg-stone-100 text-stone-500 ring-stone-200/60',
} as const

// Small icon + label pill for card/article metadata (reading time, date, …).
// One source of truth for the badge look; semantic wrappers (ReadingTime,
// PublishDate) pick the icon and pass the value as children.
export default function MetaPill({
  icon: Icon,
  tone = 'amber',
  className,
  children,
}: {
  icon: LucideIcon
  tone?: keyof typeof TONES
  className?: string
  children: ReactNode
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-mono text-[11px] font-semibold ring-1',
        TONES[tone],
        className,
      )}
    >
      <Icon className="size-3" />
      {children}
    </span>
  )
}
