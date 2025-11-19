import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@components/ui/button"
import { Input } from "@components/ui/input"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/ui/form"
import { AuthShell } from "../components/AuthShell"
import { registerSchema, type RegisterFormValues } from "../validation/auth.schemas"
import { useAuth } from "@app/router/guards/AuthProvider"

export const RegisterPage = () => {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  })

  const onSubmit = async (values: RegisterFormValues) => {
    try {
      setIsSubmitting(true)
      await new Promise((resolve) => setTimeout(resolve, 700))
      login("user", { name: values.name, email: values.email })
      navigate("/", { replace: true })
    } catch (error) {
      console.error(error)
      form.setError("root", { message: "Account creation failed. Try again." })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AuthShell
      title="Create your account"
      description="Register in minutes and start orchestrating shared plans, budgets, and smart alerts with Aurora."
      highlights={[
        "Unlimited workspaces for cross-team visibility",
        "Real-time fraud monitoring baked in",
        "AI suggestions to optimize savings",
        "Early access to roadmap drops",
      ]}
      footer={
        <>
          Already have an account?{" "}
          <Link to="/auth/login" className="font-semibold text-primary hover:underline">
            Sign in
          </Link>
        </>
      }
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full name</FormLabel>
                  <FormControl>
                    <Input placeholder="Thompson Nguyen" autoComplete="name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="you@email.com" autoComplete="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="At least 8 characters" autoComplete="new-password" {...field} />
                  </FormControl>
                  <FormDescription>Use a mix of letters, numbers, and symbols.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Re-enter password" autoComplete="new-password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {form.formState.errors.root ? (
            <p className="rounded-2xl border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
              {form.formState.errors.root.message}
            </p>
          ) : null}

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Creating account…" : "Create account"}
          </Button>
        </form>
      </Form>
    </AuthShell>
  )
}

