import Home from '../components/pages/Home';
import {getServices, getTestimonials, getBlogPosts} from '../lib/content-server';

type SP = Promise<Record<string, string | string[] | undefined>>;

export default async function Page({searchParams}: {searchParams: SP}) {
  const preview = '_storyblok' in (await searchParams);
  const [servicesByLang, testimonialsByLang, postsByLang] = await Promise.all([
    getServices(preview),
    getTestimonials(preview),
    getBlogPosts(preview),
  ]);
  return (
    <Home
      servicesByLang={servicesByLang}
      testimonialsByLang={testimonialsByLang}
      postsByLang={postsByLang}
    />
  );
}
