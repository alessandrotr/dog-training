import type { Ref } from 'react'
import { Prose } from '@/components/ui'

// Editorial reading treatment for the article body. Grouped by intent so each
// typographic decision is legible (and tweakable) on its own line.
const ARTICLE_PROSE = [
  // size · measure · legibility — prose-lg is Tailwind's blog-tuned scale (the
  // one Medium/Substack/Stripe-style sites use); ~66ch line; real kerning.
  // We DON'T override per-element size or spacing — uniform rhythm comes from here.
  'prose-lg max-w-[68ch] [text-rendering:optimizeLegibility]',
  // headings — sans/extrabold to match the app's Heading system; the size step
  // (h2 > h3 > body) is prose-lg's modular scale, left untouched.
  'prose-headings:font-sans prose-headings:font-extrabold prose-headings:tracking-tight prose-headings:text-balance prose-headings:text-amber-950 prose-headings:scroll-mt-24',
  // body — uniform ink copy, generous leading, no orphans
  'prose-p:text-stone-700 prose-p:text-pretty prose-p:leading-[1.75]',
  // lists — identical size & rhythm to paragraphs, accent markers
  'prose-li:text-stone-700 prose-li:marker:text-amber-500',
  // emphasis — bold reads as true ink
  'prose-strong:font-semibold prose-strong:text-stone-900',
  // links — on-brand amber, underline with offset
  'prose-a:font-medium prose-a:text-amber-700 prose-a:underline prose-a:decoration-amber-300 prose-a:underline-offset-2 prose-a:transition-colors hover:prose-a:text-amber-900 hover:prose-a:decoration-amber-600',
  // blockquote → pull-quote — serif italic "voice" (matches TestimonialsFeatured / CaseStudyStory), accent rule
  'prose-blockquote:border-l-2 prose-blockquote:border-amber-400 prose-blockquote:pl-5 prose-blockquote:font-serif prose-blockquote:text-xl prose-blockquote:font-normal prose-blockquote:italic prose-blockquote:leading-relaxed prose-blockquote:text-amber-950',
  // imagery — soft corners + captions
  'prose-img:rounded-2xl prose-img:shadow-sm prose-figcaption:text-center prose-figcaption:text-sm prose-figcaption:text-stone-400',
  // dividers
  'prose-hr:border-stone-200',
].join(' ')

// The article content (rich text rendered to HTML, with ToC anchor ids).
// `ref` targets the prose region so the reading-progress bar tracks it alone.
export default function BlogPostBody({ html, ref }: { html: string; ref?: Ref<HTMLElement> }) {
  return (
    <main ref={ref} className="max-lg:mt-4 lg:col-span-8">
      <Prose html={html} className={ARTICLE_PROSE} />
    </main>
  )
}
