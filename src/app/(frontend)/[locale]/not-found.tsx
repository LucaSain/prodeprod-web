import Link from 'next/link'
import React from 'react'

import { Button } from '@/components/ui/button'
import { getDictionary } from '@/i18n/dictionaries'
import { defaultLocale } from '@/i18n/config'

/**
 * `not-found.tsx` cannot read route params, so this renders in the default
 * locale. A Russian visitor hitting a dead URL sees an English 404 — the
 * alternative is a client component that parses the pathname, which would
 * make every 404 non-static for no real gain.
 */
export default function NotFound() {
  const t = getDictionary(defaultLocale)

  return (
    <div className="container py-28">
      <p className="mb-3 text-sm text-muted-foreground">{t.notFound.title}</p>
      <h1 className="max-w-[18ch] text-4xl font-semibold md:text-5xl">{t.notFound.description}</h1>
      <Button asChild className="mt-4" variant="default">
        <Link href="/">{t.common.goHome}</Link>
      </Button>
    </div>
  )
}
