import React from 'react'

import { Button } from '@/components/ui/button'

import Link from 'next/link'
import HeroImage from '../../public/heroImage.webp'
import Image from 'next/image'

import { ShoppingCart } from 'lucide-react'
import BrandImage1 from '../../public/Featured1.webp'
import BrandImage2 from '../../public/Featured2.webp'
import BrandImage3 from '../../public/Featured3.webp'
import BrandImage4 from '../../public/Featured4.webp'
import EventImage1 from '../../public/event1.webp'
import EventImage2 from '../../public/event2.webp'
import EventImage3 from '../../public/event3.webp'
import RandomImage from '../../public/random.webp'
import ProductsTicker from '@/components/ProductsTicker'
const HomePage = () => {
  return (
    <div>
      {/* <section className=' my-16 mx-32 flex  gap-16'> */}
      <section className='  p-8 md:p-10 lg:flex 2xl:mx-32 overflow-hidden'>
        <div className=' pt-12 flex flex-col  gap-10  justify-between'>
          <div className='flex flex-col gap-10'>
            <span className=' bg-blue-100 w-fit py-2 px-6 rounded-lg text-[blue] font-semibold '>
              Sale 70%
            </span>
            <h1 className=' text-[#212121] font-bold text-[56px] tracking-[0.1rem] leading-[55px]'>
              An Industrial Take on Streetwear
            </h1>
            <p className=' w-[70%] text-[#666] font-normal'>
              Anyone can beat you but no one can beat your outfit as long as you
              wear Dine outfits.
            </p>
            <Button
              asChild
              className=' rounded-none max-w-[50%] lg:max-w-[30%] py-8 font-semibold text-base bg-[#212121]'
            >
              <Link href='/products'>
                <ShoppingCart className='mr-2 h-[26px] w-[26px] ' /> Start
                Shopping
              </Link>
            </Button>
          </div>
          <div className='grid gap-4  grid-cols-4   '>
            <Image src={BrandImage1} alt='Brand Image ' className=' h-9 w-28' />
            <Image src={BrandImage2} alt='Brand Image ' className=' h-9 w-28' />
            <Image src={BrandImage3} alt='Brand Image ' className=' h-9 w-28' />
            <Image src={BrandImage4} alt='Brand Image ' className=' h-9 w-28' />
          </div>
        </div>
        <div className='relative lg:block hidden   xl:basis-[60%]    '>
          <Image
            src={HeroImage}
            alt='Hero Image'
            className='z-10 max-w-[650px] max-h-[650px] absolute  h-full w-full '
          />
          <div className=' w-[600px] h-[600px]  rounded-full bg-[#ffece3] z-[-1]' />
        </div>
      </section>
      <section className=' py-10 px-5 xl:py-16 xl:px-32'>
        {/* <section className=' py-16 px-32'> */}
        <div className='flex flex-col  gap-4 mb-8 text-center'>
          <span className=' text-sm font-bold text-[#0062f5]'>PROMOTIONS</span>
          <h2 className=' tracking-wide text-[#212121] text-[32px] font-bold'>
            Our Promotions Events
          </h2>
        </div>
        <div className='flex flex-col lg:flex-row gap-8 h-fit'>
          <div className=' flex flex-col flex-grow gap-4'>
            <div className='flex  bg-[#d6d6d8] items-center justify-between pl-8 sm:px-8'>
              <div>
                <h3 className=' text-[1.75rem] font-bold'>
                  GET UP TO{' '}
                  <span className=' text-4xl font-extrabold'>60%</span>
                </h3>
                <p>For the summer season</p>
              </div>
              <Image src={EventImage1} alt='Event 1' />
            </div>
            <div className='bg-[#212121] text-white text-center pt-12 pb-8 px-8'>
              <h3 className=' mb-4 tracking-wide font-extrabold text-4xl'>
                GET 30% Off
              </h3>
              <p className=' font-normal text-[.875rem] tracking-wide'>
                USE PROMO CODE
              </p>
              <button className=' py-2 px-10 bg-[#474747] tracking-[.25em] mt-[5px] rounded-lg text-[17px] font-bold'>
                DINEWEEKENDSALE
              </button>
            </div>
          </div>
          <div className='flex flex-col sm:flex-row gap-4 sm:mx-auto my-auto'>
            <div className='bg-[#efe1c7] pt-6 h-fit '>
              <div className='flex flex-col ml-8 '>
                <span className=' text-[15px] tracking-[.03em] font-normal'>
                  Flex Sweatshirt
                </span>
                <div>
                  <span className='line-through'>$100.00</span>
                  <span className=' font-semibold ml-3 text-lg'>$75.00</span>
                </div>
              </div>
              <Image src={EventImage2} alt='Event 2' className=' mx-auto' />
            </div>
            <div className='bg-[#d7d7d9] pt-6 h-fit'>
              <div className='flex flex-col ml-8'>
                <span className=' text-[15px] tracking-[.03em] font-normal'>
                  Flex Push Button Bomber
                </span>
                <div>
                  <span className='line-through'>$225.00</span>
                  <span className=' font-semibold ml-3 text-lg'>$190.00</span>
                </div>
              </div>
              <Image
                src={EventImage3}
                alt='Event 2'
                className=' max-h-[362px] mx-auto'
              />
            </div>
          </div>
        </div>
      </section>
      <section>
        {
          //@ts-ignore
          <ProductsTicker />
        }
      </section>

      <section>
        <div
          style={{
            background: 'linear-gradient(180deg,#fff 50%,#fbfcff 0)',
          }}
          className='flex justify-end py-10 px-8 md:px-16 md:py-8 md:text-center'
        >
          <h3 className=' text-4xl leading-[55px]  xl:w-[45%] text-[#21212] font-extrabold tracking-[0.1em]'>
            Unique and Authentic Vintage Designer Jewellery
          </h3>
        </div>
        <div className='grid xl:grid-cols-2 grid-cols-1 px-8 pb-16 gap-16 xl:px-32 '>
          <div className='relative grid grid-cols-2 pb-8 gap-8 '>
            <div className='absolute font-extrabold lg:text-[6.875rem] md:w-[80%] md:text-[6rem] text-7xl w-[70%] -mt-7 opacity-10 leading-[110px]'>
              Different from others
            </div>

            <div className=' col-span-1'>
              <h3 className=' text-lg tracking-[0.03em] leading-[20px] font-semibold mb-4 text-[#212121]'>
                Using Good Quality Materials
              </h3>
              <p className=' font-light text-base'>
                Lorem ipsum dolor sit amt, consectetur adipiscing elit.
              </p>
            </div>
            <div className=' col-span-1'>
              <h3 className=' text-lg tracking-[0.03em] leading-[20px]  font-semibold mb-4 text-[#212121]'>
                100% Handmade Products
              </h3>
              <p className=' font-light text-base'>
                Lorem ipsum dolor sit amt, consectetur adipiscing elit.
              </p>
            </div>
            <div className=' col-span-1'>
              <h3 className=' text-lg tracking-[0.03em] leading-[20px]  font-semibold mb-4 text-[#212121]'>
                Modern Fashion Design
              </h3>
              <p className=' font-light text-base'>
                Lorem ipsum dolor sit amt, consectetur adipiscing elit.
              </p>
            </div>
            <div className=' col-span-1'>
              <h3 className=' text-lg tracking-[0.03em] leading-[20px]  font-semibold mb-4 text-[#212121]'>
                Discount for Bulk Orders
              </h3>
              <p className=' font-light text-base'>
                Lorem ipsum dolor sit amt, consectetur adipiscing elit.
              </p>
            </div>
          </div>
          <div className='flex flex-col md:flex-row gap-10  '>
            <Image
              src={RandomImage}
              alt=' feature Image'
              className=' max-w-[285px] max-h-[350px] mx-auto'
            />
            <div className='flex flex-col gap-8 my-auto'>
              <p>
                This piece is ethically crafted in our small family-owned
                workshop in Peru with unmatched attention to detail and care.
                The Natural color is the actual natural color of the fiber,
                undyed and 100% traceable.
              </p>
              <Button
                asChild
                className=' rounded-none  w-fit py-5 font-semibold text-base bg-[#212121]'
              >
                <Link href='/products'>See All Products</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage
