import { CheckCircle2 } from 'lucide-react'
import Link from 'next/link'

export function Footer() {
    return (
        <footer className="w-full bg-gray-900 py-6 text-gray-300 md:py-12">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <CheckCircle2 className="h-6 w-6 text-violet-400" />
                            <span className="text-xl font-semibold text-white">
                                TaskMaster
                            </span>
                        </div>
                        <p className="text-sm text-gray-400">
                            Organize suas tarefas, aumente sua produtividade e
                            alcance seus objetivos com o TaskMaster.
                        </p>
                    </div>
                    <div>
                        <h3 className="mb-4 text-sm font-semibold text-white">
                            Produto
                        </h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link
                                    href="#features"
                                    className="text-gray-400 hover:text-white"
                                >
                                    Recursos
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#pricing"
                                    className="text-gray-400 hover:text-white"
                                >
                                    Preços
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="text-gray-400 hover:text-white"
                                >
                                    Integrações
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="text-gray-400 hover:text-white"
                                >
                                    Roadmap
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="mb-4 text-sm font-semibold text-white">
                            Empresa
                        </h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link
                                    href="#"
                                    className="text-gray-400 hover:text-white"
                                >
                                    Sobre nós
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="text-gray-400 hover:text-white"
                                >
                                    Blog
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="text-gray-400 hover:text-white"
                                >
                                    Carreiras
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="text-gray-400 hover:text-white"
                                >
                                    Contato
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="mb-4 text-sm font-semibold text-white">
                            Legal
                        </h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link
                                    href="#"
                                    className="text-gray-400 hover:text-white"
                                >
                                    Termos de Serviço
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="text-gray-400 hover:text-white"
                                >
                                    Política de Privacidade
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="text-gray-400 hover:text-white"
                                >
                                    Cookies
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="mt-8 border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
                    <p>© 2025 TaskMaster. Todos os direitos reservados.</p>
                </div>
            </div>
        </footer>
    )
}
