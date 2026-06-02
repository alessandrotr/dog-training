import type { Metadata } from 'next'
import RenderStoryblokPage from '@/features/storyblok/components/RenderStoryblokPage'
import { isLocale, DEFAULT_LOCALE } from '@/lib/locales'
import { resolvePageContext } from '@/lib/route-context'
import { pageMetadata } from '@/lib/seo'

type SP = Promise<Record<string, string | string[] | undefined>>

// SEO comes from the `pages/blog` story's seo_* fields, like every other
// builder page — editable in Storyblok, nothing hardcoded here.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang } = await params
  return pageMetadata('blog', isLocale(lang) ? lang : DEFAULT_LOCALE, 'blog')
}

// The blog index is a composed `page` story (pages/blog): a Page Header blok +
// the Blog with Filters blok — both editable in Storyblok.
export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string }>
  searchParams: SP
}) {
  const { lang } = await params
  const sp = await searchParams
  const { preview, locale } = resolvePageContext(lang, sp)
  return <RenderStoryblokPage slug="blog" lang={locale} preview={preview} />
}
