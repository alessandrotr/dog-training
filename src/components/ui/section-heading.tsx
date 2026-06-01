import type {ReactNode} from 'react';
import {cn} from '@/lib/utils';
import Eyebrow from './eyebrow';
import Heading from './heading';
import Text from './text';

// The eyebrow + headline + subheadline intro repeated across PageHeader, the
// Carousel header and section bloks. Headline renders the shared Heading scale.
const HEADLINE_SIZE = {
  md: 'section',
  lg: 'title',
  xl: 'display',
} as const;

type SectionHeadingProps = {
  eyebrow?: string;
  headline?: ReactNode;
  subheadline?: string;
  align?: 'left' | 'center';
  size?: keyof typeof HEADLINE_SIZE;
  as?: 'h1' | 'h2';
  className?: string;
};

export default function SectionHeading({
  eyebrow,
  headline,
  subheadline,
  align = 'left',
  size = 'lg',
  as = 'h2',
  className,
}: SectionHeadingProps) {
  if (!eyebrow && !headline && !subheadline) return null;
  return (
    <div className={cn('space-y-4', align === 'center' && 'text-center', className)}>
      {eyebrow && <Eyebrow tone="brand">{eyebrow}</Eyebrow>}
      {headline && (
        <Heading level={as === 'h1' ? 1 : 2} size={HEADLINE_SIZE[size]}>
          {headline}
        </Heading>
      )}
      {subheadline && (
        <Text size="base" className="max-w-2xl">
          {subheadline}
        </Text>
      )}
    </div>
  );
}
