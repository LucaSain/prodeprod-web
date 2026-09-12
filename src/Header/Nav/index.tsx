'use client'

import React from 'react'

import type { Header as HeaderType } from '@/payload-types'
import type { Locale } from '@/i18n/config'

import { CMSLink } from '@/components/Link'
import { cn } from '@/utilities/ui'

export const HeaderNav: React.FC<{
  data: HeaderType
  locale: Locale
  stacked?: boolean
}> = ({ data, locale, stacked }) => {
  const navItems = data?.navItems || []

  return (
    <nav className={cn('flex gap-7', stacked ? 'flex-col gap-1' : 'items-center')}>
      {navItems.map(({ link }, i) => (
        <CMSLink
          appearance="link"
          className={cn(
            'text-[0.9375rem] font-normal text-steel-muted no-underline transition-colors hover:text-steel-foreground',
            stacked && 'py-2.5 text-base',
          )}
          key={i}
          locale={locale}
          {...link}
        />
      ))}
    </nav>
  )
}
