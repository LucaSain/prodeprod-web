import { formatDateTime } from 'src/utilities/formatDateTime'
import React from 'react'

import type { Post } from '@/payload-types'
import type { Locale } from '@/i18n/config'

import { Media } from '@/components/Media'
import { formatAuthors } from '@/utilities/formatAuthors'
import { defaultLocale, localeHtmlLang } from '@/i18n/config'
import { getTranslate } from '@/i18n/getI18n'

export const PostHero = async ({
  post,
  locale = defaultLocale,
}: {
  post: Post
  locale?: Locale
}) => {
  const { categories, heroImage, populatedAuthors, publishedAt, title } = post
  const t = await getTranslate(locale)

  const hasAuthors =
    populatedAuthors && populatedAuthors.length > 0 && formatAuthors(populatedAuthors) !== ''

  return (
    <section
      className="relative isolate flex min-h-[26rem] items-end overflow-hidden bg-steel text-steel-foreground md:min-h-[34rem]"
      data-surface="steel"
    >
      {heroImage && typeof heroImage !== 'string' && (
        <Media fill imgClassName="absolute inset-0 object-cover" priority resource={heroImage} />
      )}

      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-steel via-steel/80 to-steel/25" />

      {/* Dissolve into the page ground, matching the main hero. */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-background to-transparent md:h-28"
      />

      <div className="container relative z-10 pb-28 pt-32 md:pb-40">
        <div className="max-w-[46rem]">
          {categories && categories.length > 0 && (
            <div className="mb-4 text-sm text-primary-bright">
              {categories.map((category, index) => {
                if (typeof category === 'object' && category !== null) {
                  const { title: categoryTitle } = category

                  const titleToUse = categoryTitle || 'Untitled category'

                  const isLast = index === categories.length - 1

                  return (
                    <React.Fragment key={index}>
                      {titleToUse}
                      {!isLast && <React.Fragment>, &nbsp;</React.Fragment>}
                    </React.Fragment>
                  )
                }
                return null
              })}
            </div>
          )}

          <h1 className="text-4xl font-semibold md:text-6xl">{title}</h1>

          <div className="mt-8 flex flex-col gap-5 text-[0.9375rem] sm:flex-row sm:gap-12">
            {hasAuthors && (
              <div>
                <div className="text-steel-muted">{t('prodeprod:posts:author')}</div>
                <div className="mt-1">{formatAuthors(populatedAuthors)}</div>
              </div>
            )}
            {publishedAt && (
              <div>
                <div className="text-steel-muted">{t('prodeprod:posts:datePublished')}</div>
                <time className="mt-1 block" dateTime={publishedAt}>
                  {formatDateTime(publishedAt, localeHtmlLang[locale])}
                </time>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
