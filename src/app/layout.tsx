import Navbar from '@/components/Navbar'
import './globals.css'
import { Sora } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
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
  return (
    <ClerkProvider>
      <html lang='en'>
        <body className='font-sora'>
          <Navbar />
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}
