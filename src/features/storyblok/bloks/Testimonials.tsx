'use client';

import {storyblokEditable} from '@storyblok/react';
import {useHref} from '@/lib/navigation';
import {usePageData} from '@/features/storyblok/components/PageDataProvider';
import {mapById} from '@/lib/relations';
import Carousel from '@/components/Carousel';
import {Section} from '@/components/ui';
import CaseStudyCard from '@/components/cards/CaseStudyCard';
import TestimonialsFeatured from './TestimonialsFeatured';
import type {BlokBase} from '@/types';

interface TestimonialsBlok extends BlokBase {
  eyebrow?: string;
  headline?: string;
  subheadline?: string;
  footer_label?: string;
  layout?: 'carousel' | 'cards' | 'grid';
}

// Data-bound: pulls case-study stories from the page route and renders one of
// three layouts. `grid` = full card grid; `cards` = swipeable carousel;
// `carousel` (default) = one rotating featured story (see TestimonialsFeatured).
export default function Testimonials({blok}: {blok: TestimonialsBlok}) {
  const href = useHref();
  const {testimonials, services} = usePageData();
  const serviceById = mapById(services);

  if (blok.layout === 'grid') {
    return (
      <Section {...storyblokEditable(blok as any)} className="text-left">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {testimonials.map((tItem) => (
            <CaseStudyCard key={tItem.id} story={tItem} service={serviceById.get(tItem.serviceId ?? '')} />
          ))}
        </div>
      </Section>
    );
  }

  if (blok.layout === 'cards') {
    return (
      <Section {...storyblokEditable(blok as any)}>
        <Carousel
          items={testimonials}
          getKey={(t) => t.id}
          size="sm"
          label="case studies"
          eyebrow={blok.eyebrow}
          headline={blok.headline}
          subheadline={blok.subheadline}
          footerLabel={blok.footer_label}
          footerHref={href.page('testimonials')}
          renderItem={(t, slideProps) => (
            <CaseStudyCard story={t} service={serviceById.get(t.serviceId ?? '')} slideProps={slideProps} />
          )}
        />
      </Section>
    );
  }

  return (
    <TestimonialsFeatured
      testimonials={testimonials}
      serviceById={serviceById}
      footerLabel={blok.footer_label}
      editable={storyblokEditable(blok as any)}
    />
  );
}
