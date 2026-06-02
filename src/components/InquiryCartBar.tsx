'use client';

import {useEffect, useRef, useState} from 'react';
import {motion} from 'motion/react';
import {ClipboardList, X} from 'lucide-react';
import {useHideOnScroll} from '../lib/use-hide-on-scroll';
import {useInquiryCart} from './InquiryCartProvider';
import {useLeadDialog} from '../stores/lead-dialog';

// Floating inquiry-cart pill (bottom-left, opposite the ConnectFab). Appears
// only when services have been added; opens the Contact dialog to send them,
// with a built-in clear (✕) to empty the inquiry without opening it. Slides
// away on scroll-down / back up on scroll-up, mirroring the ConnectFab.
//
// When an item is added from a card (dialog closed), the count badge pops and —
// if the pill is currently hidden by scroll — it peeks out briefly to show the
// new total, then tucks away again.
export default function InquiryCartBar() {
  const {items, clear} = useInquiryCart();
  const {open, isOpen} = useLeadDialog();
  const {hidden} = useHideOnScroll();
  const count = items.length;

  const [peek, setPeek] = useState(false);
  const prevCount = useRef(count);
  const ready = useRef(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Ignore the initial localStorage hydration burst so we only react to real
  // user additions, not the cart rehydrating on load.
  useEffect(() => {
    const t = setTimeout(() => {
      ready.current = true;
    }, 600);
    return () => clearTimeout(t);
  }, []);

  // On an add (count increased) while the dialog is closed → it came from a
  // card. Briefly force the pill into view to flash the new count.
  useEffect(() => {
    const prev = prevCount.current;
    prevCount.current = count;
    if (!ready.current || count <= prev || isOpen) return;
    setPeek(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setPeek(false), 1900);
  }, [count, isOpen]);

  useEffect(() => () => void (timer.current && clearTimeout(timer.current)), []);

  const show = count > 0 && !isOpen && (!hidden || peek);

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-[max(1rem,env(safe-area-inset-bottom))] z-40 sm:bottom-6">
      <div className="mx-auto flex max-w-7xl justify-start px-4 sm:px-6 lg:px-8">
        <div
          className={`pointer-events-auto flex items-center gap-1 rounded-full border border-stone-200 bg-white py-1.5 pl-2 pr-1.5 shadow-lg shadow-stone-900/10 transition-all duration-300 ease-out ${
            show ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-28 opacity-0'
          }`}
        >
          <button
            type="button"
            onClick={() => open('contact')}
            aria-label={`Send inquiry about ${count} service${count > 1 ? 's' : ''}`}
            className="group flex items-center gap-2.5 rounded-full py-1.5 pl-1.5 pr-3 transition-colors hover:bg-stone-50 active:scale-95"
          >
            <motion.span
              key={count}
              animate={{scale: [1, 1.18, 1]}}
              transition={{duration: 0.45, ease: 'easeOut'}}
              className="relative flex h-7 w-7 items-center justify-center rounded-full bg-amber-700 text-white"
            >
              <ClipboardList className="h-4 w-4" />
              <motion.span
                initial={{scale: 0.2, opacity: 0}}
                animate={{scale: 1, opacity: 1}}
                transition={{type: 'spring', stiffness: 700, damping: 20}}
                className="absolute -right-1.5 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-stone-900 px-1 text-[10px] font-bold text-white"
              >
                {count}
              </motion.span>
            </motion.span>
            <span className="text-xs font-mono font-bold uppercase tracking-tight text-amber-950">Send inquiry</span>
          </button>
          <button
            type="button"
            onClick={clear}
            aria-label="Clear inquiry"
            title="Clear inquiry"
            className="flex h-8 w-8 items-center justify-center rounded-full text-stone-400 transition-colors hover:bg-stone-100 hover:text-stone-700 active:scale-90"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
