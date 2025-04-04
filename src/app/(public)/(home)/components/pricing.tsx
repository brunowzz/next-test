import { plans } from '../mocks/plans'
import { CheckCircle2 } from 'lucide-react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

export function Pricing() {
    return (
        <section className="w-full py-12 md:py-24 lg:py-32" id="pricing">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="space-y-2">
                        <div className="inline-block rounded-lg bg-violet-100 px-3 py-1 text-sm text-violet-700">
                            Preços
                        </div>
                        <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                            Planos simples e transparentes
                        </h2>
                        <p className="text-muted-foreground max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                            Escolha o plano que melhor se adapta às suas
                            necessidades.
                        </p>
                    </div>
                </div>
                <div className="grid gap-6 pt-12 lg:grid-cols-3 lg:gap-8">
                    {plans.map((plan, index) => (
                        <Card
                            key={index}
                            className={`flex flex-col ${plan.cardStyle || ''}`}
                        >
                            <CardContent className="flex h-full flex-col justify-between p-6">
                                <div>
                                    <div className="mb-4 flex items-center justify-between">
                                        <h3 className="text-xl font-semibold">
                                            {plan.title}
                                        </h3>
                                        {plan.badge && (
                                            <div
                                                className={`inline-block rounded-lg px-3 py-1 text-sm ${plan.badge.style}`}
                                            >
                                                {plan.badge.text}
                                            </div>
                                        )}
                                    </div>
                                    <div className="mb-4">
                                        <span className="text-4xl font-bold">
                                            {plan.price}
                                        </span>
                                        <span className="text-muted-foreground">
                                            {plan.frequency}
                                        </span>
                                    </div>
                                    <ul className="mb-6 space-y-2 text-sm">
                                        {plan.features.map((feature, i) => (
                                            <li
                                                key={i}
                                                className="flex items-center"
                                            >
                                                <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <Link href="/login">
                                    <Button
                                        variant={plan.button.variant}
                                        size="lg"
                                        className={plan.button.style}
                                    >
                                        {plan.button.text}
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}
