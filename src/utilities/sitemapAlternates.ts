import { localeHtmlLang, locales, localizePath, type Locale } from '@/i18n/config'

export type SitemapEntry = {
  loc: string
  lastmod: string
  alternateRefs: { href: string; hreflang: string; hrefIsAbsolute: true }[]
}

/**
 * Expands one canonical path into a sitemap entry per locale, each carrying
 * `alternateRefs` for the others.
 *
 * Search engines need every translation listed with reciprocal hreflang links;
 * emitting only the default locale hides the Russian pages entirely.
 */
export const localizedSitemapEntries = (
  siteUrl: string,
  path: string,
  lastmod: string,
): SitemapEntry[] => {
  const alternateRefs = locales.map((locale) => ({
    href: `${siteUrl}${localizePath(path, locale)}`,
    hreflang: localeHtmlLang[locale],
    hrefIsAbsolute: true as const,
  }))

  return locales.map((locale: Locale) => ({
    loc: `${siteUrl}${localizePath(path, locale)}`,
    lastmod,
    alternateRefs,
  }))
}
