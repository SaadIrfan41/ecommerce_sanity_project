import { SignIn } from '@clerk/nextjs/app-beta'
import { Suspense } from 'react'
const Page = async ({ searchParams }: any) => {
  const { redirectUrl } = searchParams

  return (
    <section className='py-24'>
      <div className='container'>
        <div className='flex justify-center'>
          <SignIn redirectUrl={redirectUrl || '/'} />
        </div>
      </div>
    </section>
  )
}

export default Page
