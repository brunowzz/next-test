'use client'

import { TaskPriorityBadge } from '../../../../components/task-priority-badge'
import { TaskStatusBadge } from '../../../../components/task-status-badge'
import {
    onChangeTask,
    onCreateTask,
    onDeleteTask,
    onDuplicateTask,
    onFavoriteTask,
} from '../actions'
import { Task, TasksTableProps } from '../tasks.types'
import { Plus, Star } from 'lucide-react'
import type React from 'react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'

import { TaskActions } from './task-actions'
import { TaskDialog, TaskFormValues } from './task-dialog'

export function TasksTable({
    tasks = [],
    userId,
}: {
    tasks: TasksTableProps[]
    userId: string
}) {
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [currentTask, setCurrentTask] = useState<Task | null>(null)
    const [isEditing, setIsEditing] = useState(false)

    const openTaskDialog = (task?: Task) => {
        if (task) {
            setCurrentTask(task)
            setIsEditing(true)
        } else {
            setCurrentTask({
                id: '',
                name: '',
                description: '',
                status: 'TODO',
                priority: 'MEDIUM',
                favorite: false,
                userId: userId,
            } as Task)
            setIsEditing(false)
        }
        setIsDialogOpen(true)
    }

    const handleSubmit = async (e: TaskFormValues) => {
        if (!currentTask) return

        const updatedTask = {
            ...e,
            userId: userId,
        }

        if (isEditing) {
            await onChangeTask(currentTask.id, updatedTask)
        } else {
            await onCreateTask(updatedTask)
        }

        setIsDialogOpen(false)
    }

    return (
        <>
            <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold">Tarefas</h2>
                <Button
                    onClick={() => openTaskDialog()}
                    className="bg-violet-600 hover:bg-violet-700"
                >
                    <Plus className="mr-2 h-4 w-4" /> Nova Tarefa
                </Button>
            </div>

            <div className="rounded-md border bg-white shadow-sm">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[40px]"></TableHead>
                            <TableHead>Título</TableHead>
                            <TableHead>Descrição</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Prioridade</TableHead>
                            <TableHead className="text-right">Ações</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {tasks.length === 0 ? (
                            <TableRow>
                                <TableCell
                                    colSpan={6}
                                    className="text-muted-foreground py-8 text-center"
                                >
                                    Nenhuma tarefa encontrada. Crie uma nova
                                    tarefa para começar.
                                </TableCell>
                            </TableRow>
                        ) : (
                            tasks.map((task: any) => (
                                <TableRow key={task.id}>
                                    <TableCell>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={async () =>
                                                await onFavoriteTask(
                                                    task.id,
                                                    !task.favorite
                                                )
                                            }
                                            className={
                                                task.favorite
                                                    ? 'text-yellow-500'
                                                    : 'text-muted-foreground'
                                            }
                                        >
                                            <Star
                                                className="h-4 w-4"
                                                fill={
                                                    task.favorite
                                                        ? 'currentColor'
                                                        : 'none'
                                                }
                                            />
                                        </Button>
                                    </TableCell>
                                    <TableCell className="font-medium">
                                        {task.name}
                                    </TableCell>
                                    <TableCell className="max-w-[200px] truncate">
                                        {task.description}
                                    </TableCell>
                                    <TableCell>
                                        <TaskStatusBadge status={task.status} />
                                    </TableCell>
                                    <TableCell>
                                        <TaskPriorityBadge
                                            priority={task.priority}
                                        />
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <TaskActions
                                            task={task}
                                            onEdit={openTaskDialog}
                                            onDuplicate={async (task) =>
                                                await onDuplicateTask(
                                                    task,
                                                    userId
                                                )
                                            }
                                            onDelete={onDeleteTask}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            <TaskDialog
                isOpen={isDialogOpen}
                onOpenChange={setIsDialogOpen}
                currentTask={currentTask}
                isEditing={isEditing}
                onSubmit={handleSubmit}
            />
        </>
    )
}
