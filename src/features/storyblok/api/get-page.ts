import 'server-only';
import {cache} from 'react';
import {getStoryblokApi} from '@/features/storyblok/lib/client';
import type {Locale} from '@/lib/locales';

// All builder `page` stories live under the `pages/` folder in Storyblok, so
// URL slugs stay clean (e.g. URL `/en/about` -> story `pages/about`, home ->
// `pages/home`). Returns null if the story doesn't exist (route then 404s).
const PAGES_FOLDER = 'pages';

export const getPageStory = cache(
  async (slug: string, lang: Locale, preview: boolean) => {
    try {
      const api = getStoryblokApi();
      const {data} = await api.get(`cdn/stories/${PAGES_FOLDER}/${slug}`, {
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
