import { storyblokEditable } from '@storyblok/react/rsc'
import { Section, SectionHeading, Heading, Text } from '@/components/ui'

import type { BlokBase } from '@/types'

interface HowItWorksBlok extends BlokBase {
  eyebrow?: string
  headline?: string
  subheadline?: string
  step1_title?: string
  step1_desc?: string
  step2_title?: string
  step2_desc?: string
  step3_title?: string
  step3_desc?: string
  step4_title?: string
  step4_desc?: string
}

export default function HowItWorks({ blok }: { blok: HowItWorksBlok }) {
  const steps = [
    { title: blok.step1_title, desc: blok.step1_desc },
    { title: blok.step2_title, desc: blok.step2_desc },
    { title: blok.step3_title, desc: blok.step3_desc },
    { title: blok.step4_title, desc: blok.step4_desc },
  ].filter((s) => s.title || s.desc)

  return (
    <Section {...storyblokEditable(blok as any)}>
      <SectionHeading
        eyebrow={blok.eyebrow}
        headline={blok.headline}
        subheadline={blok.subheadline}
        align="center"
        size="lg"
        className="mx-auto mb-20 max-w-3xl"
      />

      <div className="grid grid-cols-1 gap-12 md:grid-cols-4 relative">
        <div className="hidden md:block absolute top-12 left-12 right-12 h-0.5 bg-stone-200 z-0"></div>
        {steps.map((step, i) => (
          <div
            key={i}
            className="relative flex flex-col items-center text-center space-y-4 z-10 px-2 group"
          >
            <div className="flex size-16 items-center justify-center rounded-2xl bg-stone-100 border border-stone-200 text-amber-950 text-lg font-bold font-mono transition-colors group-hover:bg-amber-700 group-hover:text-white">
              {String(i + 1).padStart(2, '0')}
            </div>
            <Heading level={3} size="card" className="mt-2">
              {step.title}
            </Heading>
            <Text>{step.desc}</Text>
          </div>
        ))}
      </div>
    </Section>
  )
}
