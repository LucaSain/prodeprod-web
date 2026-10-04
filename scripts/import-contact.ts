/**
 * Creates the contact form and the contact page, over the REST API.
 *
 * The home page's calls to action and the navigation both point at a page with
 * slug `contact`; without it those links are silently dropped. Run this before
 * import-homepage.ts, or re-run that one afterwards to pick the links up.
 *
 * Nothing is deleted: the form and page are matched by title and slug and
 * updated in place.
 */
import { convertMarkdownToLexical, editorConfigFactory } from '@payloadcms/richtext-lexical'

import configPromise from '../src/payload.config'
import { locales, type Locale } from '../src/i18n/config'
import { contactDetails } from '../src/endpoints/seed/homepage/data'

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
    throw new Error(`${init.method || 'GET'} ${pathname} -> ${res.status}: ${text.slice(0, 400)}`)
  return text ? JSON.parse(text) : null
}

const copy: Record<
  Locale,
  {
    title: string
    intro: string
    submit: string
    confirmation: string
    fields: { name: string; email: string; phone: string; message: string }
    mapHeading: string
    hours: string
  }
> = {
  en: {
    title: 'Contact',
    intro: 'Tell us what you need to press and roughly how much of it. We will come back with a specification and a price.',
    submit: 'Send enquiry',
    confirmation: 'Thank you — we have your enquiry and will reply shortly.',
    fields: { name: 'Name', email: 'Email', phone: 'Phone', message: 'What do you need to press?' },
    mapHeading: 'Find us',
    hours: 'Mon – Fri: 08:00 – 17:00',
  },
  ro: {
    title: 'Contact',
    intro: 'Spuneți-ne ce aveți de presat și aproximativ ce cantitate. Revenim cu o specificație și un preț.',
    submit: 'Trimiteți cererea',
    confirmation: 'Vă mulțumim — am primit cererea și vă răspundem în scurt timp.',
    fields: { name: 'Nume', email: 'E-mail', phone: 'Telefon', message: 'Ce aveți de presat?' },
    mapHeading: 'Unde ne găsiți',
    hours: 'Luni – Vineri: 08:00 – 17:00',
  },
  ru: {
    title: 'Контакты',
    intro: 'Напишите, что нужно прессовать и примерно в каком объёме. Мы вернёмся со спецификацией и ценой.',
    submit: 'Отправить запрос',
    confirmation: 'Спасибо — запрос получен, мы ответим в ближайшее время.',
    fields: { name: 'Имя', email: 'Эл. почта', phone: 'Телефон', message: 'Что нужно прессовать?' },
    mapHeading: 'Как нас найти',
    hours: 'Пн – Пт: 08:00 – 17:00',
  },
}

// Bălți city centre. The listings give the city but no street address, so the
// marker is the city rather than an invented building.
const COORDS = { latitude: 47.7615, longitude: 27.9292 }

const run = async () => {
  console.log(`Target: ${URL_BASE}${DRY ? '  (dry run — nothing will be written)' : ''}`)

  const config = await configPromise
  const editorConfig = await editorConfigFactory.fromFeatures({
    config,
    features: ({ defaultFeatures }) => defaultFeatures,
  })
  const md = (markdown: string) => convertMarkdownToLexical({ editorConfig, markdown })

  if (DRY) {
    console.log('  would create an enquiry form and a /contact page in', locales.join(', '))
    return
  }

  const login = await api('/users/login', {
    method: 'POST',
    body: JSON.stringify({ email: EMAIL, password: PASSWORD }),
  })
  token = login.token
  console.log(`  signed in as ${login.user?.email}`)

  // ---- the form -----------------------------------------------------------
  const existingForms = await api('/forms?limit=1&depth=0&where[title][equals]=Enquiry')
  const formPayload = {
    title: 'Enquiry',
    submitButtonLabel: copy.en.submit,
    confirmationType: 'message',
    confirmationMessage: md(copy.en.confirmation),
    fields: [
      { blockType: 'text', name: 'name', label: copy.en.fields.name, required: true, width: 50 },
      { blockType: 'email', name: 'email', label: copy.en.fields.email, required: true, width: 50 },
      { blockType: 'text', name: 'phone', label: copy.en.fields.phone, required: false, width: 50 },
      {
        blockType: 'textarea',
        name: 'message',
        label: copy.en.fields.message,
        required: true,
        width: 100,
      },
    ],
  }

  const form = existingForms?.docs?.[0]
    ? (await api(`/forms/${existingForms.docs[0].id}?locale=en`, {
        method: 'PATCH',
        body: JSON.stringify(formPayload),
      })).doc
    : (await api('/forms?locale=en', { method: 'POST', body: JSON.stringify(formPayload) })).doc

  console.log(`  form ready (id ${form.id})`)

  // Translate the labels the plugin stores as localized fields. Field ids have
  // to be carried over or Payload treats them as new rows.
  for (const locale of locales.filter((l) => l !== 'en')) {
    const c = copy[locale]
    const labels = [c.fields.name, c.fields.email, c.fields.phone, c.fields.message]
    await api(`/forms/${form.id}?locale=${locale}`, {
      method: 'PATCH',
      body: JSON.stringify({
        submitButtonLabel: c.submit,
        confirmationMessage: md(c.confirmation),
        fields: (form.fields ?? []).map((f: { id: string }, i: number) => ({
          ...form.fields[i],
          id: f.id,
          label: labels[i] ?? form.fields[i].label,
        })),
      }),
    })
  }
  console.log('  form labels translated')

  // ---- the page -----------------------------------------------------------
  const forLocale = (locale: Locale) => {
    const c = copy[locale]
    return {
      title: c.title,
      hero: { type: 'lowImpact', richText: md(`# ${c.title}\n\n${c.intro}`), links: [] },
      layout: [
        { blockType: 'formBlock', enableIntro: false, form: form.id },
        {
          blockType: 'mapBlock',
          heading: c.mapHeading,
          latitude: COORDS.latitude,
          longitude: COORDS.longitude,
          zoom: 12,
          height: 'medium',
          markerLabel: 'ProdeProd',
          address: contactDetails.address,
          email: contactDetails.email,
          hours: c.hours,
          showDirections: true,
        },
      ],
      meta: { title: c.title, description: c.intro },
    }
  }

  const found = await api('/pages?where[slug][equals]=contact&limit=1&depth=0&locale=en')
  const base = { ...forLocale('en'), slug: 'contact', _status: 'published' }

  const page = found?.docs?.[0]
    ? (await api(`/pages/${found.docs[0].id}?locale=en`, {
        method: 'PATCH',
        body: JSON.stringify(base),
      })).doc
    : (await api('/pages?locale=en', { method: 'POST', body: JSON.stringify(base) })).doc

  for (const locale of locales.filter((l) => l !== 'en')) {
    await api(`/pages/${page.id}?locale=${locale}`, {
      method: 'PATCH',
      body: JSON.stringify(forLocale(locale)),
    })
  }
  console.log(`  contact page ready (id ${page.id}) in ${locales.join(', ')}`)
  console.log('Done. Nothing was deleted.')
}

await run()
