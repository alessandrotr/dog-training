import { StoryblokServerComponent, storyblokEditable } from '@storyblok/react/rsc'
import type { BlokBase } from '@/types'

interface PageBlok extends BlokBase {
  body?: Array<{ _uid: string; component: string; [key: string]: unknown }>
}

// Root `page` content type: renders its composed bloks in order.
export default function Page({ blok }: { blok: PageBlok }) {
  return (
    <div {...storyblokEditable(blok as any)} className="space-y-8 pb-8">
      {(blok.body ?? []).map((nested) => (
        <StoryblokServerComponent blok={nested} key={nested._uid} />
      ))}
    </div>
  )
}
