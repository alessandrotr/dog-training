import Home from '../../components/pages/Home';
import {getServices, getTestimonials, getBlogPosts} from '../../lib/content-server';
import type {Locale} from '../../lib/locales';

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
  const [services, testimonials, posts] = await Promise.all([
    getServices(lang as Locale, preview),
    getTestimonials(lang as Locale, preview),
    getBlogPosts(lang as Locale, preview),
  ]);
  return <Home services={services} testimonials={testimonials} posts={posts} />;
}
