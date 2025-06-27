import { NextRequest, NextResponse } from 'next/server'
import { decrypt } from '@/lib/session'

const protectedRoutes = ['/dashboard', '/profile', '/properties', '/tenants', '/transactions', '/owners']
const publicRoutes = ['/auth/login', '/']

export default async function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname
    const isProtectedRoute = protectedRoutes.some((route) => path === route || path.startsWith(`${route}/`))
    const isPublicRoute = publicRoutes.includes(path)

    const cookie = req.cookies.get('session')?.value
    const session = cookie ? await decrypt(cookie) : null

    if (isProtectedRoute && !session?.userId) {
        return NextResponse.redirect(new URL('/auth/login', req.nextUrl))
    }

    if (path === '/auth/login' && session?.userId) {
        return NextResponse.redirect(new URL('/dashboard', req.nextUrl))
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
