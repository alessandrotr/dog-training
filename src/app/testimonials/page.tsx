import Testimonials from '../../components/pages/Testimonials';
import {getTestimonials} from '../../lib/content-server';

export const revalidate = 60;

export default async function Page() {
  const testimonialsByLang = await getTestimonials();
  return <Testimonials testimonialsByLang={testimonialsByLang} />;
}
