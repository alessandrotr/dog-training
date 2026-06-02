import {StoryblokStory} from '@storyblok/react/rsc';
import {notFound} from 'next/navigation';
import {getPageStory} from '@/features/storyblok/api/get-page';
import {getServices, getTestimonials, getFaqs, getBlogPosts} from '@/features/storyblok/api/content-server';
import {getBlogTaxonomies} from '@/features/storyblok/api/get-datasource';
import {PageDataProvider} from './PageDataProvider';
import type {Locale} from '@/lib/locales';

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

  const [services, testimonials, faqs, posts, taxonomies] = await Promise.all([
    getServices(lang, preview),
    getTestimonials(lang, preview),
    getFaqs(lang, preview),
    getBlogPosts(lang, preview),
    getBlogTaxonomies(lang),
  ]);

  return (
    <PageDataProvider value={{services, testimonials, faqs, posts, taxonomies}}>
      <StoryblokStory story={story} />
    </PageDataProvider>
  );
}
