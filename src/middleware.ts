import NextAuth from 'next-auth'
import { NextResponse } from 'next/server'

import { authConfig } from './lib/auth/config'

const { auth } = NextAuth(authConfig)

const privateRoutes = ['/dashboard', 'tasks']

export default auth((request) => {
    const isLogged = !!request.auth
    const { pathname } = request.nextUrl
    const isPrivatePath = privateRoutes.some((route) =>
        pathname.includes(route)
    )

    if (isLogged && !isPrivatePath) {
        return NextResponse.redirect(new URL('/dashboard', request.nextUrl))
    }

    if (!isLogged && isPrivatePath) {
        return NextResponse.redirect(new URL('/login', request.nextUrl))
    }
})

export const config = {
    matcher: [
        '/login',
        '/register',
        '/dashboard',
        '/dashboard/:path',
        '/tasks',
        '/tasks/:path',
    ],
}
