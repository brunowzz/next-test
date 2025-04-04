"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Copy, MoreHorizontal, Pencil, Plus, Star, Trash2 } from "lucide-react"
type TaskStatus = "A Fazer" | "Em Andamento" | "Concluída"
type TaskPriority = "Alta" | "Média" | "Baixa"

interface Task {
  id: string
  title: string
  description: string
  status: TaskStatus
  priority: TaskPriority
  favorite: boolean
  createdAt: string
}

export function TasksTable() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    if (typeof window !== "undefined") {
      const savedTasks = localStorage.getItem("tasks")
      return savedTasks ? JSON.parse(savedTasks) : []
    }
    return []
  })

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentTask, setCurrentTask] = useState<Task | null>(null)
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks))
  }, [tasks])

  const createTask = (task: Omit<Task, "id" | "favorite" | "createdAt">) => {
    const newTask: Task = {
      ...task,
      id: Date.now().toString(),
      favorite: false,
      createdAt: new Date().toISOString(),
    }
    setTasks([...tasks, newTask])
  }

  const updateTask = (id: string, updatedTask: Partial<Task>) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, ...updatedTask } : task)))
  }

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  const duplicateTask = (task: Task) => {
    const duplicatedTask: Task = {
      ...task,
      id: Date.now().toString(),
      title: `${task.title} (cópia)`,
      favorite: false,
      createdAt: new Date().toISOString(),
    }
    setTasks([...tasks, duplicatedTask])
  }

  const toggleFavorite = (id: string) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, favorite: !task.favorite } : task)))
  }

  const openTaskDialog = (task?: Task) => {
    if (task) {
      setCurrentTask(task)
      setIsEditing(true)
    } else {
      setCurrentTask({
        id: "",
        title: "",
        description: "",
        status: "A Fazer",
        priority: "Média",
        favorite: false,
        createdAt: "",
      })
      setIsEditing(false)
    }
    setIsDialogOpen(true)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!currentTask) return

    if (isEditing) {
      updateTask(currentTask.id, currentTask)
    } else {
      createTask(currentTask)
    }

    setIsDialogOpen(false)
  }

  const renderStatusBadge = (status: TaskStatus) => {
    switch (status) {
      case "A Fazer":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            A Fazer
          </Badge>
        )
      case "Em Andamento":
        return (
          <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
            Em Andamento
          </Badge>
        )
      case "Concluída":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Concluída
          </Badge>
        )
    }
  }

  const renderPriorityBadge = (priority: TaskPriority) => {
    switch (priority) {
      case "Alta":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            Alta
          </Badge>
        )
      case "Média":
        return (
          <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
            Média
          </Badge>
        )
      case "Baixa":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Baixa
          </Badge>
        )
    }
  }

  const sortedTasks = [...tasks].sort((a, b) => {
    if (a.favorite && !b.favorite) return -1
    if (!a.favorite && b.favorite) return 1

    const priorityOrder = { Alta: 0, Média: 1, Baixa: 2 }
    return priorityOrder[a.priority] - priorityOrder[b.priority]
  })

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Tarefas</h2>
        <Button onClick={() => openTaskDialog()} className="bg-violet-600 hover:bg-violet-700">
          <Plus className="mr-2 h-4 w-4" /> Nova Tarefa
        </Button>
      </div>

      <div className="rounded-md border shadow-sm bg-white">
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
            {sortedTasks.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  Nenhuma tarefa encontrada. Crie uma nova tarefa para começar.
                </TableCell>
              </TableRow>
            ) : (
              sortedTasks.map((task) => (
                <TableRow key={task.id}>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => toggleFavorite(task.id)}
                      className={task.favorite ? "text-yellow-500" : "text-muted-foreground"}
                    >
                      <Star className="h-4 w-4" fill={task.favorite ? "currentColor" : "none"} />
                    </Button>
                  </TableCell>
                  <TableCell className="font-medium">{task.title}</TableCell>
                  <TableCell className="max-w-[200px] truncate">{task.description}</TableCell>
                  <TableCell>{renderStatusBadge(task.status)}</TableCell>
                  <TableCell>{renderPriorityBadge(task.priority)}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Ações</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => openTaskDialog(task)}>
                          <Pencil className="mr-2 h-4 w-4" /> Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => duplicateTask(task)}>
                          <Copy className="mr-2 h-4 w-4" /> Duplicar
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => deleteTask(task.id)} className="text-red-600">
                          <Trash2 className="mr-2 h-4 w-4" /> Excluir
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Diálogo para criar/editar tarefa */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <form onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle>{isEditing ? "Editar Tarefa" : "Nova Tarefa"}</DialogTitle>
              <DialogDescription>
                {isEditing ? "Edite os detalhes da tarefa abaixo." : "Preencha os detalhes para criar uma nova tarefa."}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Título</Label>
                <Input
                  id="title"
                  value={currentTask?.title || ""}
                  onChange={(e) => setCurrentTask({ ...currentTask!, title: e.target.value })}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Descrição</Label>
                <Textarea
                  id="description"
                  value={currentTask?.description || ""}
                  onChange={(e) => setCurrentTask({ ...currentTask!, description: e.target.value })}
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={currentTask?.status}
                    onValueChange={(value) => setCurrentTask({ ...currentTask!, status: value as TaskStatus })}
                  >
                    <SelectTrigger id="status">
                      <SelectValue placeholder="Selecione o status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="A Fazer">A Fazer</SelectItem>
                      <SelectItem value="Em Andamento">Em Andamento</SelectItem>
                      <SelectItem value="Concluída">Concluída</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="priority">Prioridade</Label>
                  <Select
                    value={currentTask?.priority}
                    onValueChange={(value) => setCurrentTask({ ...currentTask!, priority: value as TaskPriority })}
                  >
                    <SelectTrigger id="priority">
                      <SelectValue placeholder="Selecione a prioridade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Alta">Alta</SelectItem>
                      <SelectItem value="Média">Média</SelectItem>
                      <SelectItem value="Baixa">Baixa</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancelar
              </Button>
              <Button type="submit" className="bg-violet-600 hover:bg-violet-700">
                {isEditing ? "Salvar Alterações" : "Criar Tarefa"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}

