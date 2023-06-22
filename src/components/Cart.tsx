'use client'
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { ShoppingBag, Trash2 } from 'lucide-react'
import { Cart as CartType } from '@/db/schema'
import Image from 'next/image'
// import CartQuantity from './CartQuantity'
import { useRouter } from 'next/navigation'
import { useProductsStore } from '@/store/useProductStore'
import { useCartStore } from '@/store/useCartStore'
import CartItem from './CartItems'
import getStripe from '@/lib/getStripe'
import { toast } from 'react-hot-toast'

type CartItem = {
  id: string
  user_id: string
  product_id: string
  quantity: number
  image: string
  name: string
  price: string
  product_type: string
  created_at: string
  updated_at: string
}

type ResponseType = {
  cart: CartItem[]
  totalQuantity: number
  totalPrice: number
}

const Cart = ({ userId }: { userId: string }) => {
  // const { } = useProductsStore()
  const {
    totalItems,
    totalPrice,
    products,
    isLoading,
    error,
    fetchData,
    cart,
    deleteSingleProductFromCart,
    updatingCart,
  } = useCartStore()

  const router = useRouter()
  useEffect(() => {
    fetchData(userId)
  }, [fetchData, userId])

  if (isLoading) return <h1>LOADING</h1>
  if (error) return <h1>ERROR</h1>
  console.log(products)

  const handleCheckout = async () => {
    const stripe = await getStripe()

    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cart),
    })

    if (!response.ok) return toast.error('ERROR CREATING SESSSION')

    const { id } = await response.json()

    toast.loading('Redirecting...')

    stripe?.redirectToCheckout({ sessionId: id })
  }

  return (
    <div className=' p-12'>
      <h1 className=' font-bold text-2xl'>Shopping Cart</h1>
      {products.length === 0 ? (
        <div className=' py-20 flex flex-col items-center'>
          <ShoppingBag className=' w-36 h-36' />
          <h2 className=' font-bold text-3xl'>Your shopping bag is empty</h2>
        </div>
      ) : (
        <div className='flex flex-col xl:flex-row justify-between gap-16 '>
          <div className='flex flex-col gap-16 flex-grow mt-8'>
            {cart?.map((product) => (
              <div key={product.id} className='flex gap-8 '>
                <Image
                  src={product.image}
                  alt='Product Image'
                  width={200}
                  height={200}
                  className=' max-h-[190px] rounded-2xl'
                />
                <div className=' flex flex-col gap-5 w-full '>
                  <div className='flex justify-between'>
                    <span className=' font-light text-xl'>{product.name}</span>
                    <button
                      disabled={updatingCart}
                      onClick={() =>
                        deleteSingleProductFromCart(product, userId)
                      }
                      className=' w-7 h-7 shrink-0 hover:cursor-pointer  disabled:cursor-not-allowed'
                    >
                      <Trash2 />
                    </button>
                  </div>
                  <span className='text-[#666] font-semibold text-base'>
                    {product.product_type}
                  </span>
                  <div className='flex items-center justify-between'>
                    <span className=' font-bold text-lg'>${product.price}</span>
                    <CartItem
                      product={product}
                      userId={userId}
                      router={router}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className='bg-[#fbfcff] flex flex-col gap-8 p-8 flex-1'>
            <h3 className='font-bold text-2xl'>Order Summary</h3>
            <div className='flex justify-between gap-16'>
              <span>Quantity</span>
              <span>{totalItems} Product</span>
            </div>
            <div className='flex justify-between gap-16'>
              <span>Sub Total</span>
              <span>${totalPrice}</span>
            </div>
            <div className='flex flex-col gap-2'>
              <Button
                asChild
                className=' rounded-none  py-5 px-8 w-fit font-semibold  text-base bg-[#212121]'
              >
                <button onClick={() => handleCheckout()}>
                  Process to Checkout
                </button>
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Cart
