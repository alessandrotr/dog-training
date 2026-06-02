import type {MetadataRoute} from 'next';
import {LOCALES} from '@/lib/locales';
import {getStoryblokApi} from '@/features/storyblok/lib/client';
import {SITE_URL} from '@/lib/seo';

// Explicit, code-owned routes (not builder pages). Contact/booking are dialogs,
// not indexable pages, so they're intentionally excluded.
const STATIC_ROUTES = ['blog'];

// One sitemap entry per locale, each carrying hreflang `alternates` pointing at
// its sibling-locale URLs (path is identical across locales except the prefix).
function entriesFor(path: string): MetadataRoute.Sitemap {
  const clean = path ? `/${path}` : '';
  const languages: Record<string, string> = {};
  for (const l of LOCALES) languages[l] = `${SITE_URL}/${l}${clean}`;
  return LOCALES.map((lang) => ({
    url: `${SITE_URL}/${lang}${clean}`,
    alternates: {languages},
  }));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let pageSlugs: string[] = [];
  let blogSlugs: string[] = [];
  let serviceSlugs: string[] = [];
  let caseStudySlugs: string[] = [];
  try {
    const api = getStoryblokApi();
    const [pages, blog, services, caseStudies] = await Promise.all([
      api.get('cdn/stories', {starts_with: 'pages/', version: 'published', per_page: 100}),
      api.get('cdn/stories', {starts_with: 'blog/', version: 'published', per_page: 100}),
      api.get('cdn/stories', {starts_with: 'services/', version: 'published', per_page: 100}),
      api.get('cdn/stories', {starts_with: 'testimonials/', version: 'published', per_page: 100}),
    ]);
    pageSlugs = (pages.data?.stories ?? []).map((s: any) => s.slug);
    blogSlugs = (blog.data?.stories ?? []).map((s: any) => s.slug);
    serviceSlugs = (services.data?.stories ?? []).map((s: any) => s.slug);
    caseStudySlugs = (caseStudies.data?.stories ?? []).map((s: any) => s.slug);
  } catch {
    // Fall back to static routes only if Storyblok is unreachable.
  }

  const paths = new Set<string>();
  for (const slug of pageSlugs) paths.add(slug === 'home' ? '' : slug);
  for (const route of STATIC_ROUTES) paths.add(route);
  for (const slug of blogSlugs) paths.add(`blog/${slug}`);
  for (const slug of serviceSlugs) paths.add(`services/${slug}`);
  for (const slug of caseStudySlugs) paths.add(`case-studies/${slug}`);

  return [...paths].flatMap(entriesFor);
}
