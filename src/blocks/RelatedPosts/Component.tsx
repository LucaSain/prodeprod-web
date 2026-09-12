import clsx from 'clsx'
import React from 'react'
import RichText from '@/components/RichText'

import type { Post } from '@/payload-types'
import type { Locale } from '@/i18n/config'

import { defaultLocale } from '@/i18n/config'
import { getTranslate } from '@/i18n/getI18n'

import { Card } from '../../components/Card'
import { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'

export type RelatedPostsProps = {
  className?: string
  docs?: Post[]
  introContent?: DefaultTypedEditorState
  locale?: Locale
}

export const RelatedPosts = async (props: RelatedPostsProps) => {
  const { className, docs, introContent, locale = defaultLocale } = props
  const t = await getTranslate(locale)

  return (
    <div className={clsx('lg:container', className)}>
      {introContent && <RichText data={introContent} enableGutter={false} locale={locale} />}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 items-stretch">
        {docs?.map((doc, index) => {
          if (typeof doc === 'string') return null

          return <Card
              doc={doc}
              key={index}
              locale={locale}
              noImageLabel={t('prodeprod:common:noImage')}
              relationTo="posts"
              showCategories
            />
        })}
      </div>
    </div>
  )
}
