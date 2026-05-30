import FAQ from '../../components/pages/FAQ';
import {getFaqs} from '../../lib/content-server';

type SP = Promise<Record<string, string | string[] | undefined>>;

export default async function Page({searchParams}: {searchParams: SP}) {
  const preview = '_storyblok' in (await searchParams);
  const faqsByLang = await getFaqs(preview);
  return <FAQ faqsByLang={faqsByLang} />;
}
