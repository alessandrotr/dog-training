import type {Metadata} from 'next';
import OpenLeadOnMount from '@/features/lead/components/OpenLeadOnMount';
import {staticMetadata} from '@/lib/seo';

export async function generateMetadata({params}: {params: Promise<{lang: string}>}): Promise<Metadata> {
  const {lang} = await params;
  return {
    ...staticMetadata(lang, 'contact', {
      en: {
        title: 'Contact',
        description: 'Get in touch with the Sophia Binder Canine Academy about training and consultations.',
      },
      de: {
        title: 'Kontakt',
        description: 'Kontaktieren Sie die Sophia Binder Canine Academy für Hundetraining und Beratung.',
      },
    }),
    // Not a standalone page — just opens the dialog; keep it out of the index.
    robots: {index: false, follow: true},
  };
}

export default function Page() {
  return <OpenLeadOnMount mode="contact" />;
}
