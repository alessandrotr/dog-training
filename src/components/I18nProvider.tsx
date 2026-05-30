'use client';

import {useEffect} from 'react';
import {I18nextProvider} from 'react-i18next';
import i18n from '../lib/i18n';
import type {Locale} from '../lib/locales';

// Drives the i18next language from the URL locale. The language is set
// synchronously during render so the server-rendered HTML matches the route
// (avoiding hydration mismatches). NOTE: i18n is a module singleton — fine for
// this low-traffic site; a per-request instance would be the fully
// concurrency-safe upgrade (see plan: Future Improvements).
export default function I18nProvider({
  lang,
  children,
}: {
  lang: Locale;
  children: React.ReactNode;
}) {
  if (i18n.language !== lang) {
    i18n.changeLanguage(lang);
  }

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
