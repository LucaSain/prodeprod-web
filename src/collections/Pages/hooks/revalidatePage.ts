import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { safeRevalidatePath, safeRevalidateTag } from '../../../utilities/safeRevalidate'

import type { Page } from '../../../payload-types'
import { locales, localizePath } from '../../../i18n/config'

/**
 * Every locale is a separate URL for the same document, so publishing has to
 * invalidate all of them — revalidating only `/slug` would leave `/ru/slug`
 * serving the previous render.
 */
const revalidateAllLocales = (slug: string | null | undefined) => {
  const basePath = slug === 'home' ? '/' : `/${slug}`

  locales.forEach((locale) => {
    safeRevalidatePath(localizePath(basePath, locale))
  })

  return basePath
}

export const revalidatePage: CollectionAfterChangeHook<Page> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    if (doc._status === 'published') {
      const path = revalidateAllLocales(doc.slug)

      payload.logger.info(`Revalidating page at path: ${path} (all locales)`)

      safeRevalidateTag('pages-sitemap', 'max')
    }

    // If the page was previously published, we need to revalidate the old path
    if (previousDoc?._status === 'published' && doc._status !== 'published') {
      const oldPath = revalidateAllLocales(previousDoc.slug)

      payload.logger.info(`Revalidating old page at path: ${oldPath} (all locales)`)

      safeRevalidateTag('pages-sitemap', 'max')
    }
  }
  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<Page> = ({ doc, req: { context } }) => {
  if (!context.disableRevalidate) {
    revalidateAllLocales(doc?.slug)
    safeRevalidateTag('pages-sitemap', 'max')
  }

  return doc
}
