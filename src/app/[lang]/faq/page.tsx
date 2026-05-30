import FAQ from '../../../components/pages/FAQ';
import {getFaqs} from '../../../lib/content-server';
import type {Locale} from '../../../lib/locales';

type SP = Promise<Record<string, string | string[] | undefined>>;

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{lang: string}>;
  searchParams: SP;
}) {
  const {lang} = await params;
  const preview = '_storyblok' in (await searchParams);
  const faqs = await getFaqs(lang as Locale, preview);
  return <FAQ faqs={faqs} />;
}
