'use client';

import {storyblokEditable} from '@storyblok/react';
import {useHref} from '../../lib/navigation';
import {usePageData} from '../PageDataProvider';
import Carousel from '../Carousel';
import ServiceCard from './ServiceCard';

interface ServicesGridBlok {
  _uid: string;
  component: string;
  eyebrow?: string;
  headline?: string;
  subheadline?: string;
  card_size?: 'lg' | 'sm';
  limit?: string | number;
  footer_label?: string;
  layout?: 'grid' | 'list';
}

// Data-bound: pulls the service stories prefetched by the page route.
// `grid` = highlighted Carousel of program cards (home); `list` = a plain
// responsive grid of all programs (services page). Both share <ServiceCard>.
export default function ServicesGrid({blok}: {blok: ServicesGridBlok}) {
  const href = useHref();
  const {services, testimonials, posts} = usePageData();
  const limit = Number(blok.limit) || services.length;
  const items = services.slice(0, limit);
  const isList = blok.layout === 'list';

  // Aggregate real review stats per service from testimonials tagged to it.
  const reviews = new Map<string, {avg: number; count: number}>();
  for (const svc of services) {
    const tagged = testimonials.filter((t) => t.serviceId === svc.id && t.rating > 0);
    if (tagged.length) {
      const avg = tagged.reduce((sum, t) => sum + t.rating, 0) / tagged.length;
      reviews.set(svc.id, {avg, count: tagged.length});
    }
  }

  // Related-article counts per service (for the "N guides" card hint).
  const guides = new Map<string, number>();
  for (const p of posts) for (const id of p.serviceIds ?? []) guides.set(id, (guides.get(id) ?? 0) + 1);

  if (isList) {
    return (
      <section {...storyblokEditable(blok as any)} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-left">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((svc) => (
            <ServiceCard key={svc.id} svc={svc} caseStudies={reviews.get(svc.id)?.count ?? 0} guides={guides.get(svc.id) ?? 0} />
          ))}
        </div>
      </section>
    );
  }

  // Highlighted carousel (home)
  return (
    <section {...storyblokEditable(blok as any)} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <Carousel
        items={items}
        getKey={(s) => s.id}
        size={blok.card_size === 'sm' ? 'sm' : 'lg'}
        label="programs"
        eyebrow={blok.eyebrow}
        headline={blok.headline}
        subheadline={blok.subheadline}
        footerLabel={blok.footer_label}
        footerHref={href.page('services')}
        renderItem={(svc, slideProps) => <ServiceCard svc={svc} caseStudies={reviews.get(svc.id)?.count ?? 0} guides={guides.get(svc.id) ?? 0} slideProps={slideProps} />}
      />
    </section>
  );
}
