import { createClient } from '@sanity/client'
import { apiVersion, dataset, projectId } from '../../sanity/env'

export const client = createClient({
  token: process.env.SANITY_ACCESS_TOKEN,
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
})

export const getFeaturedProducts = async () => {
  const products = await client.fetch(`*[_type == "featured_products" ]{
  product ->{
      _id,
      name,
    image,
    price
    }
}`)

  return products
}
