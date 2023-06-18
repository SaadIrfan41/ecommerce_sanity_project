import type { Config } from 'drizzle-kit'

export default {
  schema: 'src/db/schema.ts',
  out: 'src/db/migrations',
  connectionString: process.env.POSTGRES_URL,
} satisfies Config
