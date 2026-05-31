'use client';

import {useParams, usePathname, useRouter} from 'next/navigation';
import {DEFAULT_LOCALE, isLocale, type Locale} from './locales';

// Logical page id -> path suffix (locale-agnostic). Home is '' so it resolves
// to the bare locale root (`/en`). The locale prefix is added by pageToPath.
export const PAGE_ROUTES: Record<string, string> = {
  home: '',
  about: '/about',
  services: '/services',
  blog: '/blog',
  testimonials: '/case-studies',
  faq: '/faq',
  contact: '/contact',
  booking: '/booking',
};

export function pageToPath(page: string, lang: Locale): string {
  return `/${lang}${PAGE_ROUTES[page] ?? ''}`;
}

// Derive the active page id from a pathname; segment 0 is the locale.
export function pathToPage(pathname: string | null): string {
  if (!pathname) return 'home';
  const page = pathname.split('/').filter(Boolean)[1];
  if (!page) return 'home';
  if (page === 'blog') return 'blog';
  if (page === 'case-studies') return 'testimonials'; // logical page id is still "testimonials"
  return page;
}

// Active locale from the route param (falls back to default).
export function useLocale(): Locale {
  const params = useParams();
  const raw = Array.isArray(params.lang) ? params.lang[0] : params.lang;
  return isLocale(raw) ? raw : DEFAULT_LOCALE;
}

// setCurrentPage-compatible navigator, locale-aware.
export function useNavigate(): (page: string) => void {
  const router = useRouter();
  const lang = useLocale();
  return (page: string) => router.push(pageToPath(page, lang));
}

export function usePostNavigate(): (slug: string) => void {
  const router = useRouter();
  const lang = useLocale();
  return (slug: string) => router.push(`/${lang}/blog/${slug}`);
}

// Navigate to a top-level builder page by slug (e.g. a service detail page).
export function usePageNavigate(): (slug: string) => void {
  const router = useRouter();
  const lang = useLocale();
  return (slug: string) => router.push(`/${lang}/${slug}`);
}

// Locale-aware href builders for <Link> (preferred over programmatic nav:
// crawlable, prefetched, cmd/ctrl-clickable).
export function useHref() {
  const lang = useLocale();
  return {
    page: (page: string) => pageToPath(page, lang),
    slug: (slug: string) => `/${lang}/${slug}`,
    post: (slug: string) => `/${lang}/blog/${slug}`,
    service: (slug: string) => `/${lang}/services/${slug}`,
    caseStudy: (slug: string) => `/${lang}/case-studies/${slug}`,
  };
}

export function useCurrentPage(): string {
  return pathToPage(usePathname());
}

// Returns the current path with its locale segment swapped — for the EN/DE
// language toggle links.
export function useSwitchLocalePath(): (target: Locale) => string {
  const pathname = usePathname();
  return (target: Locale) => {
    const segments = (pathname ?? '/').split('/');
    if (segments.length > 1 && isLocale(segments[1])) {
      segments[1] = target;
      return segments.join('/') || `/${target}`;
    }
    return `/${target}`;
  };
}
