export interface DashboardChartsContentTasksProps {
    name: string
    value: number
    color: string
}

export interface DashboardStatsProps {
    userId: string
}

export interface RecentTasksProps {
    userId: string
}

export interface ChartProps {
    type?: 'status' | 'priority'
    userId: string
}
