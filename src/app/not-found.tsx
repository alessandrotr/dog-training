import type { Metadata } from 'next'
import { headers } from 'next/headers'
import Link from 'next/link'
import { Dog, PawPrint, ArrowLeft, Compass } from 'lucide-react'
import { Button, Heading, Text, Eyebrow } from '@/components/ui'
import { DEFAULT_LOCALE, isLocale } from '@/lib/locales'

export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false, follow: false },
}

const COPY = {
  en: {
    eyebrow: 'Error 404',
    headline: 'This trail went cold.',
    body: "We sniffed around but couldn't track down that page. Let's get you back on the scent.",
    home: 'Back to home',
    explore: 'Explore programs',
  },
  de: {
    eyebrow: 'Fehler 404',
    headline: 'Diese Fährte ist kalt.',
    body: 'Wir haben überall geschnüffelt, aber die Seite nicht gefunden. Zurück auf die richtige Spur.',
    home: 'Zur Startseite',
    explore: 'Programme ansehen',
  },
} as const

export default async function NotFound() {
  const header = (await headers()).get('x-locale')
  const lang = isLocale(header ?? '')
    ? (header as keyof typeof COPY)
    : (DEFAULT_LOCALE as keyof typeof COPY)
  const t = COPY[lang] ?? COPY.en
  const home = `/${lang}`

  return (
    <main className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden bg-linear-to-b from-amber-100 via-stone-50 to-stone-50 px-6 py-16 text-center">
      {/* Decorative heather glow + scattered paw prints */}
      <div className="pointer-events-none absolute -top-24 left-1/2 size-72 -translate-x-1/2 rounded-full bg-amber-300/40 blur-3xl" />
      <PawPrint className="pointer-events-none absolute left-[12%] top-[18%] size-10 -rotate-12 text-amber-300/50" />
      <PawPrint className="pointer-events-none absolute right-[14%] top-[28%] size-7 rotate-12 text-amber-300/40" />
      <PawPrint className="pointer-events-none absolute bottom-[16%] left-[20%] size-8 rotate-6 text-amber-300/40" />
      <PawPrint className="pointer-events-none absolute bottom-[22%] right-[18%] size-12 -rotate-12 text-amber-300/45" />

      <div className="relative z-10 flex flex-col items-center">
        <Eyebrow tone="brand" className="mb-6">
          {t.eyebrow}
        </Eyebrow>

        {/* 4 · dog · 4 */}
        <div className="flex items-center justify-center gap-3 sm:gap-5">
          <span className="bg-linear-to-br from-amber-400 via-amber-600 to-amber-800 bg-clip-text font-sans text-8xl font-black leading-none text-transparent sm:text-9xl">
            4
          </span>
          <span className="relative flex size-24 items-center justify-center rounded-full bg-amber-700 text-white shadow-xl shadow-amber-950/25 ring-1 ring-amber-500/30 sm:size-28">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-amber-400/30 [animation-duration:2.5s]" />
            <Dog className="relative size-12 sm:size-14" />
          </span>
          <span className="bg-linear-to-br from-amber-400 via-amber-600 to-amber-800 bg-clip-text font-sans text-8xl font-black leading-none text-transparent sm:text-9xl">
            4
          </span>
        </div>

        <Heading level={1} size="title" className="mt-8">
          {t.headline}
        </Heading>
        <Text className="mt-3 max-w-md text-pretty">{t.body}</Text>

        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <Button render={<Link href={home} />} variant="cta" size="xl">
            <ArrowLeft className="size-4" />
            {t.home}
          </Button>
          <Button render={<Link href={`${home}/services`} />} variant="ctaOutline" size="xl">
            <Compass className="size-4" />
            {t.explore}
          </Button>
        </div>
      </div>
    </main>
  )
}
