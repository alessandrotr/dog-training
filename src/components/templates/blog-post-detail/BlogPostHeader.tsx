import Image from 'next/image'
import { CalendarDays, Clock } from 'lucide-react'
import { Heading } from '@/components/ui'
import type { BlogPost } from '@/types'

// Category chip, title, published/reading-time meta, and the big hero image.
export default function BlogPostHeader({
  post,
  categoryLabel,
}: {
  post: BlogPost
  categoryLabel: string
}) {
  return (
    <>
      <div className="mx-auto mb-10 max-w-3xl space-y-4 text-center md:text-left">
        <span className="inline-flex items-center rounded-full border border-amber-200/45 bg-amber-700 px-3 py-1 font-mono text-xs font-bold uppercase text-white">
          {categoryLabel}
        </span>
        <Heading level={1} size="title" className="leading-tight md:text-5xl">
          {post.title}
        </Heading>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-4 font-mono text-xs text-stone-400 md:justify-between">
          <div className="flex items-center gap-1.5">
            <CalendarDays className="h-3.5 w-3.5 text-amber-700" />
            <span className="text-stone-600">Published: {post.publishDate}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 text-amber-700" />
            <span className="text-stone-600">{post.readingTime}</span>
          </div>
        </div>
      </div>

      <div className="relative mb-12 aspect-video max-h-[420px] w-full overflow-hidden rounded-3xl bg-stone-100 shadow-lg">
        <Image
          src={post.imageUrl}
          alt={post.title}
          fill
          sizes="(max-width: 1024px) 100vw, 80vw"
          className="object-cover"
          referrerPolicy="no-referrer"
        />
      </div>
    </>
  )
}
