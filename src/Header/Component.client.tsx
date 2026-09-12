'use client'

import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'

import type { Header } from '@/payload-types'
import type { Locale } from '@/i18n/config'

import { Logo } from '@/components/Logo/Logo'
import { getDictionary } from '@/i18n/dictionaries'
import { localizePath } from '@/i18n/config'
import { cn } from '@/utilities/ui'
import { SITE_NAME } from '@/utilities/siteConfig'
import { HeaderNav } from './Nav'
import { LocaleSwitcher } from './LocaleSwitcher'

interface HeaderClientProps {
  data: Header
  locale: Locale
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data, locale }) => {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const t = getDictionary(locale)

  // Close the mobile drawer on navigation — the route changes underneath an
  // open overlay otherwise.
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  return (
    <header
      className="sticky top-0 z-30 border-b border-steel-border/60 bg-steel text-steel-foreground"
      data-surface="steel"
    >
      <div className="container flex items-center justify-between gap-6 py-4">
        <Link aria-label={`${SITE_NAME} — home`} href={localizePath('/', locale)}>
          <Logo className="text-steel-foreground" loading="eager" priority="high" />
        </Link>

        <div className="hidden items-center gap-8 lg:flex">
          <HeaderNav data={data} locale={locale} />
          <LocaleSwitcher locale={locale} />
        </div>

        <button
          aria-controls="mobile-nav"
          aria-expanded={open}
          aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
          className="inline-flex items-center justify-center p-2 text-steel-foreground lg:hidden"
          onClick={() => setOpen((v) => !v)}
          type="button"
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      <div
        className={cn(
          'border-t border-steel-border/60 lg:hidden',
          open ? 'block' : 'hidden',
        )}
        id="mobile-nav"
      >
        <div className="container flex flex-col gap-1 py-4">
          <HeaderNav data={data} locale={locale} stacked />
          <div className="mt-4 border-t border-steel-border/60 pt-4">
            <LocaleSwitcher locale={locale} />
          </div>
        </div>
      </div>
    </header>
  )
}
