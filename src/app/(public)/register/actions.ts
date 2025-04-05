'use server'

import { hash } from 'bcryptjs'
import { z } from 'zod'

import { registerSchema } from './schemas/register.schemas'
import {
    createUser,
    findUniqueUser,
} from '@/database/repositories/user.repositories'

export async function registerUser(values: z.infer<typeof registerSchema>) {
    const { email, name, password } = values

    const isEmailUsed = await findUniqueUser({
        where: { email },
        select: { email: true },
    })

    if (isEmailUsed) {
        return {
            error: 'Email already exists',
        }
    }

    const hashedPassword = await hash(password, 12)

    const user = await createUser({
        data: {
            email,
            name,
            password: hashedPassword,
        },
    })

    if (!user) {
        return {
            error: 'Something went wrong',
        }
    }

    return { success: true }
}
