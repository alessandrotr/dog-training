import Services from '../../../components/pages/Services';
import {getServices} from '../../../lib/content-server';
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
  const services = await getServices(lang as Locale, preview);
  return <Services services={services} />;
}
