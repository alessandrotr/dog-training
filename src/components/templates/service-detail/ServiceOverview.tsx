import { Check } from 'lucide-react'
import { Eyebrow, Text } from '@/components/ui'
import type { ServiceItem } from '@/types'

// The body: "What's included" checklist + the long description.
export default function ServiceOverview({ service }: { service: ServiceItem }) {
  return (
    <div className="mt-4 grid grid-cols-1 gap-12 lg:mt-8 lg:grid-cols-12">
      {service.features.length > 0 && (
        <aside className="lg:col-span-5">
          <div className="rounded-2xl border border-stone-200 bg-stone-50 p-6">
            <Eyebrow className="mb-4 block">What&apos;s included</Eyebrow>
            <ul className="space-y-3">
              {service.features.map((f, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2.5 text-sm leading-relaxed text-stone-600"
                >
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      )}
      <div className="lg:col-span-7">
        {service.longDescription && (
          <Text size="base" tone="default" className="whitespace-pre-line">
            {service.longDescription}
          </Text>
        )}
      </div>
    </div>
  )
}
