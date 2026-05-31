import type {Metadata} from 'next';
import {LOCALES, DEFAULT_LOCALE, type Locale} from './locales';
import {getPageStory} from './get-page';

// Public site origin (no trailing slash). Set NEXT_PUBLIC_SITE_URL when you
// move to a custom domain; falls back to the current Vercel URL.
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://dog-training-indol.vercel.app'
).replace(/\/$/, '');

export const SITE_NAME = 'Sophia Binder Canine Academy';

const DEFAULT_DESCRIPTION =
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
}: {
  title?: string;
  description?: string;
  path: string;
  lang: Locale;
  image?: string;
  type?: 'website' | 'article';
}): Metadata {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
  const desc = description || DEFAULT_DESCRIPTION;
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
      siteName: SITE_NAME,
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

// Metadata for a builder `page` story (home + marketing routes + catch-all),
// derived from its translatable seo_* fields. Reuses the cached published fetch.
export async function pageMetadata(slug: string, lang: Locale, path: string): Promise<Metadata> {
  const story = await getPageStory(slug, lang, false);
  const c: Record<string, any> = story?.content ?? {};
  return buildMetadata({
    title: c.seo_title || story?.name,
    description: c.seo_description,
    image: c.seo_image?.filename,
    path,
    lang,
  });
}
