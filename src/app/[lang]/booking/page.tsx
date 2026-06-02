import type {Metadata} from 'next';
import OpenLeadOnMount from '@/features/lead/components/OpenLeadOnMount';
import {staticMetadata} from '@/lib/seo';

export async function generateMetadata({params}: {params: Promise<{lang: string}>}): Promise<Metadata> {
  const {lang} = await params;
  return {
    ...staticMetadata(lang, 'booking', {
      en: {
        title: 'Book a Session',
        description: 'Book a free consultation or a training session with Sophia Binder.',
      },
      de: {
        title: 'Termin buchen',
        description: 'Buchen Sie ein kostenloses Erstgespräch oder eine Trainingseinheit mit Sophia Binder.',
      },
    }),
    // Not a standalone page — just opens the dialog; keep it out of the index.
    robots: {index: false, follow: true},
  };
}

export default function Page() {
  return <OpenLeadOnMount mode="book" />;
}
