'use client'
import React, { useEffect } from 'react'
import { runFireworks } from '../../../lib/confettie'
import { Store } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

import { useCartStore } from '@/store/useCartStore'
const SuccessCheckoutPage = () => {
  const { clearCart } = useCartStore()
  useEffect(() => {
    clearCart()
    runFireworks()
  }, [clearCart])
  return (
    <div className='  flex flex-col gap-10 items-center h-[80vh] justify-center text-5xl'>
      <p className=' flex justify-center'>
        <Store className='w-20 h-20' />
      </p>
      <h2 className=' font-extrabold'>Thank you for your order!</h2>

      <Button
        asChild
        className=' flex justify-center rounded-none  py-5 px-8  font-semibold  text-base bg-[#212121]'
      >
        <Link href='/'>
          <button type='button' className='btn'>
            Continue Shopping
          </button>
        </Link>
      </Button>
    </div>
  )
}

export default SuccessCheckoutPage
