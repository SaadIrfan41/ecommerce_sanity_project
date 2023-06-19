import Image from 'next/image'
import React from 'react'
import Logo from '../../public/Logo.webp'
import { Facebook, Linkedin, Twitter } from 'lucide-react'
const Footer = () => {
  return (
    <div>
      <div className='grid md:grid-cols-4 grid-cols-1  gap-10 py-16 lg:px-32 px-10'>
        <div className=' flex flex-col gap-y-8'>
          <Image src={Logo} alt='Logo Image' />
          <p className=' text-[#666] text-base font-normal'>
            Small, artisan label that offers a thoughtfully curated collection
            of high quality everyday essentials made.
          </p>
          <div className='flex gap-x-4'>
            <div className=' py-3 px-3 bg-[#f1f1f1] rounded-xl'>
              <Twitter />
            </div>
            <div className=' py-3 px-3 bg-[#f1f1f1] rounded-xl'>
              <Facebook />
            </div>
            <div className=' py-3 px-3 bg-[#f1f1f1] rounded-xl'>
              <Linkedin />
            </div>
          </div>
        </div>
        <div className='text-[#666] flex flex-col lg:items-center '>
          <h3 className=' font-bold text-xl '>Company</h3>
          <ul className=' flex flex-col gap-4 '>
            <li className=' mt-4 '>About</li>
            <li className=' '>Terms of Use</li>
            <li className=' '>Privacy Policy</li>
            <li className=' '>How it Works</li>
            <li className=' '>Contact Us</li>
          </ul>
        </div>
        <div className='text-[#666] flex flex-col lg:items-center'>
          <h3 className=' font-bold text-xl '>Support</h3>
          <ul className=' flex flex-col gap-4 '>
            <li className=' mt-4 '>Support Carrer</li>
            <li className=' '>24h Service</li>
            <li className=' '>Quick Chat</li>
          </ul>
        </div>
        <div className='text-[#666] flex flex-col lg:items-center '>
          <h3 className=' font-bold text-xl '>Contact</h3>
          <ul className=' flex flex-col gap-4 '>
            <li className=' mt-4 '>Whatsapp</li>
            <li className=' '>Support 24h</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Footer
