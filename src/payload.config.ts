import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
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
      connectionString: process.env.DATABASE_URL || '',
    },
    // In production the schema is created/updated by the committed migrations.
    prodMigrations: migrations,
  }),
  sharp,
})
