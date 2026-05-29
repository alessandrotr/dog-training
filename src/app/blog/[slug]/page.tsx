'use client';

import {useParams} from 'next/navigation';
import {useTranslation} from 'react-i18next';
import {BLOG_POSTS} from '../../../data';
import BlogPostTemplate from '../../../components/pages/BlogPostTemplate';
import {useNavigate} from '../../../lib/navigation';

export default function BlogPostPage() {
  const params = useParams();
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;
  const {i18n} = useTranslation();
  const lang = (i18n.language === 'de' ? 'de' : 'en') as 'en' | 'de';
  const post = BLOG_POSTS[lang].find((p) => p.slug === slug);
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

  return <BlogPostTemplate post={post} />;
}
