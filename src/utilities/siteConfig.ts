import type { Locale } from '@/i18n/config'

/** The company name, used in titles, Open Graph and the logo wordmark. */
export const SITE_NAME = 'ProdeProd'

/** Title suffix — `Page title | ProdeProd`. */
export const titleSuffix = (title?: string | null): string =>
  title ? `${title} | ${SITE_NAME}` : SITE_NAME

/**
 * Site-wide fallback keywords.
 *
 * Per-page keywords set in the SEO tab take precedence; these fill the gap on
 * pages where nothing has been entered yet, so no page ships without any.
 */
export const defaultKeywords: Record<Locale, string[]> = {
  en: [
    'briquetting press',
    'briquetting machine',
    'biomass briquetting',
    'sawdust briquette machine',
    'wood briquetting press',
    'hydraulic briquetting press',
    'metal chip briquetting',
    'RUF briquettes',
    'biomass fuel equipment',
    'industrial briquetting equipment',
  ],
  ro: [
    'presă de brichetat',
    'presă pentru brichete',
    'echipament de brichetare',
    'brichetare biomasă',
    'presă pentru rumeguș',
    'linie de brichetare',
    'tocător de crengi',
    'uscător aerodinamic',
    'brichete de combustibil',
    'utilaj industrial Moldova',
  ],
  ru: [
    'брикетировочный пресс',
    'пресс для брикетирования',
    'оборудование для брикетирования',
    'брикетирование биомассы',
    'пресс для опилок',
    'линия брикетирования',
    'брикетирование металлической стружки',
    'гидравлический брикетировочный пресс',
    'топливные брикеты',
    'промышленное оборудование',
  ],
}

/** Merges page keywords over the locale defaults, de-duplicated. */
export const resolveKeywords = (
  pageKeywords: (string | null)[] | null | undefined,
  locale: Locale,
): string[] => {
  const page = (pageKeywords ?? []).filter((k): k is string => Boolean(k && k.trim()))

  // A page that specifies its own keywords replaces the defaults rather than
  // appending to them — otherwise every page carries the same generic tail.
  const source = page.length > 0 ? page : defaultKeywords[locale] || defaultKeywords.en

  return Array.from(new Set(source.map((k) => k.trim())))
}
