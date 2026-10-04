import type { Metadata } from 'next'

import { cn } from '@/utilities/ui'
import { Lexend, Onest } from 'next/font/google'
import { notFound } from 'next/navigation'
import React from 'react'

import { AdminBar } from '@/components/AdminBar'
import { Footer } from '@/Footer/Component'
import { Header } from '@/Header/Component'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { draftMode } from 'next/headers'

import '../globals.css'
import { getServerSideURL } from '@/utilities/getURL'
import { SITE_NAME, defaultKeywords } from '@/utilities/siteConfig'
import { isLocale, localeHtmlLang, locales, type Locale } from '@/i18n/config'
import { getTranslate } from '@/i18n/getI18n'

/*
 * Lexend carries the whole site — display and body, separated by weight
 * rather than by a second family.
 *
 * Lexend ships no Cyrillic, so on its own every Russian glyph would drop to a
 * system font and the two languages would stop looking like one company.
 * Onest fills that gap: browsers resolve missing glyphs per character, so
 * with both in the stack Latin renders Lexend and Cyrillic renders Onest.
 * Onest is geometric with a near-identical x-height, so the join is invisible
 * at reading sizes.
 */
const lexend = Lexend({
  subsets: ['latin', 'latin-ext'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-lexend',
  display: 'swap',
})

const onest = Onest({
  subsets: ['latin', 'cyrillic'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-onest',
  display: 'swap',
})

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

type Args = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export default async function RootLayout({ children, params }: Args) {
  const { locale: localeParam } = await params

  if (!isLocale(localeParam)) notFound()

  const locale = localeParam as Locale
  const t = await getTranslate(locale)
  const { isEnabled } = await draftMode()

  return (
    <html
      className={cn(lexend.variable, onest.variable)}
      lang={localeHtmlLang[locale]}
      suppressHydrationWarning
    >
      <head>
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
      </head>
      <body>
        <a
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
          href="#main"
        >
          {t('prodeprod:nav:skipToContent')}
        </a>

        <AdminBar
          adminBarProps={{
            preview: isEnabled,
          }}
        />

        <Header locale={locale} />
        <main id="main">{children}</main>
        <Footer locale={locale} />
      </body>
    </html>
  )
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { locale: localeParam } = await params
  const locale = (isLocale(localeParam) ? localeParam : 'en') as Locale

  return {
    metadataBase: new URL(getServerSideURL()),
    // No `template` here: page metadata already goes through `titleSuffix`,
    // and a template would append the site name a second time.
    title: SITE_NAME,
    keywords: defaultKeywords[locale],
    openGraph: mergeOpenGraph(undefined, locale),
    twitter: {
      card: 'summary_large_image',
    },
  }
}
