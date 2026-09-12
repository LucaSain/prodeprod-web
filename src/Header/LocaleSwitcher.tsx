'use client'

import Link from 'next/link'
import React from 'react'
import { usePathname } from 'next/navigation'

import type { Locale } from '@/i18n/config'

import { delocalizePath, localeShortLabels, localizePath, locales } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'
import { cn } from '@/utilities/ui'

/**
 * Language switcher.
 *
 * Real links rather than a select, so each translation is crawlable and can be
 * opened in a new tab. `usePathname` reports the visible URL — the default
 * locale is unprefixed because the proxy rewrites it — so the path is stripped
 * of any prefix before being re-localized.
 */
export const LocaleSwitcher: React.FC<{ locale: Locale }> = ({ locale }) => {
  const pathname = usePathname()
  const t = getDictionary(locale)
  const { pathname: bare } = delocalizePath(pathname || '/')

  return (
    <div
      aria-label={t.nav.languageSwitcher}
      className="flex items-center gap-1 rounded-md bg-white/8 p-0.5"
      role="group"
    >
      {locales.map((code) => {
        const isActive = code === locale

        return (
          <Link
            aria-current={isActive ? 'true' : undefined}
            className={cn(
              'rounded px-2.5 py-1 text-sm font-medium transition-colors',
              isActive
                ? 'bg-steel-foreground text-steel'
                : 'text-steel-muted hover:text-steel-foreground',
            )}
            href={localizePath(bare, code)}
            hrefLang={code}
            key={code}
          >
            {localeShortLabels[code]}
          </Link>
        )
      })}
    </div>
  )
}
