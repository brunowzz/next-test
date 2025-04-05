import { compare } from 'bcryptjs'
import type { NextAuthConfig } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

import { db } from '@/database/prisma.service'
import { loginSchema } from '@/schemas/loginSchema'

export const authConfig = {
    providers: [
        Credentials({
            authorize: async (crendetials) => {
                const { success, data } = loginSchema.safeParse(crendetials)

                if (!success) {
                    return null
                }

                const { email, password } = data

                const user = await db.user.findUnique({ where: { email } })

                if (!user || !user.password) {
                    return null
                }

                const isPasswordValid = await compare(password, user.password)

                if (!isPasswordValid) {
                    return null
                }

                return {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                }
            },
        }),
    ],
} satisfies NextAuthConfig
