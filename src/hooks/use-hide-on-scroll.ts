'use client';

import {useEffect, useRef, useState} from 'react';

// Shared "hide on scroll down, reveal on scroll up" behaviour used by the
// Navbar and the floating action pills (ConnectFab, InquiryCartBar). Returns
// `hidden` (scrolled down past the threshold) and `atTop` (near the very top,
// for transparent-header styling). Passive, rAF-throttled native scroll
// listener — no animation library needed.
export function useHideOnScroll({hideAfter = 55, topThreshold = 5}: {hideAfter?: number; topThreshold?: number} = {}) {
  const [hidden, setHidden] = useState(false);
  const [atTop, setAtTop] = useState(true);
  const last = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    last.current = window.scrollY;
    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        const prev = last.current;
        setAtTop(y < topThreshold);
        if (y > prev && y > hideAfter) setHidden(true);
        else if (y < prev) setHidden(false);
        last.current = y;
        ticking.current = false;
      });
    };
    window.addEventListener('scroll', onScroll, {passive: true});
    return () => window.removeEventListener('scroll', onScroll);
  }, [hideAfter, topThreshold]);

  return {hidden, atTop};
}
