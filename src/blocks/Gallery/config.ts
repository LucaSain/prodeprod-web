import type { Block } from 'payload'

/**
 * Gallery block.
 *
 * A product carries four to nine photographs. Stacking that many MediaBlocks
 * gives a column of full-width images and an unusable page, so the gallery
 * lays them out as a grid with the first image given more weight.
 *
 * Nothing is marked `localized`: the block lives inside `layout`, which is
 * localized as a whole, and Payload forbids nesting one inside the other.
 */
export const GalleryBlock: Block = {
  slug: 'gallery',
  interfaceName: 'GalleryBlock',
  labels: { singular: 'Gallery', plural: 'Galleries' },
  fields: [
    {
      name: 'heading',
      type: 'text',
      admin: { description: 'Optional heading shown above the images.' },
    },
    {
      name: 'images',
      type: 'array',
      minRows: 1,
      labels: { singular: 'Image', plural: 'Images' },
      admin: { initCollapsed: true },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
    {
      name: 'featureFirst',
      type: 'checkbox',
      defaultValue: true,
      label: 'Show the first image larger',
    },
  ],
}
