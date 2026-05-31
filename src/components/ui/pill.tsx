import Link from 'next/link';
import type {ReactNode} from 'react';
import {cn} from '@/lib/utils';

// Rounded-full chip/badge. `tone` sets the palette; pass `href` to render a
// clickable Link (with the matching hover). Icons/labels/arrows are supplied as
// children so the API stays small. Typography overrides (uppercase, mono, size)
// go through `className`.
const TONES = {
  amber: 'bg-amber-50 text-amber-800 ring-1 ring-amber-200/70',
  stone: 'bg-stone-100 text-stone-700 ring-1 ring-stone-200',
  solid: 'bg-amber-700/90 text-stone-100',
} as const;

const LINK_HOVER = {
  amber: 'hover:bg-amber-100 hover:text-amber-900',
  stone: 'hover:bg-stone-200/70 hover:text-stone-900',
  solid: 'hover:bg-amber-700',
} as const;

type PillProps = {
  tone?: keyof typeof TONES;
  href?: string;
  title?: string;
  className?: string;
  children: ReactNode;
};

export default function Pill({tone = 'amber', href, title, className, children}: PillProps) {
  const base = cn(
    'inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold',
    TONES[tone],
    className,
  );
  if (href) {
    return (
      <Link href={href} title={title} className={cn(base, 'transition-colors', LINK_HOVER[tone])}>
        {children}
      </Link>
    );
  }
  return (
    <span title={title} className={base}>
      {children}
    </span>
  );
}
