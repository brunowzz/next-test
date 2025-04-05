import { auth } from '@/lib/auth'

import { TasksTable } from './components/tasks-table'
import { Task } from './tasks.types'
import { findTasks } from '@/database/repositories/task.repositories'

async function getTasks(userId?: string): Promise<any[]> {
    if (!userId) {
        return []
    }

    return await findTasks(userId)
}

export default async function TasksPage() {
    const session = await auth()
    const userId = session?.user?.id
    const tasks = await getTasks(userId)

    return (
        <div className="flex-1 space-y-6 p-8">
            <TasksTable tasks={tasks} userId={userId || ''} />
        </div>
    )
}
