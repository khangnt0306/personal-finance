import { useState } from "react"
import { useForm } from "react-hook-form"
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
import { Switch } from "@components/ui/switch"

interface SecurityFormValues {
  currentPassword: string
  newPassword: string
  confirmPassword: string
  mfaEnabled: boolean
}

export const SecuritySettingsForm = () => {
  const [status, setStatus] = useState<string>()
  const form = useForm<SecurityFormValues>({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
      mfaEnabled: true,
    },
  })

  const onSubmit = (values: SecurityFormValues) => {
    setStatus(`Đã cập nhật bảo mật · MFA ${values.mfaEnabled ? "bật" : "tắt"}`)
    form.reset({ ...values, currentPassword: "", newPassword: "", confirmPassword: "" })
  }

  return (
    <div className="rounded-3xl border border-border/60 bg-card/80 p-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <h3 className="text-xl font-semibold text-white">Kiểm soát bảo mật</h3>
            <p className="text-sm text-muted-foreground">Đổi mật khẩu định kỳ và quản lý xác thực đa yếu tố.</p>
          </div>
          <FormField
            control={form.control}
            name="currentPassword"
            rules={{ required: "Bắt buộc" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mật khẩu hiện tại</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="••••••••" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="newPassword"
              rules={{ required: "Bắt buộc" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mật khẩu mới</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              rules={{ required: "Bắt buộc" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Xác nhận mật khẩu</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
            <FormField
            control={form.control}
            name="mfaEnabled"
            render={({ field }) => (
              <FormItem className="flex items-center justify-between rounded-2xl border border-border/60 bg-muted/10 px-4 py-3">
                <div>
                    <FormLabel>MFA</FormLabel>
                    <p className="text-sm text-muted-foreground">Bảo vệ đăng nhập bằng ứng dụng xác thực.</p>
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                  <span className="text-sm font-medium">
                    {field.value ? "Đang bật" : "Đang tắt"}
                  </span>
                </div>
              </FormItem>
            )}
          />
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            {status ? <p className="text-sm text-primary">{status}</p> : <span className="text-sm text-muted-foreground">Lần đổi gần nhất cách đây 34 ngày</span>}
            <Button type="submit" className="w-full sm:w-auto">
              Cập nhật bảo mật
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
