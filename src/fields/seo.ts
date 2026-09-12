import type { Tab } from 'payload'

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'

/**
 * Meta keywords.
 *
 * `hasMany` gives editors a chip input — one keyword per entry — instead of a
 * free-text field where separators drift between commas, semicolons and
 * newlines. Localized, because keywords are language-specific: the Russian
 * page should target Russian search terms, not transliterated English ones.
 */
export const metaKeywordsField = {
  name: 'keywords',
  type: 'text' as const,
  hasMany: true,
  localized: true,
  label: 'Keywords',
  admin: {
    description:
      'Search keywords for this page, one per entry. Written to the <meta name="keywords"> tag and reused as Open Graph tags.',
  },
}

/**
 * The shared SEO tab for Pages and Posts.
 *
 * Every field is localized: a translated page needs its own title, description
 * and keywords, and often its own share image (screenshots contain text).
 */
export const seoTab: Tab = {
  name: 'meta',
  label: 'SEO',
  fields: [
    OverviewField({
      titlePath: 'meta.title',
      descriptionPath: 'meta.description',
      imagePath: 'meta.image',
    }),
    MetaTitleField({
      hasGenerateFn: true,
      overrides: { localized: true },
    }),
    MetaImageField({
      relationTo: 'media',
      overrides: { localized: true },
    }),
    MetaDescriptionField({
      overrides: { localized: true },
    }),
    metaKeywordsField,
    PreviewField({
      // if the `generateUrl` function is configured
      hasGenerateFn: true,

      // field paths to match the target field for data
      titlePath: 'meta.title',
      descriptionPath: 'meta.description',
    }),
  ],
}
