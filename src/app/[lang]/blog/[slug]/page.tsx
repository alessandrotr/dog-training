import type {Metadata} from 'next';
import {getBlogPosts, getServices, getTestimonials} from '../../../../lib/content-server';
import {getBlogTaxonomies} from '../../../../lib/get-datasource';
import BlogPostView from '../../../../components/pages/BlogPostView';
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
  const preview = '_storyblok' in (await searchParams);
  const [posts, taxonomies, services, testimonials] = await Promise.all([
    getBlogPosts(lang as Locale, preview),
    getBlogTaxonomies(lang as Locale),
    getServices(lang as Locale, preview),
    getTestimonials(lang as Locale, preview),
  ]);
  return <BlogPostView posts={posts} slug={slug} taxonomies={taxonomies} services={services} testimonials={testimonials} />;
}
