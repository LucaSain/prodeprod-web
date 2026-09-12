import React from 'react'

import type { Page } from '@/payload-types'
import type { Locale } from '@/i18n/config'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'

/**
 * Full-bleed hero.
 *
 * Two gradients, doing different jobs. A lateral steel scrim keeps the copy
 * legible over whatever photograph an editor picks. A short fade at the
 * bottom dissolves the image into the page ground, so the hero ends without a
 * hard edge — the copy is padded to clear that fade, since it runs light.
 */
export const HighImpactHero: React.FC<Page['hero'] & { locale?: Locale }> = ({
  links,
  media,
  richText,
  locale,
}) => {
  return (
    <section
      className="relative isolate flex min-h-[34rem] items-end overflow-hidden bg-steel text-steel-foreground md:min-h-[44rem]"
      data-surface="steel"
    >
      {media && typeof media === 'object' && (
        <Media fill imgClassName="absolute inset-0 object-cover" priority resource={media} />
      )}

      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-steel via-steel/85 to-steel/25"
      />

      {/* Dissolve into the page ground. */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background to-transparent md:h-36"
      />

      <div className="container relative z-10 pb-32 pt-28 md:pb-48 md:pt-36">
        <div className="max-w-[54rem]">
          {richText && (
            <RichText
              className="[&_h1]:max-w-[15ch] [&_h1]:text-5xl [&_h1]:font-semibold md:[&_h1]:text-7xl lg:[&_h1]:text-[5.5rem] [&_p]:mt-7 [&_p]:max-w-[52ch] [&_p]:text-lg [&_p]:leading-relaxed [&_p]:text-steel-foreground/85 md:[&_p]:text-xl"
              data={richText}
              enableGutter={false}
              locale={locale}
            />
          )}

          {Array.isArray(links) && links.length > 0 && (
            <ul className="mt-10 flex flex-wrap gap-3">
              {links.map(({ link }, i) => (
                <li key={i}>
                  <CMSLink {...link} locale={locale} size="lg" />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  )
}
