import { useEffect } from "react"
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
import { AuthShell } from "../../components/AuthShell"
import { loginSchema, type LoginFormValues } from "@features/auth/validation"
import { useLoginMutation } from "@features/auth/api"
import { useAppDispatch, useAppSelector } from "@store/hooks"
import { 
  handleLoginSubmit, 
  handleAuthenticatedRedirect, 
  loadRememberedCredentials 
} from "./LoginPage.handler"

export const LoginPage = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated)
  const [loginMutation, { isLoading }] = useLoginMutation()

  useEffect(() => {
    handleAuthenticatedRedirect(isAuthenticated, navigate)
  }, [isAuthenticated, navigate])

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema) as Resolver<LoginFormValues>,
    defaultValues: loadRememberedCredentials(),
  })

  const onSubmit: SubmitHandler<LoginFormValues> = async (values) => {
    await handleLoginSubmit(values, {
      loginMutation: (credentials) => loginMutation(credentials).unwrap(),
      dispatch,
      navigate,
      setError: form.setError,
    })
  }

  return (
    <AuthShell
      title="Chào mừng trở lại"
      description="Đăng nhập để điều phối ngân sách, lập kế hoạch tự tin và đồng bộ thói quen tài chính trên mọi thiết bị."
      highlights={[
        "Theo dõi tốc độ chi tiêu tức thì",
        "Tự động nhắc duyệt kế hoạch",
        "Luôn đồng bộ với nhiều bảng điều khiển",
        "Xuất báo cáo chỉ trong vài giây",
      ]}
      footer={
        <>
          Mới biết đến Aurora?{" "}
          <Link to="/auth/register" className="font-semibold text-primary hover:underline">
            Tạo tài khoản
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
                    <Input type="email" placeholder="ban@email.com" autoComplete="email" {...field} />
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
                  <FormLabel>Mật khẩu</FormLabel>
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
                    <FormLabel className="m-0 cursor-pointer text-sm font-medium">Ghi nhớ đăng nhập</FormLabel>
                  </div>
                </FormItem>
              )}
            />
            <Link to="/auth/forgot-password" className="text-sm font-medium text-primary hover:underline">
              Quên mật khẩu?
            </Link>
          </div>

          {form.formState.errors.root ? (
            <p className="rounded-2xl border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
              {form.formState.errors.root.message}
            </p>
          ) : null}

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Đang đăng nhập…" : "Đăng nhập"}
          </Button>
        </form>
      </Form>
    </AuthShell>
  )
}

