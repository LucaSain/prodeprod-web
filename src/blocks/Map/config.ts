import type { Block } from 'payload'

/**
 * Map block.
 *
 * Renders an OpenStreetMap/CARTO basemap in monochrome with a single marker.
 * No API key and no account: tiles come from CARTO's free Positron basemap,
 * which is already near-greyscale, and the renderer desaturates what is left.
 *
 * Nothing here is marked `localized` — the block lives inside the `layout`
 * field, which is localized as a whole, and Payload does not allow a localized
 * field nested inside another localized field.
 */
export const MapBlock: Block = {
  slug: 'mapBlock',
  interfaceName: 'MapBlock',
  labels: {
    singular: 'Map',
    plural: 'Maps',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      admin: {
        description: 'Optional heading shown above the map.',
      },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'latitude',
          type: 'number',
          required: true,
          defaultValue: 45.9432,
          admin: {
            width: '50%',
            description: 'Decimal degrees, e.g. 45.9432',
          },
        },
        {
          name: 'longitude',
          type: 'number',
          required: true,
          defaultValue: 24.9668,
          admin: {
            width: '50%',
            description: 'Decimal degrees, e.g. 24.9668',
          },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'zoom',
          type: 'number',
          defaultValue: 14,
          min: 1,
          max: 19,
          admin: {
            width: '50%',
            description: '1 is the whole world, 19 is street level.',
          },
        },
        {
          name: 'height',
          type: 'select',
          defaultValue: 'medium',
          options: [
            { label: 'Short (320px)', value: 'small' },
            { label: 'Medium (440px)', value: 'medium' },
            { label: 'Tall (600px)', value: 'large' },
          ],
          admin: { width: '50%' },
        },
      ],
    },
    {
      name: 'markerLabel',
      type: 'text',
      admin: {
        description: 'Shown in the popup when the marker is clicked.',
      },
    },
    {
      name: 'address',
      type: 'textarea',
      admin: {
        description: 'Displayed beside the map and used for the directions link.',
      },
    },
    {
      type: 'collapsible',
      label: 'Contact details (optional)',
      admin: { initCollapsed: true },
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'phone', type: 'text', admin: { width: '50%' } },
            { name: 'email', type: 'email', admin: { width: '50%' } },
          ],
        },
        {
          name: 'hours',
          type: 'textarea',
          label: 'Opening hours',
          admin: {
            description: 'One line per entry, e.g. "Mon – Fri: 08:00 – 17:00".',
          },
        },
      ],
    },
    {
      name: 'showDirections',
      type: 'checkbox',
      defaultValue: true,
      label: 'Show a "Get directions" link',
    },
  ],
}
