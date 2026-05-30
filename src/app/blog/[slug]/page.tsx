import {getBlogPosts} from '../../../lib/content-server';
import BlogPostView from '../../../components/pages/BlogPostView';

type SP = Promise<Record<string, string | string[] | undefined>>;

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{slug: string}>;
  searchParams: SP;
}) {
  const {slug} = await params;
  const preview = '_storyblok' in (await searchParams);
  const postsByLang = await getBlogPosts(preview);
  return <BlogPostView postsByLang={postsByLang} slug={slug} />;
}
