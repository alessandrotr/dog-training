'use client';

import {useState} from 'react';
import {useScroll, useMotionValueEvent} from 'motion/react';

// Shared "hide on scroll down, reveal on scroll up" behaviour used by the
// Navbar and the floating action pills (ConnectFab, InquiryCartBar). Returns
// `hidden` (scrolled down past the threshold) and `atTop` (near the very top,
// for transparent-header styling).
export function useHideOnScroll({hideAfter = 55, topThreshold = 5}: {hideAfter?: number; topThreshold?: number} = {}) {
  const [hidden, setHidden] = useState(false);
  const [atTop, setAtTop] = useState(true);

  const {scrollY} = useScroll();
  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setAtTop(y < topThreshold);
    if (y > prev && y > hideAfter) setHidden(true);
    else if (y < prev) setHidden(false);
  });

  return {hidden, atTop};
}
