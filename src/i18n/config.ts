/**
 * Locale configuration.
 *
 * This is the single source of truth: `payload.config.ts` builds its
 * `localization.locales` from it, and the frontend `[locale]` segment
 * validates against it. Adding a language means editing this file only.
 */
export const locales = ['en', 'ru'] as const

export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = 'en'

/**
 * Locale labels for the admin panel's locale selector.
 *
 * Payload accepts a label per i18n language, so the selector reads in
 * whichever language the editor has the admin panel set to.
 */
export const localeLabels: Record<Locale, Record<Locale, string>> = {
  en: { en: 'English', ru: 'Английский' },
  ru: { en: 'Russian', ru: 'Русский' },
}

/** Endonyms, for the public language switcher. */
export const localeEndonyms: Record<Locale, string> = {
  en: 'English',
  ru: 'Русский',
}

/** Short codes for the compact switcher. */
export const localeShortLabels: Record<Locale, string> = {
  en: 'EN',
  ru: 'RU',
}

/** BCP-47 tags for `<html lang>` and hreflang alternates. */
export const localeHtmlLang: Record<Locale, string> = {
  en: 'en',
  ru: 'ru',
}

export const isLocale = (value: unknown): value is Locale =>
  typeof value === 'string' && locales.includes(value as Locale)

/**
 * The default locale is served unprefixed (`/about`), every other locale
 * is prefixed (`/ru/about`). Keep this in step with `src/middleware.ts`.
 */
export const localizePath = (path: string, locale: Locale): string => {
  const normalized = path.startsWith('/') ? path : `/${path}`

  if (locale === defaultLocale) return normalized

  return normalized === '/' ? `/${locale}` : `/${locale}${normalized}`
}

/** Strips a locale prefix back off a pathname, yielding the canonical path. */
export const delocalizePath = (path: string): { locale: Locale; pathname: string } => {
  const segments = path.split('/').filter(Boolean)
  const [maybeLocale, ...rest] = segments

  if (isLocale(maybeLocale)) {
    return { locale: maybeLocale, pathname: `/${rest.join('/')}` }
  }

  return { locale: defaultLocale, pathname: path === '' ? '/' : path }
}
