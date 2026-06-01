import {StoryblokServerComponent, storyblokEditable} from '@storyblok/react/rsc';
import {Section, SectionHeading} from '../ui';

import type {BlokBase} from '../../types';

interface ValueCardsBlok extends BlokBase {
  eyebrow?: string;
  headline?: string;
  subheadline?: string;
  columns?: string | number;
  cards?: Array<{_uid: string; component: string}>;
}

export default function ValueCards({blok}: {blok: ValueCardsBlok}) {
  const cols = Number(blok.columns) === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3';

  return (
    <Section {...storyblokEditable(blok as any)}>
      <SectionHeading
        eyebrow={blok.eyebrow}
        headline={blok.headline}
        subheadline={blok.subheadline}
        align="center"
        className="mx-auto mb-16 max-w-2xl"
      />
      <div className={`grid grid-cols-1 gap-8 ${cols} text-left`}>
        {(blok.cards ?? []).map((card) => (
          <StoryblokServerComponent blok={card} key={card._uid} />
        ))}
      </div>
    </Section>
  );
}
