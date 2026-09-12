import { cn } from '@/utilities/ui'
import React from 'react'

import type { Locale } from '@/i18n/config'

import { Card, CardPostData } from '@/components/Card'
import { defaultLocale } from '@/i18n/config'
import { getTranslate } from '@/i18n/getI18n'

export type Props = {
  posts: CardPostData[]
  locale?: Locale
}

export const CollectionArchive = async (props: Props) => {
  const { posts, locale = defaultLocale } = props
  const t = await getTranslate(locale)
  const noImageLabel = t('prodeprod:common:noImage')

  return (
    <div className={cn('container')}>
      <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-y-16">
        {posts?.map((result, index) => {
          if (typeof result === 'object' && result !== null) {
            return (
              <Card
                className="h-full"
                doc={result}
                key={index}
                locale={locale}
                noImageLabel={noImageLabel}
                relationTo="posts"
                showCategories
              />
            )
          }

          return null
        })}
      </div>
    </div>
  )
}
