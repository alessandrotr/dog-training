'use client'

import { storyblokEditable } from '@storyblok/react'
import { ShieldCheck } from 'lucide-react'
import Link from 'next/link'
import { useHref } from '@/lib/navigation'
import { Section, Button, Heading, Text, Eyebrow } from '@/components/ui'

import type { BlokBase } from '@/types'

interface PricingBlok extends BlokBase {
  eyebrow?: string
  headline?: string
  description?: string
  trust_items?: string // one per line
  tier_badge?: string
  tier_name?: string
  tier_description?: string
  tier_price?: string
  tier_price_note?: string
  tier_features?: string // one per line
  cta_label?: string
  cta_target?: string
}

const lines = (s?: string) =>
  s
    ? s
        .split('\n')
        .map((l) => l.trim())
        .filter(Boolean)
    : []

export default function Pricing({ blok }: { blok: PricingBlok }) {
  const href = useHref()

  return (
    <Section {...storyblokEditable(blok as any)}>
      <div className="rounded-3xl bg-amber-950 p-8 md:p-12 text-stone-100 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 h-64 w-64 bg-amber-700/10 blur-3xl rounded-full"></div>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center relative z-10">
          <div className="lg:col-span-7 space-y-4 text-left">
            {blok.eyebrow && (
              <Eyebrow tone="brand" className="text-amber-500">
                {blok.eyebrow}
              </Eyebrow>
            )}
            {blok.headline && (
              <Heading level={2} size="section" tone="inverse" className="sm:text-3xl">
                {blok.headline}
              </Heading>
            )}
            {blok.description && <Text tone="inverse">{blok.description}</Text>}
            <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono text-stone-300 leading-relaxed">
              {lines(blok.trust_items).map((item, i) => (
                <div key={i} className="flex items-center space-x-2">
                  <ShieldCheck className="h-4.5 w-4.5 text-amber-400 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 bg-stone-900/40 border border-stone-800 p-6 rounded-2xl md:p-8 space-y-6 text-left">
            <div>
              {blok.tier_badge && (
                <span className="font-mono text-[10px] uppercase bg-amber-700 text-stone-100 px-2 py-0.5 rounded">
                  {blok.tier_badge}
                </span>
              )}
              {blok.tier_name && (
                <Heading level={3} size="card" tone="inverse" className="mt-2">
                  {blok.tier_name}
                </Heading>
              )}
              {blok.tier_description && (
                <Text size="xs" tone="subtle" className="mt-1">
                  {blok.tier_description}
                </Text>
              )}
            </div>
            {blok.tier_price && (
              <div className="border-t border-stone-850 pt-4 flex items-baseline space-x-1.5 font-mono">
                <span className="text-2xl font-bold text-stone-100">{blok.tier_price}</span>
                <span className="text-stone-400 text-xs font-normal">{blok.tier_price_note}</span>
              </div>
            )}
            <div className="space-y-2 text-xs text-stone-300">
              {lines(blok.tier_features).map((f, i) => (
                <p key={i}>✓ {f}</p>
              ))}
            </div>
            {blok.cta_label && (
              <Button
                render={<Link href={href.page(blok.cta_target || 'booking')} />}
                variant="cta"
                size="xl"
                className="w-full py-3.5"
              >
                {blok.cta_label}
              </Button>
            )}
          </div>
        </div>
      </div>
    </Section>
  )
}
