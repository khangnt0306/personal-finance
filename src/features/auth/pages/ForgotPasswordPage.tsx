import { useState } from "react"
import { Link } from "react-router-dom"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@components/ui/button"
import { Input } from "@components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@components/ui/form"
import { AuthShell } from "../components/AuthShell"
import { forgotPasswordSchema, type ForgotPasswordFormValues } from "../validation/auth.schemas"

export const ForgotPasswordPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSent, setIsSent] = useState(false)

  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  })

  const onSubmit = async (values: ForgotPasswordFormValues) => {
    try {
      setIsSubmitting(true)
      await new Promise((resolve) => setTimeout(resolve, 700))
      console.info("Password reset requested for:", values.email)
      setIsSent(true)
    } catch (error) {
      console.error(error)
      form.setError("root", { message: "We could not send the reset email. Try again." })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AuthShell
      title="Reset your password"
      description="Enter the email linked to your Aurora account. We’ll send a secure magic link to reset your password."
      highlights={[
        "Email delivery powered by secure tokens",
        "Links expire automatically for safety",
        "Support team online every day",
        "Need more help? Reply to the same email",
      ]}
      footer={
        <>
          Remember your password?{" "}
          <Link to="/auth/login" className="font-semibold text-primary hover:underline">
            Return to sign in
          </Link>
        </>
      }
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email address</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="you@email.com" autoComplete="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {isSent ? (
            <p className="rounded-2xl border border-emerald-400/40 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-600">
              A reset link is on its way. Check your inbox (and spam) within the next minute.
            </p>
          ) : null}

          {form.formState.errors.root ? (
            <p className="rounded-2xl border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
              {form.formState.errors.root.message}
            </p>
          ) : null}

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Sending reset link…" : "Send reset link"}
          </Button>
        </form>
      </Form>
    </AuthShell>
  )
}

