import React from 'react'

import type { Locale } from '@/i18n/config'

import { HeaderClient } from './Component.client'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { getTranslate } from '@/i18n/getI18n'

export async function Header({ locale }: { locale: Locale }) {
  const headerData = await getCachedGlobal('header', 1, locale)()
  const t = await getTranslate(locale)

  /*
   * Payload's `t` is async and server-only, so the strings the client header
   * needs are resolved here and handed down. Keeping them in one object means
   * a new string is a single prop change rather than a new prop per label.
   */
  const labels = {
    openMenu: t('prodeprod:nav:openMenu'),
    closeMenu: t('prodeprod:nav:closeMenu'),
    languageSwitcher: t('prodeprod:nav:languageSwitcher'),
    home: t('prodeprod:nav:home'),
  }

  return <HeaderClient data={headerData} labels={labels} locale={locale} />
}

export type HeaderLabels = {
  openMenu: string
  closeMenu: string
  languageSwitcher: string
  home: string
}
