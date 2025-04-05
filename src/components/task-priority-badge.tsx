import { Task } from '../app/(private)/tasks/tasks.types'
import { PriorityEnum } from '@prisma/client'

import { Badge } from '@/components/ui/badge'

export function TaskPriorityBadge({
    priority,
}: {
    priority: Task['priority']
}) {
    switch (priority) {
        case PriorityEnum.HIGH:
            return (
                <Badge
                    variant="outline"
                    className="border-red-200 bg-red-50 text-red-700"
                >
                    Alta
                </Badge>
            )
        case PriorityEnum.MEDIUM:
            return (
                <Badge
                    variant="outline"
                    className="border-orange-200 bg-orange-50 text-orange-700"
                >
                    Média
                </Badge>
            )
        case PriorityEnum.LOW:
            return (
                <Badge
                    variant="outline"
                    className="border-green-200 bg-green-50 text-green-700"
                >
                    Baixa
                </Badge>
            )
    }
}
