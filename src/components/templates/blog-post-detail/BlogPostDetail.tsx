'use client'

import { useRef } from 'react'
import { Section } from '@/components/ui'
import { useBlogPostDetail, type BlogPostDetailProps } from './use-blog-post-detail'
import BlogPostHeader from './BlogPostHeader'
import BlogPostSidebar from './BlogPostSidebar'
import BlogPostBody from './BlogPostBody'
import BlogPostRelated from './BlogPostRelated'
import ReadingProgress from './ReadingProgress'

// Full blog-post page. Pure composition; data comes from useBlogPostDetail.
export default function BlogPostDetail(props: BlogPostDetailProps) {
  const { post } = props
  const { toc, relatedPosts, relatedServices, caseStudyCounts, guideCounts, catLabel, tagLabel } =
    useBlogPostDetail(props)
  // Reading progress tracks the prose body alone, not the whole page.
  const bodyRef = useRef<HTMLElement>(null)

  return (
    <article className="py-8 text-left">
      <ReadingProgress targetRef={bodyRef} />
      <Section as="div">
        <BlogPostHeader post={post} categoryLabel={catLabel(post.category)} />

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-12 lg:gap-12">
          <BlogPostSidebar toc={toc} tags={post.tags} tagLabel={tagLabel} />
          <BlogPostBody html={post.content} ref={bodyRef} />
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
