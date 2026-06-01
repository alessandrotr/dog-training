'use client';

import {Select} from '@base-ui/react/select';
import {Check, ChevronsUpDown} from 'lucide-react';
import {cn} from '@/lib/utils';

export interface MultiSelectOption {
  value: string;
  label: string;
  hint?: string;
}

// Brand-styled multiple-choice select built on the Base UI Select primitive
// (same family as our Dialog/Tabs). The popup stays open while picking, shows a
// check on each chosen row, and the trigger summarises the selection count.
export default function MultiSelect({
  options,
  value,
  onValueChange,
  placeholder,
  summary,
  id,
  className,
}: {
  options: MultiSelectOption[];
  value: string[];
  onValueChange: (value: string[]) => void;
  placeholder?: string;
  /** Builds the trigger label from the current selection. */
  summary?: (count: number) => string;
  id?: string;
  className?: string;
}) {
  const count = value.length;

  return (
    <Select.Root multiple value={value} onValueChange={onValueChange}>
      <Select.Trigger
        id={id}
        className={cn(
          'flex h-11 w-full items-center justify-between gap-2 rounded-xl border border-stone-200 bg-white px-3.5 text-sm text-stone-900 shadow-xs transition-[color,box-shadow,border-color] outline-none',
          'hover:border-stone-300 focus-visible:border-amber-400 focus-visible:ring-4 focus-visible:ring-amber-700/10 data-popup-open:border-amber-400 data-popup-open:ring-4 data-popup-open:ring-amber-700/10',
          count === 0 && 'text-stone-400',
          className,
        )}
      >
        <span className="truncate">
          {count === 0 ? (placeholder ?? 'Select…') : summary ? summary(count) : `${count} selected`}
        </span>
        <Select.Icon className="shrink-0 text-stone-400">
          <ChevronsUpDown className="h-4 w-4" />
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Positioner side="bottom" align="start" sideOffset={6} className="z-[70]">
          <Select.Popup
            className={cn(
              'max-h-[min(18rem,var(--available-height))] w-[var(--anchor-width)] overflow-y-auto rounded-2xl border border-stone-200 bg-white p-1.5 shadow-xl ring-1 ring-stone-900/5 outline-none',
              'origin-[var(--transform-origin)] transition-[transform,opacity]',
              'data-starting-style:scale-95 data-starting-style:opacity-0 data-ending-style:scale-95 data-ending-style:opacity-0',
            )}
          >
            {options.map((opt) => {
              const isSelected = value.includes(opt.value);
              return (
                <Select.Item
                  key={opt.value}
                  value={opt.value}
                  className={cn(
                    'flex cursor-default select-none items-center gap-2.5 rounded-xl px-2 py-2 text-sm outline-none transition-colors data-highlighted:bg-amber-50',
                    isSelected ? 'text-amber-950' : 'text-stone-700',
                  )}
                >
                  <span
                    className={cn(
                      'flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-md border transition-colors',
                      isSelected ? 'border-amber-600 bg-amber-600 text-white' : 'border-stone-300',
                    )}
                  >
                    {isSelected && <Check className="h-3 w-3" strokeWidth={3} />}
                  </span>
                  <span className="min-w-0 flex-1">
                    <Select.ItemText className="block truncate font-medium">{opt.label}</Select.ItemText>
                    {opt.hint && <span className="block truncate text-xs text-stone-400">{opt.hint}</span>}
                  </span>
                </Select.Item>
              );
            })}
          </Select.Popup>
        </Select.Positioner>
      </Select.Portal>
    </Select.Root>
  );
}
