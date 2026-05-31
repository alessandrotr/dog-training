import 'server-only';
import {cache} from 'react';
import {getStoryblokApi} from './storyblok';
import {DEFAULT_LOCALE, type Locale} from './locales';

// Maps a datasource's canonical entry value → its label for the given locale.
// Translations live in Storyblok datasource *dimensions* (one per non-default
// locale). Stories store the canonical value; this map is display-only, so
// filtering / deep-links stay stable across languages.
export const getDatasourceMap = cache(async (slug: string, lang: Locale): Promise<Record<string, string>> => {
  try {
    const api = getStoryblokApi();
    const {data} = await api.get('cdn/datasource_entries', {
      datasource: slug,
      per_page: 1000,
      ...(lang !== DEFAULT_LOCALE ? {dimension: lang} : {}),
    });
    const map: Record<string, string> = {};
    for (const e of data?.datasource_entries ?? []) {
      // With a dimension, Storyblok returns the translated label in
      // `dimension_value` (empty when not yet translated → fall back).
      map[e.value] = (lang !== DEFAULT_LOCALE ? e.dimension_value || e.value : e.value);
    }
    return map;
  } catch {
    return {};
  }
});

// Convenience: the two vocabularies a blog page needs, in one cached call pair.
export const getBlogTaxonomies = cache(async (lang: Locale) => {
  const [categories, tags] = await Promise.all([
    getDatasourceMap('categories', lang),
    getDatasourceMap('tags', lang),
  ]);
  return {categories, tags};
});
