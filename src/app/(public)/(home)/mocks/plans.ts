interface Plan {
    title: string
    price: string
    frequency: string
    features: string[]
    button: {
        text: string
        variant?:
            | 'outline'
            | 'link'
            | 'default'
            | 'destructive'
            | 'secondary'
            | 'ghost'
        style?: string
    }
    badge?: {
        text: string
        style: string
    }
    cardStyle?: string
}

export const plans: Plan[] = [
    {
        title: 'Gratuito',
        price: 'R$0',
        frequency: '/mês',
        features: ['Até 10 tarefas', 'Acesso básico ao dashboard', '1 usuário'],
        button: { text: 'Começar Grátis', variant: 'outline' },
        badge: { text: 'Popular', style: 'bg-violet-100 text-violet-700' },
    },
    {
        title: 'Pro',
        price: 'R$29',
        frequency: '/mês',
        features: [
            'Tarefas ilimitadas',
            'Dashboard completo com análises',
            'Até 5 usuários',
            'Projetos ilimitados',
            'Suporte prioritário',
        ],
        button: {
            text: 'Assinar Agora',
            style: 'bg-violet-600 hover:bg-violet-700',
        },
        badge: { text: 'Recomendado', style: 'bg-violet-600 text-white' },
        cardStyle: 'border-violet-600 shadow-lg',
    },
    {
        title: 'Empresarial',
        price: 'R$99',
        frequency: '/mês',
        features: [
            'Tudo do plano Pro',
            'Usuários ilimitados',
            'Integrações avançadas',
            'Relatórios personalizados',
            'Gerente de conta dedicado',
        ],
        button: { text: 'Fale com Vendas', variant: 'outline' },
    },
]
