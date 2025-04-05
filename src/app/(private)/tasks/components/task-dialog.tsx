'use client'

import { Task } from '../tasks.types'
import { zodResolver } from '@hookform/resolvers/zod'
import { EnumStatus, PriorityEnum } from '@prisma/client'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'

const taskFormSchema = z.object({
    name: z.string().min(1, 'O título é obrigatório'),
    description: z.string().optional(),
    status: z.nativeEnum(EnumStatus, {
        required_error: 'Por favor selecione um status',
    }),
    priority: z.nativeEnum(PriorityEnum, {
        required_error: 'Por favor selecione uma prioridade',
    }),
})

export type TaskFormValues = z.infer<typeof taskFormSchema>

interface TaskDialogProps {
    isOpen: boolean
    onOpenChange: (open: boolean) => void
    currentTask: Task | null
    isEditing: boolean
    onSubmit: (values: TaskFormValues) => Promise<void>
}

export function TaskDialog({
    isOpen,
    onOpenChange,
    currentTask,
    isEditing,
    onSubmit,
}: TaskDialogProps) {
    const form = useForm<TaskFormValues>({
        resolver: zodResolver(taskFormSchema),
        defaultValues: {
            name: currentTask?.name || '',
            description: currentTask?.description || '',
            status: currentTask?.status || EnumStatus.TODO,
            priority: currentTask?.priority || PriorityEnum.MEDIUM,
        },
    })

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px]">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <DialogHeader>
                            <DialogTitle>
                                {isEditing ? 'Editar Tarefa' : 'Nova Tarefa'}
                            </DialogTitle>
                            <DialogDescription>
                                {isEditing
                                    ? 'Edite os detalhes da tarefa abaixo.'
                                    : 'Preencha os detalhes para criar uma nova tarefa.'}
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Título</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Descrição</FormLabel>
                                        <FormControl>
                                            <Textarea {...field} rows={3} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="grid grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="status"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Status</FormLabel>
                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                            >
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Selecione o status" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem
                                                        value={EnumStatus.TODO}
                                                    >
                                                        A Fazer
                                                    </SelectItem>
                                                    <SelectItem
                                                        value={
                                                            EnumStatus.IN_PROGRESS
                                                        }
                                                    >
                                                        Em Andamento
                                                    </SelectItem>
                                                    <SelectItem
                                                        value={EnumStatus.DONE}
                                                    >
                                                        Concluída
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="priority"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Prioridade</FormLabel>
                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                            >
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Selecione a prioridade" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem
                                                        value={
                                                            PriorityEnum.HIGH
                                                        }
                                                    >
                                                        Alta
                                                    </SelectItem>
                                                    <SelectItem
                                                        value={
                                                            PriorityEnum.MEDIUM
                                                        }
                                                    >
                                                        Média
                                                    </SelectItem>
                                                    <SelectItem
                                                        value={PriorityEnum.LOW}
                                                    >
                                                        Baixa
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => onOpenChange(false)}
                            >
                                Cancelar
                            </Button>
                            <Button
                                type="submit"
                                className="bg-violet-600 hover:bg-violet-700"
                            >
                                {isEditing
                                    ? 'Salvar Alterações'
                                    : 'Criar Tarefa'}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
