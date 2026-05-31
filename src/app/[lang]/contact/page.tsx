import type {Metadata} from 'next';
import OpenLeadOnMount from '../../../components/lead/OpenLeadOnMount';
import {isLocale, DEFAULT_LOCALE} from '../../../lib/locales';
import {buildMetadata} from '../../../lib/seo';

export async function generateMetadata({params}: {params: Promise<{lang: string}>}): Promise<Metadata> {
  const {lang} = await params;
  const l = isLocale(lang) ? lang : DEFAULT_LOCALE;
  return {
    ...buildMetadata({
      title: l === 'de' ? 'Kontakt' : 'Contact',
      description:
        l === 'de'
          ? 'Kontaktieren Sie die Sophia Binder Canine Academy für Hundetraining und Beratung.'
          : 'Get in touch with the Sophia Binder Canine Academy about training and consultations.',
      path: 'contact',
      lang: l,
    }),
    // Not a standalone page — just opens the dialog; keep it out of the index.
    robots: {index: false, follow: true},
  };
}

export default function Page() {
  return <OpenLeadOnMount mode="contact" />;
}
