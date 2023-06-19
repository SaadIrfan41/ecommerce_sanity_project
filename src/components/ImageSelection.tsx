'use client'
import Image from 'next/image'
import React, { useState } from 'react'
import { urlForImage } from '../../sanity/lib/image'

const ImageSelection = ({ product }: any) => {
  const [selectImage, setselectImage] = useState(0)
  //   console.log(product.image)
  return (
    <div className='flex gap-8'>
      {product.image.map((image: any, index: number) => (
        <Image
          onClick={() => setselectImage(index)}
          key={index}
          src={urlForImage(image)?.url()}
          alt={'Product Images'}
          width={100}
          height={100}
          className='w-[100px] h-[100px] cursor-pointer'
        />
      ))}
      <div className='relative w-full'>
        <img
          src={urlForImage(product.image[selectImage])?.url()}
          alt={'Product Images'}
          className='w-full h-full  lg:w-[878px] '
        />
      </div>
    </div>
  )
}

export default ImageSelection
