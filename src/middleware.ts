import { authMiddleware } from '@clerk/nextjs'

export default authMiddleware({
  publicRoutes: [
    '/',
    '/products/:path*',
    '/category/:path*',
    '/api/cart/:path*',
    '/studio/:path*',
    '/api/webhooks/:path*',
  ],
})

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
}
