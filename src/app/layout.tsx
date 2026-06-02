import type { Metadata } from 'next'
import { headers } from 'next/headers'
import { Inter, JetBrains_Mono, Playfair_Display } from 'next/font/google'
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import StoryblokProvider from '@/features/storyblok/components/StoryblokProvider'
import StoryblokBridge from '@/features/storyblok/components/StoryblokBridge'
import { SITE_URL } from '@/lib/seo'
import { DEFAULT_LOCALE, isLocale } from '@/lib/locales'
import { getConfig } from '@/features/storyblok/api/get-config'
import './globals.css'

// Self-hosted, preloaded fonts (no render-blocking Google Fonts request).
// Each exposes a CSS variable consumed by the Tailwind `@theme` in globals.css.
const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })
const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
})
const playfair = Playfair_Display({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
  display: 'swap',
})

// Site-wide metadata defaults sourced from the Storyblok Site Config (the same
// single source of truth as the footer/JSON-LD). `template: '%s'` lets each page
// own its full title; `default` is the brand fallback for routes that set none.
export async function generateMetadata(): Promise<Metadata> {
  const header = (await headers()).get('x-locale')
  const { seo } = await getConfig(isLocale(header ?? '') ? (header as 'en' | 'de') : DEFAULT_LOCALE)
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: seo.siteName, template: '%s' },
    description: seo.defaultDescription,
  }
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // The locale segment lives below this root layout, so read it from the header
  // the middleware sets — keeps <html lang> correct for /de.
  const lang = (await headers()).get('x-locale') ?? DEFAULT_LOCALE
  return (
    <html
      lang={lang}
      className={`${inter.variable} ${jetbrainsMono.variable} ${playfair.variable}`}
    >
      <body>
        <NuqsAdapter>
          <StoryblokProvider>
            {children}
            <StoryblokBridge />
          </StoryblokProvider>
        </NuqsAdapter>
      </body>
    </html>
  )
}
