'use server'

import { Prisma } from '@prisma/client'
import { revalidatePath, revalidateTag } from 'next/cache'

import { Task } from './tasks.types'
import {
    createTask,
    deleteTask,
    updateTask,
} from '@/database/repositories/task.repositories'

export async function onCreateTask(task: Prisma.TaskUncheckedCreateInput) {
    await createTask(task)
    revalidatePath('/tasks')
}

export async function onDeleteTask(id: string) {
    await deleteTask(id)
    revalidatePath('/tasks')
}

export async function onChangeTask(
    id: string,
    task: Prisma.TaskUncheckedCreateInput
) {
    await updateTask(id, task)
    revalidatePath('/tasks')
}

export async function onDuplicateTask(task: Task, userId: string) {
    await createTask({
        name: `${task.name} (cópia)`,
        description: task.description,
        status: task.status,
        priority: task.priority,
        favorite: false,
        userId: userId,
    })
    revalidatePath('/tasks')
}

export async function onFavoriteTask(id: string, favorite: boolean) {
    await updateTask(id, { favorite })
    revalidatePath('/tasks')
}
