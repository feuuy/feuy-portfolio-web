import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: {
    cookies: {
      sameSite: 'Lax',
      secure: process.env.NODE_ENV === 'production',
    },
    maxLoginAttempts: 5,
    lockTime: 600_000, // 10 minutes
  },
  fields: [
    // Email added by default
    // Add more fields as needed
  ],
}
