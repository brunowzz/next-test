import { CheckCircle2, ChevronRight } from 'lucide-react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'

export function Hero() {
    return (
        <section className="w-full bg-gradient-to-br from-violet-50 to-indigo-50 py-12 md:py-24 lg:py-32">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:gap-16">
                    <div className="flex flex-col justify-center space-y-4">
                        <div className="space-y-2">
                            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                                Organize suas tarefas, aumente sua produtividade
                            </h1>
                            <p className="text-muted-foreground max-w-[600px] md:text-xl">
                                TaskMaster é a ferramenta definitiva para
                                gerenciar suas tarefas diárias, projetos e metas
                                de forma eficiente.
                            </p>
                        </div>
                        <div className="flex flex-col gap-2 min-[400px]:flex-row">
                            <Link href="#lead-form">
                                <Button
                                    size="lg"
                                    className="bg-violet-600 hover:bg-violet-700"
                                >
                                    Começar Grátis
                                    <ChevronRight className="ml-1 h-4 w-4" />
                                </Button>
                            </Link>
                            <Link href="#features">
                                <Button size="lg" variant="outline">
                                    Saiba Mais
                                </Button>
                            </Link>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                            <span>Teste grátis por 14 dias</span>
                            <span className="mx-2">•</span>
                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                            <span>Sem necessidade de cartão de crédito</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
