'use client';

import {useEffect} from 'react';
import {LOCALES} from '@/lib/locales';
import {useLeadDialog} from '@/stores/lead-dialog';
import LeadDialog from './LeadDialog';

// Matches /<locale>/booking and /<locale>/contact (the real fallback pages).
const PATH_RE = new RegExp(`^/(?:${LOCALES.join('|')})/(booking|contact)/?$`);

// Mounted once in SiteChrome: renders the dialog and intercepts plain left
// clicks on any link to the booking/contact pages, opening the dialog instead.
// Modifier/middle clicks and no-JS still hit the real pages (crawlable + SEO).
export default function LeadDialogMount() {
  const {open} = useLeadDialog();

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

  return <LeadDialog />;
}
