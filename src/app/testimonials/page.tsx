import Testimonials from '../../components/pages/Testimonials';
import {getTestimonials} from '../../lib/content-server';

type SP = Promise<Record<string, string | string[] | undefined>>;

export default async function Page({searchParams}: {searchParams: SP}) {
  const preview = '_storyblok' in (await searchParams);
  const testimonialsByLang = await getTestimonials(preview);
  return <Testimonials testimonialsByLang={testimonialsByLang} />;
}
