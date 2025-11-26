import { useState, useMemo } from "react"
import { useForm, type Resolver } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { motion } from "framer-motion"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@components/ui/sheet"
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
import { Badge } from "@components/ui/badge"
import { Skeleton } from "@components/ui/skeleton"
import { Separator } from "@components/ui/separator"
import { Plus, Edit, Calendar, DollarSign, Tag, TrendingUp, Hash, Clock } from "lucide-react"
import {
  useGetDailyTransactionsQuery,
  useCreateDailyTransactionMutation,
  useUpdateDailyTransactionMutation,
} from "../api/daily-transaction.api"
import {
  dailyTransactionSchema,
  type DailyTransactionFormData,
} from "../validation/daily-transaction.schemas"
import type { DailyTransaction } from "../types/daily-transaction.types"
import type { PlanItem } from "../types"
import { formatCurrency, formatNumber, parseFormattedNumber } from "@core/utils/format"
import { format, parseISO, isToday } from "date-fns"
import { showSuccess, showError } from "@lib/toast"

interface DailyTransactionsDrawerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  planId: string
  planItem: PlanItem | null
  currency: string
}

export const DailyTransactionsDrawer = ({
  open,
  onOpenChange,
  planId,
  planItem,
  currency,
}: DailyTransactionsDrawerProps) => {
  const [isCreating, setIsCreating] = useState(false)
  const [editingTransaction, setEditingTransaction] = useState<DailyTransaction | null>(null)

  const { data: transactionsData, isLoading } = useGetDailyTransactionsQuery(
    {
      planId,
      itemId: planItem?.id || "",
      limit: 100,
    },
    { skip: !open || !planItem }
  )

  const [createTransaction, { isLoading: isCreating_API }] = useCreateDailyTransactionMutation()
  const [updateTransaction, { isLoading: isUpdating }] = useUpdateDailyTransactionMutation()

  const form = useForm<DailyTransactionFormData>({
    resolver: zodResolver(dailyTransactionSchema) as Resolver<DailyTransactionFormData>,
    defaultValues: {
      date: new Date().toISOString().split("T")[0],
      label: "",
      amount: "",
    },
  })

  const handleCreateNew = () => {
    setEditingTransaction(null)
    form.reset({
      date: new Date().toISOString().split("T")[0],
      label: "",
      amount: "",
    })
    setIsCreating(true)
  }

  const handleEdit = (transaction: DailyTransaction) => {
    // Only allow editing today's transactions
    const transactionDate = parseISO(transaction.date)
    if (!isToday(transactionDate)) {
      showError("You can only edit today's transactions")
      return
    }

    setEditingTransaction(transaction)
    form.reset({
      date: transaction.date,
      label: transaction.label,
      amount: transaction.amount,
    })
    setIsCreating(true)
  }

  const handleCancelForm = () => {
    setIsCreating(false)
    setEditingTransaction(null)
    form.reset()
  }

  const handleSubmit = async (data: DailyTransactionFormData) => {
    if (!planItem) return

    try {
      if (editingTransaction) {
        await updateTransaction({
          planId,
          itemId: planItem.id,
          transactionId: editingTransaction.id,
          data,
        }).unwrap()
        showSuccess("Transaction updated successfully")
      } else {
        await createTransaction({
          planId,
          itemId: planItem.id,
          data,
        }).unwrap()
        showSuccess("Transaction created successfully")
      }
      handleCancelForm()
    } catch (error) {
      console.error("Error saving transaction:", error)
      showError("Failed to save transaction")
    }
  }

  const getTotalByDate = (date: string) => {
    const day = transactionsData?.days.find((d) => d.date === date)
    if (!day) return 0
    return day.transactions.reduce((sum, t) => {
      return sum + parseFloat(t.amount)
    }, 0)
  }

  // Calculate summary statistics
  const summary = useMemo(() => {
    if (!transactionsData?.days) return { total: 0, count: 0, average: 0, today: 0 }

    let total = 0
    let count = 0
    let today = 0

    transactionsData.days.forEach((day) => {
      const dayDate = parseISO(day.date)
      day.transactions.forEach((t) => {
        const amount = parseFloat(t.amount)
        total += amount
        count += 1
        if (isToday(dayDate)) {
          today += amount
        }
      })
    })

    return {
      total,
      count,
      average: count > 0 ? total / count : 0,
      today,
    }
  }, [transactionsData])

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-2xl overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Daily Transactions</SheetTitle>
          <SheetDescription>
            {planItem ? `Transactions for ${planItem.name}` : "Select a plan item"}
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-4">
          {/* Summary Statistics */}
          {!isLoading && transactionsData?.days && transactionsData.days.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="bg-gradient-to-br from-primary/5 via-background to-primary/10 backdrop-blur-lg border-primary/20">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base font-semibold">Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    <motion.div
                      className="rounded-xl bg-gradient-to-br from-background/80 to-muted/50 backdrop-blur-sm p-3 border border-border/40"
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <div className="p-1.5 rounded-lg bg-primary/10">
                          <TrendingUp className="h-4 w-4 text-primary" />
                        </div>
                        <span className="text-xs text-muted-foreground font-medium">Total Spent</span>
                      </div>
                      <p className="text-lg font-bold">{formatCurrency(summary.total, currency)}</p>
                    </motion.div>

                    <motion.div
                      className="rounded-xl bg-gradient-to-br from-background/80 to-muted/50 backdrop-blur-sm p-3 border border-border/40"
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <div className="p-1.5 rounded-lg bg-green-500/10">
                          <Clock className="h-4 w-4 text-green-600" />
                        </div>
                        <span className="text-xs text-muted-foreground font-medium">Today</span>
                      </div>
                      <p className="text-lg font-bold text-green-600">{formatCurrency(summary.today, currency)}</p>
                    </motion.div>

                    <motion.div
                      className="rounded-xl bg-gradient-to-br from-background/80 to-muted/50 backdrop-blur-sm p-3 border border-border/40"
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <div className="p-1.5 rounded-lg bg-blue-500/10">
                          <Hash className="h-4 w-4 text-blue-600" />
                        </div>
                        <span className="text-xs text-muted-foreground font-medium">Transactions</span>
                      </div>
                      <p className="text-lg font-bold">{summary.count}</p>
                    </motion.div>

                    <motion.div
                      className="rounded-xl bg-gradient-to-br from-background/80 to-muted/50 backdrop-blur-sm p-3 border border-border/40"
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <div className="p-1.5 rounded-lg bg-purple-500/10">
                          <DollarSign className="h-4 w-4 text-purple-600" />
                        </div>
                        <span className="text-xs text-muted-foreground font-medium">Average</span>
                      </div>
                      <p className="text-lg font-bold">{formatCurrency(summary.average, currency)}</p>
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Create Button */}
          {!isCreating && planItem && (
            <Button onClick={handleCreateNew} className="w-full">
              <Plus className="mr-2 h-4 w-4" />
              Add Transaction
            </Button>
          )}

          {/* Create/Edit Form */}
          {isCreating && (
            <Card className="border-2 border-primary/20 bg-gradient-to-br from-background to-muted/30 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg">
                  {editingTransaction ? "Edit Transaction" : "New Transaction"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="date"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Date</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                              <Input type="date" {...field} className="pl-10" />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="label"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Label</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                              <Input placeholder="e.g., Breakfast, Coffee" {...field} className="pl-10" />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="amount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Amount</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                              <Input
                                type="text"
                                placeholder="0"
                                value={field.value ? formatNumber(parseFloat(field.value)) : ""}
                                onChange={(e) => {
                                  const numericValue = parseFormattedNumber(e.target.value)
                                  field.onChange(numericValue.toString())
                                }}
                                onBlur={field.onBlur}
                                className="pl-10"
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="flex gap-2 justify-end pt-2">
                      <Button type="button" variant="outline" onClick={handleCancelForm}>
                        Cancel
                      </Button>
                      <Button type="submit" disabled={isCreating_API || isUpdating}>
                        {isCreating_API || isUpdating
                          ? "Saving..."
                          : editingTransaction
                          ? "Update"
                          : "Create"}
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          )}

          {/* Transactions List */}
          {isLoading ? (
            <div className="space-y-3">
              <Skeleton className="h-32 w-full" />
              <Skeleton className="h-32 w-full" />
              <Skeleton className="h-32 w-full" />
            </div>
          ) : transactionsData?.days && transactionsData.days.length > 0 ? (
            <div className="space-y-4">
              {transactionsData.days.map((day, dayIndex) => {
                const dayDate = parseISO(day.date)
                const isTodayDate = isToday(dayDate)
                
                return (
                  <motion.div
                    key={day.date}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: dayIndex * 0.1 }}
                  >
                    <Card
                      className={`bg-gradient-to-br from-background to-muted/20 backdrop-blur-sm border-border/60 ${
                        isTodayDate ? "ring-2 ring-primary/30" : ""
                      }`}
                    >
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <CardTitle className="text-base font-semibold">
                              {format(dayDate, "EEEE, MMMM d, yyyy")}
                            </CardTitle>
                            {isTodayDate && (
                              <Badge className="bg-primary/20 text-primary border-primary/30">
                                Today
                              </Badge>
                            )}
                          </div>
                          <Badge variant="outline" className="font-bold">
                            Total: {formatCurrency(getTotalByDate(day.date), currency)}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {day.transactions.map((transaction, index) => {
                            const amount = parseFloat(transaction.amount)
                            const canEdit = isTodayDate
                            
                            return (
                              <div key={transaction.id}>
                                {index > 0 && <Separator className="my-2" />}
                                <motion.div
                                  className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 transition-colors"
                                  whileHover={{ x: 4 }}
                                  transition={{ type: "spring", stiffness: 300 }}
                                >
                                  <div className="flex-1">
                                    <p className="font-medium">{transaction.label}</p>
                                    <p className="text-xs text-muted-foreground">
                                      {format(parseISO(transaction.createdAt), "HH:mm")}
                                    </p>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <p className="font-semibold text-lg">
                                      {formatCurrency(amount, currency)}
                                    </p>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => handleEdit(transaction)}
                                      disabled={!canEdit}
                                      className={!canEdit ? "opacity-30 cursor-not-allowed" : ""}
                                      title={!canEdit ? "Only today's transactions can be edited" : "Edit transaction"}
                                    >
                                      <Edit className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </motion.div>
                              </div>
                            )
                          })}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </div>
          ) : !isCreating ? (
            <Card className="bg-gradient-to-br from-background to-muted/20 backdrop-blur-sm">
              <CardContent className="flex flex-col items-center justify-center py-12">
                <p className="text-muted-foreground mb-4">No transactions yet</p>
                <Button onClick={handleCreateNew} variant="outline">
                  <Plus className="mr-2 h-4 w-4" />
                  Add your first transaction
                </Button>
              </CardContent>
            </Card>
          ) : null}
        </div>
      </SheetContent>
    </Sheet>
  )
}

