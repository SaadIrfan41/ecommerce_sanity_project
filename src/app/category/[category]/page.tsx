import { redirect } from 'next/navigation'
import React from 'react'
import { client } from '../../../../sanity/lib/client'

import Image from 'next/image'
import { urlForImage } from '../../../../sanity/lib/image'
import Link from 'next/link'

const getProducts = async ({
  params: { category },
}: {
  params: { category: string }
}) => {
  const str = category
  const str2 = str.charAt(0).toUpperCase() + str.slice(1)
  if (str2 === 'Male' || str2 === 'Female' || str2 === 'Kids') {
    const res = await client.fetch(
      `*[_type == "product" && categories->name== "${str2}"]{
  _id,
    name,
   product_type,
    slug,
    image,
    price
}`
    )

    return res
  } else {
    redirect('/products')
  }
}

export async function generateStaticParams() {
  const products = await client.fetch(
    `*[_type == "product"  ]{
  categories->{
    name
  }
}`
  )

  return products.map((product: any) => ({
    category: product.categories.name,
  }))
}

const page = async ({ params }: { params: { category: string } }) => {
  const products = await getProducts({ params })

  return (
    <div className=' grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-y-10  lg:my-16 lg:mx-32'>
      {products.map((product: any, index: number) => (
        <Link
          href={`/products/${product.slug.current}`}
          key={product._id}
          className='text-[#212121]  text-lg font-semibold  mx-auto   '
        >
          <Image
            src={urlForImage(product?.image[0])?.url()}
            alt={'Product Images'}
            width={250}
            height={266}
            className=' md:w-[250px] md:h-[266px] w-[200px] h-[200px]   '
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

export default page
