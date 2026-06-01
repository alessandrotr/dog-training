'use client';

import Link from 'next/link';
import Image from 'next/image';
import {Sparkles, Plus, Check, BookOpen} from 'lucide-react';
import {useHref} from '../../lib/navigation';
import {useInquiryCart} from '../InquiryCartProvider';
import {Card, CardStat, PriceTag, Heading, Text} from '../ui';
import {cn} from '../../lib/utils';
import type {ServiceItem} from '../../types';

// Shared ecommerce-style program card used by both the home carousel and the
// services-page grid. `slideProps` (from useCarousel) is spread onto the link
// in the carousel so drag gestures don't trigger navigation.
export default function ServiceCard({
  svc,
  caseStudies = 0,
  guides = 0,
  className = '',
  slideProps,
}: {
  svc: ServiceItem;
  caseStudies?: number; // case studies tagged to this service → social proof
  guides?: number; // related-article count → "N guides" hint
  className?: string;
  slideProps?: Record<string, unknown>;
}) {
  const href = useHref();
  const cart = useInquiryCart();
  const added = cart.has(svc.slug);
  return (
    <Card
      as={Link}
      href={href.service(svc.slug)}
      {...slideProps}
      interactive
      className={cn('group min-w-0 cursor-pointer flex flex-col overflow-hidden', className)}
    >
      {/* Product image */}
      <div className="relative aspect-4/3 overflow-hidden bg-stone-100">
        {svc.imageUrl && (
          <Image
            src={svc.imageUrl}
            alt={svc.title}
            fill
            sizes="(max-width: 640px) 85vw, (max-width: 1024px) 56vw, 40vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
        )}
        {svc.audience && (
          <span className="absolute bottom-3 left-3 max-w-[calc(100%-1.5rem)] truncate rounded-full bg-amber-700/90 px-3 py-1 text-[10px] font-mono font-semibold uppercase tracking-wide text-stone-100 shadow-sm backdrop-blur">
            {svc.audience}
          </span>
        )}
        {/* Add to inquiry (doesn't navigate) */}
        <button
          type="button"
          aria-label={added ? 'Remove from inquiry' : 'Add to inquiry'}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            cart.toggle({
              slug: svc.slug,
              title: svc.title,
              imageUrl: svc.imageUrl,
              shortDescription: svc.shortDescription,
              price: svc.price,
              audience: svc.audience,
            });
          }}
          className={`absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full shadow-sm backdrop-blur transition-colors ${
            added ? 'bg-amber-700 text-white' : 'bg-white/95 text-stone-600 hover:bg-white hover:text-amber-800'
          }`}
        >
          {added ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
        </button>
      </div>

      {/* Product body */}
      <div className="flex flex-1 flex-col p-5 text-left">
        {/* Social-proof row — case studies tagged to this service + related guides */}
        {(caseStudies > 0 || guides > 0) && (
          <div className="flex items-center gap-3">
            {caseStudies > 0 && <CardStat icon={Sparkles} count={caseStudies} singular="case study" plural="case studies" />}
            {guides > 0 && <CardStat icon={BookOpen} count={guides} singular="guide" />}
          </div>
        )}

        <Heading level={3} size="card" className="mt-2.5 transition-colors group-hover:text-amber-900">
          {svc.title}
        </Heading>
        <Text className="mt-1.5 line-clamp-2">{svc.shortDescription}</Text>

        {/* Price footer */}
        <PriceTag price={svc.price} className="mt-auto pt-5" />
      </div>
    </Card>
  );
}
