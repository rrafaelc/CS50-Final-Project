export { default } from 'next-auth/middleware'

export const config = {
  matcher: ['/dashboard', '/account/edit', '/search/:path*', '/tv/:path*'],
}
