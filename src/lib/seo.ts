import type {Metadata} from 'next';
import {LOCALES, DEFAULT_LOCALE, isLocale, type Locale} from './locales';
import {getPageStory} from '@/features/storyblok/api/get-page';
import {getConfig} from '@/features/storyblok/api/get-config';

// Public site origin (no trailing slash). Set NEXT_PUBLIC_SITE_URL when you
// move to a custom domain; falls back to the current Vercel URL.
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://dog-training-indol.vercel.app'
).replace(/\/$/, '');

// Last-resort fallbacks only — used when the Storyblok Site Config is
// unreachable. The real site name / description / OG image come from config.seo.
const FALLBACK_SITE_NAME = 'Sophia Binder Dog Trainer';
const FALLBACK_DESCRIPTION =
  'Scandinavian-inspired force-free dog training. Professional private obedience coaching, puppy foundations, and complex reactive dog rehabilitation.';

const OG_LOCALE: Record<Locale, string> = {en: 'en_US', de: 'de_DE'};

// hreflang alternates for a path that is identical across locales except the
// leading locale segment. `path` has no leading slash and no locale
// ('' = home, 'about', 'blog/my-post').
function alternates(path: string, lang: Locale): {canonical: string; languages: Record<string, string>} {
  const clean = path ? `/${path}` : '';
  const languages: Record<string, string> = {};
  for (const l of LOCALES) languages[l] = `${SITE_URL}/${l}${clean}`;
  languages['x-default'] = `${SITE_URL}/${DEFAULT_LOCALE}${clean}`;
  return {canonical: `${SITE_URL}/${lang}${clean}`, languages};
}

export function buildMetadata({
  title,
  description,
  path,
  lang,
  image,
  type = 'website',
  siteName = FALLBACK_SITE_NAME,
  defaultDescription = FALLBACK_DESCRIPTION,
}: {
  title?: string;
  description?: string;
  path: string;
  lang: Locale;
  image?: string;
  type?: 'website' | 'article';
  siteName?: string;
  defaultDescription?: string;
}): Metadata {
  const fullTitle = title ? `${title} | ${siteName}` : siteName;
  const desc = description || defaultDescription;
  const alts = alternates(path, lang);
  const images = image ? [{url: image}] : undefined;

  return {
    title: fullTitle,
    description: desc,
    alternates: alts,
    openGraph: {
      title: fullTitle,
      description: desc,
      url: alts.canonical,
      siteName,
      locale: OG_LOCALE[lang],
      type,
      images,
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: desc,
      images: image ? [image] : undefined,
    },
  };
}

// Metadata for a templated detail route (service / blog post / case study).
// Normalizes the locale, loads the published list, finds the entry by slug, and
// maps it to SEO fields — collapsing the boilerplate every `[slug]` route had.
export async function detailMetadata<T extends {slug: string}>({
  slug,
  lang,
  path,
  load,
  map,
  type,
}: {
  slug: string;
  lang: string;
  path: string;
  load: (lang: Locale) => Promise<T[]>;
  map: (item: T) => {title?: string; description?: string; image?: string};
  type?: 'website' | 'article';
}): Promise<Metadata> {
  const l = isLocale(lang) ? lang : DEFAULT_LOCALE;
  const [items, config] = await Promise.all([load(l), getConfig(l)]);
  const item = items.find((i) => i.slug === slug);
  const mapped = item ? map(item) : {};
  return buildMetadata({
    ...mapped,
    image: mapped.image || config.seo.defaultImageUrl || undefined,
    path,
    lang: l,
    type,
    siteName: config.seo.siteName,
    defaultDescription: config.seo.defaultDescription,
  });
}

// Metadata for a builder `page` story (home + marketing routes + catch-all),
// derived from its translatable seo_* fields, with site-wide fallbacks from the
// Storyblok Site Config. Both fetches are React-cached.
export async function pageMetadata(slug: string, lang: Locale, path: string): Promise<Metadata> {
  const [story, config] = await Promise.all([getPageStory(slug, lang, false), getConfig(lang)]);
  const c: Record<string, any> = story?.content ?? {};
  return buildMetadata({
    title: c.seo_title || story?.name,
    description: c.seo_description,
    image: c.seo_image?.filename || config.seo.defaultImageUrl || undefined,
    path,
    lang,
    siteName: config.seo.siteName,
    defaultDescription: config.seo.defaultDescription,
  });
}
