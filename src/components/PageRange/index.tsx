import React from 'react'

import type { Locale } from '@/i18n/config'

import { defaultLocale } from '@/i18n/config'
import { getTranslate } from '@/i18n/getI18n'

export const PageRange = async ({
  className,
  currentPage,
  limit,
  locale = defaultLocale,
  totalDocs,
}: {
  className?: string
  currentPage?: number
  limit?: number
  locale?: Locale
  totalDocs?: number
}) => {
  const t = await getTranslate(locale)

  let indexStart = (currentPage ? currentPage - 1 : 1) * (limit || 1) + 1
  if (totalDocs && indexStart > totalDocs) indexStart = 0

  let indexEnd = (currentPage || 1) * (limit || 1)
  if (totalDocs && indexEnd > totalDocs) indexEnd = totalDocs

  const isEmpty = typeof totalDocs === 'undefined' || totalDocs === 0

  return (
    <div className={[className, 'text-sm text-muted-foreground'].filter(Boolean).join(' ')}>
      {isEmpty
        ? t('prodeprod:posts:noResults')
        : t('prodeprod:posts:showing', {
            start: indexStart,
            end: indexEnd,
            total: totalDocs,
          })}
    </div>
  )
}
