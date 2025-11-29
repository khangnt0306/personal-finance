import { useForm, useWatch, type Resolver } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@components/ui/button"
import { Input } from "@components/ui/input"
import { Checkbox } from "@components/ui/checkbox"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/ui/form"
import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card"
import { Calendar, HandCoins, Tag } from "lucide-react"
import {
  useCreateDailyTransactionMutation,
  useUpdateDailyTransactionMutation,
} from "../../api/daily-transaction.api"
import {
  useCreateDefaultTransactionMutation,
  useUpdateDefaultTransactionMutation,
} from "../../api/default-transaction.api"
import {
  dailyTransactionSchema,
  type DailyTransactionFormData,
} from "../../validation/daily-transaction.schemas"
import { formatNumber, parseFormattedNumber } from "@core/utils/format"
import { showSuccess, showError } from "@lib/toast"
import type { TransactionFormProps } from "./types"
import { useEffect } from "react"

export const DrawerTransactionForm = ({
  planId,
  planItem,
  editingTransaction,
  onSuccess,
  onCancel,
}: TransactionFormProps) => {
  const [createTransaction, { isLoading: isCreating }] = useCreateDailyTransactionMutation()
  const [updateTransaction, { isLoading: isUpdating }] = useUpdateDailyTransactionMutation()
  const [createDefaultTransaction, { isLoading: isCreatingDefault }] = useCreateDefaultTransactionMutation()
  const [updateDefaultTransaction, { isLoading: isUpdatingDefault }] = useUpdateDefaultTransactionMutation()

  const form = useForm<DailyTransactionFormData>({
    resolver: zodResolver(dailyTransactionSchema) as Resolver<DailyTransactionFormData>,
    defaultValues: {
      date: editingTransaction?.date || new Date().toISOString().split("T")[0],
      label: editingTransaction?.label || "",
      amount: editingTransaction?.amount || "",
      isDefault: false,
    },
  })

  // Watch isDefault field to conditionally show/hide date field
  const isDefaultChecked = useWatch({
    control: form.control,
    name: "isDefault",
    defaultValue: false,
  })

  // Reset form when editingTransaction changes
  useEffect(() => {
    form.reset({
      date: editingTransaction?.date || new Date().toISOString().split("T")[0],
      label: editingTransaction?.label || "",
      amount: editingTransaction?.amount || "",
      isDefault: false,
    })
  }, [editingTransaction, form])

  const handleSubmit = async (data: DailyTransactionFormData) => {
    try {
      const isDefaultTransaction = data.isDefault === true

      if (editingTransaction) {
        // Update existing transaction
        if (isDefaultTransaction) {
          // For default transactions, only send label, amount, enabled
          const defaultPayload = {
            label: data.label,
            amount: data.amount,
            enabled: true,
          }
          await updateDefaultTransaction({
            planId,
            itemId: planItem.id,
            transactionId: editingTransaction.id,
            data: defaultPayload,
          }).unwrap()
          showSuccess("Đã cập nhật giao dịch mặc định")
        } else {
          // For regular transactions, send date, label, amount (no isDefault)
          const regularPayload = {
            date: data.date,
            label: data.label,
            amount: data.amount,
          }
          await updateTransaction({
            planId,
            itemId: planItem.id,
            transactionId: editingTransaction.id,
            data: regularPayload,
          }).unwrap()
          showSuccess("Đã cập nhật giao dịch")
        }
      } else {
        // Create new transaction
        if (isDefaultTransaction) {
          // For default transactions, only send label, amount, enabled
          const defaultPayload = {
            label: data.label,
            amount: data.amount,
            enabled: true,
          }
          await createDefaultTransaction({
            planId,
            itemId: planItem.id,
            data: defaultPayload,
          }).unwrap()
          showSuccess("Tạo giao dịch mặc định thành công")
        } else {
          // For regular transactions, send date, label, amount (no isDefault)
          const regularPayload = {
            date: data.date,
            label: data.label,
            amount: data.amount,
          }
          await createTransaction({
            planId,
            itemId: planItem.id,
            data: regularPayload,
          }).unwrap()
          showSuccess("Tạo giao dịch thành công")
        }
      }
      onSuccess()
    } catch (error) {
      console.error("Lỗi lưu giao dịch:", error)
      showError("Không thể lưu giao dịch")
    }
  }

  return (
    <Card className="border-2 border-primary/20 bg-gradient-to-br from-background to-muted/30 backdrop-blur-sm">
      <CardHeader className="p-4 sm:p-6 pb-3 sm:pb-6">
        <CardTitle className="text-base sm:text-lg">
          {editingTransaction ? "Chỉnh sửa giao dịch" : "Giao dịch mới"}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 sm:p-6 pt-0">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-3 sm:space-y-4">
            {(planItem.type === "EXPENSE" && planItem.excludeType !== "FIXED") && (
              <FormField
                control={form.control}
                name="isDefault"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-lg border border-border/60 bg-muted/30 p-3 sm:p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="rounded-full mt-0.5"
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="text-xs sm:text-sm font-medium">
                        Giao dịch mặc định
                      </FormLabel>
                      <p className="text-xs text-muted-foreground">
                        Đánh dấu đây là giao dịch thường xuyên hằng ngày
                      </p>
                    </div>
                  </FormItem>
                )}
              />
            )}
            {!(planItem.type === "EXPENSE" && planItem.excludeType !== "FIXED") && !isDefaultChecked && (
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs sm:text-sm">Ngày</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Calendar className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 sm:h-4 sm:w-4 text-muted-foreground" />
                        <Input type="date" {...field} className="pl-8 sm:pl-10 text-xs sm:text-sm h-9 sm:h-10" />
                      </div>
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
            )}

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

            <div className="flex gap-2 justify-end pt-2">
              <Button type="button" variant="outline" onClick={onCancel} className="text-xs sm:text-sm h-9 sm:h-10">
                Hủy
              </Button>
              <Button
                type="submit"
                disabled={isCreating || isUpdating || isCreatingDefault || isUpdatingDefault}
                className="text-xs sm:text-sm h-9 sm:h-10"
              >
                {isCreating || isUpdating || isCreatingDefault || isUpdatingDefault
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

