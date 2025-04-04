"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { formatDistanceToNow } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, Star } from "lucide-react"

interface Task {
  id: string
  title: string
  description: string
  status: "A Fazer" | "Em Andamento" | "Concluída"
  priority: "Alta" | "Média" | "Baixa"
  favorite: boolean
  createdAt: string
}

export function RecentTasks() {
  const [recentTasks, setRecentTasks] = useState<Task[]>([])

  useEffect(() => {
    // Carregar tarefas do localStorage
    const savedTasks = localStorage.getItem("tasks")
    const tasks: Task[] = savedTasks ? JSON.parse(savedTasks) : []

    // Ordenar por data de criação (mais recentes primeiro) e pegar as 5 primeiras
    const sorted = [...tasks]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 5)

    setRecentTasks(sorted)
  }, [])

  // Renderizar badge de status com cores diferentes
  const renderStatusBadge = (status: Task["status"]) => {
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

  // Renderizar badge de prioridade com cores diferentes
  const renderPriorityBadge = (priority: Task["priority"]) => {
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

  // Formatar data relativa
  const formatRelativeDate = (dateString: string) => {
    try {
      return formatDistanceToNow(new Date(dateString), {
        addSuffix: true,
        locale: ptBR,
      })
    } catch (error) {
      return "Data desconhecida"
    }
  }

  if (recentTasks.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <p>Nenhuma tarefa encontrada.</p>
        <Button asChild variant="link" className="mt-2 text-violet-600">
          <Link href="/dashboard/tasks">
            Criar uma nova tarefa <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {recentTasks.map((task) => (
        <div
          key={task.id}
          className="flex items-center justify-between p-4 rounded-lg border bg-card shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex items-start gap-3">
            {task.favorite && <Star className="h-4 w-4 text-yellow-500 mt-1" fill="currentColor" />}
            <div>
              <h3 className="font-medium">{task.title}</h3>
              <p className="text-sm text-muted-foreground line-clamp-1">{task.description}</p>
              <div className="flex gap-2 mt-2">
                {renderStatusBadge(task.status)}
                {renderPriorityBadge(task.priority)}
                <span className="text-xs text-muted-foreground mt-1">{formatRelativeDate(task.createdAt)}</span>
              </div>
            </div>
          </div>
        </div>
      ))}

      <div className="text-center pt-4">
        <Button asChild variant="outline" className="text-violet-600">
          <Link href="/dashboard/tasks">
            Ver todas as tarefas <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  )
}

