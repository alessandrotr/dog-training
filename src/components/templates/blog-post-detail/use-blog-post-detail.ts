import { useMemo } from 'react'
import { caseStudyCountByService, guideCountByService } from '@/lib/relations'
import type { BlogPost, BlogTaxonomies, ServiceItem, TestimonialItem } from '@/types'

export interface BlogPostDetailProps {
  post: BlogPost
  posts: BlogPost[]
  taxonomies: BlogTaxonomies
  services: ServiceItem[]
  testimonials: TestimonialItem[]
}

// Everything the blog-post view needs, derived from the raw props in one place.
export function useBlogPostDetail({
  post,
  posts,
  taxonomies,
  services,
  testimonials,
}: BlogPostDetailProps) {
  return useMemo(() => {
    const others = posts.filter((p) => p.slug !== post.slug)
    return {
      // ToC ids are injected into the article HTML server-side.
      toc: post.tableOfContents ?? [],
      // Related posts: same category first, then the rest.
      relatedPosts: [
        ...others.filter((p) => p.category && p.category === post.category),
        ...others.filter((p) => !p.category || p.category !== post.category),
      ],
      relatedServices: services.filter((s) => post.serviceIds?.includes(s.id)),
      caseStudyCounts: caseStudyCountByService(testimonials),
      guideCounts: guideCountByService(posts),
      catLabel: (c: string) => taxonomies.categories[c] ?? c,
      tagLabel: (t: string) => taxonomies.tags[t] ?? t,
    }
  }, [post, posts, taxonomies, services, testimonials])
}
