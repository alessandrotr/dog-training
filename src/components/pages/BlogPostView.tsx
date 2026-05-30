'use client';

import type {BlogPost} from '../../types';
import BlogPostTemplate from './BlogPostTemplate';
import {useNavigate} from '../../lib/navigation';

// Client wrapper: finds the post by slug (already locale-correct from the
// server fetch) and renders it, or a fallback when the slug is unknown.
export default function BlogPostView({
  posts,
  slug,
}: {
  posts: BlogPost[];
  slug: string;
}) {
  const post = posts.find((p) => p.slug === slug);
  const setCurrentPage = useNavigate();

  if (!post) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center space-y-6">
        <h1 className="font-sans text-2xl font-extrabold text-amber-950">
          Article not found
        </h1>
        <p className="text-stone-500">
          We couldn&apos;t locate that journal entry. It may have moved.
        </p>
        <button
          onClick={() => setCurrentPage('blog')}
          className="rounded-xl bg-amber-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-amber-950"
        >
          Back to Blog
        </button>
      </div>
    );
  }

  return <BlogPostTemplate post={post} posts={posts} />;
}
