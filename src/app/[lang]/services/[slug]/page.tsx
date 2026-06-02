import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {getServices, getTestimonials, getBlogPosts} from '../../../../lib/content-server';
import ServiceDetail from '../../../../components/pages/ServiceDetail';
import {resolvePageContext} from '../../../../lib/route-context';
import {detailMetadata} from '../../../../lib/seo';

type SP = Promise<Record<string, string | string[] | undefined>>;

export async function generateMetadata({
  params,
}: {
  params: Promise<{lang: string; slug: string}>;
}): Promise<Metadata> {
  const {lang, slug} = await params;
  return detailMetadata({
    slug,
    lang,
    path: `services/${slug}`,
    load: (l) => getServices(l, false),
    map: (service) => ({
      title: service.title,
      description: service.shortDescription,
      image: service.imageUrl,
    }),
  });
}

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{lang: string; slug: string}>;
  searchParams: SP;
}) {
  const {lang, slug} = await params;
  const sp = await searchParams;
  const {preview, locale} = resolvePageContext(lang, sp);
  const [services, testimonials, posts] = await Promise.all([
    getServices(locale, preview),
    getTestimonials(locale, preview),
    getBlogPosts(locale, preview),
  ]);
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();
  const related = services.filter((s) => s.slug !== slug);
  return <ServiceDetail service={service} testimonials={testimonials} related={related} posts={posts} />;
}
