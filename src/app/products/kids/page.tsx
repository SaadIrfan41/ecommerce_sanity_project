import React from 'react'
import { client } from '../../../../sanity/lib/client'
import Image from 'next/image'
import { urlForImage } from '../../../../sanity/lib/image'
import Link from 'next/link'

const getKidsProducts = async () => {
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

const KidsProductsPage = async () => {
  const products = await getKidsProducts()
  return (
    <div className=' grid grid-cols-4 gap-16 my-16 mx-32'>
      {products.map((product: any, index: number) => (
        <Link
          href={`/products/${product.slug.current}`}
          key={product._id}
          className='text-[#212121]  text-lg font-semibold   mx-auto  '
        >
          <Image
            src={urlForImage(product?.image[0])?.url()}
            alt={'Product Images'}
            width={250}
            height={266}
            className=' w-[250px] h-[266px]  '
          />
          <p className=' mt-1 text-base'>{product.name}</p>
          <p className=' mt-1 text-[15px] text-[#888]'>
            {product.product_type}
          </p>
          <p className=' mt-1 text-xl'>${product.price}</p>
        </Link>
      ))}
    </div>
  )
}

export default KidsProductsPage
