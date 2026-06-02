'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

// Loads the Storyblok JS Bridge ONLY when the page is open inside the Visual
// Editor (detected via the `_storyblok` query param). On edits it re-fetches
// the page's draft content so the preview updates live.
export default function StoryblokBridge() {
  const router = useRouter()

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (!new URLSearchParams(window.location.search).has('_storyblok')) return

    const SCRIPT_ID = 'storyblok-js-bridge'

    const start = () => {
      const Bridge = (window as any).StoryblokBridge
      if (!Bridge) return
      const bridge = new Bridge()
      let timer: ReturnType<typeof setTimeout>
      const refresh = () => {
        clearTimeout(timer)
        timer = setTimeout(() => router.refresh(), 700)
      }
      bridge.on(['input', 'change', 'published'], refresh)
    }

    if (document.getElementById(SCRIPT_ID)) {
      start()
      return
    }
    const script = document.createElement('script')
    script.id = SCRIPT_ID
    script.src = 'https://app.storyblok.com/f/storyblok-v2-latest.js'
    script.onload = start
    document.body.appendChild(script)
  }, [router])

  return null
}
