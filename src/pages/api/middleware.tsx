import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value
  const isLoginPage = request.nextUrl.pathname === '/login'
  const isRegisterPage = request.nextUrl.pathname === '/register'

  // Allow access to login and register pages when not authenticated
  if ((isLoginPage || isRegisterPage) && !token) {
    return NextResponse.next()
  }

  // Redirect to login if no token and trying to access protected routes
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Redirect to home if authenticated user tries to access login/register
  if ((isLoginPage || isRegisterPage) && token) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/',
    '/login',
    '/register',
    '/cart',
    '/categories/:path*'
  ]
}
