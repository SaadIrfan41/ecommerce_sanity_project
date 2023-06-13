import { type SchemaTypeDefinition } from 'sanity'
import { product } from './product'
import { category } from './category'
import { featuredProducts } from './featuredProducts'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [product, category, featuredProducts],
}
