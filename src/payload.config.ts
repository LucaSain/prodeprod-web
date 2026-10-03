import { postgresAdapter } from '@payloadcms/db-postgres'
import { en } from '@payloadcms/translations/languages/en'
import { ro } from '@payloadcms/translations/languages/ro'
import { ru } from '@payloadcms/translations/languages/ru'
import sharp from 'sharp'
import path from 'path'
import { buildConfig, PayloadRequest } from 'payload'
import { fileURLToPath } from 'url'

import { Categories } from './collections/Categories'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Posts } from './collections/Posts'
import { Users } from './collections/Users'
import { Footer } from './Footer/config'
import { Header } from './Header/config'
import { plugins } from './plugins'
import { defaultLexical } from '@/fields/defaultLexical'
import { getServerSideURL } from './utilities/getURL'
import { defaultLocale, localeLabels, locales } from './i18n/config'
import { customTranslations } from './i18n/translations'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    components: {
      // The `BeforeLogin` component renders a message that you see while logging into your admin panel.
      // Feel free to delete this at any time. Simply remove the line below.
      beforeLogin: ['@/components/BeforeLogin'],
      // The `BeforeDashboard` component renders the 'welcome' block that you see after logging into your admin panel.
      // Feel free to delete this at any time. Simply remove the line below.
      beforeDashboard: ['@/components/BeforeDashboard'],
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
    user: Users.slug,
    livePreview: {
      breakpoints: [
        {
          label: 'Mobile',
          name: 'mobile',
          width: 375,
          height: 667,
        },
        {
          label: 'Tablet',
          name: 'tablet',
          width: 768,
          height: 1024,
        },
        {
          label: 'Desktop',
          name: 'desktop',
          width: 1440,
          height: 900,
        },
      ],
    },
  },
  // This config helps us configure global or default features that the other editors can inherit
  editor: defaultLexical,
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
    /*
     * This project tracks schema in `src/migrations`, so dev must not push
     * schema changes straight to the database. With push on, dev drifts
     * silently from the migrations and the next `migrate` fails on an
     * already-applied change.
     *
     * Workflow: change the config, `payload migrate:create`, `payload migrate`.
     */
    push: false,
  }),
  collections: [Pages, Posts, Media, Categories, Users],
  // Content localization. Locales come from `src/i18n/config.ts` so the
  // frontend `[locale]` segment and the CMS can never drift apart.
  localization: {
    locales: locales.map((code) => ({
      code,
      label: localeLabels[code],
    })),
    defaultLocale,
    // An untranslated field falls back to the default locale rather than
    // rendering empty, so a half-translated page is still a usable page.
    fallback: true,
  },
  /*
   * Payload i18n — the viewer's language, for the admin panel and for every
   * string the frontend renders itself.
   *
   * `translations` merges this project's own namespace into Payload's, so
   * `t('prodeprod:…')` resolves the same way in the admin panel, in `req.t`,
   * and on the frontend via `getTranslate()`.
   */
  i18n: {
    fallbackLanguage: defaultLocale,
    supportedLanguages: { en, ro, ru },
    translations: customTranslations,
  },
  cors: [getServerSideURL()].filter(Boolean),
  globals: [Header, Footer],
  plugins,
  secret: process.env.PAYLOAD_SECRET,
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  jobs: {
    access: {
      run: ({ req }: { req: PayloadRequest }): boolean => {
        // Allow logged in users to execute this endpoint (default)
        if (req.user) return true

        const secret = process.env.CRON_SECRET
        if (!secret) return false

        // If there is no logged in user, then check
        // for the Vercel Cron secret to be present as an
        // Authorization header:
        const authHeader = req.headers.get('authorization')
        return authHeader === `Bearer ${secret}`
      },
    },
    tasks: [],
  },
})
