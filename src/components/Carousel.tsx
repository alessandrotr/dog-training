'use client';

import Link from 'next/link';
import {ArrowLeft, ArrowRight, ArrowUpRight} from 'lucide-react';
import {useCarousel} from '../lib/use-carousel';
import Eyebrow from './ui/eyebrow';
import {Button} from './ui/button';

// Slide-width variants: `lg` = prominent (home services), `sm` = compact (articles).
const SIZES = {
  lg: 'flex-[0_0_85%] sm:flex-[0_0_56%] lg:flex-[0_0_40%]',
  sm: 'flex-[0_0_78%] sm:flex-[0_0_46%] lg:flex-[0_0_31%]',
} as const;

// The one carousel used across the site (home articles/services, related lists).
// Owns the header (eyebrow/headline + "view all" + prev/next) and the Embla
// track; `renderItem` supplies each slide (and gets the drag-guard slideProps).
export default function Carousel<T>({
  items,
  getKey,
  renderItem,
  eyebrow,
  headline,
  subheadline,
  footerLabel,
  footerHref,
  size = 'sm',
  label = 'items',
}: {
  items: T[];
  getKey: (item: T) => string;
  renderItem: (item: T, slideProps: Record<string, unknown>) => React.ReactNode;
  eyebrow?: string;
  headline?: string;
  subheadline?: string;
  footerLabel?: string;
  footerHref?: string;
  size?: keyof typeof SIZES;
  label?: string;
}) {
  const {emblaRef, prev, next, canPrev, canNext, slideProps} = useCarousel();
  const hasHeader = Boolean(eyebrow || headline || subheadline || footerLabel);

  return (
    <div>
      {hasHeader && (
        <div className="mb-4 lg:mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl space-y-2 text-left">
            {eyebrow && <Eyebrow tone="brand">{eyebrow}</Eyebrow>}
            {headline && (
              <h2 className={`font-sans font-extrabold tracking-tight text-amber-950 ${size === 'lg' ? 'text-3xl sm:text-4xl' : 'text-2xl'}`}>
                {headline}
              </h2>
            )}
            {subheadline && <p className="font-sans text-base leading-relaxed text-stone-500">{subheadline}</p>}
          </div>
          <div className="flex shrink-0 justify-between items-center gap-3">
            {footerLabel && footerHref && (
              <Link
                href={footerHref}
                className="inline-flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-wider text-amber-900 transition-colors hover:text-amber-950"
              >
                <span>{footerLabel}</span>
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            )}
            <div className="flex items-center gap-2">
              <Button onClick={prev} disabled={!canPrev} aria-label={`Previous ${label}`} variant="outline" size="icon" className="rounded-full">
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <Button onClick={next} disabled={!canNext} aria-label={`Next ${label}`} variant="outline" size="icon" className="rounded-full">
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="overflow-hidden cursor-grab select-none active:cursor-grabbing" ref={emblaRef}>
        <div className="flex gap-6 py-1">
          {items.map((item) => (
            <div key={getKey(item)} className={`min-w-0 ${SIZES[size]}`}>
              {renderItem(item, slideProps)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
