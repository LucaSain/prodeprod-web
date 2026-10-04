import type { Post, ArchiveBlock as ArchiveBlockProps } from '@/payload-types'

import { sdk } from '@/utilities/getPayloadSDK'
import React from 'react'
import RichText from '@/components/RichText'

import { CollectionArchive } from '@/components/CollectionArchive'
import { defaultLocale, type Locale } from '@/i18n/config'

export const ArchiveBlock: React.FC<
  ArchiveBlockProps & {
    id?: string
    locale?: Locale
  }
> = async (props) => {
  const {
    id,
    categories,
    introContent,
    limit: limitFromProps,
    locale = defaultLocale,
    populateBy,
    selectedDocs,
  } = props

  const limit = limitFromProps || 3

  let posts: Post[] = []

  if (populateBy === 'collection') {
    const flattenedCategories = categories?.map((category) => {
      if (typeof category === 'object') return category.id
      else return category
    })

    const fetchedPosts = await sdk.find({
      collection: 'posts',
      depth: 1,
      limit,
      locale,
      ...(flattenedCategories && flattenedCategories.length > 0
        ? {
            where: {
              categories: {
                in: flattenedCategories,
              },
            },
          }
        : {}),
    })

    posts = fetchedPosts.docs
  } else {
    if (selectedDocs?.length) {
      const filteredSelectedPosts = selectedDocs.map((post) => {
        if (typeof post.value === 'object') return post.value
      }) as Post[]

      posts = filteredSelectedPosts
    }
  }

  return (
    <div className="my-16" id={`block-${id}`}>
      {introContent && (
        <div className="container mb-16">
          <RichText
            className="ms-0 max-w-[48rem]"
            data={introContent}
            enableGutter={false}
            locale={locale}
          />
        </div>
      )}
      <CollectionArchive locale={locale} posts={posts} />
    </div>
  )
}
