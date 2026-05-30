import Blog from '../../components/pages/Blog';
import {getBlogPosts} from '../../lib/content-server';

type SP = Promise<Record<string, string | string[] | undefined>>;

export default async function Page({searchParams}: {searchParams: SP}) {
  const preview = '_storyblok' in (await searchParams);
  const postsByLang = await getBlogPosts(preview);
  return <Blog postsByLang={postsByLang} />;
}
