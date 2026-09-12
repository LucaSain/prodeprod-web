import React from 'react'

import type { MapBlock as MapBlockProps } from '@/payload-types'
import type { Locale } from '@/i18n/config'

import { getDictionary } from '@/i18n/dictionaries'
import { cn } from '@/utilities/ui'

import { MapCanvas } from './MapCanvas'

const HEIGHTS: Record<string, string> = {
  small: 'h-[20rem]',
  medium: 'h-[27.5rem]',
  large: 'h-[37.5rem]',
}

type Props = MapBlockProps & {
  locale?: Locale
}

/** One labelled line in the contact panel. */
const DetailRow: React.FC<{
  label: string
  children: React.ReactNode
}> = ({ label, children }) => (
  <div>
    <dt className="mb-1 text-sm text-muted-foreground">{label}</dt>
    <dd className="leading-relaxed text-foreground">{children}</dd>
  </div>
)

export const MapBlockComponent: React.FC<Props> = ({
  heading,
  latitude,
  longitude,
  zoom,
  height,
  markerLabel,
  address,
  phone,
  email,
  hours,
  showDirections,
  locale = 'en',
}) => {
  const t = getDictionary(locale)

  // Coordinates are required by the block config, but a draft saved before the
  // field existed can still reach here with nothing set.
  if (typeof latitude !== 'number' || typeof longitude !== 'number') return null

  const directionsHref = `https://www.openstreetmap.org/directions?to=${latitude}%2C${longitude}`
  const hasPanel = Boolean(address || phone || email || hours || (showDirections ?? true))

  return (
    <section className="container">
      {heading ? (
        <h2 className="mb-8 text-3xl font-semibold md:text-4xl">{heading}</h2>
      ) : null}

      <div
        className={cn(
          'grid overflow-hidden rounded-xl',
          hasPanel && 'md:grid-cols-[minmax(0,1fr)_minmax(0,1.7fr)]',
        )}
      >
        {hasPanel ? (
          <div className="flex flex-col justify-between gap-8 bg-card p-6 md:p-8">
            <dl className="flex flex-col gap-6">
              {address ? (
                <DetailRow label={t.contact.address}>
                  <address className="whitespace-pre-line not-italic">{address}</address>
                </DetailRow>
              ) : null}

              {phone ? (
                <DetailRow label={t.contact.phone}>
                  <a className="hover:text-primary" href={`tel:${phone.replace(/\s+/g, '')}`}>
                    {phone}
                  </a>
                </DetailRow>
              ) : null}

              {email ? (
                <DetailRow label={t.contact.email}>
                  <a className="break-all hover:text-primary" href={`mailto:${email}`}>
                    {email}
                  </a>
                </DetailRow>
              ) : null}

              {hours ? (
                <DetailRow label={t.contact.hours}>
                  <span className="whitespace-pre-line">{hours}</span>
                </DetailRow>
              ) : null}
            </dl>

            {(showDirections ?? true) && (
              <a
                className="w-fit font-medium text-primary underline underline-offset-4 transition-colors hover:text-primary-hover"
                href={directionsHref}
                rel="noopener noreferrer"
                target="_blank"
              >
                {t.map.directions}
              </a>
            )}
          </div>
        ) : null}

        {/*
          `map-canvas` carries the greyscale filter and the marker colours —
          see globals.css. Keeping the filter in CSS means it applies to tiles
          that stream in after mount, and lets the marker read the theme's
          custom properties.
        */}
        <div className={cn('map-canvas relative w-full', HEIGHTS[height ?? 'medium'])}>
          <MapCanvas
            ariaLabel={heading || t.map.title}
            latitude={latitude}
            longitude={longitude}
            markerLabel={markerLabel}
            zoom={zoom ?? 14}
          />
        </div>
      </div>
    </section>
  )
}

export default MapBlockComponent
