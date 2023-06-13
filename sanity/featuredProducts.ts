import { defineType, defineField } from 'sanity'

export const featuredProducts = defineType({
  name: 'featured_products',
  title: 'Featured Products',
  type: 'document',
  fields: [
    defineField({
      name: 'product',
      title: 'Product',
      type: 'reference',
      to: [{ type: 'product' }],
    }),
    // defineField({
    //   name: 'name',
    //   title: 'Name',
    //   type: 'string',
    // }),
    // defineField({
    //   name: 'description',
    //   title: 'Description',
    //   type: 'text',
    // }),
  ],
})
