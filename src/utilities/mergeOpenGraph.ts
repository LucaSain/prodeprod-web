import type { Metadata } from 'next'

import type { Locale } from '@/i18n/config'
import { defaultLocale, localeHtmlLang, locales } from '@/i18n/config'
import { getServerSideURL } from './getURL'
import { SITE_NAME } from './siteConfig'

const defaultDescriptions: Record<Locale, string> = {
  en: 'Briquetting presses and complete briquetting lines for biomass, wood residues and metal chips.',
  ru: 'Брикетировочные прессы и комплектные линии брикетирования для биомассы, древесных отходов и металлической стружки.',
}

const defaultOpenGraph = (locale: Locale = defaultLocale): Metadata['openGraph'] => ({
  type: 'website',
  description: defaultDescriptions[locale] ?? defaultDescriptions[defaultLocale],
  images: [
    {
      url: `${getServerSideURL()}/website-template-OG.webp`,
    },
  ],
  locale: localeHtmlLang[locale],
  alternateLocale: locales.filter((l) => l !== locale).map((l) => localeHtmlLang[l]),
  siteName: SITE_NAME,
  title: SITE_NAME,
})

export const mergeOpenGraph = (
  og?: Metadata['openGraph'],
  locale: Locale = defaultLocale,
): Metadata['openGraph'] => {
  const defaults = defaultOpenGraph(locale)

  return {
    ...defaults,
    ...og,
    images: og?.images ? og.images : defaults?.images,
  }
}
