import Home from '../components/pages/Home';
import {getServices, getTestimonials, getBlogPosts} from '../lib/content-server';

export const revalidate = 60;

export default async function Page() {
  const [servicesByLang, testimonialsByLang, postsByLang] = await Promise.all([
    getServices(),
    getTestimonials(),
    getBlogPosts(),
  ]);
  return (
    <Home
      servicesByLang={servicesByLang}
      testimonialsByLang={testimonialsByLang}
      postsByLang={postsByLang}
    />
  );
}
