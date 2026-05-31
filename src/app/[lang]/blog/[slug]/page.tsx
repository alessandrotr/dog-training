import type {Metadata} from 'next';
import {getBlogPosts, getServices, getTestimonials} from '../../../../lib/content-server';
import {getBlogTaxonomies} from '../../../../lib/get-datasource';
import BlogPostView from '../../../../components/pages/BlogPostView';
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
  const post = (await getBlogPosts(l, false)).find((p) => p.slug === slug);
  return buildMetadata({
    title: post?.seo.metaTitle || post?.title,
    description: post?.seo.metaDescription || post?.summary,
    image: post?.imageUrl,
    path: `blog/${slug}`,
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
  const [posts, taxonomies, services, testimonials] = await Promise.all([
    getBlogPosts(locale, preview),
    getBlogTaxonomies(locale),
    getServices(locale, preview),
    getTestimonials(locale, preview),
  ]);
  return <BlogPostView posts={posts} slug={slug} taxonomies={taxonomies} services={services} testimonials={testimonials} />;
}
