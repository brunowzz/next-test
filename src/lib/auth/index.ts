import { PrismaAdapter } from '@auth/prisma-adapter'
import NextAuth from 'next-auth'

import { authConfig } from './config'
import { db } from '@/database/prisma.service'

export const { auth, signIn, signOut, handlers } = NextAuth({
    session: {
        strategy: 'jwt',
    },
    pages: {
        error: '/error',
        signIn: '/login',
    },
    secret: process.env.NEXTAUTH_SECRET,
    adapter: PrismaAdapter(db),
    callbacks: {
        signIn() {
            console.log('signIn callback')
            return true
        },
        async jwt({ token }) {
            if (!token.sub) {
                return token
            }

            const user = await db.user.findUnique({ where: { id: token.sub } })

            token.user = user

            return token
        },
        session({ session, token }) {
            console.log('Session Callback')

            if (token.sub) {
                session.user.id = token.sub
            }

            console.log(token)

            return session
        },
    },
    ...authConfig,
})
