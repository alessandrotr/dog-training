import type { ComponentPropsWithoutRef } from 'react'
import { cn } from '@/lib/utils'

// Brand heading scale. `level` is the semantic tag (h1–h6); `size` is the visual
// token (decoupled, so an SEO h1 can look like a section header). One place owns
// font/size/weight/tracking — no more bespoke `text-3xl font-extrabold …`.
const SIZES = {
  display: 'text-4xl font-extrabold tracking-tight leading-tight sm:text-5xl',
  title: 'text-3xl font-extrabold tracking-tight sm:text-4xl',
  section: 'text-2xl font-extrabold tracking-tight',
  card: 'text-lg font-bold leading-snug',
  cardSm: 'text-base font-bold leading-snug',
} as const

const TONES = {
  default: 'text-amber-950', // page/section headings (deep heather plum)
  dark: 'text-stone-900', // card titles
  inverse: 'text-white', // on dark backgrounds
} as const

type HeadingProps = {
  level?: 1 | 2 | 3 | 4 | 5 | 6
  size?: keyof typeof SIZES
  tone?: keyof typeof TONES
} & ComponentPropsWithoutRef<'h2'>

export default function Heading({
  level = 2,
  size = 'title',
  tone,
  className,
  ...rest
}: HeadingProps) {
  const Tag = `h${level}` as const
  // Card sizes default to the softer stone-900; larger headings to plum.
  const resolvedTone = tone ?? (size === 'card' || size === 'cardSm' ? 'dark' : 'default')
  return <Tag className={cn('font-sans', SIZES[size], TONES[resolvedTone], className)} {...rest} />
}
