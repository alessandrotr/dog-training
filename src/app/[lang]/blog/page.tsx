import type {Metadata} from 'next';
import Blog from '../../../components/pages/Blog';
import {getBlogPosts} from '../../../lib/content-server';
import {getBlogTaxonomies} from '../../../lib/get-datasource';
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

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{lang: string}>;
  searchParams: SP;
}) {
  const {lang} = await params;
  const sp = await searchParams;
  const preview = isPreview(sp);
  const locale = resolveLocale(lang, sp);
  const [posts, taxonomies] = await Promise.all([
    getBlogPosts(locale, preview),
    getBlogTaxonomies(locale),
  ]);
  return <Blog posts={posts} taxonomies={taxonomies} />;
}
