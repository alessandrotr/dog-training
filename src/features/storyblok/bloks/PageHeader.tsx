import {storyblokEditable} from '@storyblok/react/rsc';
import {Section, SectionHeading} from '@/components/ui';

import type {BlokBase} from '@/types';

interface PageHeaderBlok extends BlokBase {
  eyebrow?: string;
  headline?: string;
  subheadline?: string;
  variant?: 'page' | 'section';
}

// Standalone title block (blog-style): drop it at the top of a page or above a
// section. `page` = large h1 page title; `section` = smaller h2 section header.
export default function PageHeader({blok}: {blok: PageHeaderBlok}) {
  const isSection = blok.variant === 'section';

  return (
    <Section {...storyblokEditable(blok as any)} className={isSection ? '' : 'pt-4 lg:py-12'}>
      <SectionHeading
        eyebrow={blok.eyebrow}
        headline={blok.headline}
        subheadline={blok.subheadline}
        as={isSection ? 'h2' : 'h1'}
        size={isSection ? 'lg' : 'xl'}
        className="max-w-3xl"
      />
    </Section>
  );
}
