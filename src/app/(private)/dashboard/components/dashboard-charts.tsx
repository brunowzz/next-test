"use client"

import { useEffect, useState } from "react"
import { Bar, BarChart, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"

interface Task {
  id: string
  title: string
  description: string
  status: "A Fazer" | "Em Andamento" | "Concluída"
  priority: "Alta" | "Média" | "Baixa"
  favorite: boolean
  createdAt: string
}

interface ChartProps {
  type?: "status" | "priority"
}

export function DashboardCharts({ type = "status" }: ChartProps) {
  const [data, setData] = useState<any[]>([])

  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks")
    const tasks: Task[] = savedTasks ? JSON.parse(savedTasks) : []

    if (type === "status") {

      const todoCount = tasks.filter((task) => task.status === "A Fazer").length
      const inProgressCount = tasks.filter((task) => task.status === "Em Andamento").length
      const completedCount = tasks.filter((task) => task.status === "Concluída").length

      setData([
        { name: "A Fazer", value: todoCount, color: "#3b82f6" },
        { name: "Em Andamento", value: inProgressCount, color: "#f59e0b" },
        { name: "Concluída", value: completedCount, color: "#10b981" },
      ])
    } else {

      const highCount = tasks.filter((task) => task.priority === "Alta").length
      const mediumCount = tasks.filter((task) => task.priority === "Média").length
      const lowCount = tasks.filter((task) => task.priority === "Baixa").length

      setData([
        { name: "Alta", value: highCount, color: "#ef4444" },
        { name: "Média", value: mediumCount, color: "#f97316" },
        { name: "Baixa", value: lowCount, color: "#22c55e" },
      ])
    }
  }, [type])

  if (type === "status") {
    return (
      <ChartContainer
        config={{
          status: {
            label: "Status",
          },
          "A Fazer": {
            label: "A Fazer",
            color: "hsl(var(--chart-1))",
          },
          "Em Andamento": {
            label: "Em Andamento",
            color: "hsl(var(--chart-2))",
          },
          Concluída: {
            label: "Concluída",
            color: "hsl(var(--chart-3))",
          },
        }}
        className="aspect-[2/1]"
      >
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip content={<ChartTooltipContent labelKey="status" />} />
          <Bar dataKey="value" radius={[4, 4, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ChartContainer>
    )
  }

  return (
    <ChartContainer
      config={{
        priority: {
          label: "Prioridade",
        },
        Alta: {
          label: "Alta",
          color: "hsl(var(--chart-1))",
        },
        Média: {
          label: "Média",
          color: "hsl(var(--chart-2))",
        },
        Baixa: {
          label: "Baixa",
          color: "hsl(var(--chart-3))",
        },
      }}
      className="aspect-[1/1]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<ChartTooltipContent labelKey="priority" />} />
        </PieChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}

