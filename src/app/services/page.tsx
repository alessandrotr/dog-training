import Services from '../../components/pages/Services';
import {getServices} from '../../lib/content-server';

type SP = Promise<Record<string, string | string[] | undefined>>;

export default async function Page({searchParams}: {searchParams: SP}) {
  const preview = '_storyblok' in (await searchParams);
  const servicesByLang = await getServices(preview);
  return <Services servicesByLang={servicesByLang} />;
}
