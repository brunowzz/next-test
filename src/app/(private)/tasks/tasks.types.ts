import { $Enums } from '@prisma/client'

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

export interface TaskActionsProps {
    task: Task
    onEdit: (task: Task) => void
    onDuplicate: (task: Task) => void
    onDelete: (id: string) => void
}
