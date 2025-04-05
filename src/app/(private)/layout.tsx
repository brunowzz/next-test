import { NextAuthProvider } from '../context/auth-provider'
import type { Metadata } from 'next'
import type React from 'react'

import { SidebarProvider } from '@/components/ui/sidebar'

import { AppSidebar } from './components/app-sidebar'
import { Header } from './components/header'

export const metadata: Metadata = {
    title: 'Dashboard - Gerenciador de Tarefas',
    description:
        'Um aplicativo moderno de gerenciamento de tarefas com análises e recursos avançados.',
}

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <NextAuthProvider>
            <SidebarProvider>
                <AppSidebar />
                <Header />
                <main className="mt-12 flex-1">{children}</main>
            </SidebarProvider>
        </NextAuthProvider>
    )
}
