import {notFound} from 'next/navigation';
import {isLocale, LOCALES} from '../../lib/locales';
import I18nProvider from '../../components/I18nProvider';
import SiteChrome from '../../components/SiteChrome';

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

  return (
    <I18nProvider lang={lang}>
      <SiteChrome>{children}</SiteChrome>
    </I18nProvider>
  );
}
