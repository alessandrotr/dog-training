import 'server-only';
import {getStoryblokApi} from './storyblok';
import {
  adaptService,
  adaptTestimonial,
  adaptFaq,
  adaptBlogPost,
} from './storyblok-adapters';
import type {Localized} from '../types';

// Fetches every story under a folder for both languages and adapts them into
// the app's existing TypeScript shapes. Returns empty lists (never throws) so
// the build/render still succeeds before content or tokens exist.
async function bothLangs<T>(
  startsWith: string,
  adapt: (s: any) => T,
): Promise<Localized<T>> {
  try {
    const api = getStoryblokApi();
    const params = {
      starts_with: startsWith,
      version: 'published' as const,
      per_page: 100,
    };
    const [en, de] = await Promise.all([
      api.get('cdn/stories', {...params, language: 'default'}),
      api.get('cdn/stories', {...params, language: 'de'}),
    ]);
    return {
      en: (en.data?.stories ?? []).map(adapt),
      de: (de.data?.stories ?? []).map(adapt),
    };
  } catch (err) {
    console.error(`[storyblok] failed to fetch "${startsWith}":`, err);
    return {en: [], de: []};
  }
}

export const getServices = () => bothLangs('services/', adaptService);
export const getTestimonials = () => bothLangs('testimonials/', adaptTestimonial);
export const getFaqs = () => bothLangs('faqs/', adaptFaq);
export const getBlogPosts = () => bothLangs('blog/', adaptBlogPost);
