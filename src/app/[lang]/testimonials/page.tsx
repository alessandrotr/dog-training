import {redirect} from 'next/navigation';
import {isLocale, DEFAULT_LOCALE} from '../../../lib/locales';

// Section renamed to "Case Studies" — permanently redirect the old path.
export default async function Page({params}: {params: Promise<{lang: string}>}) {
  const {lang} = await params;
  redirect(`/${isLocale(lang) ? lang : DEFAULT_LOCALE}/case-studies`);
}
