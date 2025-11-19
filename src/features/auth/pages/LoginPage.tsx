import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useForm, type Resolver, type SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@components/ui/button"
import { Input } from "@components/ui/input"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/ui/form"
import { AuthShell } from "../components/AuthShell"
import { loginSchema, type LoginFormValues } from "../validation/auth.schemas"
import { useAuth } from "@app/router/guards/AuthProvider"

export const LoginPage = () => {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema) as Resolver<LoginFormValues>,
    defaultValues: {
      email: "",
      password: "",
      remember: true,
    },
  })

  const onSubmit: SubmitHandler<LoginFormValues> = async (values) => {
    try {
      setIsSubmitting(true)
      await new Promise((resolve) => setTimeout(resolve, 600))
      login("user", { email: values.email, name: "Jordan Wells" })
      navigate("/", { replace: true })
    } catch (error) {
      console.error(error)
      form.setError("root", { message: "Unable to sign in. Please try again." })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AuthShell
      title="Welcome back"
      description="Sign in to orchestrate budgets, plan confidently, and sync your financial rituals across every device."
      highlights={[
        "Track spending velocity instantly",
        "Automate plan approvals with nudges",
        "Stay aligned with multi-team dashboards",
        "Export-ready reports in seconds",
      ]}
      footer={
        <>
          New to Aurora?{" "}
          <Link to="/auth/register" className="font-semibold text-primary hover:underline">
            Create an account
          </Link>
        </>
      }
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
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
                    <Input type="password" placeholder="••••••••" autoComplete="current-password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <FormField
              control={form.control}
              name="remember"
              render={({ field }) => (
                <FormItem className="space-y-0">
                  <div className="flex items-center gap-3 rounded-2xl border border-border/70 bg-muted/30 px-4 py-2">
                    <FormControl>
                      <input
                        type="checkbox"
                        checked={field.value}
                        onChange={(event) => field.onChange(event.target.checked)}
                        className="h-4 w-4 rounded border-border/80 text-primary accent-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
                      />
                    </FormControl>
                    <FormLabel className="m-0 cursor-pointer text-sm font-medium">Remember me</FormLabel>
                  </div>
                </FormItem>
              )}
            />
            <Link to="/auth/forgot-password" className="text-sm font-medium text-primary hover:underline">
              Forgot password?
            </Link>
          </div>

          {form.formState.errors.root ? (
            <p className="rounded-2xl border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
              {form.formState.errors.root.message}
            </p>
          ) : null}

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Signing in…" : "Sign in"}
          </Button>
        </form>
      </Form>
    </AuthShell>
  )
}

