import path from 'path'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import { s3Storage } from '@payloadcms/storage-s3'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Programmes } from './collections/Programmes'
import { Sponsors } from './collections/Sponsors'
import { Pages } from './collections/Pages'
import { Posts } from './collections/Posts'
import { Categories } from './collections/Categories'
import { People } from './collections/People'
import { Schools } from './collections/Schools'
import { Awards } from './collections/Awards'
import { AwardCategories } from './collections/AwardCategories'
import { Testimonials } from './collections/Testimonials'
import { Events } from './collections/Events'
import { Header } from './globals/Header'
import { Footer } from './globals/Footer'
import { SiteSettings } from './globals/SiteSettings'
import { migrations } from './migrations'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL,
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    Users,
    Media,
    Programmes,
    Sponsors,
    Pages,
    Posts,
    Categories,
    People,
    Schools,
    Awards,
    AwardCategories,
    Testimonials,
    Events,
  ],
  globals: [Header, Footer, SiteSettings],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL,
    },
    // Run pending migrations automatically on startup in production
    prodMigrations: migrations,
  }),
  plugins: [
    s3Storage({
      collections: { media: true },
      bucket: process.env.S3_BUCKET || '',
      config: {
        endpoint: process.env.S3_ENDPOINT,
        region: process.env.S3_REGION || 'us-east-1',
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
        },
        // Required for Minio and most S3-compatible providers
        forcePathStyle: process.env.S3_FORCE_PATH_STYLE !== 'false',
      },
    }),
  ],
})
