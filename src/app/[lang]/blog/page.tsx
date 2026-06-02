import type {Metadata} from 'next';
import RenderStoryblokPage from '@/features/storyblok/components/RenderStoryblokPage';
import {resolvePageContext} from '@/lib/route-context';
import {staticMetadata} from '@/lib/seo';

type SP = Promise<Record<string, string | string[] | undefined>>;

export async function generateMetadata({params}: {params: Promise<{lang: string}>}): Promise<Metadata> {
  const {lang} = await params;
  return staticMetadata(lang, 'blog', {
    en: {
      title: 'Insights & News',
      description: 'Dog-training tips, methods, and news from the Sophia Binder Canine Academy.',
    },
    de: {
      title: 'Ratgeber & Neuigkeiten',
      description: 'Tipps zur Hundeerziehung, Trainingsmethoden und Neuigkeiten aus der Sophia Binder Canine Academy.',
    },
  });
}

// The blog index is a composed `page` story (pages/blog): a Page Header blok +
// the Blog with Filters blok — both editable in Storyblok.
export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{lang: string}>;
  searchParams: SP;
}) {
  const {lang} = await params;
  const sp = await searchParams;
  const {preview, locale} = resolvePageContext(lang, sp);
  return <RenderStoryblokPage slug="blog" lang={locale} preview={preview} />;
}
