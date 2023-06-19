import React from 'react'
import { client } from '../../../../sanity/lib/client'
import { auth } from '@clerk/nextjs'
import ImageSelection from '@/components/ImageSelection'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ShoppingCart } from 'lucide-react'
import Counter from '@/components/Counter'
import { SignInButton, SignedOut } from '@clerk/nextjs'
import { urlForImage } from '../../../../sanity/lib/image'
const getSingleProduct = async (slug: string) => {
  console.log(slug)
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

export async function generateStaticParams() {
  const products = await client.fetch(
    `*[_type == "product"  ]{

    slug

}`
  )

  return products.map((product: any) => ({
    slug: product.slug.current,
  }))
}

const ProductDetailPage = async ({ params }: { params: { slug: string } }) => {
  const slug = params.slug
  const product = await getSingleProduct(slug)
  const { userId } = auth()
  console.log(userId)
  //   console.log(product)
  return (
    <div className='bg-[#fcfcfc] py-16 px-32'>
      <div className='flex gap-24'>
        <ImageSelection product={product[0]} />

        <div className=' flex flex-col mt-16 flex-1 text-[#212121] gap-8 '>
          <div>
            <h3 className=' text-2xl tracking-[0.1em] font-normal'>
              {product[0].name}
            </h3>
            <span className=' font-semibold opacity-30  text-xl'>
              {' '}
              {product[0].product_type}
            </span>
          </div>
          <div>
            <p className=' font-bold  text-[.9rem] tracking-[0.1em]'>
              Select Size
            </p>
            <ul className='flex  mt-4 gap-4 text-base text-[#666] font-bold'>
              <li className='w-10 h-10 hover:shadow-xl rounded-full flex items-center justify-center'>
                XS
              </li>
              <li className='w-10 h-10 hover:shadow-xl rounded-full flex items-center justify-center'>
                S
              </li>
              <li className='w-10 h-10 hover:shadow-xl rounded-full flex items-center justify-center'>
                M
              </li>
              <li className='w-10 h-10 hover:shadow-xl rounded-full flex items-center justify-center'>
                L
              </li>
              <li className='w-10 h-10 hover:shadow-xl rounded-full flex items-center justify-center'>
                XL
              </li>
            </ul>
          </div>

          <Counter product={product[0]} productId={product[0]._id} />
        </div>
      </div>
      <div className=' bg-white flex flex-col mt-16 pt-8 px-16 pb-24 gap-8'>
        <div className='relative border-b-2 border-[#c4c4c4]'>
          <div className=' font-extrabold text-[7.5rem] text-[#f2f3f7] opacity-70 z-[-1]'>
            Overview
          </div>
          <h2 className=' text-[1.4rem]  absolute font-bold top-[45%]'>
            Product Information
          </h2>
        </div>
        <div className=' flex '>
          <h4 className=' flex-1 font-bold text-base text-[#666] tracking-[0.1em]'>
            PRODUCT DETAILS
          </h4>
          <p className=' font-light tracking-[0.1em] text-base flex-[2]'>
            {product[0].details}
          </p>
        </div>
      </div>
    </div>
  )
}

export default ProductDetailPage
