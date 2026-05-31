import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {getServices, getTestimonials} from '../../../../lib/content-server';
import CaseStudyDetail from '../../../../components/pages/CaseStudyDetail';
import {isLocale, DEFAULT_LOCALE, LOCALES} from '../../../../lib/locales';
import {isPreview, resolveLocale} from '../../../../lib/route-context';
import {buildMetadata} from '../../../../lib/seo';
import {mapById} from '../../../../lib/relations';

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
  const l = isLocale(lang) ? lang : DEFAULT_LOCALE;
  const story = (await getTestimonials(l, false)).find((t) => t.slug === slug);
  return buildMetadata({
    title: story?.challenge || `${story?.name} — case study`,
    description: story?.outcome || story?.text?.slice(0, 160),
    image: story?.imageUrl,
    path: `case-studies/${slug}`,
    lang: l,
    type: 'article',
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
