import {StoryblokServerComponent, storyblokEditable} from '@storyblok/react/rsc';
import Section from '../ui/section';
import Eyebrow from '../ui/eyebrow';

interface ValueCardsBlok {
  _uid: string;
  component: string;
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
      {(blok.eyebrow || blok.headline || blok.subheadline) && (
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
          {blok.eyebrow && (
            <Eyebrow tone="brand">{blok.eyebrow}</Eyebrow>
          )}
          {blok.headline && (
            <h2 className="font-sans text-3xl font-extrabold tracking-tight text-amber-955">{blok.headline}</h2>
          )}
          {blok.subheadline && <p className="font-sans text-sm text-stone-500">{blok.subheadline}</p>}
        </div>
      )}
      <div className={`grid grid-cols-1 gap-8 ${cols} text-left`}>
        {(blok.cards ?? []).map((card) => (
          <StoryblokServerComponent blok={card} key={card._uid} />
        ))}
      </div>
    </Section>
  );
}
