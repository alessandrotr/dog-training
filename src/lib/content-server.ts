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
// the app's existing TypeScript shapes. When `preview` is true (inside the
// Storyblok Visual Editor) it fetches DRAFT content and bypasses caching.
// Returns empty lists (never throws) so the build/render still succeeds before
// content or tokens exist.
async function bothLangs<T>(
  startsWith: string,
  adapt: (s: any) => T,
  preview = false,
): Promise<Localized<T>> {
  try {
    const api = getStoryblokApi();
    const params: Record<string, unknown> = {
      starts_with: startsWith,
      version: preview ? 'draft' : 'published',
      per_page: 100,
      // Cache-bust draft reads so the editor always sees the latest autosave.
      ...(preview ? {cv: Date.now()} : {}),
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

export const getServices = (preview = false) => bothLangs('services/', adaptService, preview);
export const getTestimonials = (preview = false) => bothLangs('testimonials/', adaptTestimonial, preview);
export const getFaqs = (preview = false) => bothLangs('faqs/', adaptFaq, preview);
export const getBlogPosts = (preview = false) => bothLangs('blog/', adaptBlogPost, preview);
