'use client'
import React, { useEffect, useRef } from 'react'
import { SignedIn, UserButton } from '@clerk/nextjs'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu'
import Image from 'next/image'
import Logo from '../../public/Logo.webp'
import Link from 'next/link'
import { Input } from './ui/input'
import { useCartStore } from '@/store/useCartStore'

const Navbar = ({ userId }: { userId: string }) => {
  const { totalItems, fetchData } = useCartStore()
  const dialogRef = useRef<HTMLDialogElement>(null)
  useEffect(() => {
    if (userId) {
      fetchData(userId)
    }
  }, [fetchData, userId])
  return (
    <header className=' flex my-8  mx-10 justify-between items-center'>
      <Link href='/'>
        <Image src={Logo} alt={'Dine Market Logo'} />
      </Link>
      <div className='hidden lg:block'>
        <NavigationMenu>
          <NavigationMenuList className=' flex gap-12 font-medium '>
            <NavigationMenuItem>
              <Link href='/female' legacyBehavior passHref>
                <NavigationMenuLink>Female</NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href='/male' legacyBehavior passHref>
                <NavigationMenuLink>Male</NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href='/kids' legacyBehavior passHref>
                <NavigationMenuLink>Kids</NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href='/products' legacyBehavior passHref>
                <NavigationMenuLink>All Products</NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <div className=' relative hidden xl:block  w-3/12'>
        <Input
          type='search'
          placeholder='What are you looking for'
          className='border-black   focus:ring-2 pl-8  focus:ring-purple-500 focus:ring-offset-2'
        />
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='24'
          height='24'
          fill='none'
          stroke='currentColor'
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth='2'
          className='absolute top-0 bottom-0 my-auto pl-1'
          viewBox='0 0 24 24'
        >
          <circle cx='11' cy='11' r='8'></circle>
          <path d='M21 21L16.65 16.65'></path>
        </svg>
      </div>
      <div className='lg:flex hidden gap-3 items-center'>
        {/* <SignedIn> */}
        <UserButton afterSignOutUrl='/' />
        {/* </SignedIn> */}
        <Link
          href='/cart'
          className='bg-[#f1f1f1] rounded-full w-[46px] h-[46px] relative hover:scale-110 duration-500'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            fill='none'
            stroke='currentColor'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            className='absolute top-0 righ-0 left-0 bottom-0 m-auto w-full'
            viewBox='0 0 24 24'
          >
            <circle cx='8' cy='21' r='1'></circle>
            <circle cx='19' cy='21' r='1'></circle>
            <path d='M2.05 2.05h2l2.66 12.42a2 2 0 002 1.58h9.78a2 2 0 001.95-1.57l1.65-7.43H5.12'></path>
          </svg>
          <span className=' w-[18px] h-[18px] rounded-full bg-red-500 text-[#eee]  text-xs font-semibold absolute text-center right-0'>
            {totalItems}
          </span>
        </Link>
      </div>

      <div
        className=' lg:hidden block'
        onClick={() => dialogRef.current?.showModal()}
      >
        {' '}
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='1em'
          height='1em'
          fill='currentColor'
          stroke='currentColor'
          strokeWidth='0'
          color='#000'
          fontSize='27'
          viewBox='0 0 24 24'
        >
          <path fill='none' d='M0 0h24v24H0z'></path>
          <path d='M3 4h18v2H3V4zm6 7h12v2H9v-2zm-6 7h18v2H3v-2z'></path>
        </svg>
      </div>

      <dialog
        ref={dialogRef}
        onClick={(ev) => {
          const target = ev.target as HTMLDialogElement
          if (target.nodeName === 'DIALOG') {
            target.close()
            // setIsOpen(false)
          }
        }}
        className=' right-auto min-h-screen w-0 transition-[width]
             duration-500 [&[open]]:opacity-100 [&[open]]:md:w-[50vw] lg:hidden [&[open]]:w-[70vw] backdrop:backdrop-blur p-0   bg-white h-full bottom-0 block opacity-0 '
      >
        <nav className=' h-full w-full  px-[1vw] pt-5 flex flex-col'>
          <div className='flex justify-between px-3 items-center'>
            <Link href='/'>
              <Image src={Logo} alt={'Dine Market Logo'} />
            </Link>
            <div className='flex  gap-3 items-center'>
              {/* <SignedIn> */}
              <UserButton afterSignOutUrl='/' />
              {/* </SignedIn> */}
              <Link
                href='/cart'
                className='bg-[#f1f1f1] rounded-full w-[46px] h-[46px] relative hover:scale-110 duration-500'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  fill='none'
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  className='absolute top-0 righ-0 left-0 bottom-0 m-auto w-full'
                  viewBox='0 0 24 24'
                >
                  <circle cx='8' cy='21' r='1'></circle>
                  <circle cx='19' cy='21' r='1'></circle>
                  <path d='M2.05 2.05h2l2.66 12.42a2 2 0 002 1.58h9.78a2 2 0 001.95-1.57l1.65-7.43H5.12'></path>
                </svg>
                <span className=' w-[18px] h-[18px] rounded-full bg-red-500 text-[#eee]  text-xs font-semibold absolute text-center right-0'>
                  {totalItems}
                </span>
              </Link>
            </div>
          </div>
          <div className=' text-[#2b3340]  flex flex-col font-medium mt-10 gap-5 divide-y '>
            <Link
              onClick={() => {
                dialogRef.current?.close()
              }}
              className=' py-2   px-2 '
              href='/female'
            >
              Female
            </Link>
            <Link
              onClick={() => {
                dialogRef.current?.close()
              }}
              className=' py-2  px-2 '
              href='/male'
            >
              Male
            </Link>
            <Link
              onClick={() => {
                dialogRef.current?.close()
              }}
              className=' py-2   px-2 '
              href='/kids'
            >
              Kids
            </Link>
          </div>
        </nav>
      </dialog>
    </header>
  )
}

export default Navbar
