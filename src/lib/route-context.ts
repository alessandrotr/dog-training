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

// The two values every page route derives from its params + searchParams.
// Composes the helpers above so routes don't re-spell the pair.
export function resolvePageContext(routeLang: string, sp: SearchParams): {preview: boolean; locale: Locale} {
  return {preview: isPreview(sp), locale: resolveLocale(routeLang, sp)};
}
