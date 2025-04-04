"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, Circle, Clock, ListTodo } from "lucide-react"

interface Task {
  id: string
  title: string
  description: string
  status: "A Fazer" | "Em Andamento" | "Concluída"
  priority: "Alta" | "Média" | "Baixa"
  favorite: boolean
  createdAt: string
}

export function DashboardStats() {
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    inProgress: 0,
    todo: 0,
    highPriority: 0,
  })

  useEffect(() => {
    // Carregar tarefas do localStorage
    const savedTasks = localStorage.getItem("tasks")
    const tasks: Task[] = savedTasks ? JSON.parse(savedTasks) : []

    // Calcular estatísticas
    const completed = tasks.filter((task) => task.status === "Concluída").length
    const inProgress = tasks.filter((task) => task.status === "Em Andamento").length
    const todo = tasks.filter((task) => task.status === "A Fazer").length
    const highPriority = tasks.filter((task) => task.priority === "Alta").length

    setStats({
      total: tasks.length,
      completed,
      inProgress,
      todo,
      highPriority,
    })
  }, [])

  return (
    <>
      <Card className="shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total de Tarefas</CardTitle>
          <ListTodo className="h-4 w-4 text-violet-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.total}</div>
        </CardContent>
      </Card>
      <Card className="shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Concluídas</CardTitle>
          <CheckCircle2 className="h-4 w-4 text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.completed}</div>
          <p className="text-xs text-muted-foreground">
            {stats.total > 0 ? `${Math.round((stats.completed / stats.total) * 100)}% do total` : "0% do total"}
          </p>
        </CardContent>
      </Card>
      <Card className="shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Em Andamento</CardTitle>
          <Clock className="h-4 w-4 text-amber-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.inProgress}</div>
        </CardContent>
      </Card>
      <Card className="shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Prioridade Alta</CardTitle>
          <Circle className="h-4 w-4 text-red-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.highPriority}</div>
        </CardContent>
      </Card>
    </>
  )
}

