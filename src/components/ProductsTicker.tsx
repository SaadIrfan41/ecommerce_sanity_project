import React from 'react'
import Marquee from 'react-fast-marquee'

import Image from 'next/image'
import { getFeaturedProducts } from '../../sanity/lib/client'
import { urlForImage } from '../../sanity/lib/image'
const ProductsTicker = async () => {
  const FeaturedProducts = await getFeaturedProducts()
  // console.log(FeaturedProducts[0].product)
  // console.log(urlForImage(FeaturedProducts[0].product.image[0]).url())
  return (
    <div className='mt-20 pb-20'>
      <div className='flex flex-col  gap-4 mb-8 text-center'>
        <span className=' text-sm font-bold text-[#0062f5]'>Products</span>
        <h2 className=' tracking-wide text-[#212121] text-[32px] font-bold'>
          Check What We Have
        </h2>
      </div>
      <Marquee
        pauseOnHover={true}
        speed={30}
        className='w-full h-full py-7 flex'
      >
        {FeaturedProducts.map((product: any, index: number) => (
          <div
            key={product.product._id}
            className='text-[#212121] tracking-[0.1em] text-lg font-semibold hover:scale-110  duration-500 mx-10'
          >
            <Image
              src={urlForImage(product?.product?.image[0])?.url()}
              alt={'Product Images'}
              width={380}
              height={400}
              className=' w-[380px] h-[400px]  '
            />
            <p className=''>{product.product.name}</p>
            <p>${product.product.price}</p>
          </div>
        ))}
      </Marquee>
    </div>
  )
}

export default ProductsTicker
