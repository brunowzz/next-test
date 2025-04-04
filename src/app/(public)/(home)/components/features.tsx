import { features } from '../mocks/features'

export function Features() {
    return (
        <section className="w-full py-12 md:py-24 lg:py-32" id="features">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="space-y-2">
                        <div className="inline-block rounded-lg bg-violet-100 px-3 py-1 text-sm text-violet-700">
                            Recursos
                        </div>
                        <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                            Tudo o que você precisa para gerenciar suas tarefas
                        </h2>
                        <p className="text-muted-foreground max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                            TaskMaster oferece uma ampla gama de recursos para
                            ajudar você a organizar suas tarefas, acompanhar seu
                            progresso e aumentar sua produtividade.
                        </p>
                    </div>
                </div>
                <div className="grid gap-6 pt-8 md:grid-cols-2 lg:grid-cols-3">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-start gap-2 rounded-lg border bg-white p-6 shadow-sm"
                        >
                            <div className="rounded-full bg-violet-100 p-2 text-violet-600">
                                <feature.icon className="h-6 w-6" />
                            </div>
                            <h3 className="text-lg font-semibold">
                                {feature.title}
                            </h3>
                            <p className="text-muted-foreground text-sm">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
