import { NextResponse, type NextRequest } from 'next/server'

import { defaultLocale, isLocale, locales } from '@/i18n/config'

/**
 * Locale routing.
 *
 * This is Next 16's `proxy.ts` — the file formerly known as `middleware.ts`.
 * Same request-time hook, renamed convention.
 *
 * The default locale is served unprefixed and every other locale is prefixed:
 *
 *   /about      →  rewritten to /en/about   (URL stays /about)
 *   /ru/about   →  passed through
 *   /en/about   →  redirected to /about     (one canonical URL per page)
 *
 * A rewrite rather than a redirect keeps the default locale's URLs clean
 * without duplicating every page under two addresses, which would split
 * search ranking between them.
 */

/** Paths owned by Payload, Next internals, or route handlers — never localized. */
const EXCLUDED_PREFIXES = [
  '/admin',
  '/api',
  '/next',
  '/_next',
  '/_vercel',
  '/media',
  '/favicon',
  '/robots.txt',
  '/sitemap.xml',
]

const isExcluded = (pathname: string): boolean => {
  if (EXCLUDED_PREFIXES.some((prefix) => pathname.startsWith(prefix))) return true

  // Sitemap route handlers (pages-sitemap.xml, posts-sitemap.xml) and any
  // other file-like request: anything with an extension is not a page.
  return /\.[a-z0-9]+$/i.test(pathname)
}

export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl

  if (isExcluded(pathname)) return NextResponse.next()

  const [firstSegment] = pathname.split('/').filter(Boolean)

  // /en/... is not a canonical URL — send it to the unprefixed equivalent.
  if (firstSegment === defaultLocale) {
    const stripped = pathname.slice(`/${defaultLocale}`.length) || '/'
    const url = request.nextUrl.clone()
    url.pathname = stripped
    url.search = search
    return NextResponse.redirect(url, 308)
  }

  // A non-default locale is already addressed correctly.
  if (isLocale(firstSegment)) return NextResponse.next()

  // Everything else is the default locale: rewrite it under the segment.
  const url = request.nextUrl.clone()
  url.pathname = `/${defaultLocale}${pathname === '/' ? '' : pathname}`
  return NextResponse.rewrite(url)
}

export const config = {
  matcher: [
    /*
     * Match every path except the ones the proxy would skip anyway.
     * Keeping the exclusions here as well as in `isExcluded` means Next
     * never even invokes the proxy for static assets.
     */
    '/((?!api|admin|next|_next|_vercel|media|.*\\..*).*)',
  ],
}
