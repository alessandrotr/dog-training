import Services from '../../components/pages/Services';
import {getServices} from '../../lib/content-server';

export const revalidate = 60;

export default async function Page() {
  const servicesByLang = await getServices();
  return <Services servicesByLang={servicesByLang} />;
}
