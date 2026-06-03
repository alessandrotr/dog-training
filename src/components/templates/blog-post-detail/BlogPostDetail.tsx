'use client'

import { Section } from '@/components/ui'
import { useBlogPostDetail, type BlogPostDetailProps } from './use-blog-post-detail'
import BlogPostHeader from './BlogPostHeader'
import BlogPostSidebar from './BlogPostSidebar'
import BlogPostBody from './BlogPostBody'
import BlogPostRelated from './BlogPostRelated'

// Full blog-post page. Pure composition; data comes from useBlogPostDetail.
export default function BlogPostDetail(props: BlogPostDetailProps) {
  const { post } = props
  const { toc, relatedPosts, relatedServices, caseStudyCounts, guideCounts, catLabel, tagLabel } =
    useBlogPostDetail(props)

  return (
    <article className="py-8 text-left">
      <Section as="div">
        <BlogPostHeader post={post} categoryLabel={catLabel(post.category)} />

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-12 lg:gap-12">
          <BlogPostSidebar toc={toc} tags={post.tags} tagLabel={tagLabel} />
          <BlogPostBody html={post.content} />
        </div>

        <BlogPostRelated
          relatedServices={relatedServices}
          relatedPosts={relatedPosts}
          caseStudyCounts={caseStudyCounts}
          guideCounts={guideCounts}
          catLabel={catLabel}
        />
      </Section>
    </article>
  )
}
