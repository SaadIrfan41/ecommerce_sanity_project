import { migrate } from 'drizzle-orm/vercel-postgres/migrator'

import { sql } from '@vercel/postgres'
import { drizzle } from 'drizzle-orm/vercel-postgres'

const db = drizzle(sql)

const main = async () => {
  try {
    console.log('Starting Migration')
    await migrate(db, { migrationsFolder: './src/db/migrations' })
    console.log('Migration Ended')
  } catch (error) {
    console.log('Migration Error', error)
  }
}
main()
