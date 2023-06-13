import React from 'react'
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

const Navbar = () => {
  return (
    <header className=' flex my-8 mx-32 justify-between items-center'>
      <div>
        <Image src={Logo} alt={'Dine Market Logo'} />
      </div>
      <div>
        <NavigationMenu>
          <NavigationMenuList className=' flex gap-12 font-medium '>
            <NavigationMenuItem>
              <Link href='/products/female' legacyBehavior passHref>
                <NavigationMenuLink>Female</NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href='/products/male' legacyBehavior passHref>
                <NavigationMenuLink>Male</NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href='/products/kids' legacyBehavior passHref>
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
      <div className=' relative  w-3/12'>
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
      <div className='flex gap-3 items-center'>
        {/* <SignedIn> */}
        <UserButton afterSignOutUrl='/' />
        {/* </SignedIn> */}
        <div className='bg-[#f1f1f1] rounded-full w-[46px] h-[46px] relative hover:scale-110 duration-500'>
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
            0
          </span>
        </div>
      </div>
    </header>
  )
}

export default Navbar
