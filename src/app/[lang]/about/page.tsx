import type {Metadata} from 'next';
import RenderStoryblokPage from '../../../components/RenderStoryblokPage';
import {isLocale, DEFAULT_LOCALE} from '../../../lib/locales';
import {resolvePageContext} from '../../../lib/route-context';
import {pageMetadata} from '../../../lib/seo';

type SP = Promise<Record<string, string | string[] | undefined>>;

export async function generateMetadata({params}: {params: Promise<{lang: string}>}): Promise<Metadata> {
  const {lang} = await params;
  return pageMetadata('about', isLocale(lang) ? lang : DEFAULT_LOCALE, 'about');
}

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{lang: string}>;
  searchParams: SP;
}) {
  const {lang} = await params;
  const sp = await searchParams;
  const {preview, locale} = resolvePageContext(lang, sp);
  return <RenderStoryblokPage slug="about" lang={locale} preview={preview} />;
}
