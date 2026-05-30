import Blog from '../../components/pages/Blog';
import {getBlogPosts} from '../../lib/content-server';

export const revalidate = 60;

export default async function Page() {
  const postsByLang = await getBlogPosts();
  return <Blog postsByLang={postsByLang} />;
}
