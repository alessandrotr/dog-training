'use client';

import {useEffect} from 'react';
import {useRouter, useParams} from 'next/navigation';
import {isLocale, DEFAULT_LOCALE} from '@/lib/locales';
import type {LeadMode} from '@/stores/lead-dialog';

// Contact/Book have no standalone pages — the experience is the dialog. A direct
// or shared hit to /<lang>/booking|contact redirects to the locale home with the
// dialog param so it opens over the homepage (and closing leaves you there).
export default function OpenLeadOnMount({mode}: {mode: LeadMode}) {
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    const lang = isLocale(params.lang as string) ? (params.lang as string) : DEFAULT_LOCALE;
    router.replace(`/${lang}?connect=${mode}`);
  }, [router, params.lang, mode]);

  return null;
}
