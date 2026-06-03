import Image from 'next/image'
import { PersonByline, Heading } from '@/components/ui'
import type { TestimonialItem } from '@/types'

export default function CaseStudyHeader({ story }: { story: TestimonialItem }) {
  return (
    <>
      <header className="mt-[27vw] space-y-5 sm:mt-[10vw] lg:mt-25">
        <PersonByline
          name={story.name}
          breed={story.dogBreed}
          imageUrl={story.imageUrl}
          size="lg"
        />
        {story.challenge && (
          <Heading level={1} size="title" className="leading-tight">
            {story.challenge}
          </Heading>
        )}
      </header>

      {story.imageUrl && (
        <div className="relative mt-8 aspect-video w-full overflow-hidden rounded-3xl bg-stone-100 shadow-lg">
          <Image
            src={story.imageUrl}
            alt={story.name}
            fill
            sizes="(max-width: 1024px) 100vw, 768px"
            className="object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
      )}
    </>
  )
}
