'use client'
import { SignInButton, SignedIn, SignedOut } from '@clerk/nextjs'
import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'
import { ShoppingCart } from 'lucide-react'

const AddToCartButton = () => {
  return (
    <>
      {' '}
      <SignedIn>
        <Button
          asChild
          className=' rounded-none  py-5 px-8 font-semibold text-base bg-[#212121]'
        >
          <Link href='#'>
            {' '}
            <ShoppingCart className=' ' />
            Add to Cart
          </Link>
        </Button>
      </SignedIn>
      <SignedOut>
        <SignInButton mode='modal'>
          <button className='btn'>Sign in</button>
        </SignInButton>
      </SignedOut>
    </>
  )
}

export default AddToCartButton
