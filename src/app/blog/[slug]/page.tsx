import {getBlogPosts} from '../../../lib/content-server';
import BlogPostView from '../../../components/pages/BlogPostView';

export const revalidate = 60;

export default async function Page({params}: {params: Promise<{slug: string}>}) {
  const {slug} = await params;
  const postsByLang = await getBlogPosts();
  return <BlogPostView postsByLang={postsByLang} slug={slug} />;
}
