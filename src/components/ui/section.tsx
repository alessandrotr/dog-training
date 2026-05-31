import type {ElementType, ComponentPropsWithoutRef} from 'react';
import {cn} from '@/lib/utils';

// Centered content container: the `mx-auto max-w-* px-4 sm:px-6 lg:px-8` pattern
// that every section/blok root repeats. Polymorphic via `as` (defaults to
// <section>; page templates pass `as="div"`). Spreads all props so bloks can
// keep attaching `{...storyblokEditable(blok)}` for Visual-Editor click-to-edit.
const WIDTHS = {
  default: 'max-w-7xl',
  narrow: 'max-w-4xl',
  prose: 'max-w-3xl',
} as const;

type SectionProps = {
  as?: ElementType;
  width?: keyof typeof WIDTHS;
} & ComponentPropsWithoutRef<'section'>;

export default function Section({as: Tag = 'section', width = 'default', className, ...rest}: SectionProps) {
  return <Tag className={cn('mx-auto px-4 sm:px-6 lg:px-8', WIDTHS[width], className)} {...rest} />;
}
