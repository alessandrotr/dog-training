import type {Metadata} from 'next';
import RenderStoryblokPage from '../../../components/RenderStoryblokPage';
import {isLocale, DEFAULT_LOCALE} from '../../../lib/locales';
import {isPreview, resolveLocale} from '../../../lib/route-context';
import {pageMetadata} from '../../../lib/seo';

type SP = Promise<Record<string, string | string[] | undefined>>;

export async function generateMetadata({params}: {params: Promise<{lang: string}>}): Promise<Metadata> {
  const {lang} = await params;
  return pageMetadata('case-studies', isLocale(lang) ? lang : DEFAULT_LOCALE, 'case-studies');
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
  return <RenderStoryblokPage slug="case-studies" lang={resolveLocale(lang, sp)} preview={isPreview(sp)} />;
}
