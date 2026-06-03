'use client'

import { useCallback, useEffect, useState } from 'react'
import type { ShareContext } from './share-targets'

// Encapsulates the two browser-dependent share actions: the native share sheet
// (mobile/Safari) and clipboard copy with a transient "copied" confirmation.
// `ready`/`canNativeShare` are resolved after mount to avoid hydration drift.
export function useShare() {
  const [canNativeShare, setCanNativeShare] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    setCanNativeShare(typeof navigator !== 'undefined' && typeof navigator.share === 'function')
  }, [])

  const nativeShare = useCallback(async (ctx: ShareContext) => {
    try {
      await navigator.share({ url: ctx.url, title: ctx.title, text: ctx.text })
    } catch {
      // user dismissed the sheet or the share failed — nothing to do.
    }
  }, [])

  const copy = useCallback(async (url: string) => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // clipboard unavailable (insecure context / denied) — leave state as-is.
    }
  }, [])

  return { canNativeShare, copied, nativeShare, copy }
}
