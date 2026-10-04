import type { Metadata } from 'next/types'

import { CollectionArchive } from '@/components/CollectionArchive'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import { sdk } from '@/utilities/getPayloadSDK'
import React from 'react'
import { notFound } from 'next/navigation'

import { defaultLocale, isLocale, locales, type Locale } from '@/i18n/config'
import { getTranslate } from '@/i18n/getI18n'
import { titleSuffix } from '@/utilities/siteConfig'

export const revalidate = 600

export async function generateStaticParams() {
  const { totalDocs } = await sdk.count({ collection: 'posts' })
  const totalPages = Math.ceil(totalDocs / 10)

  const pages: { locale: string; pageNumber: string }[] = []
  for (const locale of locales) {
    for (let i = 1; i <= totalPages; i++) pages.push({ locale, pageNumber: String(i) })
  }

  return pages
}

type Args = {
  params: Promise<{
    locale: string
    pageNumber: string
  }>
}

export default async function Page({ params: paramsPromise }: Args) {
  const { pageNumber, locale: localeParam } = await paramsPromise
  const locale = (isLocale(localeParam) ? localeParam : defaultLocale) as Locale
  const t = await getTranslate(locale)
  const sanitizedPageNumber = Number(pageNumber)

  if (!Number.isInteger(sanitizedPageNumber)) notFound()

  const posts = await sdk.find({
    collection: 'posts',
    depth: 1,
    limit: 12,
    page: sanitizedPageNumber,
    locale,
  })

  return (
    <div className="pt-24 pb-24">
      <div className="container mb-12">
        <h1 className="text-4xl font-semibold md:text-5xl">{t('prodeprod:posts:title')}</h1>
      </div>

      <div className="container mb-8">
        <PageRange
          currentPage={posts.page}
          limit={12}
          locale={locale}
          totalDocs={posts.totalDocs}
        />
      </div>

      <CollectionArchive locale={locale} posts={posts.docs} />

      <div className="container">
        {posts?.page && posts?.totalPages > 1 && (
          <Pagination
            labels={{
              previous: t('prodeprod:pagination:previous'),
              next: t('prodeprod:pagination:next'),
            }}
            locale={locale}
            page={posts.page}
            totalPages={posts.totalPages}
          />
        )}
      </div>
    </div>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { pageNumber, locale: localeParam } = await paramsPromise
  const locale = (isLocale(localeParam) ? localeParam : defaultLocale) as Locale
  const t = await getTranslate(locale)

  return {
    title: titleSuffix(`${t('prodeprod:posts:title')} — ${pageNumber || ''}`),
  }
}

