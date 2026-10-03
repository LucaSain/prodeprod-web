import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import type { Payload, PayloadRequest } from 'payload'
import { convertMarkdownToLexical, editorConfigFactory } from '@payloadcms/richtext-lexical'

import { locales, type Locale } from '@/i18n/config'
import { products } from './data'
import { productsIndex } from './indexPage'

const dirname = path.dirname(fileURLToPath(import.meta.url))
const IMAGE_DIR = path.join(dirname, 'images')

type Manifest = Record<string, string[]>

/**
 * Seeds the product catalogue taken from the company's 999.md listings.
 *
 * Photographs ship with the repo rather than being fetched from 999.md at
 * seed time: they are the company's own, and a seed that depends on a live
 * classifieds listing breaks the moment that listing is taken down.
 */
export const seedProducts = async ({
  payload,
  req,
  contactPageId,
}: {
  payload: Payload
  req: PayloadRequest
  contactPageId?: number
}): Promise<void> => {
  const manifest: Manifest = JSON.parse(
    fs.readFileSync(path.join(IMAGE_DIR, 'manifest.json'), 'utf-8'),
  )

  const editorConfig = await editorConfigFactory.default({ config: payload.config })
  const toLexical = (markdown: string) =>
    convertMarkdownToLexical({ editorConfig, markdown }) as never

  const seeded: { slug: string; title: Record<Locale, string>; price: string }[] = []

  for (const product of products) {
    const files = manifest[product.sourceId] ?? []

    payload.logger.info(`— Seeding product: ${product.slug} (${files.length} photos)`)

    // Upload this product's photographs, alt text localized per locale.
    // Postgres gives integer IDs; the relationship fields are typed to match.
    const mediaIds: number[] = []
    for (const [index, file] of files.entries()) {
      const filePath = path.join(IMAGE_DIR, file)
      if (!fs.existsSync(filePath)) continue

      const created = await payload.create({
        collection: 'media',
        req,
        context: { disableRevalidate: true },
        data: { alt: `${product.content.en.title} — ${index + 1}` },
        filePath,
      })

      for (const locale of locales.filter((l) => l !== 'en')) {
        await payload.update({
          collection: 'media',
          id: created.id,
          locale,
          req,
          context: { disableRevalidate: true },
          data: { alt: `${product.content[locale].title} — ${index + 1}` },
        })
      }

      mediaIds.push(created.id as number)
    }

    const layoutFor = (locale: Locale) => {
      const c = product.content[locale]

      return [
        {
          blockType: 'content' as const,
          columns: [
            {
              size: 'twoThirds' as const,
              richText: toLexical(c.body),
              enableLink: false,
            },
          ],
        },
        ...(mediaIds.length
          ? [
              {
                blockType: 'gallery' as const,
                heading: PHOTO_HEADING[locale],
                featureFirst: true,
                images: mediaIds.map((id) => ({ image: id })),
              },
            ]
          : []),
        {
          blockType: 'cta' as const,
          richText: toLexical(`## ${CTA[locale].heading}\n\n${CTA[locale].body}`),
          links: contactPageId
            ? [
                {
                  link: {
                    type: 'reference' as const,
                    appearance: 'default' as const,
                    label: CTA[locale].action,
                    reference: { relationTo: 'pages' as const, value: contactPageId },
                  },
                },
              ]
            : [],
        },
      ]
    }

    const heroFor = (locale: Locale) => ({
      type: 'mediumImpact' as const,
      richText: toLexical(
        `# ${product.content[locale].title}\n\n${product.content[locale].summary}\n\n**${PRICE_LABEL[locale]}: ${product.price}**`,
      ),
      links: [],
      ...(mediaIds[0] ? { media: mediaIds[0] } : {}),
    })

    const metaFor = (locale: Locale) => ({
      title: product.content[locale].title,
      description: product.content[locale].summary,
      keywords: KEYWORDS[locale],
      ...(mediaIds[0] ? { image: mediaIds[0] } : {}),
    })

    const existing = await payload.find({
      collection: 'pages',
      where: { slug: { equals: product.slug } },
      limit: 1,
      req,
    })

    const base = {
      _status: 'published' as const,
      slug: product.slug,
      title: product.content.en.title,
      hero: heroFor('en'),
      layout: layoutFor('en'),
      meta: metaFor('en'),
    }

    const page = existing.docs[0]
      ? await payload.update({
          collection: 'pages',
          id: existing.docs[0].id,
          locale: 'en',
          req,
          context: { disableRevalidate: true },
          data: base,
        })
      : await payload.create({
          collection: 'pages',
          locale: 'en',
          req,
          context: { disableRevalidate: true },
          data: base,
        })

    // Then write each translation over the same document.
    for (const locale of locales.filter((l) => l !== 'en')) {
      await payload.update({
        collection: 'pages',
        id: page.id,
        locale,
        req,
        context: { disableRevalidate: true },
        data: {
          title: product.content[locale].title,
          hero: heroFor(locale),
          layout: layoutFor(locale),
          meta: metaFor(locale),
        },
      })
    }

    seeded.push({
      slug: product.slug,
      title: Object.fromEntries(
        locales.map((l) => [l, product.content[l].title]),
      ) as Record<Locale, string>,
      price: product.price,
    })
  }

  payload.logger.info('— Seeding the equipment index page...')
  await seedIndexPage(payload, req, toLexical, seeded)
}

/** The catalogue page: intro plus a linked list of every product. */
const seedIndexPage = async (
  payload: Payload,
  req: PayloadRequest,
  toLexical: (md: string) => never,
  created: { slug: string; title: Record<Locale, string>; price: string }[],
) => {
  const bodyFor = (locale: Locale) => {
    const rows = created
      .map((p) => `- [${p.title[locale]}](/${p.slug}) — ${p.price}`)
      .join('\n')

    return `${productsIndex[locale].intro}\n\n${rows}`
  }

  const layoutFor = (locale: Locale) => [
    {
      blockType: 'content' as const,
      columns: [
        { size: 'twoThirds' as const, richText: toLexical(bodyFor(locale)), enableLink: false },
      ],
    },
  ]

  const existing = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'equipment' } },
    limit: 1,
    req,
  })

  const base = {
    _status: 'published' as const,
    slug: 'equipment',
    title: productsIndex.en.title,
    hero: { type: 'lowImpact' as const, richText: toLexical(`# ${productsIndex.en.title}`), links: [] },
    layout: layoutFor('en'),
    meta: {
      title: productsIndex.en.title,
      description: productsIndex.en.summary,
      keywords: KEYWORDS.en,
    },
  }

  const page = existing.docs[0]
    ? await payload.update({
        collection: 'pages',
        id: existing.docs[0].id,
        locale: 'en',
        req,
        context: { disableRevalidate: true },
        data: base,
      })
    : await payload.create({
        collection: 'pages',
        locale: 'en',
        req,
        context: { disableRevalidate: true },
        data: base,
      })

  for (const locale of locales.filter((l) => l !== 'en')) {
    await payload.update({
      collection: 'pages',
      id: page.id,
      locale,
      req,
      context: { disableRevalidate: true },
      data: {
        title: productsIndex[locale].title,
        hero: {
          type: 'lowImpact' as const,
          richText: toLexical(`# ${productsIndex[locale].title}`),
          links: [],
        },
        layout: layoutFor(locale),
        meta: {
          title: productsIndex[locale].title,
          description: productsIndex[locale].summary,
          keywords: KEYWORDS[locale],
        },
      },
    })
  }

  return page
}

const PHOTO_HEADING: Record<Locale, string> = {
  en: 'Photographs',
  ro: 'Fotografii',
  ru: 'Фотографии',
}

const PRICE_LABEL: Record<Locale, string> = {
  en: 'Price',
  ro: 'Preț',
  ru: 'Цена',
}

const CTA: Record<Locale, { heading: string; body: string; action: string }> = {
  en: {
    heading: 'Send us your material',
    body: 'Send a sample and we press it before you buy, so the throughput figure is yours rather than a brochure average.',
    action: 'Request a quote',
  },
  ro: {
    heading: 'Trimiteți-ne materia primă',
    body: 'Trimiteți o mostră și o presăm înainte să cumpărați, astfel încât productivitatea să fie a dumneavoastră, nu o medie din broșură.',
    action: 'Cereți o ofertă',
  },
  ru: {
    heading: 'Пришлите нам своё сырьё',
    body: 'Пришлите образец — мы спрессуем его до покупки, чтобы производительность была вашей, а не средней по брошюре.',
    action: 'Запросить цену',
  },
}

const KEYWORDS: Record<Locale, string[]> = {
  en: ['briquetting press', 'briquetting equipment', 'biomass briquettes', 'Nefil', 'Moldova'],
  ro: ['presă de brichetat', 'echipament de brichetare', 'brichete din biomasă', 'Nefil', 'Moldova'],
  ru: ['брикетировочный пресс', 'оборудование для брикетирования', 'топливные брикеты', 'Nefil', 'Молдова'],
}
