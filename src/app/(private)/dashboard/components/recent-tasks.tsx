import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { ArrowRight, Link, Star } from 'lucide-react'

import { TaskPriorityBadge } from '@/components/task-priority-badge'
import { TaskStatusBadge } from '@/components/task-status-badge'
import { Button } from '@/components/ui/button'

import { getRecentTasks } from '@/database/repositories/task.repositories'

async function fetchRecentTasks(userId: string) {
    const tasks = await getRecentTasks(userId)
    return tasks
}

interface RecentTasksProps {
    userId: string
}

export async function RecentTasks({ userId }: RecentTasksProps) {
    const recentTasks = await fetchRecentTasks(userId)

    const formatRelativeDate = (dateString: string) => {
        try {
            return formatDistanceToNow(new Date(dateString), {
                addSuffix: true,
                locale: ptBR,
            })
        } catch (error) {
            return 'Data desconhecida'
        }
    }

    if (recentTasks.length === 0) {
        return (
            <div className="text-muted-foreground py-8 text-center">
                <p>Nenhuma tarefa encontrada.</p>
                <Button asChild variant="link" className="mt-2 text-violet-600">
                    <Link href="/tasks">
                        Criar uma nova tarefa{' '}
                        <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                </Button>
            </div>
        )
    }

    return (
        <div className="space-y-4">
            {recentTasks.map((task) => (
                <div
                    key={task.id}
                    className="bg-card flex items-center justify-between rounded-lg border p-4 shadow-sm transition-shadow hover:shadow-md"
                >
                    <div className="flex items-start gap-3">
                        {task.favorite && (
                            <Star
                                className="mt-1 h-4 w-4 text-yellow-500"
                                fill="currentColor"
                            />
                        )}
                        <div>
                            <h3 className="font-medium">{task.name}</h3>
                            <p className="text-muted-foreground line-clamp-1 text-sm">
                                {task.description}
                            </p>
                            <div className="mt-2 flex gap-2">
                                <TaskStatusBadge status={task.status} />
                                <TaskPriorityBadge priority={task.priority} />
                                <span className="text-muted-foreground mt-1 text-xs">
                                    {formatRelativeDate(
                                        task.createdAt.toString()
                                    )}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            ))}

            <div className="pt-4 text-center">
                <Button asChild variant="outline" className="text-violet-600">
                    <Link href="/tasks">
                        Ver todas as tarefas{' '}
                        <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                </Button>
            </div>
        </div>
    )
}
