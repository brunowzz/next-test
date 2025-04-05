import { Task } from '../tasks.types'
import { Badge } from '@/components/ui/badge'

export function TaskStatusBadge({ status }: { status: Task['status'] }) {
    switch (status) {
        case 'TODO':
            return (
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                    A Fazer
                </Badge>
            )
        case 'IN_PROGRESS':
            return (
                <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                    Em Andamento
                </Badge>
            )
        case 'DONE':
            return (
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    Concluída
                </Badge>
            )
    }
}