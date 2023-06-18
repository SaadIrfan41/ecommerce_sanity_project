import Navbar from '@/components/Navbar'
import './globals.css'
import { Sora } from 'next/font/google'
import { ClerkProvider, auth } from '@clerk/nextjs'
import ToasterComponent from '@/lib/Toaster'
const sora = Sora({ subsets: ['latin'] })

export const metadata = {
  title: 'Dine Market',
  description: 'Ecommerce Shopping App',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { userId } = auth()
  return (
    <ClerkProvider>
      <html lang='en'>
        <body className='font-sora'>
          <Navbar userId={userId || ''} />
          {children}
          <ToasterComponent />
        </body>
      </html>
    </ClerkProvider>
  )
}
