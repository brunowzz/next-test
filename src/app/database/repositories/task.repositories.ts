import { Prisma, PrismaClient, Task } from '@prisma/client'

export class TaskRepository {
    private prisma: PrismaClient

    constructor() {
        this.prisma = new PrismaClient()
    }

    async createTask(data: Prisma.TaskCreateInput): Promise<Task> {
        return this.prisma.task.create({
            data,
        })
    }

    async getTaskById(id: string): Promise<Task | null> {
        return this.prisma.task.findUnique({
            where: { id },
        })
    }

    async getAllTasks(): Promise<Task[]> {
        return this.prisma.task.findMany()
    }

    async updateTask(data: Prisma.TaskUpdateArgs): Promise<Task> {
        const { id, ...updateData } = data.data as Prisma.TaskUpdateInput
        if (typeof id !== 'string') {
            throw new Error('Invalid id: id must be a string')
        }
        return this.prisma.task.update({
            where: { id },
            data: updateData,
        })
    }

    async deleteTask(id: string): Promise<Task> {
        return this.prisma.task.delete({
            where: { id },
        })
    }
}
