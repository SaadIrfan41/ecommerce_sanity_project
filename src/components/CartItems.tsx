'use client'

import { useCartStore } from '@/store/useCartStore'
import { Product } from '@/store/useProductStore'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'

const CartItem = ({
  product,
  router,
  userId,
}: {
  product: Product
  router: any
  userId: string
}) => {
  const { increment_decrement_quantity, updatingCart } = useCartStore()

  return (
    <div className='flex gap-8 items-center'>
      {/* <h4 className=' font-bold text-base'>Quantity:</h4> */}
      <div className='flex gap-3'>
        <button
          disabled={product.quantity < 2 || updatingCart}
          onClick={() => {
            increment_decrement_quantity(product, userId, 'decrement')
          }}
          className={
            ' bg-[#f1f1f1] rounded-full w-9 h-9 flex items-center disabled:cursor-not-allowed justify-center text-3xl cursor-pointer'
          }
        >
          -
        </button>
        <span className='m-auto'>{product.quantity}</span>
        <button
          disabled={updatingCart}
          onClick={() => {
            increment_decrement_quantity(product, userId, 'increment')
          }}
          className='  border-2 border-black rounded-full w-9 h-9 flex items-center disabled:cursor-not-allowed justify-center text-[25px] cursor-pointer'
        >
          +
        </button>
      </div>
    </div>
  )
}

export default CartItem
