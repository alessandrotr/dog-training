import { notFound } from 'next/navigation'
import { isLocale, LOCALES } from '@/lib/locales'
import I18nProvider from '@/features/site/components/I18nProvider'
import SiteChrome from '@/features/site/components/SiteChrome'
import { buildLocalBusinessSchema } from '@/lib/business-schema'
import { SITE_URL } from '@/lib/seo'
import { getConfig } from '@/features/storyblok/api/get-config'
import { getAvailability } from '@/features/storyblok/api/get-availability'
import { getServices } from '@/features/storyblok/api/content-server'

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }))
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()

  const [config, availability, services] = await Promise.all([
    getConfig(lang),
    getAvailability(lang),
    getServices(lang),
  ])

  return (
    <I18nProvider lang={lang}>
      {/* Server-rendered structured data for local search. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildLocalBusinessSchema(config, SITE_URL)),
        }}
      />
      <SiteChrome config={config} availability={availability} services={services}>
        {children}
      </SiteChrome>
    </I18nProvider>
  )
}
