import { storyblokEditable } from '@storyblok/react/rsc'
import {
  Award,
  BrainCircuit,
  HeartHandshake,
  Milestone,
  CheckCircle,
  ShieldCheck,
  Sparkles,
  Building,
} from 'lucide-react'
import { Card, Heading, Text } from '@/components/ui'
import type { BlokBase } from '@/types'

const ICONS: Record<string, any> = {
  Award,
  BrainCircuit,
  HeartHandshake,
  Milestone,
  CheckCircle,
  ShieldCheck,
  Sparkles,
  Building,
}

interface ValueCardBlok extends BlokBase {
  icon?: string
  title?: string
  description?: string
}

export default function ValueCard({ blok }: { blok: ValueCardBlok }) {
  const Icon = ICONS[blok.icon || 'Sparkles'] || Sparkles
  return (
    <Card
      {...storyblokEditable(blok as any)}
      padding="md"
      className="flex flex-col justify-start shadow-sm"
    >
      <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-stone-100 border border-stone-200">
        <Icon className="size-6 text-amber-800" />
      </div>
      {blok.title && (
        <Heading level={3} size="card" className="mb-2">
          {blok.title}
        </Heading>
      )}
      {blok.description && <Text>{blok.description}</Text>}
    </Card>
  )
}
