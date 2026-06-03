'use client'

import { useEffect, useState } from 'react'
import { Popover } from '@base-ui/react/popover'
import { Share2, Link2, Check, Share } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useLocale } from '@/lib/navigation'
import { SHARE_TARGETS } from './share-targets'
import { useShare } from './use-share'

// Reusable share control for any detail page (service / article / case study).
// `url` defaults to the page the visitor is on; pass `title`/`text` so the
// native sheet and prefilled social posts read well.
export default function ShareMenu({
  title,
  text,
  url: urlProp,
  label,
  className,
}: {
  title: string
  text?: string
  url?: string
  label?: string
  className?: string
}) {
  const de = useLocale() === 'de'
  const { canNativeShare, copied, nativeShare, copy } = useShare()
  // Resolve the live URL after mount when none is passed explicitly.
  const [url, setUrl] = useState(urlProp ?? '')
  useEffect(() => {
    if (!urlProp && typeof window !== 'undefined') setUrl(window.location.href)
  }, [urlProp])

  const ctx = { url, title, text }
  const rowClass =
    'flex w-full items-center gap-2.5 rounded-md px-2.5 py-2 text-sm font-medium text-stone-700 transition-colors hover:bg-stone-100 focus-visible:bg-stone-100 outline-none'

  return (
    <Popover.Root>
      <Popover.Trigger
        className={cn(
          'inline-flex items-center gap-1.5 rounded-md border border-stone-200 bg-white px-3 py-1.5 font-sans text-sm font-medium text-stone-600 shadow-xs transition-colors hover:border-stone-300 hover:text-stone-900 focus-visible:border-amber-400 focus-visible:ring-4 focus-visible:ring-amber-700/10 outline-none',
          className,
        )}
      >
        <Share2 className="h-4 w-4 text-amber-700" />
        {label ?? (de ? 'Teilen' : 'Share')}
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Positioner sideOffset={8} align="end" className="z-50">
          <Popover.Popup className="w-56 origin-(--transform-origin) rounded-xl border border-stone-200 bg-white p-1.5 shadow-lg shadow-stone-900/5 transition-[transform,opacity] data-starting-style:scale-95 data-starting-style:opacity-0 data-ending-style:scale-95 data-ending-style:opacity-0">
            {canNativeShare && (
              <button type="button" className={rowClass} onClick={() => nativeShare(ctx)}>
                <Share className="h-4 w-4 text-stone-400" />
                {de ? 'Teilen über…' : 'Share via…'}
              </button>
            )}

            <button type="button" className={rowClass} onClick={() => copy(url)}>
              {copied ? (
                <Check className="h-4 w-4 text-emerald-600" />
              ) : (
                <Link2 className="h-4 w-4 text-stone-400" />
              )}
              {copied ? (de ? 'Kopiert!' : 'Copied!') : de ? 'Link kopieren' : 'Copy link'}
            </button>

            <div className="my-1 h-px bg-stone-100" />

            {SHARE_TARGETS.map((target) => (
              <a
                key={target.key}
                href={target.build(ctx)}
                target="_blank"
                rel="noopener noreferrer"
                className={rowClass}
              >
                <target.Icon className="h-4 w-4 text-stone-400" />
                {target.label}
              </a>
            ))}
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    </Popover.Root>
  )
}
