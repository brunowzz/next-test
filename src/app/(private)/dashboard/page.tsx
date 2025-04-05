import Link from 'next/link'

import { auth } from '@/lib/auth'

import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'

import { DashboardCharts } from './components/dashboard-charts'
import { DashboardStats } from './components/dashboard-stats'
import { RecentTasks } from './components/recent-tasks'

export default async function DashboardPage() {
    const session = await auth()
    const userId = session?.user?.id

    if (!userId) {
        return null
    }

    return (
        <div className="flex-1 space-y-6 p-8">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>

                <Button variant="outline" className="text-violet-600" asChild>
                    <Link href="/tasks">Ver todas as tarefas</Link>
                </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <DashboardStats userId={userId} />
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Tarefas por Status</CardTitle>
                        <CardDescription>
                            Distribuição de tarefas por status atual
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex h-full items-center pl-2">
                        <DashboardCharts userId={userId} />
                    </CardContent>
                </Card>
                <Card className="col-span-3">
                    <CardHeader>
                        <CardTitle>Tarefas por Prioridade</CardTitle>
                        <CardDescription>
                            Distribuição de tarefas por nível de prioridade
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <DashboardCharts type="priority" userId={userId} />
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-1">
                <Card>
                    <CardHeader>
                        <CardTitle>Tarefas Recentes</CardTitle>
                        <CardDescription>
                            Suas tarefas mais recentes e seu progresso
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <RecentTasks userId={userId} />
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
