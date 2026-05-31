import {NextRequest, NextResponse} from 'next/server';
import {LOCALES, DEFAULT_LOCALE} from './lib/locales';

const isSupported = (v: string) => (LOCALES as readonly string[]).includes(v);

function detectLocale(req: NextRequest): string {
  const cookie = req.cookies.get('NEXT_LOCALE')?.value;
  if (cookie && isSupported(cookie)) return cookie;
  const header = req.headers.get('accept-language') ?? '';
  for (const part of header.split(',')) {
    const code = part.split(';')[0].trim().slice(0, 2).toLowerCase();
    if (isSupported(code)) return code;
  }
  return DEFAULT_LOCALE;
}

// Ensures every page request is locale-prefixed (/en, /de). Bare and legacy
// unprefixed paths (e.g. /about) are 308-redirected to the detected locale,
// preserving the full query string so Storyblok preview params survive.
export function middleware(req: NextRequest) {
  const {pathname} = req.nextUrl;
  const first = pathname.split('/').filter(Boolean)[0];
  if (first && isSupported(first)) {
    // Expose the active locale to the root layout (which sits above the [lang]
    // segment and can't read the route param) so <html lang> is correct.
    const headers = new Headers(req.headers);
    headers.set('x-locale', first);
    return NextResponse.next({request: {headers}});
  }

  const url = req.nextUrl.clone(); // clone keeps the search params
  url.pathname = `/${detectLocale(req)}${pathname === '/' ? '' : pathname}`;
  return NextResponse.redirect(url, 308);
}

export const config = {
  // Exclude Next internals, static files (anything with a dot), and favicon.
  matcher: ['/((?!_next|.*\\..*|favicon.ico).*)'],
};
