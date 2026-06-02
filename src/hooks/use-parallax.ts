'use client';

import {useEffect, useRef} from 'react';

// Scroll-linked parallax without an animation library: maps window scroll
// (0 → `over` px) onto a translateY (`from` → `to` px) and writes it straight to
// the element's transform via ref — no React re-render per scroll frame.
// rAF-throttled, passive listener, respects prefers-reduced-motion.
export function useParallax<T extends HTMLElement>(from: number, to: number, over = 600) {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const t = Math.min(Math.max(window.scrollY / over, 0), 1);
      const y = from + (to - from) * t;
      if (ref.current) ref.current.style.transform = `translateY(${y}px)`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, {passive: true});
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [from, to, over]);

  return ref;
}
