import type {ComponentPropsWithoutRef} from 'react';
import {cn} from '@/lib/utils';

// The small mono-uppercase label used above headings and as micro-labels
// throughout the site. Canonical typography in one place; `tone` flips colour.
const TONES = {
  muted: 'text-stone-400',
  brand: 'text-amber-700',
} as const;

type EyebrowProps = {
  tone?: keyof typeof TONES;
} & ComponentPropsWithoutRef<'span'>;

export default function Eyebrow({tone = 'muted', className, ...rest}: EyebrowProps) {
  return (
    <span
      className={cn('font-mono text-[11px] font-semibold uppercase tracking-[0.18em]', TONES[tone], className)}
      {...rest}
    />
  );
}
