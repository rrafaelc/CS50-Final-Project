export { default } from 'next-auth/middleware'

export const config = {
  matcher: [
    '/dashboard',
    '/about',
    '/account/edit',
    '/search/:path*',
    '/tv/:path*',
  ],
}
