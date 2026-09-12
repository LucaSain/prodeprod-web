import Link from 'next/link'
import React from 'react'

import type { Locale } from '@/i18n/config'

import { getCachedGlobal } from '@/utilities/getGlobals'
import { CMSLink } from '@/components/Link'
import { Logo } from '@/components/Logo/Logo'
import { localizePath } from '@/i18n/config'
import { SITE_NAME } from '@/utilities/siteConfig'
import { getTranslate } from '@/i18n/getI18n'

export async function Footer({ locale }: { locale: Locale }) {
  const footerData = await getCachedGlobal('footer', 1, locale)()

  const navItems = footerData?.navItems || []
  const contact = footerData?.contact
  const t = await getTranslate(locale)
  const year = new Date().getFullYear()

  return (
    <footer className="mt-auto bg-steel text-steel-foreground" data-surface="steel">
      <div className="container grid gap-12 py-16 md:grid-cols-[1.6fr_1fr_1.2fr] md:py-20">
        <div>
          <Link
            aria-label={`${SITE_NAME} — home`}
            className="inline-block"
            href={localizePath('/', locale)}
          >
            <Logo className="text-steel-foreground" />
          </Link>
          {footerData?.tagline ? (
            <p className="mt-5 max-w-[34ch] leading-relaxed text-steel-muted">
              {footerData.tagline}
            </p>
          ) : null}
        </div>

        {navItems.length > 0 ? (
          <nav className="flex flex-col gap-3.5">
            {navItems.map(({ link }, i) => (
              <CMSLink
                className="text-steel-muted no-underline transition-colors hover:text-steel-foreground"
                key={i}
                locale={locale}
                {...link}
              />
            ))}
          </nav>
        ) : null}

        {contact?.address || contact?.phone || contact?.email ? (
          <div className="flex flex-col gap-4">
            {contact.address ? (
              <address className="whitespace-pre-line not-italic leading-relaxed text-steel-muted">
                {contact.address}
              </address>
            ) : null}

            <div className="flex flex-col gap-2">
              {contact.phone ? (
                <a
                  className="text-steel-foreground transition-colors hover:text-primary-bright"
                  href={`tel:${contact.phone.replace(/\s+/g, '')}`}
                >
                  {contact.phone}
                </a>
              ) : null}

              {contact.email ? (
                <a
                  className="break-all text-steel-foreground transition-colors hover:text-primary-bright"
                  href={`mailto:${contact.email}`}
                >
                  {contact.email}
                </a>
              ) : null}
            </div>
          </div>
        ) : null}
      </div>

      <div className="border-t border-steel-border/60">
        <div className="container py-6">
          <p className="text-sm text-steel-muted">
            © {year} {SITE_NAME}
          </p>
        </div>
      </div>
    </footer>
  )
}
