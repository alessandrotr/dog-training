import RenderStoryblokPage from '../../../components/RenderStoryblokPage';
import type {Locale} from '../../../lib/locales';

type SP = Promise<Record<string, string | string[] | undefined>>;

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{lang: string}>;
  searchParams: SP;
}) {
  const {lang} = await params;
  const preview = '_storyblok' in (await searchParams);
  return <RenderStoryblokPage slug="testimonials" lang={lang as Locale} preview={preview} />;
}
