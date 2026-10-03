import React from 'react'

import type { GalleryBlock as GalleryBlockProps } from '@/payload-types'

import { Media } from '@/components/Media'
import { cn } from '@/utilities/ui'

export const GalleryBlockComponent: React.FC<GalleryBlockProps> = ({
  heading,
  images,
  featureFirst,
}) => {
  const items = (images ?? []).filter((i) => i?.image && typeof i.image === 'object')

  if (items.length === 0) return null

  // Featuring the first image spans two columns and two rows. With fewer than
  // five photographs that leaves a visible hole in the grid, so the feature
  // only applies once there are enough images to fill around it.
  const lead = (featureFirst ?? true) && items.length >= 5

  return (
    <section className="container">
      {heading ? <h2 className="mb-8 text-3xl font-semibold md:text-4xl">{heading}</h2> : null}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map(({ image, id }, i) => (
          <figure
            className={cn(
              'relative overflow-hidden rounded-lg bg-muted',
              // The first photograph is the product shot; the rest are detail.
              lead && i === 0 ? 'aspect-[4/3] sm:col-span-2 lg:row-span-2' : 'aspect-[4/3]',
            )}
            key={id ?? i}
          >
            <Media
              fill
              imgClassName="object-cover"
              resource={image}
              size={lead && i === 0 ? '66vw' : '33vw'}
            />
          </figure>
        ))}
      </div>
    </section>
  )
}

export default GalleryBlockComponent
