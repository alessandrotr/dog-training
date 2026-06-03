'use client'

import { useEffect, useState, type RefObject } from 'react'

// Thin bar pinned to the very top that fills as the reader moves through the
// article body only (not the header, sidebar, related carousels or footer).
// 0% when the prose top hits the top of the viewport, 100% when its bottom
// reaches the bottom. rAF-throttled; sits above the navbar (z-[60]).
export default function ReadingProgress({
  targetRef,
}: {
  targetRef: RefObject<HTMLElement | null>
}) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let raf = 0
    const measure = () => {
      const el = targetRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const vh = window.innerHeight
      const total = rect.height - vh
      const pct = total > 0 ? (-rect.top / total) * 100 : rect.bottom <= vh ? 100 : 0
      setProgress(Math.min(100, Math.max(0, pct)))
    }
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(measure)
    }
    measure()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [targetRef])

  return (
    <div className="fixed inset-x-0 top-0 z-60 h-1" aria-hidden>
      <div
        className="h-full bg-linear-to-r from-amber-500 to-amber-700 transition-[width] duration-75 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}
