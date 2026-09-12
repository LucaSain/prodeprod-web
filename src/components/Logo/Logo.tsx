import clsx from 'clsx'
import React from 'react'

import { SITE_NAME } from '@/utilities/siteConfig'

interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
}

/**
 * Wordmark placeholder.
 *
 * TODO: replace with the supplied logo. Drop the asset in `public/` and swap
 * the markup for an <Image>; keep the `className` pass-through so the header
 * and footer go on controlling size and colour.
 *
 * Set in type rather than an image so it inherits `currentColor` — one
 * component works on the steel surfaces and on the page ground, with no
 * second file and no `invert` filter.
 */
export const Logo = ({ className }: Props) => {
  return (
    <span
      aria-label={SITE_NAME}
      className={clsx(
        'inline-block text-[1.375rem] font-semibold leading-none tracking-[-0.03em]',
        className,
      )}
      role="img"
    >
      Prode<span className="text-primary-bright">prod</span>
    </span>
  )
}
