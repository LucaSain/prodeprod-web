'use client'
import { cn } from '@/utilities/ui'
import useClickableCard from '@/utilities/useClickableCard'
import Link from 'next/link'
import React, { Fragment } from 'react'

import type { Post } from '@/payload-types'
import type { Locale } from '@/i18n/config'

import { Media } from '@/components/Media'
import { defaultLocale, localizePath } from '@/i18n/config'

export type CardPostData = Pick<Post, 'slug' | 'categories' | 'meta' | 'title'>

/**
 * An editorial item, not a card: image, then type, on the page ground.
 *
 * A bordered box around every item adds a rectangle per item and no
 * information. Space and type hierarchy separate them instead.
 */
export const Card: React.FC<{
  alignItems?: 'center'
  className?: string
  doc?: CardPostData
  locale?: Locale
  relationTo?: 'posts'
  noImageLabel?: string
  showCategories?: boolean
  title?: string
}> = (props) => {
  const { card, link } = useClickableCard({})
  const {
    className,
    doc,
    locale = defaultLocale,
    noImageLabel,
    relationTo,
    showCategories,
    title: titleFromProps,
  } = props

  const { slug, categories, meta, title } = doc || {}
  const { description, image: metaImage } = meta || {}

  const hasCategories = categories && Array.isArray(categories) && categories.length > 0
  const titleToUse = titleFromProps || title
  const sanitizedDescription = description?.replace(/\s/g, ' ') // replace non-breaking space with white space
  const href = localizePath(`/${relationTo}/${slug}`, locale)

  return (
    <article className={cn('group flex flex-col', className)} ref={card.ref}>
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-muted">
        {!metaImage && noImageLabel && (
          <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
            {noImageLabel}
          </div>
        )}
        {metaImage && typeof metaImage !== 'string' && (
          <Media
            fill
            imgClassName="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            resource={metaImage}
            size="33vw"
          />
        )}
      </div>

      <div className="flex flex-1 flex-col pt-5">
        {showCategories && hasCategories && (
          <div className="mb-2 text-sm text-primary">
            {categories?.map((category, index) => {
              if (typeof category === 'object') {
                const { title: titleFromCategory } = category

                const categoryTitle = titleFromCategory || 'Untitled category'

                const isLast = index === categories.length - 1

                return (
                  <Fragment key={index}>
                    {categoryTitle}
                    {!isLast && <Fragment>, &nbsp;</Fragment>}
                  </Fragment>
                )
              }

              return null
            })}
          </div>
        )}
        {titleToUse && (
          <h3 className="text-xl font-semibold">
            <Link
              className="transition-colors group-hover:text-primary"
              href={href}
              ref={link.ref}
            >
              {titleToUse}
            </Link>
          </h3>
        )}
        {description && (
          <p className="mt-2.5 max-w-[52ch] leading-relaxed text-muted-foreground">
            {sanitizedDescription}
          </p>
        )}
      </div>
    </article>
  )
}
