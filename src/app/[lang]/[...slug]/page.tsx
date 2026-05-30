import RenderStoryblokPage from '../../../components/RenderStoryblokPage';
import {isLocale} from '../../../lib/locales';
import {isPreview, resolveLocale} from '../../../lib/route-context';

type SP = Promise<Record<string, string | string[] | undefined>>;

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

  let segments = slug ?? [];
  if (segments[0] === 'pages') segments = segments.slice(1); // Storyblok default real path
  if (segments.length && isLocale(segments[0])) segments = segments.slice(1); // doubled locale
  const storySlug = segments.length ? segments.join('/') : 'home';

  return (
    <RenderStoryblokPage slug={storySlug} lang={resolveLocale(lang, sp)} preview={isPreview(sp)} />
  );
}
