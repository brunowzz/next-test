"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { EyeIcon, EyeOffIcon, LockIcon, MailIcon } from "lucide-react"
import { useForm } from "react-hook-form"
import { userSchema } from "./schemas/login.schemas"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

export default function LoginPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)

  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const handleSubmit = (values: z.infer<typeof userSchema>) => {
    console.log(values)
    router.push("/dashboard")
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-violet-50 to-indigo-50 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Entrar</CardTitle>
          <CardDescription className="text-center">Entre com seu email e senha para acessar sua conta</CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <div className="space-y-2">
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <MailIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
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
                      <div className="flex items-center justify-between">
                        <FormLabel>Senha</FormLabel>
                        <Link href="/forgot-password" className="text-sm text-violet-600 hover:text-violet-700">
                          Esqueceu a senha?
                        </Link>
                      </div>
                      <FormControl>
                        <div className="relative">
                          <LockIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            className="pl-10"
                            {...field}
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-1 top-1 h-8 w-8 text-muted-foreground"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                            <span className="sr-only">{showPassword ? "Esconder senha" : "Mostrar senha"}</span>
                          </Button>
                        </div>
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className="flex flex-col mt-4 space-y-4">
              <Button type="submit" className="w-full bg-violet-600 hover:bg-violet-700">
                Entrar
              </Button>
              <div className="text-center text-sm">
                Não tem uma conta?{" "}
                <Link href="/register" className="font-medium text-violet-600 hover:text-violet-700">
                  Criar conta
                </Link>
              </div>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  )
}