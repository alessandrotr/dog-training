import type {Metadata} from 'next';
import Contact from '../../../components/pages/Contact';
import {isLocale, DEFAULT_LOCALE} from '../../../lib/locales';
import {buildMetadata} from '../../../lib/seo';

export async function generateMetadata({params}: {params: Promise<{lang: string}>}): Promise<Metadata> {
  const {lang} = await params;
  const l = isLocale(lang) ? lang : DEFAULT_LOCALE;
  return buildMetadata({
    title: l === 'de' ? 'Kontakt' : 'Contact',
    description:
      l === 'de'
        ? 'Kontaktieren Sie die Sophia Binder Canine Academy für Hundetraining und Beratung.'
        : 'Get in touch with the Sophia Binder Canine Academy about training and consultations.',
    path: 'contact',
    lang: l,
  });
}

export default function Page() {
  return <Contact />;
}
