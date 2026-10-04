/**
 * Imports the product catalogue into a running Payload instance over its REST
 * API.
 *
 * Why REST rather than the Local API: Media has no cloud storage adapter, so
 * uploaded files are written to the local disk of whichever process handles
 * them. Running the Local API from a laptop against the production database
 * would create media rows pointing at files that exist only on that laptop.
 * Going through the server's own API puts the files where the server expects.
 *
 * Nothing is ever deleted. Pages are matched by slug and updated in place;
 * images already present are reused rather than uploaded twice, so the script
 * is safe to run more than once.
 *
 *   PAYLOAD_URL=https://cms.example.com \
 *   PAYLOAD_EMAIL=you@example.com \
 *   PAYLOAD_PASSWORD=... \
 *   npm run import:products -- --dry-run
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { convertMarkdownToLexical, editorConfigFactory } from '@payloadcms/richtext-lexical'

import configPromise from '../src/payload.config'
import { locales, type Locale } from '../src/i18n/config'
import { products } from '../src/endpoints/seed/products/data'
import { productsIndex } from '../src/endpoints/seed/products/indexPage'

const dirname = path.dirname(fileURLToPath(import.meta.url))
const IMAGE_DIR = path.resolve(dirname, '../src/endpoints/seed/products/images')

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
      ...(init.body instanceof FormData ? {} : { 'Content-Type': 'application/json' }),
      ...(init.headers || {}),
    },
  })
  const text = await res.text()
  if (!res.ok) throw new Error(`${init.method || 'GET'} ${pathname} -> ${res.status}: ${text.slice(0, 300)}`)
  return text ? JSON.parse(text) : null
}

const login = async () => {
  const out = await api('/users/login', {
    method: 'POST',
    body: JSON.stringify({ email: EMAIL, password: PASSWORD }),
  })
  token = out.token
  console.log(`  signed in as ${out.user?.email}`)
}

/** Uploads one photograph, or reuses it when the filename is already there. */
const upsertMedia = async (file: string, alt: string): Promise<number> => {
  const found = await api(`/media?where[filename][equals]=${encodeURIComponent(file)}&limit=1&depth=0`)
  if (found?.docs?.length) return found.docs[0].id

  const buf = fs.readFileSync(path.join(IMAGE_DIR, file))
  const form = new FormData()
  form.set('file', new Blob([buf], { type: 'image/jpeg' }), file)
  form.set('_payload', JSON.stringify({ alt }))

  const created = await api('/media', { method: 'POST', body: form })
  return created.doc.id
}

const upsertPage = async (slug: string, perLocale: Record<Locale, Record<string, unknown>>) => {
  const found = await api(`/pages?where[slug][equals]=${encodeURIComponent(slug)}&limit=1&depth=0&locale=en`)
  const existing = found?.docs?.[0]

  const base = { ...perLocale.en, slug, _status: 'published' }

  const doc = existing
    ? (await api(`/pages/${existing.id}?locale=en`, { method: 'PATCH', body: JSON.stringify(base) })).doc
    : (await api('/pages?locale=en', { method: 'POST', body: JSON.stringify(base) })).doc

  for (const locale of locales.filter((l) => l !== 'en')) {
    await api(`/pages/${doc.id}?locale=${locale}`, {
      method: 'PATCH',
      body: JSON.stringify(perLocale[locale]),
    })
  }

  return doc
}

const run = async () => {
  console.log(`Target: ${URL_BASE}${DRY ? '  (dry run — nothing will be written)' : ''}`)

  const config = await configPromise
  const editorConfig = await editorConfigFactory.fromFeatures({
    config,
    features: ({ defaultFeatures }) => defaultFeatures,
  })
  const md = (markdown: string) => convertMarkdownToLexical({ editorConfig, markdown })

  const manifest: Record<string, string[]> = JSON.parse(
    fs.readFileSync(path.join(IMAGE_DIR, 'manifest.json'), 'utf-8'),
  )

  if (DRY) {
    let photos = 0
    for (const p of products) photos += (manifest[p.sourceId] ?? []).length
    console.log(`  would import ${products.length} products + 1 index page`)
    console.log(`  would upload up to ${photos} photographs (existing filenames are reused)`)
    console.log('  would not delete anything')
    return
  }

  await login()

  const contact = await api('/pages?where[slug][equals]=contact&limit=1&depth=0')
  const contactId = contact?.docs?.[0]?.id

  const seeded: { slug: string; title: Record<Locale, string>; price: string }[] = []

  for (const product of products) {
    const files = manifest[product.sourceId] ?? []
    const mediaIds: number[] = []

    for (const [i, file] of files.entries()) {
      mediaIds.push(await upsertMedia(file, `${product.content.en.title} — ${i + 1}`))
    }

    const forLocale = (locale: Locale) => {
      const c = product.content[locale]
      return {
        title: c.title,
        hero: {
          type: 'mediumImpact',
          richText: md(`# ${c.title}\n\n${c.summary}\n\n**${PRICE[locale]}: ${product.price}**`),
          links: [],
          ...(mediaIds[0] ? { media: mediaIds[0] } : {}),
        },
        layout: [
          { blockType: 'content', columns: [{ size: 'twoThirds', richText: md(c.body), enableLink: false }] },
          ...(mediaIds.length
            ? [{ blockType: 'gallery', heading: PHOTOS[locale], featureFirst: true, images: mediaIds.map((id) => ({ image: id })) }]
            : []),
          {
            blockType: 'cta',
            richText: md(`## ${CTA[locale].heading}\n\n${CTA[locale].body}`),
            links: contactId
              ? [{ link: { type: 'reference', appearance: 'default', label: CTA[locale].action, reference: { relationTo: 'pages', value: contactId } } }]
              : [],
          },
        ],
        meta: {
          title: c.title,
          description: c.summary,
          ...(mediaIds[0] ? { image: mediaIds[0] } : {}),
        },
      }
    }

    const perLocale = {} as Record<Locale, Record<string, unknown>>
    for (const l of locales) perLocale[l] = forLocale(l)

    await upsertPage(product.slug, perLocale)
    console.log(`  ${product.slug} (${mediaIds.length} photos)`)

    seeded.push({
      slug: product.slug,
      title: Object.fromEntries(
        locales.map((l) => [l, product.content[l].title]),
      ) as unknown as Record<Locale, string>,
      price: product.price,
    })
  }

  const indexFor = (locale: Locale) => ({
    title: productsIndex[locale].title,
    hero: { type: 'lowImpact', richText: md(`# ${productsIndex[locale].title}`), links: [] },
    layout: [
      {
        blockType: 'content',
        columns: [
          {
            size: 'twoThirds',
            richText: md(
              `${productsIndex[locale].intro}\n\n` +
                seeded.map((p) => `- [${p.title[locale]}](/${p.slug}) — ${p.price}`).join('\n'),
            ),
            enableLink: false,
          },
        ],
      },
    ],
    meta: { title: productsIndex[locale].title, description: productsIndex[locale].summary },
  })

  const indexPerLocale = {} as Record<Locale, Record<string, unknown>>
  for (const l of locales) indexPerLocale[l] = indexFor(l)

  await upsertPage('equipment', indexPerLocale)
  console.log('  equipment (index page)')
  console.log('Done. Nothing was deleted.')
}

const PHOTOS: Record<Locale, string> = { en: 'Photographs', ro: 'Fotografii', ru: 'Фотографии' }
const PRICE: Record<Locale, string> = { en: 'Price', ro: 'Preț', ru: 'Цена' }
const CTA: Record<Locale, { heading: string; body: string; action: string }> = {
  en: { heading: 'Send us your material', body: 'Send a sample and we press it before you buy, so the throughput figure is yours rather than a brochure average.', action: 'Request a quote' },
  ro: { heading: 'Trimiteți-ne materia primă', body: 'Trimiteți o mostră și o presăm înainte să cumpărați, astfel încât productivitatea să fie a dumneavoastră, nu o medie din broșură.', action: 'Cereți o ofertă' },
  ru: { heading: 'Пришлите нам своё сырьё', body: 'Пришлите образец — мы спрессуем его до покупки, чтобы производительность была вашей, а не средней по брошюре.', action: 'Запросить цену' },
}

await run()
