import { authMiddleware } from '@clerk/nextjs'

export default authMiddleware({
  publicRoutes: ['/', '/products/:path*', '/studio/:path*'],
})

export const config = {
  matcher: [
    '/((?!.*\\..*|_next).*)',
    '/',
    '/products/:path*,/studio/:path*',
    '/(api|trpc)(.*)',
  ],
}
