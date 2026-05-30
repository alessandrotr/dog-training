import type {MetadataRoute} from 'next';
import {LOCALES} from '../lib/locales';
import {getStoryblokApi} from '../lib/storyblok';

// Public site origin. Update if you move to a custom domain.
const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://dog-training-indol.vercel.app';

// Explicit, code-owned routes (not builder pages).
const STATIC_ROUTES = ['contact', 'booking', 'blog'];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let pageSlugs: string[] = [];
  let blogSlugs: string[] = [];
  try {
    const api = getStoryblokApi();
    const [pages, blog] = await Promise.all([
      api.get('cdn/stories', {starts_with: 'pages/', version: 'published', per_page: 100}),
      api.get('cdn/stories', {starts_with: 'blog/', version: 'published', per_page: 100}),
    ]);
    pageSlugs = (pages.data?.stories ?? []).map((s: any) => s.slug);
    blogSlugs = (blog.data?.stories ?? []).map((s: any) => s.slug);
  } catch {
    // Fall back to static routes only if Storyblok is unreachable.
  }

  const entries: MetadataRoute.Sitemap = [];
  for (const lang of LOCALES) {
    for (const slug of pageSlugs) {
      const path = slug === 'home' ? '' : `/${slug}`;
      entries.push({url: `${BASE}/${lang}${path}`});
    }
    for (const route of STATIC_ROUTES) entries.push({url: `${BASE}/${lang}/${route}`});
    for (const slug of blogSlugs) entries.push({url: `${BASE}/${lang}/blog/${slug}`});
  }
  return entries;
}
