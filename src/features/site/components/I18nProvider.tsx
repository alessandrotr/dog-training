'use client';

import {useEffect} from 'react';
import {I18nextProvider} from 'react-i18next';
import i18n from '@/lib/i18n';
import type {Locale} from '@/lib/locales';

// Module-level (survives provider re-mounts): flips true after the first client
// commit. Distinguishes the safe initial render from later locale switches.
let booted = false;

// Drives the i18next language from the URL locale. NOTE: i18n is a module
// singleton — fine for this low-traffic site; a per-request instance would be
// the fully concurrency-safe upgrade (see plan: Future Improvements).
export default function I18nProvider({
  lang,
  children,
}: {
  lang: Locale;
  children: React.ReactNode;
}) {
  // Set synchronously only on the server (SSR) and the very first client render —
  // at that point nothing is committed, so no consumer is subscribed yet. On the
  // server it keeps SSR HTML on the route's language; on the first client render
  // it avoids a hydration mismatch for non-default locales.
  if ((typeof window === 'undefined' || !booted) && i18n.language !== lang) {
    i18n.changeLanguage(lang);
  }

  // Every later (post-hydration) locale switch happens in an effect — never
  // during render — so i18next notifies the already-mounted Navbar/etc. through
  // the normal commit phase instead of mid-render (which React forbids).
  useEffect(() => {
    booted = true;
    if (i18n.language !== lang) i18n.changeLanguage(lang);
    document.documentElement.lang = lang;
  }, [lang]);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
