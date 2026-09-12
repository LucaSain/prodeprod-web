import Link from 'next/link'
import React from 'react'

import { Button } from '@/components/ui/button'
import { getTranslate } from '@/i18n/getI18n'
import { defaultLocale } from '@/i18n/config'

/**
 * `not-found.tsx` cannot read route params, so this renders in the default
 * locale. A Russian visitor hitting a dead URL sees an English 404 — the
 * alternative is a client component that parses the pathname, which would
 * make every 404 non-static for no real gain.
 */
export default async function NotFound() {
  const t = await getTranslate(defaultLocale)

  return (
    <div className="container py-28">
      <p className="mb-3 text-sm text-muted-foreground">{t('prodeprod:notFound:code')}</p>
      <h1 className="max-w-[18ch] text-4xl font-semibold md:text-5xl">{t('prodeprod:notFound:description')}</h1>
      <Button asChild className="mt-4" variant="default">
        <Link href="/">{t('prodeprod:common:goHome')}</Link>
      </Button>
    </div>
  )
}
