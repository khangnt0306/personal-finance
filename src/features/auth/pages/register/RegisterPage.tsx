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
import { AuthShell } from "../../components/AuthShell"
import { registerSchema, type RegisterFormValues } from "../../validation/auth.schemas"
import { useRegisterMutation } from "../../api/auth.api"
import { handleRegisterSubmit } from "./RegisterPage.handler"

export const RegisterPage = () => {
  const navigate = useNavigate()
  const [registerMutation, { isLoading }] = useRegisterMutation()

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      full_name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  })

  const onSubmit = async (values: RegisterFormValues) => {
    await handleRegisterSubmit(values, {
      registerMutation: (credentials) => registerMutation(credentials).unwrap(),
      navigate,
      setError: form.setError,
    })
  }

  return (
    <AuthShell
      title="Tạo tài khoản của bạn"
      description="Đăng ký trong vài phút để quản lý kế hoạch, ngân sách và cảnh báo thông minh cùng Aurora."
      highlights={[
        "Không giới hạn workspace cho nhiều nhóm",
        "Tích hợp theo dõi gian lận theo thời gian thực",
        "Gợi ý AI tối ưu hóa tiết kiệm",
        "Truy cập sớm các tính năng mới",
      ]}
      footer={
        <>
          Đã có tài khoản?{" "}
          <Link to="/auth/login" className="font-semibold text-primary hover:underline">
            Đăng nhập
          </Link>
        </>
      }
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid gap-4">
            <FormField
              control={form.control}
              name="full_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Họ và tên</FormLabel>
                  <FormControl>
                    <Input placeholder="Nguyễn Văn A" autoComplete="name" {...field} />
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
                  <FormLabel>Mật khẩu</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Ít nhất 8 ký tự" autoComplete="new-password" {...field} />
                  </FormControl>
                  <FormDescription>Kết hợp chữ cái, số và ký tự đặc biệt.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Xác nhận mật khẩu</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Nhập lại mật khẩu" autoComplete="new-password" {...field} />
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

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Đang tạo tài khoản…" : "Tạo tài khoản"}
          </Button>
        </form>
      </Form>
    </AuthShell>
  )
}

