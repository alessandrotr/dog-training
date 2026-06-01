import type {Metadata} from 'next';
import RenderStoryblokPage from '../../../components/RenderStoryblokPage';
import {isLocale, DEFAULT_LOCALE} from '../../../lib/locales';
import {isPreview, resolveLocale} from '../../../lib/route-context';
import {buildMetadata} from '../../../lib/seo';

type SP = Promise<Record<string, string | string[] | undefined>>;

export async function generateMetadata({params}: {params: Promise<{lang: string}>}): Promise<Metadata> {
  const {lang} = await params;
  const l = isLocale(lang) ? lang : DEFAULT_LOCALE;
  return buildMetadata({
    title: l === 'de' ? 'Ratgeber & Neuigkeiten' : 'Insights & News',
    description:
      l === 'de'
        ? 'Tipps zur Hundeerziehung, Trainingsmethoden und Neuigkeiten aus der Sophia Binder Canine Academy.'
        : 'Dog-training tips, methods, and news from the Sophia Binder Canine Academy.',
    path: 'blog',
    lang: l,
  });
}

// The blog index is a composed `page` story (pages/blog): a Page Header blok +
// the Blog with Filters blok — both editable in Storyblok.
export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{lang: string}>;
  searchParams: SP;
}) {
  const {lang} = await params;
  const sp = await searchParams;
  return <RenderStoryblokPage slug="blog" lang={resolveLocale(lang, sp)} preview={isPreview(sp)} />;
}
