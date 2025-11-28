import { useForm, type Resolver } from "react-hook-form"
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
import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card"
import { Calendar, HandCoins, Tag } from "lucide-react"
import {
  useCreateDailyTransactionMutation,
  useUpdateDailyTransactionMutation,
} from "../../api/daily-transaction.api"
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

  const form = useForm<DailyTransactionFormData>({
    resolver: zodResolver(dailyTransactionSchema) as Resolver<DailyTransactionFormData>,
    defaultValues: {
      date: editingTransaction?.date || new Date().toISOString().split("T")[0],
      label: editingTransaction?.label || "",
      amount: editingTransaction?.amount || "",
    },
  })

  // Reset form when editingTransaction changes
  useEffect(() => {
    form.reset({
      date: editingTransaction?.date || new Date().toISOString().split("T")[0],
      label: editingTransaction?.label || "",
      amount: editingTransaction?.amount || "",
    })
  }, [editingTransaction, form])

  const handleSubmit = async (data: DailyTransactionFormData) => {
    try {
      if (editingTransaction) {
        await updateTransaction({
          planId,
          itemId: planItem.id,
          transactionId: editingTransaction.id,
          data,
        }).unwrap()
        showSuccess("Đã cập nhật giao dịch")
      } else {
        await createTransaction({
          planId,
          itemId: planItem.id,
          data,
        }).unwrap()
        showSuccess("Tạo giao dịch thành công")
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
              <Button type="submit" disabled={isCreating || isUpdating} className="text-xs sm:text-sm h-9 sm:h-10">
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

