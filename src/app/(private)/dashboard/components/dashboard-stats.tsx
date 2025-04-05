import { CheckCircle2, Circle, Clock, ListTodo } from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import { getDashboardStats } from '@/database/repositories/task.repositories'

async function loadStats(userId: string) {
    const data = await getDashboardStats(userId)
    return data
}

interface DashboardStatsProps {
    userId: string
}

export async function DashboardStats({ userId }: DashboardStatsProps) {
    const stats = await loadStats(userId)

    if (!stats) return null

    return (
        <>
            <Card className="shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Total de Tarefas
                    </CardTitle>
                    <ListTodo className="h-4 w-4 text-violet-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{stats.total}</div>
                </CardContent>
            </Card>
            <Card className="shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Concluídas
                    </CardTitle>
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{stats.completed}</div>
                    <p className="text-muted-foreground text-xs">
                        {stats.total > 0
                            ? `${Math.round((stats.completed / stats.total) * 100)}% do total`
                            : '0% do total'}
                    </p>
                </CardContent>
            </Card>
            <Card className="shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Em Andamento
                    </CardTitle>
                    <Clock className="h-4 w-4 text-amber-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{stats.inProgress}</div>
                </CardContent>
            </Card>
            <Card className="shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Prioridade Alta
                    </CardTitle>
                    <Circle className="h-4 w-4 text-red-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">
                        {stats.highPriority}
                    </div>
                </CardContent>
            </Card>
        </>
    )
}
