import { initI18n } from '@payloadcms/translations'
import type { I18n } from '@payloadcms/translations'
import configPromise from '@payload-config'
import { cache } from 'react'

import type { CustomTranslationsKeys } from './translations'
import { defaultLocale, type Locale } from './config'

/**
 * A Payload i18n instance for the given locale.
 *
 * This is Payload's own translation machinery — the same `t` the admin panel
 * and `req.t` use — rather than a parallel dictionary. Strings come from
 * `i18n.translations` in the Payload config, so admin and frontend cannot
 * drift apart.
 *
 * Wrapped in React `cache` so the i18n instance is built once per request per
 * language, no matter how many components ask for it.
 */
export const getI18n = cache(async (locale: Locale = defaultLocale): Promise<I18n> => {
  // The config is read directly rather than through getPayload: translations
  // are static, and this branch has no database to connect to.
  const config = await configPromise

  return initI18n({
    config: config.i18n,
    context: 'api',
    language: locale,
  })
})

/** The translate function alone, for components that only need `t`. */
export type TranslateFn = (key: CustomTranslationsKeys, options?: Record<string, unknown>) => string

export const getTranslate = async (locale: Locale = defaultLocale): Promise<TranslateFn> => {
  const i18n = await getI18n(locale)

  return i18n.t as unknown as TranslateFn
}
