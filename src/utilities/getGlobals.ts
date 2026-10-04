import type { Config } from 'src/payload-types'

import type { DataFromGlobalSlug } from 'payload'

import { sdk } from '@/utilities/getPayloadSDK'
import { unstable_cache } from 'next/cache'

import { defaultLocale, type Locale } from '@/i18n/config'

type Global = keyof Config['globals']

async function getGlobal<T extends Global>(
  slug: T,
  depth = 0,
  locale: Locale = defaultLocale,
): Promise<DataFromGlobalSlug<T>> {
  const global = await sdk.findGlobal({
    slug,
    depth,
    locale,
  })

  // The SDK types findGlobal more loosely than the Local API does; the shape
  // on the wire is the same document.
  return global as DataFromGlobalSlug<T>
}

/**
 * Returns an unstable_cache function mapped with the cache tag for the slug.
 *
 * The locale is part of the cache key — without it the first language to be
 * requested would be served to the other one until the tag is revalidated.
 */
export const getCachedGlobal = <T extends Global>(
  slug: T,
  depth = 0,
  locale: Locale = defaultLocale,
) =>
  unstable_cache(async () => getGlobal<T>(slug, depth, locale), [slug, locale], {
    tags: [`global_${slug}`],
  })
