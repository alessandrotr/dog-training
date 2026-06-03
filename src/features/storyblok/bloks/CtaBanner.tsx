'use client'

import Link from 'next/link'
import { storyblokEditable } from '@storyblok/react'
import { PawPrint, ArrowRight, Heart, Bone } from 'lucide-react'
import { useHref } from '@/lib/navigation'
import { Section, Button, Heading, Text } from '@/components/ui'

import type { BlokBase } from '@/types'

interface CtaBannerBlok extends BlokBase {
  headline?: string
  description?: string
  primary_label?: string
  primary_target?: string
  secondary_label?: string
  secondary_target?: string
  note?: string
  variant?: 'dark' | 'light'
}

export default function CtaBanner({ blok }: { blok: CtaBannerBlok }) {
  const href = useHref()

  if (blok.variant === 'light') {
    return (
      <Section {...storyblokEditable(blok as any)}>
        <div className="rounded-2xl border border-stone-200 bg-gradient-to-r from-stone-50 to-stone-100 p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-start space-x-4">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-900 border border-amber-200/50">
              <PawPrint className="size-5.5" />
            </div>
            <div className="text-left font-sans space-y-1">
              {blok.headline && (
                <Heading level={3} size="cardSm">
                  {blok.headline}
                </Heading>
              )}
              {blok.description && <Text size="xs">{blok.description}</Text>}
            </div>
          </div>
          <div className="flex flex-wrap gap-3 justify-center">
            {blok.primary_label && (
              <Button
                render={<Link href={href.page(blok.primary_target || 'booking')} />}
                variant="cta"
                size="xl"
                className="px-5 py-3"
              >
                {blok.primary_label}
              </Button>
            )}
            {blok.secondary_label && (
              <Button
                render={<Link href={href.page(blok.secondary_target || 'contact')} />}
                variant="ctaOutline"
                size="xl"
                className="px-5 py-3"
              >
                {blok.secondary_label}
              </Button>
            )}
          </div>
        </div>
      </Section>
    )
  }

  return (
    <Section {...storyblokEditable(blok as any)} className="px-0 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-none bg-linear-to-br from-amber-500 via-amber-600 to-amber-800 px-6 py-16 text-center text-amber-50 shadow-xl ring-1 ring-amber-400/30 sm:rounded-4xl md:px-12 md:py-20">
        {/* Soft glows */}
        <div className="pointer-events-none absolute -top-24 -right-16 size-72 rounded-full bg-amber-300/30 blur-3xl"></div>
        <div className="pointer-events-none absolute -bottom-24 -left-16 size-80 rounded-full bg-amber-400/25 blur-3xl"></div>
        <div className="pointer-events-none absolute left-1/2 top-0 size-56 -translate-x-1/2 rounded-full bg-white/10 blur-3xl"></div>

        {/* Cute polka-dot texture */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,_rgba(255,255,255,0.10)_1.5px,_transparent_1.5px)] [background-size:22px_22px] opacity-60"></div>

        {/* Scattered, playful critters */}
        <PawPrint className="pointer-events-none absolute left-6 top-10 size-12 rotate-[-18deg] text-white/20" />
        <Heart className="pointer-events-none absolute left-1/4 bottom-8 size-7 rotate-12 fill-white/15 text-transparent" />
        <PawPrint className="pointer-events-none absolute right-10 top-1/3 size-16 rotate-[24deg] text-white/15" />
        <Bone className="pointer-events-none absolute right-1/4 bottom-12 size-9 -rotate-12 text-white/20" />
        <PawPrint className="pointer-events-none absolute left-14 top-1/2 size-6 rotate-[40deg] text-white/15" />
        <Heart className="pointer-events-none absolute right-12 top-12 size-5 -rotate-12 fill-white/15 text-transparent" />

        <div className="relative z-10 mx-auto max-w-3xl space-y-6">
          {/* Friendly paw badge */}
          <span className="inline-flex size-14 items-center justify-center rounded-2xl bg-white/15 text-white ring-1 ring-white/25 backdrop-blur-sm">
            <PawPrint className="size-7" />
          </span>

          {blok.headline && (
            <Heading level={2} size="title" tone="inverse">
              {blok.headline}
            </Heading>
          )}
          {blok.description && (
            <Text size="base" className="mx-auto max-w-xl text-amber-100/90">
              {blok.description}
            </Text>
          )}

          <div className="flex flex-col justify-center gap-3 pt-4 sm:flex-row">
            {blok.primary_label && (
              <Button
                render={<Link href={href.page(blok.primary_target || 'booking')} />}
                variant="ctaSoft"
                size="xl"
                className="rounded-2xl px-7"
              >
                {blok.primary_label}
                <ArrowRight className="size-4 transition-transform group-hover/button:translate-x-1" />
              </Button>
            )}
            {blok.secondary_label && (
              <Button
                render={<Link href={href.page(blok.secondary_target || 'contact')} />}
                variant="ctaGlass"
                size="xl"
                className="rounded-2xl px-7"
              >
                {blok.secondary_label}
              </Button>
            )}
          </div>

          {blok.note && (
            <p className="inline-flex items-center justify-center gap-1.5 font-mono text-[10px] text-amber-100/70">
              <PawPrint className="size-3 text-amber-100/80" />
              {blok.note}
            </p>
          )}
        </div>
      </div>
    </Section>
  )
}
