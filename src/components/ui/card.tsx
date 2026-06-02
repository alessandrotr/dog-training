import type { ElementType, ComponentPropsWithoutRef } from 'react'
import { cn } from '@/lib/utils'

// The shared card surface (white panel, hairline border, rounded). Centralises
// the one "card skin" token so a restyle is a single edit. Polymorphic via `as`
// (div default; pass a Link/figure/aside). `padding` + `interactive` cover the
// common axes; everything else (shadow, flex, overflow) rides on `className`.
const PADDING = {
  none: '',
  sm: 'p-5',
  md: 'p-6',
} as const

type CardProps<T extends ElementType> = {
  as?: T
  padding?: keyof typeof PADDING
  interactive?: boolean // hover affordance for clickable cards
} & Omit<ComponentPropsWithoutRef<T>, 'as'>

export default function Card<T extends ElementType = 'div'>({
  as,
  padding = 'none',
  interactive = false,
  className,
  ...rest
}: CardProps<T>) {
  const Tag = (as ?? 'div') as ElementType
  return (
    <Tag
      className={cn(
        'rounded-2xl border border-stone-200 bg-white',
        PADDING[padding],
        interactive &&
          'cursor-pointer transition-[transform,border-color,box-shadow] duration-200 hover:border-stone-300 hover:shadow-sm active:scale-[0.98] active:shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-700/40 focus-visible:ring-offset-2',
        className,
      )}
      {...rest}
    />
  )
}
