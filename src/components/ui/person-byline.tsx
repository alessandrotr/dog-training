import Link from 'next/link'
import { cn } from '@/lib/utils'
import Avatar from './avatar'

// Avatar + name (+ breed) identity row, shared by the case-study card, the
// featured testimonial and the case-study detail header. Pass `href` to link
// the name; `stretched` makes that link cover the nearest relative ancestor
// (whole-card click); `slideProps` is the carousel drag-guard.
const SIZES = {
  sm: { name: 'text-sm', breed: 'text-[11px]' },
  lg: { name: 'text-base', breed: 'text-xs' },
} as const

export default function PersonByline({
  name,
  breed,
  imageUrl,
  size = 'sm',
  href,
  stretched = false,
  slideProps,
  className,
}: {
  name: string
  breed?: string
  imageUrl?: string
  size?: keyof typeof SIZES
  href?: string
  stretched?: boolean
  slideProps?: Record<string, unknown>
  className?: string
}) {
  const s = SIZES[size]
  return (
    <div className={cn('flex items-center gap-3', className)}>
      <Avatar src={imageUrl} name={name} size={size} />
      <div className="min-w-0">
        {href ? (
          <Link
            href={href}
            {...slideProps}
            className={cn(
              'block truncate font-sans font-bold leading-tight text-stone-900 transition-colors hover:text-amber-900 group-hover:text-amber-900',
              s.name,
              stretched && "before:absolute before:inset-0 before:content-['']",
            )}
          >
            {name}
          </Link>
        ) : (
          <p className={cn('truncate font-sans font-bold leading-tight text-stone-900', s.name)}>
            {name}
          </p>
        )}
        {breed && <p className={cn('truncate font-mono text-stone-500', s.breed)}>{breed}</p>}
      </div>
    </div>
  )
}
