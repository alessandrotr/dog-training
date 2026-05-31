import {notFound} from 'next/navigation';
import {isLocale, LOCALES} from '../../lib/locales';
import I18nProvider from '../../components/I18nProvider';
import SiteChrome from '../../components/SiteChrome';
import {LOCAL_BUSINESS_SCHEMA} from '../../data';
import {getConfig} from '../../lib/get-config';
import {getAvailability} from '../../lib/get-availability';

export function generateStaticParams() {
  return LOCALES.map((lang) => ({lang}));
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{lang: string}>;
}) {
  const {lang} = await params;
  if (!isLocale(lang)) notFound();

  const [config, availability] = await Promise.all([getConfig(lang), getAvailability(lang)]);

  return (
    <I18nProvider lang={lang}>
      {/* Server-rendered structured data for local search. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{__html: JSON.stringify(LOCAL_BUSINESS_SCHEMA)}}
      />
      <SiteChrome config={config} availability={availability}>{children}</SiteChrome>
    </I18nProvider>
  );
}
