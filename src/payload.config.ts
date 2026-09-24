import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import { ar } from '@payloadcms/translations/languages/ar'
import { en } from '@payloadcms/translations/languages/en'
import { fr } from '@payloadcms/translations/languages/fr'
import path from 'path'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import { fileURLToPath } from 'url'

import { Appointments } from './collections/Appointments'
import { Faqs } from './collections/Faqs'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Posts } from './collections/Posts'
import { Services } from './collections/Services'
import { Team } from './collections/Team'
import { Users } from './collections/Users'
import { HomePage } from './globals/HomePage'
import { Navigation } from './globals/Navigation'
import { SiteSettings } from './globals/SiteSettings'
import { seedEndpoint } from './endpoints/seed'
import { migrations } from './migrations'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  serverURL: process.env.SITE_URL || '',
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: ' — CIMS Radiologie',
    },
    components: {
      graphics: {
        Logo: '/components/admin/AdminGraphics#AdminLogo',
        Icon: '/components/admin/AdminGraphics#AdminIcon',
      },
      beforeDashboard: ['/components/admin/SeedPanel#SeedPanel'],
    },
  },
  i18n: {
    supportedLanguages: { fr, ar, en },
    fallbackLanguage: 'fr',
  },
  localization: {
    locales: [
      { code: 'fr', label: 'Français' },
      { code: 'ar', label: 'العربية', rtl: true },
    ],
    defaultLocale: 'fr',
    fallback: true,
  },
  collections: [Services, Pages, Posts, Team, Faqs, Appointments, Media, Users],
  globals: [SiteSettings, HomePage, Navigation],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      // DATABASE_URL, or POSTGRES_URL as set by Vercel's Postgres (Neon) integration.
      connectionString: process.env.DATABASE_URL || process.env.POSTGRES_URL || '',
    },
    // In production the schema is created/updated by the committed migrations.
    prodMigrations: migrations,
  }),
  sharp,
  endpoints: [seedEndpoint],
  plugins: [
    // Uploads go to Vercel Blob when BLOB_READ_WRITE_TOKEN is set (Vercel has no persistent disk),
    // and to the local media/ folder otherwise.
    vercelBlobStorage({
      token: process.env.BLOB_READ_WRITE_TOKEN,
      collections: { media: true },
      // Browser uploads straight to Blob, avoiding Vercel's 4.5 MB request body limit.
      clientUploads: true,
      alwaysInsertFields: true,
    }),
  ],
})
