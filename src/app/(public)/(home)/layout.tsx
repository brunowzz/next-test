import type { Metadata } from 'next'

import { Footer } from './components/footer'
import { Header } from './components/header'

export const metadata: Metadata = {
    title: 'TaskMaster - Gerencie suas tarefas com eficiência',
    description:
        'Organize suas tarefas, aumente sua produtividade e alcance seus objetivos com o TaskMaster.',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <>
            <Header />
            {children}
            <Footer />
        </>
    )
}
