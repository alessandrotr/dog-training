import Image from 'next/image';
import {storyblokEditable, renderRichText} from '@storyblok/react/rsc';
import AvailabilityBadge from '../AvailabilityBadge';
import {Section, Heading, Prose, Eyebrow} from '../ui';

import type {BlokBase} from '../../types';

interface BioHeroBlok extends BlokBase {
  eyebrow?: string;
  headline?: string;
  image?: {filename?: string; alt?: string};
  body?: any; // richtext
  signature_name?: string;
  signature_role?: string;
}

export default function BioHero({blok}: {blok: BioHeroBlok}) {
  const bodyHtml = blok.body ? renderRichText(blok.body) : '';

  return (
    <Section {...storyblokEditable(blok as any)} className="pt-4 sm:pt-6 lg:pt-8">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-7 text-left space-y-6">
          {blok.eyebrow && <Eyebrow tone="brand">{blok.eyebrow}</Eyebrow>}
          {blok.headline && (
            <Heading level={1} size="display">{blok.headline}</Heading>
          )}
          {bodyHtml && (
            <Prose
              html={bodyHtml}
              className="prose-blockquote:border-amber-800 prose-blockquote:font-serif prose-blockquote:text-amber-950 prose-blockquote:italic"
            />
          )}
          {(blok.signature_name || blok.signature_role) && (
            <div className="pt-4 flex items-center space-x-4">
              <div className="text-left">
                {blok.signature_name && (
                  <p className="font-serif italic text-lg text-amber-950 leading-none">{blok.signature_name}</p>
                )}
                {blok.signature_role && (
                  <p className="text-[10px] uppercase font-mono tracking-widest text-stone-400 mt-1">{blok.signature_role}</p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Image (right) */}
        <div className="lg:col-span-5 relative">
          <div className="relative max-w-[380px] mx-auto lg:max-w-none">
            <div className="absolute -inset-1 rounded-3xl bg-amber-905/10 blur-xl"></div>
            <div className="relative overflow-hidden rounded-3xl border-8 border-white shadow-2xl aspect-square bg-stone-100">
              {blok.image?.filename && (
                <Image
                  src={blok.image.filename}
                  alt={blok.image.alt || blok.headline || ''}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover transition-transform duration-500 hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              )}
            </div>
            <AvailabilityBadge className="absolute -bottom-6 -right-4" />
          </div>
        </div>
      </div>
    </Section>
  );
}
