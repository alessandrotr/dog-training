import { Sparkles } from 'lucide-react'
import { Eyebrow, Prose } from '@/components/ui'
import type { TestimonialItem } from '@/types'

export default function CaseStudyStory({ story }: { story: TestimonialItem }) {
  const paragraphs = story.text
    .split('\n')
    .map((p) => p.trim())
    .filter(Boolean)

  return (
    <>
      <div className="mt-10 space-y-4">
        <Eyebrow>What we did</Eyebrow>
        <Prose>
          {paragraphs.length ? paragraphs.map((p, i) => <p key={i}>{p}</p>) : <p>{story.text}</p>}
        </Prose>
      </div>

      {story.outcome && (
        <div className="mt-10 rounded-2xl bg-amber-50 p-6 ring-1 ring-amber-200/60">
          <Eyebrow tone="brand" className="flex items-center gap-2">
            <Sparkles className="h-4 w-4" /> The outcome
          </Eyebrow>
          <p className="mt-2 font-serif text-xl italic leading-relaxed text-amber-950">
            {story.outcome}
          </p>
        </div>
      )}
    </>
  )
}
