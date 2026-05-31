'use client';

import {createContext, useCallback, useContext, useEffect, useState} from 'react';

export interface InquiryItem {
  slug: string;
  title: string;
  // Optional rich detail captured at add-time so the inquiry form can show a
  // proper preview (image, blurb, price) without a re-fetch. Older carts
  // persisted before these fields existed simply omit them.
  imageUrl?: string;
  shortDescription?: string;
  price?: string;
  audience?: string;
}

interface InquiryCart {
  items: InquiryItem[];
  add: (item: InquiryItem) => void;
  remove: (slug: string) => void;
  toggle: (item: InquiryItem) => void;
  clear: () => void;
  has: (slug: string) => boolean;
}

const Ctx = createContext<InquiryCart | null>(null);
const STORAGE_KEY = 'inquiry-cart';

// Lightweight "add to inquiry" cart. Persisted to localStorage so a visitor can
// collect services across pages, then send one message about all of them.
export function InquiryCartProvider({children}: {children: React.ReactNode}) {
  const [items, setItems] = useState<InquiryItem[]>([]);

  // Hydrate after mount (avoids SSR mismatch).
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* ignore */
    }
  }, [items]);

  const add = useCallback((item: InquiryItem) => {
    setItems((prev) => (prev.some((i) => i.slug === item.slug) ? prev : [...prev, item]));
  }, []);
  const remove = useCallback((slug: string) => {
    setItems((prev) => prev.filter((i) => i.slug !== slug));
  }, []);
  const toggle = useCallback((item: InquiryItem) => {
    setItems((prev) => (prev.some((i) => i.slug === item.slug) ? prev.filter((i) => i.slug !== item.slug) : [...prev, item]));
  }, []);
  const clear = useCallback(() => setItems([]), []);
  const has = useCallback((slug: string) => items.some((i) => i.slug === slug), [items]);

  return <Ctx.Provider value={{items, add, remove, toggle, clear, has}}>{children}</Ctx.Provider>;
}

export function useInquiryCart(): InquiryCart {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useInquiryCart must be used within InquiryCartProvider');
  return ctx;
}
