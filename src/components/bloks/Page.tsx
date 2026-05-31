import {StoryblokServerComponent, storyblokEditable} from '@storyblok/react/rsc';

interface PageBlok {
  _uid: string;
  component: string;
  body?: Array<{_uid: string; component: string; [key: string]: unknown}>;
}

// Root `page` content type: renders its composed bloks in order.
export default function Page({blok}: {blok: PageBlok}) {
  return (
    <div {...storyblokEditable(blok as any)} className="space-y-12 lg:space-y-16 pb-8">
      {(blok.body ?? []).map((nested) => (
        <StoryblokServerComponent blok={nested} key={nested._uid} />
      ))}
    </div>
  );
}
