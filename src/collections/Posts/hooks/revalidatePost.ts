import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { safeRevalidatePath, safeRevalidateTag } from '../../../utilities/safeRevalidate'

import type { Post } from '../../../payload-types'
import { locales, localizePath } from '../../../i18n/config'

/** One document, one URL per locale — all of them have to be invalidated. */
const revalidateAllLocales = (slug: string | null | undefined) => {
  const basePath = `/posts/${slug}`

  locales.forEach((locale) => {
    safeRevalidatePath(localizePath(basePath, locale))
  })

  return basePath
}

export const revalidatePost: CollectionAfterChangeHook<Post> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    if (doc._status === 'published') {
      const path = revalidateAllLocales(doc.slug)

      payload.logger.info(`Revalidating post at path: ${path} (all locales)`)

      safeRevalidateTag('posts-sitemap', 'max')
    }

    // If the post was previously published, we need to revalidate the old path
    if (previousDoc._status === 'published' && doc._status !== 'published') {
      const oldPath = revalidateAllLocales(previousDoc.slug)

      payload.logger.info(`Revalidating old post at path: ${oldPath} (all locales)`)

      safeRevalidateTag('posts-sitemap', 'max')
    }
  }
  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<Post> = ({ doc, req: { context } }) => {
  if (!context.disableRevalidate) {
    revalidateAllLocales(doc?.slug)
    safeRevalidateTag('posts-sitemap', 'max')
  }

  return doc
}
