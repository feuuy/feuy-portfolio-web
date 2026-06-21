import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Projects } from './collections/Projects'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const payloadSecret = process.env.PAYLOAD_SECRET
const databaseUrl = process.env.DATABASE_URL
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

if (!payloadSecret) {
  throw new Error('PAYLOAD_SECRET environment variable is required')
}

if (!databaseUrl) {
  throw new Error('DATABASE_URL environment variable is required')
}

export default buildConfig({
  serverURL: siteUrl,
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Projects],
  editor: lexicalEditor(),
  secret: payloadSecret,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: databaseUrl,
    },
  }),
  sharp,
  plugins: [],
  upload: {
    limits: {
      fileSize: 5_000_000, // 5MB
    },
  },
  cors: {
    origins: [siteUrl],
  },
  csrf: [siteUrl],
})
