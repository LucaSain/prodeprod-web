import type { Form } from '@/payload-types'
import { RequiredDataFromCollectionSlug } from 'payload'

type ContactArgs = {
  contactForm: Form
}

export const contact: (args: ContactArgs) => RequiredDataFromCollectionSlug<'pages'> = ({
  contactForm,
}) => {
  return {
    slug: 'contact',
    _status: 'published',
    hero: {
      type: 'none',
    },
    layout: [
      {
        blockType: 'formBlock',
        enableIntro: true,
        form: contactForm,
        introContent: {
          root: {
            type: 'root',
            children: [
              {
                type: 'heading',
                children: [
                  {
                    type: 'text',
                    detail: 0,
                    format: 0,
                    mode: 'normal',
                    style: '',
                    text: 'Send us an enquiry',
                    version: 1,
                  },
                ],
                direction: 'ltr',
                format: '',
                indent: 0,
                tag: 'h3',
                version: 1,
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            version: 1,
          },
        },
      },
      {
        blockType: 'mapBlock',
        heading: 'Find us',
        latitude: 45.9432,
        longitude: 24.9668,
        zoom: 13,
        height: 'medium',
        markerLabel: 'ProdeProd',
        address: 'Str. Industriei 1\n550001 Sibiu\nRomania',
        phone: '+40 269 000 000',
        email: 'office@prodeprod.ro',
        hours: 'Mon – Fri: 08:00 – 17:00\nSat – Sun: closed',
        showDirections: true,
      },
    ],
    title: 'Contact',
  }
}
