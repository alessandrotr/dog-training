'use client';

import Link from 'next/link';
import type {BlogPost, BlogTaxonomies, ServiceItem, TestimonialItem} from '@/types';
import BlogPostTemplate from './BlogPostTemplate';
import {useHref} from '@/lib/navigation';
import {Heading, Text} from '@/components/ui';

// Client wrapper: finds the post by slug (already locale-correct from the
// server fetch) and renders it, or a fallback when the slug is unknown.
export default function BlogPostView({
  posts,
  slug,
  taxonomies,
  services,
  testimonials,
}: {
  posts: BlogPost[];
  slug: string;
  taxonomies: BlogTaxonomies;
  services: ServiceItem[];
  testimonials: TestimonialItem[];
}) {
  const post = posts.find((p) => p.slug === slug);
  const href = useHref();

  if (!post) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center space-y-6">
        <Heading level={1} size="section">Article not found</Heading>
        <Text>We couldn&apos;t locate that journal entry. It may have moved.</Text>
        <Link
          href={href.page('blog')}
          className="inline-block rounded-xl bg-amber-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-amber-950"
        >
          Back to Blog
        </Link>
      </div>
    );
  }

  return <BlogPostTemplate post={post} posts={posts} taxonomies={taxonomies} services={services} testimonials={testimonials} />;
}
