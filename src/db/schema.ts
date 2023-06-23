import { InferModel, sql } from 'drizzle-orm'
import {
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
  integer,
  varchar,
  decimal,
  json,
} from 'drizzle-orm/pg-core'

export const CartTable = pgTable(
  'Cart',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    user_id: varchar('user_id', { length: 256 }).notNull(),
    product_id: varchar('product_id', { length: 256 }).notNull(),
    quantity: integer('quantity').notNull().default(1),
    image: text('image').notNull(),
    name: text('product_name').notNull(),
    price: decimal('product_price').notNull(),
    product_type: text('product_type').notNull(),
    created_at: timestamp('created_at').defaultNow().notNull(),
    updated_at: timestamp('updated_at').defaultNow().notNull(),
  },
  (cart) => {
    return {
      uniqueIdx: uniqueIndex('unique_idx').on(cart.product_id),
    }
  }
)
export const OrderTable = pgTable('Orders', {
  id: uuid('id').primaryKey().defaultRandom(),
  user_id: varchar('user_id', { length: 256 }).notNull(),
  products: json('products').notNull(),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull(),
  total_quantity: decimal('total_quantity').notNull(),
  total_price: decimal('total_price').notNull(),
})

export type Cart = InferModel<typeof CartTable>
export type AddCartItem = InferModel<typeof CartTable, 'insert'>
export type Order = InferModel<typeof OrderTable>
export type CreateOrder = InferModel<typeof OrderTable, 'insert'>
