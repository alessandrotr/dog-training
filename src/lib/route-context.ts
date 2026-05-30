import {isLocale, DEFAULT_LOCALE, type Locale} from './locales';

type SearchParams = Record<string, string | string[] | undefined>;

export function isPreview(sp: SearchParams): boolean {
  return '_storyblok' in sp;
}

// In the Visual Editor the active language arrives as `_storyblok_lang` while
// the URL stays on the default-locale real path — honour it so the DE editor
// tab previews DE content.
export function resolveLocale(routeLang: string, sp: SearchParams): Locale {
  const raw = sp['_storyblok_lang'];
  const previewLang = Array.isArray(raw) ? raw[0] : raw;
  if (isPreview(sp) && isLocale(previewLang)) return previewLang;
  return isLocale(routeLang) ? routeLang : DEFAULT_LOCALE;
}
