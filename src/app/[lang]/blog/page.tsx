import Blog from '../../../components/pages/Blog';
import {getBlogPosts} from '../../../lib/content-server';
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
  const posts = await getBlogPosts(lang as Locale, preview);
  return <Blog posts={posts} />;
}
