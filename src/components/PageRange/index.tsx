import React from 'react'

import type { Locale } from '@/i18n/config'

import { defaultLocale } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'

export const PageRange: React.FC<{
  className?: string
  currentPage?: number
  limit?: number
  locale?: Locale
  totalDocs?: number
}> = (props) => {
  const { className, currentPage, limit, locale = defaultLocale, totalDocs } = props
  const t = getDictionary(locale)

  let indexStart = (currentPage ? currentPage - 1 : 1) * (limit || 1) + 1
  if (totalDocs && indexStart > totalDocs) indexStart = 0

  let indexEnd = (currentPage || 1) * (limit || 1)
  if (totalDocs && indexEnd > totalDocs) indexEnd = totalDocs

  const isEmpty = typeof totalDocs === 'undefined' || totalDocs === 0
  const label = totalDocs && totalDocs > 1 ? t.posts.plural : t.posts.singular

  return (
    <div className={[className, 'text-sm text-muted-foreground'].filter(Boolean).join(' ')}>
      {isEmpty
        ? t.posts.noResults
        : t.posts.showing({
            start: indexStart,
            end: indexEnd,
            total: totalDocs as number,
            label,
          })}
    </div>
  )
}
