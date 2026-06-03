'use client'

import { useTranslation } from 'react-i18next'
import { Accordion } from '@base-ui/react/accordion'
import { ClipboardList, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ScrollArea } from '@/components/ui'
import { useInquiryCart } from '@/features/inquiry/components/InquiryCartProvider'
import { useLeadForm } from '@/features/lead/stores/lead-form'
import ProgramRow from './ProgramRow'

export default function ProgramPicker() {
  const { i18n } = useTranslation()
  const de = i18n.language === 'de'
  const cart = useInquiryCart()
  const { programsOpen, setProgramsOpen } = useLeadForm()

  if (cart.catalog.length === 0) return null
  const count = cart.items.length

  return (
    <Accordion.Root
      value={programsOpen ? ['items'] : []}
      onValueChange={(v) => setProgramsOpen(v.includes('items'))}
      className="overflow-hidden rounded-xl border border-amber-200/60 bg-linear-to-br from-amber-50 to-white shadow-sm"
    >
      <Accordion.Item value="items">
        <Accordion.Header>
          <Accordion.Trigger className="group flex w-full items-center justify-between gap-2 px-3.5 py-3 text-left outline-none focus-visible:bg-amber-100/40">
            <span className="inline-flex items-center gap-1.5 font-mono text-[10px] font-bold uppercase tracking-wider text-amber-800">
              <ClipboardList className="size-3.5" />
              {count > 0
                ? de
                  ? 'Anfrage zu'
                  : 'Inquiring about'
                : de
                ? 'Programm hinzufügen'
                : 'Add a program'}
            </span>
            <span className="flex items-center gap-2">
              <span
                aria-hidden={count === 0}
                className={cn(
                  'min-w-5 rounded-full bg-amber-100 px-2 py-0.5 text-center font-mono text-[10px] font-bold text-amber-800',
                  count === 0 && 'invisible',
                )}
              >
                {count || 0}
              </span>
              <ChevronDown className="size-4 text-amber-700/70 transition-transform duration-200 group-data-panel-open:rotate-180" />
            </span>
          </Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Panel className="h-(--accordion-panel-height) overflow-hidden transition-[height] duration-200 ease-out data-starting-style:h-0 data-ending-style:h-0">
          <ScrollArea className="max-h-72">
            <ul className="space-y-2 px-3.5 pb-3.5">
              {cart.catalog.map((item) => (
                <ProgramRow
                  key={item.slug}
                  item={item}
                  selected={cart.has(item.slug)}
                  onToggle={() => cart.toggle(item)}
                />
              ))}
            </ul>
          </ScrollArea>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion.Root>
  )
}
