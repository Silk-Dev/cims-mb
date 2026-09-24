export const locales = ['fr', 'ar'] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = 'fr'

export const isLocale = (value: string | undefined | null): value is Locale =>
  !!value && (locales as readonly string[]).includes(value)

export const dirOf = (locale: Locale) => (locale === 'ar' ? 'rtl' : 'ltr')

/** Prefix an internal path with the locale; leave external/tel/mailto links untouched. */
export const localizeHref = (href: string, locale: Locale) => {
  if (/^(https?:|mailto:|tel:|#)/.test(href)) return href
  const clean = href.startsWith('/') ? href : `/${href}`
  return clean === '/' ? `/${locale}` : `/${locale}${clean}`
}

export const telHref = (phone?: string | null) =>
  phone ? `tel:${phone.replace(/[^+\d]/g, '')}` : undefined
