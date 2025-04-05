import { EnumStatus, PriorityEnum } from '@prisma/client'
import { z } from 'zod'

export const taskFormSchema = z.object({
    name: z.string().min(1, 'O título é obrigatório'),
    description: z.string().optional(),
    status: z.nativeEnum(EnumStatus, {
        required_error: 'Por favor selecione um status',
    }),
    priority: z.nativeEnum(PriorityEnum, {
        required_error: 'Por favor selecione uma prioridade',
    }),
})
