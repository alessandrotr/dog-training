import type {Metadata} from 'next';
import {headers} from 'next/headers';
import {NuqsAdapter} from 'nuqs/adapters/next/app';
import StoryblokProvider from '../components/StoryblokProvider';
import StoryblokBridge from '../components/StoryblokBridge';
import {SITE_URL, SITE_NAME} from '../lib/seo';
import {DEFAULT_LOCALE} from '../lib/locales';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {default: SITE_NAME, template: `%s`},
  description:
    'Scandinavian-inspired force-free dog training. Professional private obedience coaching, puppy foundations, and complex reactive dog rehabilitation.',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // The locale segment lives below this root layout, so read it from the header
  // the middleware sets — keeps <html lang> correct for /de.
  const lang = (await headers()).get('x-locale') ?? DEFAULT_LOCALE;
  return (
    <html lang={lang}>
      <body>
        <NuqsAdapter>
          <StoryblokProvider>
            {children}
            <StoryblokBridge />
          </StoryblokProvider>
        </NuqsAdapter>
      </body>
    </html>
  );
}
