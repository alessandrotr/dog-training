'use client'

import Image from 'next/image'
import { Check, Plus, PawPrint } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { InquiryItem } from '@/features/inquiry/components/InquiryCartProvider'

// One catalog program rendered as a toggle card: click anywhere to add/remove.
// Selected = white card + check; unselected = muted card + plus.
export default function ProgramRow({
  item,
  selected,
  onToggle,
}: {
  item: InquiryItem
  selected: boolean
  onToggle: () => void
}) {
  return (
    <li>
      <button
        type="button"
        onClick={onToggle}
        aria-pressed={selected}
        className={cn(
          'group/item flex w-full items-center gap-3 rounded-lg border p-2 text-left shadow-xs transition-colors',
          selected
            ? 'border-amber-300/70 bg-white hover:border-amber-300'
            : 'border-stone-200 bg-stone-50/60 hover:border-amber-200 hover:bg-white',
        )}
      >
        <div className="relative size-12 shrink-0 overflow-hidden rounded-lg bg-amber-100">
          {item.imageUrl ? (
            <Image
              src={item.imageUrl}
              alt={item.title}
              fill
              sizes="48px"
              className="object-cover transition-transform duration-500 group-hover/item:scale-110"
              referrerPolicy="no-referrer"
            />
          ) : (
            <span className="flex size-full items-center justify-center text-amber-700">
              <PawPrint className="size-5" />
            </span>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-baseline justify-between gap-2">
            <p
              className={cn(
                'truncate font-sans text-sm font-bold',
                selected ? 'text-stone-900' : 'text-stone-700',
              )}
            >
              {item.title}
            </p>
            {item.price && (
              <span className="shrink-0 font-sans text-sm font-extrabold text-amber-950">
                {item.price}
              </span>
            )}
          </div>
          {item.shortDescription && (
            <p className="mt-0.5 truncate text-xs leading-relaxed text-stone-500">
              {item.shortDescription}
            </p>
          )}
        </div>
        <span
          className={cn(
            'flex size-7 shrink-0 items-center justify-center rounded-full transition-colors',
            selected
              ? 'bg-amber-100 text-amber-800'
              : 'border border-stone-300 text-stone-400 group-hover/item:border-amber-300 group-hover/item:text-amber-700',
          )}
        >
          {selected ? <Check className="size-4" /> : <Plus className="size-4" />}
        </span>
      </button>
    </li>
  )
}
