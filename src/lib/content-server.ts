import 'server-only';
import {cache} from 'react';
import {getStoryblokApi} from './storyblok';
import {
  adaptService,
  adaptTestimonial,
  adaptFaq,
  adaptBlogPost,
} from './storyblok-adapters';
import type {Locale} from './locales';

// Fetches every story under a folder for ONE locale and adapts them into the
// app's TypeScript shapes. `preview` (inside the Visual Editor) fetches DRAFT
// content and bypasses caching. Untranslated fields fall back to the default
// language. Returns [] on failure so build/render never throws.
async function fetchStories<T>(
  startsWith: string,
  adapt: (s: any) => T,
  lang: Locale,
  preview = false,
): Promise<T[]> {
  try {
    const api = getStoryblokApi();
    const {data} = await api.get('cdn/stories', {
      starts_with: startsWith,
      version: preview ? 'draft' : 'published',
      per_page: 100,
      language: lang === 'en' ? 'default' : lang,
      fallback_lang: 'default',
      ...(preview ? {cv: Date.now()} : {}),
    });
    return (data?.stories ?? []).map(adapt);
  } catch (err) {
    console.error(`[storyblok] failed to fetch "${startsWith}" (${lang}):`, err);
    return [];
  }
}

// Wrapped in React cache() so multiple bloks on one page that need the same
// list trigger a single request per render.
export const getServices = cache((lang: Locale, preview = false) => fetchStories('services/', adaptService, lang, preview));
export const getTestimonials = cache((lang: Locale, preview = false) => fetchStories('testimonials/', adaptTestimonial, lang, preview));
export const getFaqs = cache((lang: Locale, preview = false) => fetchStories('faqs/', adaptFaq, lang, preview));
export const getBlogPosts = cache((lang: Locale, preview = false) => fetchStories('blog/', adaptBlogPost, lang, preview));
