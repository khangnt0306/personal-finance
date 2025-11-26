import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/ui/form"
import { Input } from "@components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@components/ui/select"
import { Textarea } from "@components/ui/textarea"
import { Button } from "@components/ui/button"
import { Switch } from "@components/ui/switch"
import type { Plan } from "../types"
import { planSchema, type PlanFormData } from "../validation/plan.schemas"

interface PlanFormModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (data: PlanFormData) => Promise<void> | void
  plan?: Plan | null
  isSubmitting?: boolean
}

const CURRENCY_OPTIONS = [
  { value: "VND", label: "VND (₫)" },
  { value: "USD", label: "USD ($)" },
  { value: "EUR", label: "EUR (€)" },
] as const

const PLAN_TYPE_OPTIONS = [
  { value: "DAILY", label: "Hàng ngày" },
  { value: "WEEKLY", label: "Hàng tuần" },
  { value: "MONTHLY", label: "Hàng tháng" },
  { value: "YEARLY", label: "Hàng năm" },
] as const

export const PlanFormModal = ({
  open,
  onOpenChange,
  onSubmit,
  plan,
  isSubmitting,
}: PlanFormModalProps) => {
  const form = useForm<PlanFormData>({
    resolver: zodResolver(planSchema),
    defaultValues: {
      name: "",
      description: "",
      currency: "VND",
      planType: "MONTHLY",
      autoRepeat: false,
      autoAdjustEnabled: true,
      dailyMinLimit: 10,
      warnLevelYellow: 50,
      warnLevelRed: 80,
    },
  })

  useEffect(() => {
    if (plan) {
      form.reset({
        name: plan.name,
        description: plan.description || "",
        currency: plan.currency,
        planType: plan.planType,
        autoRepeat: plan.autoRepeat,
        autoAdjustEnabled: plan.autoAdjustEnabled,
        dailyMinLimit: plan.dailyMinLimit,
        warnLevelYellow: plan.warnLevelYellow,
        warnLevelRed: plan.warnLevelRed,
      })
    } else {
      form.reset({
        name: "",
        description: "",
        currency: "VND",
        planType: "MONTHLY",
        autoRepeat: false,
        autoAdjustEnabled: true,
        dailyMinLimit: 10,
        warnLevelYellow: 50,
        warnLevelRed: 80,
      })
    }
  }, [plan, form])

  const handleSubmit = async (data: PlanFormData) => {
    await onSubmit(data)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{plan ? "Cập nhật kế hoạch" : "Tạo kế hoạch"}</DialogTitle>
          <DialogDescription>
            {plan
              ? "Chỉnh sửa nội dung và các mốc của kế hoạch"
              : "Định nghĩa kế hoạch tài chính và kết quả mong muốn"}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tên kế hoạch</FormLabel>
                  <FormControl>
                    <Input placeholder="Nhập tên kế hoạch" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mô tả</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Mô tả ngắn gọn kế hoạch của bạn" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="currency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tiền tệ</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn tiền tệ" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {CURRENCY_OPTIONS.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="planType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Loại kế hoạch</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn loại kế hoạch" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {PLAN_TYPE_OPTIONS.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="dailyMinLimit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Giới hạn tối thiểu mỗi ngày (%)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min="0" max="100"
                      placeholder="10%"
                      value={field.value}
                      onChange={(event) => field.onChange(Number(event.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="warnLevelYellow"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ngưỡng cảnh báo vàng (%)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="0"
                        max="100"
                        placeholder="50"
                        value={field.value}
                        onChange={(event) => field.onChange(Number(event.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="warnLevelRed"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ngưỡng cảnh báo đỏ (%)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="0"
                        max="100"
                        placeholder="80"
                        value={field.value}
                        onChange={(event) => field.onChange(Number(event.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="autoRepeat"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-2xl border border-border/60 bg-muted/30 p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Tự lặp lại</FormLabel>
                      <p className="text-sm text-muted-foreground">
                        Tự động kích hoạt lại kế hoạch khi hoàn thành
                      </p>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="autoAdjustEnabled"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-2xl border border-border/60 bg-muted/30 p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Bật tự điều chỉnh</FormLabel>
                      <p className="text-sm text-muted-foreground">
                        Tự động điều chỉnh dựa trên thói quen chi tiêu
                      </p>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Hủy
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Đang lưu..." : plan ? "Cập nhật" : "Tạo mới"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

