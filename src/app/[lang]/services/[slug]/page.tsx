import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {getServices, getTestimonials} from '../../../../lib/content-server';
import ServiceDetail from '../../../../components/pages/ServiceDetail';
import {isLocale, DEFAULT_LOCALE, type Locale} from '../../../../lib/locales';
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
  const preview = '_storyblok' in (await searchParams);
  const [services, testimonials] = await Promise.all([
    getServices(lang as Locale, preview),
    getTestimonials(lang as Locale, preview),
  ]);
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();
  const reviews = testimonials.filter((t) => t.serviceId === service.id);
  const related = services.filter((s) => s.slug !== slug);
  return <ServiceDetail service={service} reviews={reviews} related={related} />;
}
