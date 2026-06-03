'use client'

import { useEffect, useState } from 'react'
import { useMediaQuery } from 'usehooks-ts'

interface TypewriterOptions {
  typeMs?: number // per-character typing delay
  deleteMs?: number // per-character deleting delay
  holdMs?: number // pause once a phrase is fully typed
  startDelayMs?: number // pause before the next phrase starts
  enabled?: boolean // pause the whole effect (e.g. once the field has input)
}

// Cycles through `phrases`, typing then deleting each one — an auto-filling
// "inspiration" hint. Honors prefers-reduced-motion (shows the first phrase in
// full, no animation) and stops entirely when `enabled` is false.
export function useTypewriter(phrases: string[], options: TypewriterOptions = {}): string {
  const { typeMs = 45, deleteMs = 25, holdMs = 1800, startDelayMs = 500, enabled = true } = options
  const reduced = useMediaQuery('(prefers-reduced-motion: reduce)')
  const [text, setText] = useState('')
  // Stable dependency so the loop only restarts when the phrase set changes.
  const key = phrases.join('|')

  useEffect(() => {
    if (!enabled || phrases.length === 0) return
    if (reduced) {
      setText(phrases[0])
      return
    }

    let phrase = 0
    let sub = 0
    let deleting = false
    let timer: ReturnType<typeof setTimeout>

    const tick = () => {
      const current = phrases[phrase]
      if (!deleting) {
        sub += 1
        setText(current.slice(0, sub))
        if (sub >= current.length) {
          deleting = true
          timer = setTimeout(tick, holdMs)
        } else {
          timer = setTimeout(tick, typeMs)
        }
      } else {
        sub -= 1
        setText(current.slice(0, Math.max(sub, 0)))
        if (sub <= 0) {
          deleting = false
          phrase = (phrase + 1) % phrases.length
          timer = setTimeout(tick, startDelayMs)
        } else {
          timer = setTimeout(tick, deleteMs)
        }
      }
    }

    setText('')
    timer = setTimeout(tick, startDelayMs)
    return () => clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, reduced, key, typeMs, deleteMs, holdMs, startDelayMs])

  return text
}
