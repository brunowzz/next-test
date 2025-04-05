'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { EyeIcon, EyeOffIcon, LockIcon, MailIcon, UserIcon } from 'lucide-react'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import type React from 'react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

import { registerUser } from './actions'
import { registerSchema } from './schemas/register.schemas'

export default function RegisterPage() {
    const [showPassword, setShowPassword] = useState(false)
    const router = useRouter()

    const form = useForm<z.infer<typeof registerSchema>>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name: '',
            email: '',
            password: '',
            acceptTerms: false,
        },
    })

    const handleSubmit = async (values: z.infer<typeof registerSchema>) => {
        const create = await registerUser(values)

        if (create.error) {
            toast(create.error)
            return
        }

        toast.success('Conta criada com sucesso')
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-violet-50 to-indigo-50 p-4">
            <Card className="w-full max-w-md shadow-lg">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-center text-2xl font-bold">
                        Criar Conta
                    </CardTitle>
                    <CardDescription className="text-center">
                        Preencha os dados abaixo para criar sua conta
                    </CardDescription>
                </CardHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)}>
                        <CardContent className="space-y-4">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <div className="space-y-2">
                                            <FormLabel>Nome</FormLabel>
                                            <FormControl>
                                                <div className="relative">
                                                    <UserIcon className="text-muted-foreground absolute top-3 left-3 h-4 w-4" />
                                                    <Input
                                                        placeholder="Seu nome completo"
                                                        className="pl-10"
                                                        {...field}
                                                    />
                                                </div>
                                            </FormControl>
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <div className="space-y-2">
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <div className="relative">
                                                    <MailIcon className="text-muted-foreground absolute top-3 left-3 h-4 w-4" />
                                                    <Input
                                                        placeholder="seu@email.com"
                                                        className="pl-10"
                                                        {...field}
                                                    />
                                                </div>
                                            </FormControl>
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <div className="space-y-2">
                                            <FormLabel>Senha</FormLabel>
                                            <FormControl>
                                                <div className="relative">
                                                    <LockIcon className="text-muted-foreground absolute top-3 left-3 h-4 w-4" />
                                                    <Input
                                                        type={
                                                            showPassword
                                                                ? 'text'
                                                                : 'password'
                                                        }
                                                        placeholder="••••••••"
                                                        className="pl-10"
                                                        {...field}
                                                    />
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="icon"
                                                        className="text-muted-foreground absolute top-1 right-1 h-8 w-8"
                                                        onClick={() =>
                                                            setShowPassword(
                                                                !showPassword
                                                            )
                                                        }
                                                    >
                                                        {showPassword ? (
                                                            <EyeOffIcon className="h-4 w-4" />
                                                        ) : (
                                                            <EyeIcon className="h-4 w-4" />
                                                        )}
                                                        <span className="sr-only">
                                                            {showPassword
                                                                ? 'Esconder senha'
                                                                : 'Mostrar senha'}
                                                        </span>
                                                    </Button>
                                                </div>
                                            </FormControl>
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="acceptTerms"
                                render={({ field }) => (
                                    <FormItem>
                                        <div className="flex items-center space-x-2">
                                            <FormControl>
                                                <Checkbox
                                                    checked={field.value}
                                                    onCheckedChange={(
                                                        checked
                                                    ) =>
                                                        field.onChange(
                                                            checked === true
                                                        )
                                                    }
                                                />
                                            </FormControl>
                                            <FormLabel>
                                                Eu aceito os{' '}
                                                <Link
                                                    href="#"
                                                    className="text-violet-600 hover:text-violet-700"
                                                >
                                                    termos de serviço
                                                </Link>{' '}
                                                e{' '}
                                                <Link
                                                    href="#"
                                                    className="text-violet-600 hover:text-violet-700"
                                                >
                                                    política de privacidade
                                                </Link>
                                            </FormLabel>
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </CardContent>
                        <CardFooter className="mt-4 flex flex-col space-y-4">
                            <Button
                                type="submit"
                                className="w-full bg-violet-600 hover:bg-violet-700"
                            >
                                Criar Conta
                            </Button>
                            <div className="text-center text-sm">
                                Já tem uma conta?{' '}
                                <Link
                                    href="/login"
                                    className="font-medium text-violet-600 hover:text-violet-700"
                                >
                                    Entrar
                                </Link>
                            </div>
                        </CardFooter>
                    </form>
                </Form>
            </Card>
        </div>
    )
}
