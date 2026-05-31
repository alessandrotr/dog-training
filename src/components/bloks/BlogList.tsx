'use client';

import {storyblokEditable} from '@storyblok/react';
import {useHref} from '../../lib/navigation';
import {usePageData} from '../PageDataProvider';
import Carousel from '../Carousel';
import ArticleCard from './ArticleCard';

interface BlogListBlok {
  _uid: string;
  component: string;
  eyebrow?: string;
  headline?: string;
  footer_label?: string;
  limit?: string | number;
}

// Data-bound: pulls blog_post stories from the page route and renders them in
// the shared Carousel (compact article cards).
export default function BlogList({blok}: {blok: BlogListBlok}) {
  const href = useHref();
  const {posts} = usePageData();
  const limit = Number(blok.limit) || posts.length;
  const items = posts.slice(0, limit);

  return (
    <section {...storyblokEditable(blok as any)} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <Carousel
        items={items}
        getKey={(p) => p.id}
        size="sm"
        label="articles"
        eyebrow={blok.eyebrow}
        headline={blok.headline}
        footerLabel={blok.footer_label}
        footerHref={href.page('blog')}
        renderItem={(post, slideProps) => <ArticleCard post={post} slideProps={slideProps} />}
      />
    </section>
  );
}
