import { EnumStatus, PriorityEnum } from '@prisma/client'
import {
    Bar,
    BarChart,
    Cell,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts'

import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart'

import {
    DashboardChartsContent,
    DashboardChartsContentTasksProps,
} from './dashboard-charts-content'
import {
    getTasksByPriority,
    getTasksByStatus,
} from '@/database/repositories/task.repositories'

interface Task {
    id: string
    title: string
    description: string
    status: 'A Fazer' | 'Em Andamento' | 'Concluída'
    priority: 'Alta' | 'Média' | 'Baixa'
    favorite: boolean
    createdAt: string
}

async function getTasks(
    userId: string
): Promise<DashboardChartsContentTasksProps[]> {
    const tasks = await getTasksByStatus(userId)

    const todoTasks = tasks.filter((task) => task.name === EnumStatus.TODO)
    const inProgressTasks = tasks.filter(
        (task) => task.name === EnumStatus.IN_PROGRESS
    )
    const completedTasks = tasks.filter((task) => task.name === EnumStatus.DONE)

    return [
        { name: 'A Fazer', value: todoTasks.length, color: '#3b82f6' },
        {
            name: 'Em Andamento',
            value: inProgressTasks.length,
            color: '#f59e0b',
        },
        { name: 'Concluída', value: completedTasks.length, color: '#10b981' },
    ]
}

async function fetchTasksByPriority(
    userId: string
): Promise<DashboardChartsContentTasksProps[]> {
    const tasks = await getTasksByPriority(userId)

    const highPriorityTasks = tasks.filter(
        (task) => task.name === PriorityEnum.HIGH
    )
    const mediumPriorityTasks = tasks.filter(
        (task) => task.name === PriorityEnum.MEDIUM
    )
    const lowPriorityTasks = tasks.filter(
        (task) => task.name === PriorityEnum.LOW
    )

    return [
        { name: 'Alta', value: highPriorityTasks.length, color: '#ef4444' },
        { name: 'Média', value: mediumPriorityTasks.length, color: '#f59e0b' },
        { name: 'Baixa', value: lowPriorityTasks.length, color: '#10b981' },
    ]
}

export interface ChartProps {
    type?: 'status' | 'priority'
    userId: string
}

export async function DashboardCharts({ type = 'status', userId }: ChartProps) {
    const tasks = await getTasks(userId)
    const priority = await fetchTasksByPriority(userId)

    const propsMap = {
        status: tasks,
        priority: priority,
    }

    return <DashboardChartsContent tasks={propsMap[type]} type={type} />
}
