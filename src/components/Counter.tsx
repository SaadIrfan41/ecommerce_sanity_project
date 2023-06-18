'use client'
import React, { useState } from 'react'
import { Button } from './ui/button'
import { SignInButton, useAuth } from '@clerk/nextjs'
import { Loader2, ShoppingCart } from 'lucide-react'
import { toast } from 'react-hot-toast'
import { useCartStore } from '@/store/useCartStore'
import { Product } from '@/store/useProductStore'
import { urlForImage } from '../../sanity/lib/image'

const Counter = ({
  product,
  productId,
}: {
  product: Product
  productId: string
}) => {
  const {
    userId,

    isLoaded,
  } = useAuth()
  const [counter, setcounter] = useState(1)
  const { addToCart, updatingCart } = useCartStore()
  // const productImage = urlForImage(product.image[0])?.url()
  product.product_id = productId
  // const addToCart = async () => {
  //   setloading(true)
  //   try {
  //     const res = await fetch('/api/cart', {
  //       method: 'POST',
  //       body: JSON.stringify({
  //         productId,
  //         quantity: counter,
  //         image: productImage,
  //         product_type,
  //         price: productPrice,
  //         name,
  //       }),
  //     })

  //     const { message } = await res.json()
  //     toast.success(message)
  //     setloading(false)

  //     return
  //   } catch (err) {
  //     if (err instanceof Error) {
  //       console.log(err.message)
  //       toast.error(err.message)
  //     } else {
  //       console.log('Unexpected error', err)
  //     }
  //   }
  // }

  return (
    <>
      <div className='flex gap-8 items-center'>
        <h4 className=' font-bold text-base'>Quantity:</h4>
        <div className='flex gap-3'>
          <button
            disabled={counter < 2}
            onClick={() => {
              setcounter(counter - 1)
            }}
            className={
              ' bg-[#f1f1f1] rounded-full w-9 h-9 flex items-center justify-center text-3xl cursor-pointer'
            }
          >
            -
          </button>
          <span className='m-auto'>{counter}</span>
          <button
            onClick={() => {
              setcounter(counter + 1)
            }}
            className='  border-2 border-black rounded-full w-9 h-9 flex items-center justify-center text-[25px] cursor-pointer'
          >
            +
          </button>
        </div>
      </div>
      <div className='flex gap-4 items-center'>
        {/* <div className='flex flex-col gap-2'>
              <Button
                disabled={!userId}
                asChild
                className=' rounded-none  py-5 px-8 font-semibold text-base bg-[#212121]'
              >
                <button>
                  <ShoppingCart className=' ' />
                  Add to Cart
                </button>
              </Button>
              {!userId && (
                <SignInButton mode='modal'>
                  <button className='btn'>Add to Cart</button>
                </SignInButton>
              )}
            </div> */}
        <Button
          disabled={!userId || updatingCart}
          asChild
          className=' rounded-none  py-5 px-8 font-semibold text-base bg-[#212121]'
        >
          {userId ? (
            updatingCart ? (
              <button>
                Please wait
                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
              </button>
            ) : (
              <button
                onClick={() => addToCart(product, userId, 'increment', counter)}
              >
                <ShoppingCart className=' ' />
                Add to Cart
              </button>
            )
          ) : (
            <SignInButton mode='modal'>
              <button className='btn'>Add to Cart</button>
            </SignInButton>
          )}
        </Button>

        <p className=' font-bold text-2xl tracking-[0.1em] h-full '>
          ${product.price}
        </p>
      </div>
    </>
  )
}

export default Counter
