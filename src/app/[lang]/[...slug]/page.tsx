import RenderStoryblokPage from '../../../components/RenderStoryblokPage';
import type {Locale} from '../../../lib/locales';

type SP = Promise<Record<string, string | string[] | undefined>>;

// Catch-all for editor-created builder pages. Explicit routes (services, faq,
// blog, etc.) take precedence; this only handles unmatched slugs.
export default async function CatchAllPage({
  params,
  searchParams,
}: {
  params: Promise<{lang: string; slug: string[]}>;
  searchParams: SP;
}) {
  const {lang, slug} = await params;
  const preview = '_storyblok' in (await searchParams);
  return <RenderStoryblokPage slug={slug.join('/')} lang={lang as Locale} preview={preview} />;
}
