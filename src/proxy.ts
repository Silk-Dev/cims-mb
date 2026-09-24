import { NextResponse, type NextRequest } from 'next/server'

import { defaultLocale, isLocale } from './lib/i18n'

/** Redirect locale-less URLs to /fr or /ar (based on the browser language). */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const first = pathname.split('/')[1]
  if (isLocale(first)) return NextResponse.next()

  const accept = request.headers.get('accept-language') ?? ''
  const locale = /^ar\b/i.test(accept.trim()) ? 'ar' : defaultLocale
  const url = request.nextUrl.clone()
  url.pathname = `/${locale}${pathname === '/' ? '' : pathname}`
  return NextResponse.redirect(url)
}

export const config = {
  matcher: [
    '/((?!admin|api|_next|brand|media|favicon.ico|icon|apple-icon|robots.txt|sitemap.xml|.*\\..*).*)',
  ],
}
