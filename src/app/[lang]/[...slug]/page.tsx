import type {Metadata} from 'next';
import RenderStoryblokPage from '@/features/storyblok/components/RenderStoryblokPage';
import {isLocale, DEFAULT_LOCALE} from '@/lib/locales';
import {resolvePageContext} from '@/lib/route-context';
import {pageMetadata} from '@/lib/seo';

type SP = Promise<Record<string, string | string[] | undefined>>;

// Normalises the catch-all segments to a Storyblok story slug (and the public
// path), tolerating the `pages/` folder + doubled-locale shapes the VE sends.
function normalizeSlug(slug: string[] | undefined): {storySlug: string; path: string} {
  let segments = slug ?? [];
  if (segments[0] === 'pages') segments = segments.slice(1);
  if (segments.length && isLocale(segments[0])) segments = segments.slice(1);
  return {storySlug: segments.length ? segments.join('/') : 'home', path: segments.join('/')};
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{lang: string; slug: string[]}>;
}): Promise<Metadata> {
  const {lang, slug} = await params;
  const {storySlug, path} = normalizeSlug(slug);
  return pageMetadata(storySlug, isLocale(lang) ? lang : DEFAULT_LOCALE, path);
}

// Catch-all for editor-created builder pages. Explicit routes (services, faq,
// blog, etc.) take precedence. Tolerant of the URL shapes the Storyblok Visual
// Editor can request: it may include the `pages/` folder segment and/or a
// duplicated locale depending on the configured preview URL.
export default async function CatchAllPage({
  params,
  searchParams,
}: {
  params: Promise<{lang: string; slug: string[]}>;
  searchParams: SP;
}) {
  const {lang, slug} = await params;
  const sp = await searchParams;
  const {storySlug} = normalizeSlug(slug);
  const {preview, locale} = resolvePageContext(lang, sp);

  return (
    <RenderStoryblokPage slug={storySlug} lang={locale} preview={preview} />
  );
}
