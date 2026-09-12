import { cn } from '@/utilities/ui'
import React from 'react'

import type { Locale } from '@/i18n/config'

import { Card, CardPostData } from '@/components/Card'
import { defaultLocale } from '@/i18n/config'

export type Props = {
  posts: CardPostData[]
  locale?: Locale
}

export const CollectionArchive: React.FC<Props> = (props) => {
  const { posts, locale = defaultLocale } = props

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
