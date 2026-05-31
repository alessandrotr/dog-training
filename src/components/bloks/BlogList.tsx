'use client';

import {storyblokEditable} from '@storyblok/react';
import {useHref} from '../../lib/navigation';
import {usePageData} from '../PageDataProvider';
import Carousel from '../Carousel';
import Section from '../ui/section';
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
  const {posts, services} = usePageData();
  const limit = Number(blok.limit) || posts.length;
  const items = posts.slice(0, limit);
  const serviceTitle = (ids?: string[]) => {
    const id = ids?.[0];
    return id ? services.find((s) => s.id === id)?.title : undefined;
  };

  return (
    <Section {...storyblokEditable(blok as any)}>
      <Carousel
        items={items}
        getKey={(p) => p.id}
        size="sm"
        label="articles"
        eyebrow={blok.eyebrow}
        headline={blok.headline}
        footerLabel={blok.footer_label}
        footerHref={href.page('blog')}
        renderItem={(post, slideProps) => <ArticleCard post={post} slideProps={slideProps} serviceTitle={serviceTitle(post.serviceIds)} />}
      />
    </Section>
  );
}
