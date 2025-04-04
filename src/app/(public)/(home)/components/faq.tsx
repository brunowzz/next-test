import { faqItems } from '../mocks/faq-items'

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion'

export function Faq() {
    return (
        <section
            className="w-full bg-gradient-to-br from-violet-50 to-indigo-50 py-12 md:py-24 lg:py-32"
            id="faq"
        >
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="space-y-2">
                        <div className="inline-block rounded-lg bg-violet-100 px-3 py-1 text-sm text-violet-700">
                            FAQ
                        </div>
                        <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                            Perguntas Frequentes
                        </h2>
                        <p className="text-muted-foreground max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                            Encontre respostas para as perguntas mais comuns
                            sobre o TaskMaster.
                        </p>
                    </div>
                </div>
                <div className="mx-auto max-w-3xl pt-8">
                    <Accordion type="single" collapsible className="w-full">
                        {faqItems.map((item) => (
                            <AccordionItem key={item.value} value={item.value}>
                                <AccordionTrigger>
                                    {item.question}
                                </AccordionTrigger>
                                <AccordionContent>
                                    {item.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </div>
        </section>
    )
}
