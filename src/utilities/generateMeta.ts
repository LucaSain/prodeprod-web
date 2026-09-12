import type { Metadata } from 'next'

import type { Media, Page, Post, Config } from '../payload-types'
import type { Locale } from '@/i18n/config'

import { defaultLocale, localeHtmlLang, locales, localizePath } from '@/i18n/config'
import { mergeOpenGraph } from './mergeOpenGraph'
import { getServerSideURL } from './getURL'
import { resolveKeywords, titleSuffix } from './siteConfig'

const getImageURL = (image?: Media | Config['db']['defaultIDType'] | null) => {
  const serverUrl = getServerSideURL()

  let url = serverUrl + '/website-template-OG.webp'

  if (image && typeof image === 'object' && 'url' in image) {
    const ogUrl = image.sizes?.og?.url

    url = ogUrl ? serverUrl + ogUrl : serverUrl + image.url
  }

  return url
}

/**
 * Builds the `alternates` block: a canonical URL for this locale plus an
 * hreflang entry per language, so search engines serve the right translation
 * instead of picking one and treating the others as duplicates.
 */
const buildAlternates = (path: string, locale: Locale): Metadata['alternates'] => {
  const languages = Object.fromEntries(
    locales.map((l) => [localeHtmlLang[l], localizePath(path, l)]),
  )

  return {
    canonical: localizePath(path, locale),
    languages: {
      ...languages,
      'x-default': localizePath(path, defaultLocale),
    },
  }
}

export const generateMeta = async (args: {
  doc: Partial<Page> | Partial<Post> | null
  locale?: Locale
  /** Path without a locale prefix, e.g. `/about` or `/posts/my-post`. */
  path?: string
}): Promise<Metadata> => {
  const { doc, locale = defaultLocale, path = '/' } = args

  const ogImage = getImageURL(doc?.meta?.image)
  const title = titleSuffix(doc?.meta?.title)
  const description = doc?.meta?.description || undefined
  const keywords = resolveKeywords(doc?.meta?.keywords, locale)

  return {
    description,
    keywords,
    alternates: buildAlternates(path, locale),
    openGraph: mergeOpenGraph(
      {
        description: description || '',
        images: ogImage ? [{ url: ogImage }] : undefined,
        title,
        url: localizePath(path, locale),
      },
      locale,
    ),
    title,
  }
}
