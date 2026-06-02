import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {getServices, getTestimonials} from '@/features/storyblok/api/content-server';
import CaseStudyDetail from '@/components/templates/CaseStudyDetail';
import {DEFAULT_LOCALE, LOCALES} from '@/lib/locales';
import {resolvePageContext} from '@/lib/route-context';
import {detailMetadata} from '@/lib/seo';
import {mapById} from '@/lib/relations';

type SP = Promise<Record<string, string | string[] | undefined>>;

// Prebuild every case study in every locale.
export async function generateStaticParams() {
  const studies = await getTestimonials(DEFAULT_LOCALE, false);
  return LOCALES.flatMap((lang) => studies.map((t) => ({lang, slug: t.slug})));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{lang: string; slug: string}>;
}): Promise<Metadata> {
  const {lang, slug} = await params;
  return detailMetadata({
    slug,
    lang,
    path: `case-studies/${slug}`,
    type: 'article',
    load: (l) => getTestimonials(l, false),
    map: (story) => ({
      title: story.challenge || `${story.name} — case study`,
      description: story.outcome || story.text?.slice(0, 160),
      image: story.imageUrl,
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
  const [testimonials, services] = await Promise.all([
    getTestimonials(locale, preview),
    getServices(locale, preview),
  ]);
  const story = testimonials.find((t) => t.slug === slug);
  if (!story) notFound();

  const serviceById = mapById(services);
  const service = story.serviceId ? serviceById.get(story.serviceId) : undefined;
  // Related: same service first, then the rest.
  const others = testimonials.filter((t) => t.slug !== slug);
  const related = [
    ...others.filter((t) => t.serviceId && t.serviceId === story.serviceId),
    ...others.filter((t) => !t.serviceId || t.serviceId !== story.serviceId),
  ];

  return <CaseStudyDetail story={story} service={service} related={related} serviceById={serviceById} />;
}
