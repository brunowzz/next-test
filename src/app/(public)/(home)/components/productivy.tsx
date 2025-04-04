import { ChevronRight } from 'lucide-react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'

export function Productivity() {
    return (
        <section className="w-full bg-violet-600 py-12 text-white md:py-24 lg:py-32">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="space-y-2">
                        <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                            Pronto para aumentar sua produtividade?
                        </h2>
                        <p className="max-w-[600px] text-violet-100 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                            Junte-se a milhares de usuários que já transformaram
                            sua forma de trabalhar com o TaskMaster.
                        </p>
                    </div>
                    <div className="flex flex-col gap-2 min-[400px]:flex-row">
                        <Link href="#lead-form">
                            <Button
                                size="lg"
                                className="bg-white text-violet-600 hover:bg-violet-50"
                            >
                                Começar Grátis
                                <ChevronRight className="ml-1 h-4 w-4" />
                            </Button>
                        </Link>
                        <Link href="/login">
                            <Button
                                size="lg"
                                className="bg-white text-violet-600 hover:bg-violet-50"
                            >
                                Fazer Login
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}
