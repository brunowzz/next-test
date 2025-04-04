import { testimonials } from '../mocks/testimonials'
import { Star } from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent } from '@/components/ui/card'

export function Depositions() {
    return (
        <section
            className="w-full bg-gradient-to-br from-violet-50 to-indigo-50 py-12 md:py-24 lg:py-32"
            id="testimonials"
        >
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="space-y-2">
                        <div className="inline-block rounded-lg bg-violet-100 px-3 py-1 text-sm text-violet-700">
                            Depoimentos
                        </div>
                        <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                            O que nossos usuários dizem
                        </h2>
                        <p className="text-muted-foreground max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                            Milhares de profissionais e equipes já transformaram
                            sua produtividade com o TaskMaster.
                        </p>
                    </div>
                </div>
                <div className="grid gap-6 pt-8 md:grid-cols-2 lg:grid-cols-3">
                    {testimonials.map((testimonial, index) => (
                        <Card key={index} className="border-0 shadow-md">
                            <CardContent className="p-6">
                                <div className="mb-4 flex gap-0.5">
                                    {Array.from({
                                        length: testimonial.stars,
                                    }).map((_, i) => (
                                        <Star
                                            key={i}
                                            className="h-5 w-5 fill-yellow-400 text-yellow-400"
                                        />
                                    ))}
                                </div>
                                <p className="text-muted-foreground mb-6">
                                    {testimonial.text}
                                </p>
                                <div className="flex items-center gap-4">
                                    <Avatar>
                                        <AvatarImage
                                            src={testimonial.avatar.src}
                                            alt="Avatar"
                                        />
                                        <AvatarFallback>
                                            {testimonial.avatar.fallback}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="text-sm font-medium">
                                            {testimonial.name}
                                        </p>
                                        <p className="text-muted-foreground text-xs">
                                            {testimonial.role}
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}
