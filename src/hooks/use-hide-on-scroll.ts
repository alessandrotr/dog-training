'use client';

import {useEffect, useRef, useState} from 'react';

// Shared "hide on scroll down, reveal on scroll up" behaviour used by the
// Navbar and the floating action pills (ConnectFab, InquiryCartBar). Returns
// `hidden` (scrolled down past the threshold) and `atTop` (near the very top,
// for transparent-header styling). Passive, rAF-throttled native scroll
// listener — no animation library needed.
export function useHideOnScroll({
  hideAfter = 55,
  topThreshold = 5,
  bottomThreshold = 80,
}: {hideAfter?: number; topThreshold?: number; bottomThreshold?: number} = {}) {
  const [hidden, setHidden] = useState(false);
  const [atTop, setAtTop] = useState(true);
  const last = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    const doc = () => document.scrollingElement || document.documentElement;
    last.current = doc().scrollTop;
    const evaluate = () => {
      const el = doc();
      const y = el.scrollTop;
      const prev = last.current;
      // Distance left to the very bottom — all three reads come from the same
      // element so there's no window/documentElement mismatch.
      const distanceToBottom = el.scrollHeight - y - el.clientHeight;
      setAtTop(y < topThreshold);
      // Always reveal at the bottom (footer) regardless of scroll direction.
      if (distanceToBottom <= bottomThreshold) setHidden(false);
      else if (y > prev && y > hideAfter) setHidden(true);
      else if (y < prev) setHidden(false);
      last.current = y;
      ticking.current = false;
    };
    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(evaluate);
    };
    evaluate(); // initial state (e.g. landing already scrolled / short pages)
    window.addEventListener('scroll', onScroll, {passive: true});
    window.addEventListener('resize', onScroll, {passive: true});
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [hideAfter, topThreshold, bottomThreshold]);

  return {hidden, atTop};
}
