import type {Metadata} from 'next';
import {getBlogPosts, getServices, getTestimonials} from '@/features/storyblok/api/content-server';
import {getBlogTaxonomies} from '@/features/storyblok/api/get-datasource';
import BlogPostView from '@/components/templates/BlogPostView';
import {DEFAULT_LOCALE, LOCALES} from '@/lib/locales';
import {resolvePageContext} from '@/lib/route-context';
import {detailMetadata} from '@/lib/seo';

type SP = Promise<Record<string, string | string[] | undefined>>;

// Prebuild every post in every locale so the article pages are static (●).
export async function generateStaticParams() {
  const posts = await getBlogPosts(DEFAULT_LOCALE, false);
  return LOCALES.flatMap((lang) => posts.map((p) => ({lang, slug: p.slug})));
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
    path: `blog/${slug}`,
    type: 'article',
    load: (l) => getBlogPosts(l, false),
    map: (post) => ({
      title: post.seo.metaTitle || post.title,
      description: post.seo.metaDescription || post.summary,
      image: post.imageUrl,
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
  const [posts, taxonomies, services, testimonials] = await Promise.all([
    getBlogPosts(locale, preview),
    getBlogTaxonomies(locale),
    getServices(locale, preview),
    getTestimonials(locale, preview),
  ]);
  return <BlogPostView posts={posts} slug={slug} taxonomies={taxonomies} services={services} testimonials={testimonials} />;
}
