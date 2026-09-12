import { formBuilderPlugin } from '@payloadcms/plugin-form-builder'
import { nestedDocsPlugin } from '@payloadcms/plugin-nested-docs'
import { redirectsPlugin } from '@payloadcms/plugin-redirects'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { collectionTemplatesPlugin } from '@alacrity-education/payload-plugin-collection-templates'
import { payloadPluginCollectionsGlobalsWebhook } from '@alacrity-education/payload-plugin-collections-globals-webhook'
import { Plugin } from 'payload'
import { revalidateRedirects } from '@/hooks/revalidateRedirects'
import { GenerateTitle, GenerateURL } from '@payloadcms/plugin-seo/types'
import { FixedToolbarFeature, HeadingFeature, lexicalEditor } from '@payloadcms/richtext-lexical'

import { Page, Post } from '@/payload-types'
import { getServerSideURL } from '@/utilities/getURL'
import { titleSuffix } from '@/utilities/siteConfig'

const generateTitle: GenerateTitle<Post | Page> = ({ doc }) => {
  return titleSuffix(doc?.title)
}

const generateURL: GenerateURL<Post | Page> = ({ doc }) => {
  const url = getServerSideURL()

  return doc?.slug ? `${url}/${doc.slug}` : url
}

export const plugins: Plugin[] = [
  redirectsPlugin({
    collections: ['pages', 'posts'],
    overrides: {
      // @ts-expect-error - This is a valid override, mapped fields don't resolve to the same type
      fields: ({ defaultFields }) => {
        return defaultFields.map((field) => {
          if ('name' in field && field.name === 'from') {
            return {
              ...field,
              admin: {
                description: 'You will need to rebuild the website when changing this field.',
              },
            }
          }
          return field
        })
      },
      hooks: {
        afterChange: [revalidateRedirects],
      },
    },
  }),
  nestedDocsPlugin({
    collections: ['categories'],
    generateURL: (docs) => docs.reduce((url, doc) => `${url}/${doc.slug}`, ''),
  }),
  seoPlugin({
    generateTitle,
    generateURL,
  }),
  formBuilderPlugin({
    fields: {
      payment: false,
    },
    formOverrides: {
      fields: ({ defaultFields }) => {
        return defaultFields.map((field) => {
          if ('name' in field && field.name === 'confirmationMessage') {
            return {
              ...field,
              editor: lexicalEditor({
                features: ({ rootFeatures }) => {
                  return [
                    ...rootFeatures,
                    FixedToolbarFeature(),
                    HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
                  ]
                },
              }),
            }
          }
          return field
        })
      },
    },
  }),
  // Reusable document templates for the page builder: promote a finished
  // page or post to a template, then start new documents from it.
  collectionTemplatesPlugin({
    collections: {
      pages: true,
      posts: true,
    },
  }),
  /*
   * Fires a webhook after an editor saves content in the admin panel, and
   * shows a banner in the edit view confirming it.
   *
   * Scoped to the documents that actually change the public site, so a save
   * can kick off a rebuild or notify downstream systems. Nothing fires until
   * PAYLOAD_WEBHOOK_URL is set — the URL is a server-side secret and is never
   * sent to the browser.
   *
   * Note this covers admin-panel saves only, by design: the plugin fires
   * after the transaction commits, which a Payload afterChange hook cannot
   * do. Writes via REST, GraphQL, the Local API or the seed script do not
   * fire.
   */
  payloadPluginCollectionsGlobalsWebhook({
    // Disabled for now: inert, but the scope below is kept so turning it back
    // on is a one-line change. Set PAYLOAD_WEBHOOK_URL and drop this flag.
    disabled: true,
    url: process.env.PAYLOAD_WEBHOOK_URL,
    collections: {
      pages: true,
      posts: true,
    },
    globals: {
      header: true,
      footer: true,
    },
  }),
]
