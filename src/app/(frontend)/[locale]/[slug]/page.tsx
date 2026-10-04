import type { Metadata } from 'next'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import type { RequiredDataFromCollectionSlug } from 'payload'

import { sdk } from '@/utilities/getPayloadSDK'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import { homeStatic } from '@/endpoints/seed/home-static'

import { RenderBlocks } from '@/blocks/RenderBlocks'
import { RenderHero } from '@/heros/RenderHero'
import { generateMeta } from '@/utilities/generateMeta'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { defaultLocale, isLocale, locales, type Locale } from '@/i18n/config'

/**
 * Static export needs every path enumerated up front, so the slugs are read
 * from the remote API at build time. Slugs are shared across locales, so the
 * list is the cross product of published pages and configured locales.
 */
export async function generateStaticParams() {
  const pages = await sdk.find({
    collection: 'pages',
    draft: false,
    limit: 1000,
    pagination: false,
    select: { slug: true },
  })

  const slugs = pages.docs?.filter((d) => d.slug !== 'home').map((d) => d.slug as string) ?? []

  return locales.flatMap((locale) => slugs.map((slug) => ({ locale, slug })))
}

type Args = {
  params: Promise<{
    locale: string
    slug?: string
  }>
}

export default async function Page({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = 'home', locale: localeParam } = await paramsPromise
  const locale = (isLocale(localeParam) ? localeParam : defaultLocale) as Locale
  // Decode to support slugs with special characters
  const decodedSlug = decodeURIComponent(slug)
  const url = '/' + decodedSlug
  let page: RequiredDataFromCollectionSlug<'pages'> | null

  page = await queryPageBySlug({
    slug: decodedSlug,
    locale,
  })

  // Remove this code once your website is seeded
  if (!page && slug === 'home') {
    page = homeStatic
  }

  if (!page) {
    return <PayloadRedirects url={url} />
  }

  const { hero, layout } = page

  return (
    <article className="pb-24">
      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={url} />

      {draft && <LivePreviewListener />}

      <RenderHero {...hero} locale={locale} />
      <RenderBlocks blocks={layout} locale={locale} />
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = 'home', locale: localeParam } = await paramsPromise
  const locale = (isLocale(localeParam) ? localeParam : defaultLocale) as Locale
  // Decode to support slugs with special characters
  const decodedSlug = decodeURIComponent(slug)
  const page = await queryPageBySlug({
    slug: decodedSlug,
    locale,
  })

  return generateMeta({
    doc: page,
    locale,
    path: decodedSlug === 'home' ? '/' : `/${decodedSlug}`,
  })
}

const queryPageBySlug = cache(async ({ slug, locale }: { slug: string; locale: Locale }) => {
  const { isEnabled: draft } = await draftMode()

  const result = await sdk.find({
    collection: 'pages',
    draft,
    limit: 1,
    pagination: false,
    locale,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})
