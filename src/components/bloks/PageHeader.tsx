'use client';

import {storyblokEditable} from '@storyblok/react';
import Section from '../ui/section';
import Eyebrow from '../ui/eyebrow';

import type {BlokBase} from '../../types';

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
  const Heading = isSection ? 'h2' : 'h1';

  return (
    <Section
      {...storyblokEditable(blok as any)}
      className={isSection ? '' : 'pt-4 lg:py-12'}
    >
      <div className="max-w-3xl space-y-4 text-left">
        {blok.eyebrow && (
          <Eyebrow tone="brand">{blok.eyebrow}</Eyebrow>
        )}
        {blok.headline && (
          <Heading
            className={
              isSection
                ? 'font-sans text-3xl font-extrabold tracking-tight text-amber-950 sm:text-4xl'
                : 'font-sans text-4xl font-extrabold tracking-tight text-amber-950 sm:text-5xl leading-tight'
            }
          >
            {blok.headline}
          </Heading>
        )}
        {blok.subheadline && (
          <p className="font-sans text-base text-stone-500 max-w-2xl leading-relaxed">
            {blok.subheadline}
          </p>
        )}
      </div>
    </Section>
  );
}
