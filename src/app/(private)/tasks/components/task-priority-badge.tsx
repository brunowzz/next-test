import { Task } from '../tasks.types'
import { Badge } from '@/components/ui/badge'

export function TaskPriorityBadge({ priority }: { priority: Task['priority'] }) {
    switch (priority) {
        case 'HIGH':
            return (
                <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                    Alta
                </Badge>
            )
        case 'MEDIUM':
            return (
                <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
                    Média
                </Badge>
            )
        case 'LOW':
            return (
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    Baixa
                </Badge>
            )
    }
}