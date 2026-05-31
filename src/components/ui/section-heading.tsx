import type {ReactNode} from 'react';
import {cn} from '@/lib/utils';
import Eyebrow from './eyebrow';

// The eyebrow + headline + subheadline intro repeated across PageHeader, the
// Carousel header and section bloks. Sizes match the existing scales so adopting
// it is visually identical. Renders nothing if all three are empty.
const HEADLINE = {
  md: 'text-2xl',
  lg: 'text-3xl sm:text-4xl',
  xl: 'text-4xl sm:text-5xl leading-tight',
} as const;

type SectionHeadingProps = {
  eyebrow?: string;
  headline?: ReactNode;
  subheadline?: string;
  align?: 'left' | 'center';
  size?: keyof typeof HEADLINE;
  as?: 'h1' | 'h2';
  className?: string;
};

export default function SectionHeading({
  eyebrow,
  headline,
  subheadline,
  align = 'left',
  size = 'lg',
  as: Heading = 'h2',
  className,
}: SectionHeadingProps) {
  if (!eyebrow && !headline && !subheadline) return null;
  return (
    <div className={cn('space-y-4', align === 'center' && 'text-center', className)}>
      {eyebrow && <Eyebrow tone="brand">{eyebrow}</Eyebrow>}
      {headline && (
        <Heading className={cn('font-sans font-extrabold tracking-tight text-amber-950', HEADLINE[size])}>
          {headline}
        </Heading>
      )}
      {subheadline && <p className="max-w-2xl font-sans text-base leading-relaxed text-stone-500">{subheadline}</p>}
    </div>
  );
}
