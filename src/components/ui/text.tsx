import type { ElementType, ComponentPropsWithoutRef } from 'react'
import { cn } from '@/lib/utils'

// Body copy. Fixed size + tone tokens so paragraphs stop carrying ad-hoc
// `text-sm text-stone-500 leading-relaxed`. Polymorphic via `as` (p default).
const SIZES = {
  xs: 'text-xs',
  sm: 'text-sm',
  base: 'text-base',
} as const

const TONES = {
  default: 'text-stone-600',
  muted: 'text-stone-500',
  subtle: 'text-stone-400',
  inverse: 'text-stone-300',
} as const

type TextProps = {
  as?: ElementType
  size?: keyof typeof SIZES
  tone?: keyof typeof TONES
} & ComponentPropsWithoutRef<'p'>

export default function Text({
  as: Tag = 'p',
  size = 'sm',
  tone = 'muted',
  className,
  ...rest
}: TextProps) {
  return (
    <Tag
      className={cn('font-sans leading-relaxed', SIZES[size], TONES[tone], className)}
      {...rest}
    />
  )
}
