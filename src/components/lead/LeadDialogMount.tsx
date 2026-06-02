'use client';

import {useEffect, useState} from 'react';
import dynamic from 'next/dynamic';
import {LOCALES} from '@/lib/locales';
import {useLeadDialog} from '@/stores/lead-dialog';

// The dialog (form + zod + scheduler + multi-select) is a heavy, interaction-only
// surface — load its chunk on first open instead of in every page's bundle.
const LeadDialog = dynamic(() => import('./LeadDialog'), {ssr: false});

// Matches /<locale>/booking and /<locale>/contact (the real fallback pages).
const PATH_RE = new RegExp(`^/(?:${LOCALES.join('|')})/(booking|contact)/?$`);

// Mounted once in SiteChrome: renders the dialog and intercepts plain left
// clicks on any link to the booking/contact pages, opening the dialog instead.
// Modifier/middle clicks and no-JS still hit the real pages (crawlable + SEO).
export default function LeadDialogMount() {
  const {open, isOpen} = useLeadDialog();
  // Keep the dialog mounted once it has been opened (preserves Base UI's close
  // animation), but never load its chunk until the first open.
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    if (isOpen) setMounted(true);
  }, [isOpen]);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const anchor = (e.target as HTMLElement | null)?.closest?.('a');
      if (!anchor) return;
      const href = anchor.getAttribute('href');
      if (!href) return;
      let url: URL;
      try {
        url = new URL(href, window.location.origin);
      } catch {
        return;
      }
      if (url.origin !== window.location.origin) return;
      const match = url.pathname.match(PATH_RE);
      if (!match) return;
      e.preventDefault();
      open(match[1] === 'contact' ? 'contact' : 'book');
    }
    // Capture phase: run before Next's <Link> click handler so we can stop the
    // navigation and open the dialog on the current page instead.
    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, [open]);

  return mounted ? <LeadDialog /> : null;
}
