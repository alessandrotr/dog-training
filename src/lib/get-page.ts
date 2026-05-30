import 'server-only';
import {cache} from 'react';
import {getStoryblokApi} from './storyblok';
import type {Locale} from './locales';

// Fetches a single `page` story (composed of bloks) by slug for one locale.
// Returns null if it doesn't exist (route then 404s).
export const getPageStory = cache(
  async (slug: string, lang: Locale, preview: boolean) => {
    try {
      const api = getStoryblokApi();
      const {data} = await api.get(`cdn/stories/${slug}`, {
        version: preview ? 'draft' : 'published',
        language: lang === 'en' ? 'default' : lang,
        fallback_lang: 'default',
        ...(preview ? {cv: Date.now()} : {}),
      });
      return data?.story ?? null;
    } catch {
      return null;
    }
  },
);
