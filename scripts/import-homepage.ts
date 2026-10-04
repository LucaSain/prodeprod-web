/**
 * Builds the home page and fills the header and footer, over the REST API.
 *
 * Same reasoning as import-products.ts: Media has no storage adapter, so
 * uploads must go through the server's own API rather than the Local API.
 *
 * Images are reused from what the product import already uploaded; nothing is
 * uploaded again and nothing is deleted.
 *
 *   PAYLOAD_URL=https://cms.example.com \
 *   PAYLOAD_EMAIL=you@example.com \
 *   PAYLOAD_PASSWORD=... \
 *   npm run import:homepage -- --dry-run
 */
import { convertMarkdownToLexical, editorConfigFactory } from '@payloadcms/richtext-lexical'

import configPromise from '../src/payload.config'
import { locales, type Locale } from '../src/i18n/config'
import {
  chrome,
  contactDetails,
  galleryImages,
  heroImage,
  home,
} from '../src/endpoints/seed/homepage/data'

const URL_BASE = (process.env.PAYLOAD_URL || '').replace(/\/$/, '')
const EMAIL = process.env.PAYLOAD_EMAIL
const PASSWORD = process.env.PAYLOAD_PASSWORD
const DRY = process.argv.includes('--dry-run')

if (!URL_BASE) throw new Error('PAYLOAD_URL is required')
if (!DRY && (!EMAIL || !PASSWORD)) throw new Error('PAYLOAD_EMAIL and PAYLOAD_PASSWORD are required')

let token = ''

const api = async (pathname: string, init: RequestInit = {}) => {
  const res = await fetch(`${URL_BASE}/api${pathname}`, {
    ...init,
    headers: {
      ...(token ? { Authorization: `JWT ${token}` } : {}),
      'Content-Type': 'application/json',
      ...(init.headers || {}),
    },
  })
  const text = await res.text()
  if (!res.ok)
    throw new Error(`${init.method || 'GET'} ${pathname} -> ${res.status}: ${text.slice(0, 300)}`)
  return text ? JSON.parse(text) : null
}

const mediaIdByFilename = async (filename: string): Promise<number | undefined> => {
  const found = await api(
    `/media?where[filename][equals]=${encodeURIComponent(filename)}&limit=1&depth=0`,
  )
  return found?.docs?.[0]?.id
}

const run = async () => {
  console.log(`Target: ${URL_BASE}${DRY ? '  (dry run — nothing will be written)' : ''}`)

  const config = await configPromise
  const editorConfig = await editorConfigFactory.fromFeatures({
    config,
    features: ({ defaultFeatures }) => defaultFeatures,
  })
  const md = (markdown: string) => convertMarkdownToLexical({ editorConfig, markdown })

  if (DRY) {
    console.log('  would rewrite the home page in', locales.join(', '))
    console.log('  would fill the header and footer navigation')
    console.log('  would reuse existing photographs; nothing uploaded, nothing deleted')
    return
  }

  const login = await api('/users/login', {
    method: 'POST',
    body: JSON.stringify({ email: EMAIL, password: PASSWORD }),
  })
  token = login.token
  console.log(`  signed in as ${login.user?.email}`)

  const hero = await mediaIdByFilename(heroImage)
  const gallery: number[] = []
  for (const f of galleryImages) {
    const id = await mediaIdByFilename(f)
    if (id) gallery.push(id)
  }
  console.log(`  hero image: ${hero ? 'found' : 'missing'}; gallery: ${gallery.length} photos`)

  const pages = await api('/pages?limit=100&depth=0&locale=en')
  const bySlug = Object.fromEntries(
    (pages?.docs ?? []).map((d: { slug: string; id: number }) => [d.slug, d.id]),
  ) as Record<string, number>

  const equipmentId = bySlug['equipment']
  const contactId = bySlug['contact']

  const forLocale = (locale: Locale) => {
    const c = home[locale]

    return {
      title: c.heroHeading,
      hero: {
        type: 'highImpact',
        richText: md(`# ${c.heroHeading}\n\n${c.heroLead}`),
        /*
         * Custom URLs rather than page references.
         *
         * Saving two reference links in this localized array over REST drops
         * the second one's relationship row — Payload persists only the first,
         * whichever page it points at. Verified by writing [12, 13], [12, 11]
         * and [13, 12]: the second slot always came back without a reference.
         * The globals' navItems do not have this problem.
         *
         * CMSLink runs non-external URLs through localizePath, so /equipment
         * still resolves to /ro/equipment and /ru/equipment.
         */
        links: [
          {
            link: {
              type: 'custom',
              appearance: 'default',
              label: c.ctaEquipment,
              url: '/equipment',
            },
          },
          {
            link: {
              type: 'custom',
              appearance: 'outline',
              label: c.ctaContact,
              url: '/contact',
            },
          },
        ],
        ...(hero ? { media: hero } : {}),
      },
      layout: [
        {
          blockType: 'content',
          columns: c.columns.map((col) => ({
            size: 'oneThird',
            richText: md(`## ${col.heading}\n\n${col.body}`),
            enableLink: false,
          })),
        },
        {
          blockType: 'content',
          columns: [
            {
              size: 'twoThirds',
              richText: md(`## ${c.recordHeading}\n\n${c.recordBody}`),
              enableLink: false,
            },
          ],
        },
        ...(gallery.length
          ? [
              {
                blockType: 'gallery',
                heading: c.galleryHeading,
                featureFirst: true,
                images: gallery.map((id) => ({ image: id })),
              },
            ]
          : []),
        {
          blockType: 'cta',
          richText: md(`## ${c.closingHeading}\n\n${c.closingBody}`),
          links: contactId
            ? [
                {
                  link: {
                    type: 'reference',
                    appearance: 'default',
                    label: c.closingAction,
                    reference: { relationTo: 'pages', value: contactId },
                  },
                },
              ]
            : [],
        },
      ],
      meta: {
        title: c.heroHeading,
        description: c.heroLead,
        ...(hero ? { image: hero } : {}),
      },
    }
  }

  const homeId = bySlug['home']
  if (!homeId) throw new Error('no page with slug "home" to update')

  await api(`/pages/${homeId}?locale=en`, {
    method: 'PATCH',
    body: JSON.stringify({ ...forLocale('en'), slug: 'home', _status: 'published' }),
  })
  for (const locale of locales.filter((l) => l !== 'en')) {
    await api(`/pages/${homeId}?locale=${locale}`, {
      method: 'PATCH',
      body: JSON.stringify(forLocale(locale)),
    })
  }
  console.log('  home page rewritten in', locales.join(', '))

  // Header and footer are empty on the live site, so this fills rather than
  // overwrites anything an editor has set.
  for (const locale of locales) {
    const t = chrome[locale]
    const navItems = [
      ...(equipmentId
        ? [
            {
              link: {
                type: 'reference',
                label: t.equipment,
                reference: { relationTo: 'pages', value: equipmentId },
              },
            },
          ]
        : []),
      ...(contactId
        ? [
            {
              link: {
                type: 'reference',
                label: t.contact,
                reference: { relationTo: 'pages', value: contactId },
              },
            },
          ]
        : []),
    ]

    await api(`/globals/header?locale=${locale}`, {
      method: 'POST',
      body: JSON.stringify({ navItems }),
    })
    await api(`/globals/footer?locale=${locale}`, {
      method: 'POST',
      body: JSON.stringify({
        navItems,
        tagline: t.tagline,
        contact: { address: contactDetails.address, email: contactDetails.email },
      }),
    })
  }
  console.log('  header and footer filled in', locales.join(', '))
  console.log('Done. Nothing was deleted.')
}

await run()
