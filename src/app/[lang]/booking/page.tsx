import type {Metadata} from 'next';
import OpenLeadOnMount from '../../../components/lead/OpenLeadOnMount';
import {isLocale, DEFAULT_LOCALE} from '../../../lib/locales';
import {buildMetadata} from '../../../lib/seo';

export async function generateMetadata({params}: {params: Promise<{lang: string}>}): Promise<Metadata> {
  const {lang} = await params;
  const l = isLocale(lang) ? lang : DEFAULT_LOCALE;
  return {
    ...buildMetadata({
      title: l === 'de' ? 'Termin buchen' : 'Book a Session',
      description:
        l === 'de'
          ? 'Buchen Sie ein kostenloses Erstgespräch oder eine Trainingseinheit mit Sophia Binder.'
          : 'Book a free consultation or a training session with Sophia Binder.',
      path: 'booking',
      lang: l,
    }),
    // Not a standalone page — just opens the dialog; keep it out of the index.
    robots: {index: false, follow: true},
  };
}

export default function Page() {
  return <OpenLeadOnMount mode="book" />;
}
