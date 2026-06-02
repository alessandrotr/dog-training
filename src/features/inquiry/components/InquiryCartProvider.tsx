'use client'

import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import type { ServiceItem } from '@/types'

export interface InquiryItem {
  slug: string
  title: string
  // Optional rich detail captured at add-time so the inquiry form can show a
  // proper preview (image, blurb, price) without a re-fetch. Older carts
  // persisted before these fields existed simply omit them.
  imageUrl?: string
  shortDescription?: string
  price?: string
  audience?: string
}

// Project a full service onto the lightweight shape the inquiry cart stores.
// Single source of truth so every "add to inquiry" entry point stays in sync.
export function serviceToInquiryItem(s: ServiceItem): InquiryItem {
  return {
    slug: s.slug,
    title: s.title,
    imageUrl: s.imageUrl,
    shortDescription: s.shortDescription,
    price: s.price,
    audience: s.audience,
  }
}

interface InquiryCart {
  items: InquiryItem[]
  // Full set of bookable services, so the inquiry form can offer a picker to
  // add programs without re-fetching. Provided globally by the app shell.
  catalog: InquiryItem[]
  add: (item: InquiryItem) => void
  remove: (slug: string) => void
  toggle: (item: InquiryItem) => void
  clear: () => void
  has: (slug: string) => boolean
}

const Ctx = createContext<InquiryCart | null>(null)
const STORAGE_KEY = 'inquiry-cart'

// Lightweight "add to inquiry" cart. Persisted to localStorage so a visitor can
// collect services across pages, then send one message about all of them.
export function InquiryCartProvider({
  children,
  catalog = [],
}: {
  children: React.ReactNode
  catalog?: InquiryItem[]
}) {
  const [items, setItems] = useState<InquiryItem[]>([])

  // Hydrate after mount (avoids SSR mismatch).
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) setItems(JSON.parse(raw))
    } catch {
      /* ignore */
    }
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch {
      /* ignore */
    }
  }, [items])

  const add = useCallback((item: InquiryItem) => {
    setItems((prev) => (prev.some((i) => i.slug === item.slug) ? prev : [...prev, item]))
  }, [])
  const remove = useCallback((slug: string) => {
    setItems((prev) => prev.filter((i) => i.slug !== slug))
  }, [])
  const toggle = useCallback((item: InquiryItem) => {
    setItems((prev) =>
      prev.some((i) => i.slug === item.slug)
        ? prev.filter((i) => i.slug !== item.slug)
        : [...prev, item],
    )
  }, [])
  const clear = useCallback(() => setItems([]), [])
  const has = useCallback((slug: string) => items.some((i) => i.slug === slug), [items])

  return (
    <Ctx.Provider value={{ items, catalog, add, remove, toggle, clear, has }}>
      {children}
    </Ctx.Provider>
  )
}

export function useInquiryCart(): InquiryCart {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useInquiryCart must be used within InquiryCartProvider')
  return ctx
}

// Add/remove a single service to the inquiry. Centralizes the
// `has`/`toggle`/`serviceToInquiryItem` trio every "add to inquiry" control
// repeats; callers keep their own markup and label. Accepts an optional service
// (e.g. a case study without a linked program) and no-ops when absent.
export function useInquiryToggle(service?: ServiceItem): {added: boolean; toggle: () => void} {
  const cart = useInquiryCart()
  return {
    added: service ? cart.has(service.slug) : false,
    toggle: () => service && cart.toggle(serviceToInquiryItem(service)),
  }
}
