'use client';

import {usePathname, useRouter} from 'next/navigation';

// Single source of truth mapping the app's logical page ids to URL routes.
export const PAGE_ROUTES: Record<string, string> = {
  home: '/',
  about: '/about',
  services: '/services',
  blog: '/blog',
  testimonials: '/testimonials',
  faq: '/faq',
  contact: '/contact',
  booking: '/booking',
};

export function pageToPath(page: string): string {
  return PAGE_ROUTES[page] ?? '/';
}

// Derive the active page id from a pathname (used for nav highlighting).
export function pathToPage(pathname: string | null): string {
  if (!pathname || pathname === '/') return 'home';
  if (pathname.startsWith('/blog')) return 'blog';
  const segment = pathname.split('/').filter(Boolean)[0];
  return segment ?? 'home';
}

// Returns a setCurrentPage-compatible navigator backed by the Next router,
// so existing component bodies can keep calling setCurrentPage('booking') etc.
export function useNavigate(): (page: string) => void {
  const router = useRouter();
  return (page: string) => router.push(pageToPath(page));
}

// Navigate straight to a blog post detail route.
export function usePostNavigate(): (slug: string) => void {
  const router = useRouter();
  return (slug: string) => router.push(`/blog/${slug}`);
}

// Active page id derived from the current pathname.
export function useCurrentPage(): string {
  return pathToPage(usePathname());
}
