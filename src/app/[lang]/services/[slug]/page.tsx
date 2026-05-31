import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {getServices, getTestimonials, getBlogPosts} from '../../../../lib/content-server';
import ServiceDetail from '../../../../components/pages/ServiceDetail';
import {isLocale, DEFAULT_LOCALE} from '../../../../lib/locales';
import {isPreview, resolveLocale} from '../../../../lib/route-context';
import {buildMetadata} from '../../../../lib/seo';

type SP = Promise<Record<string, string | string[] | undefined>>;

export async function generateMetadata({
  params,
}: {
  params: Promise<{lang: string; slug: string}>;
}): Promise<Metadata> {
  const {lang, slug} = await params;
  const l = isLocale(lang) ? lang : DEFAULT_LOCALE;
  const service = (await getServices(l, false)).find((s) => s.slug === slug);
  return buildMetadata({
    title: service?.title,
    description: service?.shortDescription,
    image: service?.imageUrl,
    path: `services/${slug}`,
    lang: l,
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
  const preview = isPreview(sp);
  const locale = resolveLocale(lang, sp);
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
