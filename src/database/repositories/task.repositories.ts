import { db } from '../prisma.service'
import { EnumStatus, PriorityEnum, type Prisma } from '@prisma/client'

export async function createTask(createDto: Prisma.TaskUncheckedCreateInput) {
    try {
        const task = await db.task.create({
            data: createDto,
        })
        return task
    } catch (error) {
        throw error
    }
}

export async function findTasks(userId: string) {
    return await db.task.findMany({
        where: {
            userId,
        },
        orderBy: [
            { favorite: 'desc' },
            { priority: 'asc' },
            { createdAt: 'desc' },
        ],
    })
}

export async function updateTask(
    id: string,
    updateDto: Prisma.TaskUpdateInput
) {
    return await db.task.update({
        where: { id },
        data: updateDto,
    })
}

export async function deleteTask(id: string) {
    return await db.task.delete({
        where: { id },
    })
}

export async function getDashboardStats(userId: string) {
    const [total, completed, inProgress, todo, highPriority] =
        await Promise.all([
            db.task.count({ where: { userId } }),
            db.task.count({ where: { userId, status: EnumStatus.DONE } }),
            db.task.count({
                where: { userId, status: EnumStatus.IN_PROGRESS },
            }),
            db.task.count({ where: { userId, status: EnumStatus.TODO } }),
            db.task.count({ where: { userId, priority: PriorityEnum.HIGH } }),
        ])

    return {
        total,
        completed,
        inProgress,
        todo,
        highPriority,
    }
}

export async function getRecentTasks(userId: string) {
    return await db.task.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
        take: 5,
    })
}

export async function getTasksByStatus(userId: string) {
    const tasks = await db.task.groupBy({
        by: ['status'],
        where: { userId },
        _count: true,
    })

    return tasks.map((item) => ({
        name: item.status,
        value: item._count,
    }))
}

export async function getTasksByPriority(userId: string) {
    const tasks = await db.task.groupBy({
        by: ['priority'],
        where: { userId },
        _count: true,
    })

    return tasks.map((item) => ({
        name: item.priority,
        value: item._count,
    }))
}
