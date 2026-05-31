import type {Metadata} from 'next';
import RenderStoryblokPage from '../../../components/RenderStoryblokPage';
import {isLocale, DEFAULT_LOCALE, type Locale} from '../../../lib/locales';
import {pageMetadata} from '../../../lib/seo';

type SP = Promise<Record<string, string | string[] | undefined>>;

export async function generateMetadata({params}: {params: Promise<{lang: string}>}): Promise<Metadata> {
  const {lang} = await params;
  return pageMetadata('services', isLocale(lang) ? lang : DEFAULT_LOCALE, 'services');
}

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{lang: string}>;
  searchParams: SP;
}) {
  const {lang} = await params;
  const preview = '_storyblok' in (await searchParams);
  return <RenderStoryblokPage slug="services" lang={lang as Locale} preview={preview} />;
}
