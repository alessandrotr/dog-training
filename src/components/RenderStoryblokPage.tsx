import {StoryblokStory} from '@storyblok/react/rsc';
import {notFound} from 'next/navigation';
import {getPageStory} from '../lib/get-page';
import {getServices, getTestimonials, getFaqs, getBlogPosts} from '../lib/content-server';
import {PageDataProvider} from './PageDataProvider';
import type {Locale} from '../lib/locales';

// Fetches a `page` story + the locale-correct content lists (for data-bound
// bloks) and renders the composed bloks. Shared by the home route and the
// catch-all builder route.
export default async function RenderStoryblokPage({
  slug,
  lang,
  preview,
}: {
  slug: string;
  lang: Locale;
  preview: boolean;
}) {
  const story = await getPageStory(slug, lang, preview);
  if (!story) notFound();

  const [services, testimonials, faqs, posts] = await Promise.all([
    getServices(lang, preview),
    getTestimonials(lang, preview),
    getFaqs(lang, preview),
    getBlogPosts(lang, preview),
  ]);

  return (
    <PageDataProvider value={{services, testimonials, faqs, posts}}>
      <StoryblokStory story={story} />
    </PageDataProvider>
  );
}
