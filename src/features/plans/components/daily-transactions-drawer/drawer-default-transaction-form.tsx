import { useForm, type Resolver } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@components/ui/button"
import { Input } from "@components/ui/input"
import { Switch } from "@components/ui/switch"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@components/ui/form"
import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card"
import { HandCoins, Tag } from "lucide-react"
import {
  useCreateDefaultTransactionMutation,
  useUpdateDefaultTransactionMutation,
} from "../../api/default-transaction.api"
import {
  defaultTransactionSchema,
  type DefaultTransactionPayload,
} from "../../validation/daily-transaction.schemas"
import { formatNumber, parseFormattedNumber } from "@core/utils/format"
import { showSuccess, showError } from "@lib/toast"
import { useEffect } from "react"
import type { DefaultTransaction } from "../../types/daily-transaction.types"
import type { PlanItem } from "../../types"

interface DrawerDefaultTransactionFormProps {
  planId: string
  planItem: PlanItem
  editingTransaction: DefaultTransaction | null
  onSuccess: () => void
  onCancel: () => void
}

export const DrawerDefaultTransactionForm = ({
  planId,
  planItem,
  editingTransaction,
  onSuccess,
  onCancel,
}: DrawerDefaultTransactionFormProps) => {
  const [createTransaction, { isLoading: isCreating }] = useCreateDefaultTransactionMutation()
  const [updateTransaction, { isLoading: isUpdating }] = useUpdateDefaultTransactionMutation()

  const form = useForm<DefaultTransactionPayload>({
    resolver: zodResolver(defaultTransactionSchema) as Resolver<DefaultTransactionPayload>,
    defaultValues: {
      label: editingTransaction?.label || "",
      amount: editingTransaction?.amount || "",
      enabled: editingTransaction?.enabled ?? true,
    },
  })

  // Reset form when editingTransaction changes
  useEffect(() => {
    form.reset({
      label: editingTransaction?.label || "",
      amount: editingTransaction?.amount || "",
      enabled: editingTransaction?.enabled ?? true,
    })
  }, [editingTransaction, form])

  const handleSubmit = async (data: DefaultTransactionPayload) => {
    try {
      if (editingTransaction) {
        await updateTransaction({
          planId,
          itemId: planItem.id,
          transactionId: editingTransaction.id,
          data,
        }).unwrap()
        showSuccess("Đã cập nhật giao dịch mặc định")
      } else {
        await createTransaction({
          planId,
          itemId: planItem.id,
          data,
        }).unwrap()
        showSuccess("Tạo giao dịch mặc định thành công")
      }
      onSuccess()
    } catch (error) {
      console.error("Lỗi lưu giao dịch mặc định:", error)
      showError("Không thể lưu giao dịch mặc định")
    }
  }

  return (
    <Card className="border-2 border-primary/20 bg-gradient-to-br from-background to-muted/30 backdrop-blur-sm">
      <CardHeader className="p-4 sm:p-6 pb-3 sm:pb-6">
        <CardTitle className="text-base sm:text-lg">
          {editingTransaction ? "Chỉnh sửa giao dịch mặc định" : "Giao dịch mặc định mới"}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 sm:p-6 pt-0">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-3 sm:space-y-4">
            <FormField
              control={form.control}
              name="label"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs sm:text-sm">Mô tả</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Tag className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 sm:h-4 sm:w-4 text-muted-foreground" />
                      <Input placeholder="Ví dụ: Ăn sáng" {...field} className="pl-8 sm:pl-10 text-xs sm:text-sm h-9 sm:h-10" />
                    </div>
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs sm:text-sm">Số tiền</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <HandCoins className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 sm:h-4 sm:w-4 text-muted-foreground" />
                      <Input
                        type="text"
                        placeholder="0"
                        value={field.value ? formatNumber(parseFloat(field.value)) : ""}
                        onChange={(e) => {
                          const numericValue = parseFormattedNumber(e.target.value)
                          field.onChange(numericValue.toString())
                        }}
                        onBlur={field.onBlur}
                        className="pl-8 sm:pl-10 text-xs sm:text-sm h-9 sm:h-10"
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="enabled"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border border-border/60 bg-muted/30 p-3 sm:p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-xs sm:text-sm">
                      Kích hoạt
                    </FormLabel>
                    <FormDescription className="text-[10px] sm:text-xs">
                      Giao dịch này sẽ được áp dụng hằng ngày
                    </FormDescription>
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

            <div className="flex gap-2 justify-end pt-2">
              <Button type="button" variant="outline" onClick={onCancel} className="text-xs sm:text-sm h-9 sm:h-10">
                Hủy
              </Button>
              <Button
                type="submit"
                disabled={isCreating || isUpdating}
                className="text-xs sm:text-sm h-9 sm:h-10"
              >
                {isCreating || isUpdating
                  ? "Đang lưu..."
                  : editingTransaction
                    ? "Cập nhật"
                    : "Tạo mới"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

