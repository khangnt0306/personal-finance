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
    setStatus(`Security updated · MFA ${values.mfaEnabled ? "on" : "off"}`)
    form.reset({ ...values, currentPassword: "", newPassword: "", confirmPassword: "" })
  }

  return (
    <div className="rounded-3xl border border-border/60 bg-card/80 p-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <h3 className="text-xl font-semibold text-white">Security controls</h3>
            <p className="text-sm text-muted-foreground">Rotate passwords and manage MFA preferences.</p>
          </div>
          <FormField
            control={form.control}
            name="currentPassword"
            rules={{ required: "Required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Current password</FormLabel>
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
              rules={{ required: "Required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New password</FormLabel>
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
              rules={{ required: "Required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm password</FormLabel>
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
                  <p className="text-sm text-muted-foreground">Protect logins with Authenticator prompts.</p>
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                  <span className="text-sm font-medium">
                    {field.value ? "Enabled" : "Disabled"}
                  </span>
                </div>
              </FormItem>
            )}
          />
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            {status ? <p className="text-sm text-primary">{status}</p> : <span className="text-sm text-muted-foreground">Last rotated 34 days ago</span>}
            <Button type="submit" className="w-full sm:w-auto">
              Update security
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
