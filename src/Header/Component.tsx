import React from 'react'

import type { Locale } from '@/i18n/config'

import { HeaderClient } from './Component.client'
import { getCachedGlobal } from '@/utilities/getGlobals'

export async function Header({ locale }: { locale: Locale }) {
  const headerData = await getCachedGlobal('header', 1, locale)()

  return <HeaderClient data={headerData} locale={locale} />
}
