'use client'

import { createContext, useContext } from 'react'
import type { ServiceItem, TestimonialItem, FAQItem, BlogPost, BlogTaxonomies } from '@/types'

// Locale-correct content lists prefetched by the page route and shared with the
// data-bound bloks (services_grid, testimonials, faq, blog_list) so they don't
// each issue their own fetch. Client context flows through the server-rendered
// StoryblokStory tree to the client bloks that consume it.
export interface PageData {
  services: ServiceItem[]
  testimonials: TestimonialItem[]
  faqs: FAQItem[]
  posts: BlogPost[]
  taxonomies: BlogTaxonomies
}

const EMPTY: PageData = {
  services: [],
  testimonials: [],
  faqs: [],
  posts: [],
  taxonomies: { categories: {}, tags: {} },
}
const PageDataContext = createContext<PageData>(EMPTY)

export function PageDataProvider({
  value,
  children,
}: {
  value: PageData
  children: React.ReactNode
}) {
  return <PageDataContext.Provider value={value}>{children}</PageDataContext.Provider>
}

export const usePageData = () => useContext(PageDataContext)
