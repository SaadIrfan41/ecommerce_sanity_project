import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId, useCdn } from '../env'

export const client = createClient({
  apiVersion,
  dataset,
  projectId,
  useCdn,
})

export const getAllProducts = async () => {
  const products = await client.fetch(`*[_type == "product"  ]{
  _id,
  name,
  product_type,
  slug,
  image,
  price,
}`)

  return products
}
export const getFeaturedProducts = async () => {
  const products = await client.fetch(`*[_type == "featured_products" ]{
  product ->{
      _id,
      name,
    image,
    slug,
    price
    }
}`)

  return products
}
export const getFemaleProducts = async () => {
  const products =
    await client.fetch(`*[_type == "product" && categories->name=="Female" ]{
  _id,
    name,
   product_type,
    slug
      ,
    image,
    price
}`)

  return products
}
export const getMaleProducts = async () => {
  const products =
    await client.fetch(`*[_type == "product" && categories->name=="Male" ]{
  _id,
    name,
   product_type,
    slug
      ,
    image,
    price
}`)

  return products
}
export const getKidsProducts = async () => {
  const products =
    await client.fetch(`*[_type == "product" && categories->name=="Kids" ]{
  _id,
    name,
   product_type,
    slug
      ,
    image,
    price
}`)

  return products
}
export const getSingleProduct = async (slug: string) => {
  const products =
    await client.fetch(`*[_type == "product" && slug.current=="${slug}" ]{
  _id,
    name,
   product_type,
    slug
      ,
    image,
    price,
    details
}`)

  return products
}
