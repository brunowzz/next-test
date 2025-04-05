'use server'

import { z } from 'zod'

import { signIn } from '@/lib/auth'

import { userSchema } from './schemas/login.schemas'

export async function signInAction(formData: z.infer<typeof userSchema>) {
    try {
        await signIn('credentials', {
            ...formData,
            redirect: false,
        })

        return { success: true }
    } catch (error) {
        return {
            error: 'Invalid credentials',
        }
    }
}
