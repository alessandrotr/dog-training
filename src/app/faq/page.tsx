import FAQ from '../../components/pages/FAQ';
import {getFaqs} from '../../lib/content-server';

export const revalidate = 60;

export default async function Page() {
  const faqsByLang = await getFaqs();
  return <FAQ faqsByLang={faqsByLang} />;
}
