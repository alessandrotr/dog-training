import {getBlogPosts} from '../../../../lib/content-server';
import BlogPostView from '../../../../components/pages/BlogPostView';
import type {Locale} from '../../../../lib/locales';

type SP = Promise<Record<string, string | string[] | undefined>>;

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{lang: string; slug: string}>;
  searchParams: SP;
}) {
  const {lang, slug} = await params;
  const preview = '_storyblok' in (await searchParams);
  const posts = await getBlogPosts(lang as Locale, preview);
  return <BlogPostView posts={posts} slug={slug} />;
}
