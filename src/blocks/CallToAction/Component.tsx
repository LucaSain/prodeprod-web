import React from 'react'

import type { CallToActionBlock as CTABlockProps } from '@/payload-types'
import type { Locale } from '@/i18n/config'

import { defaultLocale } from '@/i18n/config'

import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'

export const CallToActionBlock: React.FC<CTABlockProps & { locale?: Locale }> = ({
  links,
  richText,
  locale = defaultLocale,
}) => {
  return (
    <div className="container">
      <div
        className="flex flex-col gap-8 rounded-xl bg-steel p-8 text-steel-foreground md:flex-row md:items-center md:justify-between md:p-12"
        data-surface="steel"
      >
        <div className="max-w-[44ch]">
          {richText && (
            <RichText
              className="mb-0 [&_h2]:text-3xl [&_h2]:font-semibold md:[&_h2]:text-4xl [&_p]:mt-3 [&_p]:text-steel-muted"
              data={richText}
              enableGutter={false}
              locale={locale}
            />
          )}
        </div>
        <div className="flex shrink-0 flex-wrap gap-3">
          {(links || []).map(({ link }, i) => {
            return <CMSLink key={i} locale={locale} size="lg" {...link} />
          })}
        </div>
      </div>
    </div>
  )
}
