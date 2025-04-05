import { Task } from '../app/(private)/tasks/tasks.types'
import { EnumStatus } from '@prisma/client'

import { Badge } from '@/components/ui/badge'

export function TaskStatusBadge({ status }: { status: Task['status'] }) {
    switch (status) {
        case EnumStatus.TODO:
            return (
                <Badge
                    variant="outline"
                    className="border-blue-200 bg-blue-50 text-blue-700"
                >
                    A Fazer
                </Badge>
            )
        case EnumStatus.IN_PROGRESS:
            return (
                <Badge
                    variant="outline"
                    className="border-amber-200 bg-amber-50 text-amber-700"
                >
                    Em Andamento
                </Badge>
            )
        case EnumStatus.DONE:
            return (
                <Badge
                    variant="outline"
                    className="border-green-200 bg-green-50 text-green-700"
                >
                    Concluída
                </Badge>
            )
    }
}
