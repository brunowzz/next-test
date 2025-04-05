import { z } from 'zod'

export const registerSchema = z.object({
    name: z.string().min(1, 'Nome é obrigatório'),
    email: z.string().email('Email inválido'),
    password: z.string().min(8, 'A senha deve ter pelo menos 8 caracteres'),
    acceptTerms: z
        .boolean()
        .refine((val) => val, 'Você deve aceitar os termos'),
})
