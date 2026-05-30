import {StoryblokServerComponent, storyblokEditable} from '@storyblok/react/rsc';

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
    <section {...storyblokEditable(blok as any)} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      {(blok.eyebrow || blok.headline || blok.subheadline) && (
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
          {blok.eyebrow && (
            <span className="font-mono text-xs uppercase tracking-widest text-amber-700">{blok.eyebrow}</span>
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
    </section>
  );
}
