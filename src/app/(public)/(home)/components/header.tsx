import { CheckCircle2 } from 'lucide-react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'

export function Header() {
    return (
        <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
            <div className="container mx-auto px-4 flex h-16 items-center justify-between">
                <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-6 w-6 text-violet-600" />
                    <span className="text-xl font-semibold">TaskMaster</span>
                </div>
                <nav className="hidden gap-6 md:flex">
                    <Link
                        href="#features"
                        className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
                    >
                        Recursos
                    </Link>
                    <Link
                        href="#testimonials"
                        className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
                    >
                        Depoimentos
                    </Link>
                    <Link
                        href="#pricing"
                        className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
                    >
                        Preços
                    </Link>
                    <Link
                        href="#faq"
                        className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
                    >
                        FAQ
                    </Link>
                </nav>
                <div className="flex items-center gap-4">
                    <Link href="/login">
                        <Button variant="ghost" size="sm">
                            Entrar
                        </Button> 
                    </Link>
                    <Link href="/register">
                        <Button
                            size="sm"
                            className="bg-violet-600 hover:bg-violet-700"
                        >
                            Criar Conta
                        </Button>
                    </Link>
                </div>
            </div>
        </header>
    )
}
