import type { Metadata } from 'next/types'

import { CollectionArchive } from '@/components/CollectionArchive'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import { sdk } from '@/utilities/getPayloadSDK'
import React from 'react'

import { defaultLocale, isLocale, locales, type Locale } from '@/i18n/config'
import { getTranslate } from '@/i18n/getI18n'
import { titleSuffix } from '@/utilities/siteConfig'

export const revalidate = 600

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

type Args = {
  params: Promise<{ locale: string }>
}

export default async function Page({ params }: Args) {
  const { locale: localeParam } = await params
  const locale = (isLocale(localeParam) ? localeParam : defaultLocale) as Locale
  const t = await getTranslate(locale)

  const posts = await sdk.find({
    collection: 'posts',
    depth: 1,
    limit: 12,
    locale,
    select: {
      title: true,
      slug: true,
      categories: true,
      meta: true,
    },
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
        {posts.totalPages > 1 && posts.page && (
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

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { locale: localeParam } = await params
  const locale = (isLocale(localeParam) ? localeParam : defaultLocale) as Locale

  return {
    title: titleSuffix((await getTranslate(locale))('prodeprod:posts:title')),
  }
}
