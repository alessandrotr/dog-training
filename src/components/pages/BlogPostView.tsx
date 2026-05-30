'use client';

import {useTranslation} from 'react-i18next';
import type {BlogPost, Localized} from '../../types';
import BlogPostTemplate from './BlogPostTemplate';
import {useNavigate} from '../../lib/navigation';

// Client wrapper: picks the post in the active language and renders it, or a
// fallback while content loads / when the slug is unknown.
export default function BlogPostView({
  postsByLang,
  slug,
}: {
  postsByLang: Localized<BlogPost>;
  slug: string;
}) {
  const {i18n} = useTranslation();
  const lang = (i18n.language === 'de' ? 'de' : 'en') as 'en' | 'de';
  const post = postsByLang[lang].find((p) => p.slug === slug);
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

  return <BlogPostTemplate post={post} postsByLang={postsByLang} />;
}
