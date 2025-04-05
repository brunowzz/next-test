'use client'

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

import { ChartProps } from './dashboard-charts'

export interface DashboardChartsContentTasksProps {
    name: string
    value: number
    color: string
}

export function DashboardChartsContent({
    type,
    tasks,
}: {
    type: ChartProps['type']
    tasks: DashboardChartsContentTasksProps[]
}) {
    if (type === 'status') {
        return (
            <ChartContainer
                config={{
                    status: {
                        label: 'Status',
                    },
                    'A Fazer': {
                        label: 'A Fazer',
                        color: 'hsl(var(--chart-1))',
                    },
                    'Em Andamento': {
                        label: 'Em Andamento',
                        color: 'hsl(var(--chart-2))',
                    },
                    Concluída: {
                        label: 'Concluída',
                        color: 'hsl(var(--chart-3))',
                    },
                }}
                className="aspect-[2/1]"
            >
                <BarChart data={tasks}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip
                        content={<ChartTooltipContent labelKey="status" />}
                    />
                    <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                        {tasks.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                    </Bar>
                </BarChart>
            </ChartContainer>
        )
    }

    return (
        <ChartContainer
            config={{
                priority: {
                    label: 'Prioridade',
                },
                Alta: {
                    label: 'Alta',
                    color: 'hsl(var(--chart-1))',
                },
                Média: {
                    label: 'Média',
                    color: 'hsl(var(--chart-2))',
                },
                Baixa: {
                    label: 'Baixa',
                    color: 'hsl(var(--chart-3))',
                },
            }}
            className="aspect-[1/1]"
        >
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={tasks}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                    >
                        {tasks.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                    </Pie>
                    <Tooltip
                        content={<ChartTooltipContent labelKey="priority" />}
                    />
                </PieChart>
            </ResponsiveContainer>
        </ChartContainer>
    )
}
