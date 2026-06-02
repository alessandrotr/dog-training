import type {Metadata} from 'next';
import {headers} from 'next/headers';
import {Inter, JetBrains_Mono, Playfair_Display} from 'next/font/google';
import {NuqsAdapter} from 'nuqs/adapters/next/app';
import StoryblokProvider from '@/features/storyblok/components/StoryblokProvider';
import StoryblokBridge from '@/features/storyblok/components/StoryblokBridge';
import {SITE_URL, SITE_NAME} from '@/lib/seo';
import {DEFAULT_LOCALE} from '@/lib/locales';
import './globals.css';

// Self-hosted, preloaded fonts (no render-blocking Google Fonts request).
// Each exposes a CSS variable consumed by the Tailwind `@theme` in globals.css.
const inter = Inter({subsets: ['latin'], variable: '--font-inter', display: 'swap'});
const jetbrainsMono = JetBrains_Mono({subsets: ['latin'], variable: '--font-jetbrains', display: 'swap'});
const playfair = Playfair_Display({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
  display: 'swap',
});

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
    <html lang={lang} className={`${inter.variable} ${jetbrainsMono.variable} ${playfair.variable}`}>
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
