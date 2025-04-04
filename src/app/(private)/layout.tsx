import type React from "react"
import type { Metadata } from "next"
import { SidebarProvider } from "@/components/ui/sidebar"

import { AppSidebar } from "./components/app-sidebar"
import { UserNav } from "./components/user-nav"
import { Header } from "./components/header"

export const metadata: Metadata = {
  title: "Dashboard - Gerenciador de Tarefas",
  description: "Um aplicativo moderno de gerenciamento de tarefas com análises e recursos avançados.",
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
        <AppSidebar />
        <Header /> 
        <main className="flex-1 mt-12">{children}</main>
    </SidebarProvider>
  )
}

