import { $Enums } from '@prisma/client'
import { z } from 'zod'

import { taskFormSchema } from './schemas/task.schema'

export type TaskStatus = 'A Fazer' | 'Em Andamento' | 'Concluída'
export type TaskPriority = 'Alta' | 'Média' | 'Baixa'

export interface Task {
    id: string
    favorite: boolean
    createdAt?: Date
    status: $Enums.EnumStatus
    name: string
    description: string | null
    priority: $Enums.PriorityEnum
    updatedAt?: Date
    userId: string
}

export interface TasksTableProps {
    tasks: Task[]
}

export type TaskFormValues = z.infer<typeof taskFormSchema>

export interface TaskDialogProps {
    isOpen: boolean
    onOpenChange: (open: boolean) => void
    currentTask: Task | null
    isEditing: boolean
    onSubmit: (values: TaskFormValues) => Promise<void>
}

export interface TaskActionsProps {
    task: Task
    onEdit: (task: Task) => void
    onDuplicate: (task: Task) => void
    onDelete: (id: string) => void
}
