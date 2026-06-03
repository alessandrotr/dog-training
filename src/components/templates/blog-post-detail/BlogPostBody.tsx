import { Prose } from '@/components/ui'

// The article content (rich text rendered to HTML, with ToC anchor ids).
export default function BlogPostBody({ html }: { html: string }) {
  return (
    <main className="max-lg:mt-4 lg:col-span-8">
      <Prose
        html={html}
        className="prose-headings:font-sans prose-headings:font-extrabold prose-headings:text-amber-950 prose-headings:scroll-mt-24 prose-li:my-1.5 prose-p:my-4 prose-li:text-stone-600"
      />
    </main>
  )
}
