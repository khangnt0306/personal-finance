import { useState, useMemo } from "react"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@components/ui/sheet"
import { Button } from "@components/ui/button"
import { Plus } from "lucide-react"
import { useGetDailyTransactionsQuery } from "../../api/daily-transaction.api"
import type { DailyTransaction } from "../../types/daily-transaction.types"
import type { DailyTransactionsDrawerProps, SummaryStats } from "./types"
import { DrawerSummaryStats } from "./drawer-summary-stats"
import { DrawerTransactionForm } from "./drawer-transaction-form"
import { DrawerTransactionsList } from "./drawer-transactions-list"
import { parseISO, isToday } from "date-fns"

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

  const handleCreateNew = () => {
    setEditingTransaction(null)
    setIsCreating(true)
  }

  const handleEdit = (transaction: DailyTransaction) => {
    setEditingTransaction(transaction)
    setIsCreating(true)
  }

  const handleFormSuccess = () => {
    setIsCreating(false)
    setEditingTransaction(null)
  }

  const handleFormCancel = () => {
    setIsCreating(false)
    setEditingTransaction(null)
  }

  // Calculate summary statistics
  const summary: SummaryStats = useMemo(() => {
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
          <SheetTitle>Giao dịch hằng ngày</SheetTitle>
          <SheetDescription>
            {planItem ? `Các giao dịch của ${planItem.name}` : "Chọn một hạng mục kế hoạch"}
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-4">
          {/* Summary Statistics */}
          {!isLoading && transactionsData?.days && transactionsData.days.length > 0 && (
            <DrawerSummaryStats summary={summary} currency={currency} />
          )}

          {/* Create Button */}
          {!isCreating && planItem && (
            <div className="flex justify-center">
              <Button
                onClick={handleCreateNew}
                size="lg"
                className="p-6 pr-[16px] flex justify-center group relative overflow-hidden rounded-full bg-gradient-to-br from-blue-50/80 via-sky-50/70 to-cyan-50/80 backdrop-blur-xl border-[1px] border-blue-200/30 text-blue-700 shadow-md hover:shadow-xl hover:shadow-blue-200/40 hover:border-blue-300/50 hover:bg-gradient-to-br hover:from-blue-100/60 hover:via-sky-100/50 hover:to-cyan-100/60 transition-all duration-300 hover:rounded-full hover:px-8"
              >
                <div className="flex items-center gap-2">
                  <Plus className="h-5 w-5 shrink-0 transition-all duration-500 group-hover:rotate-180 group-hover:scale-110" />
                  <p className="max-w-0 overflow-hidden whitespace-nowrap opacity-0 transition-all duration-300 group-hover:max-w-xs group-hover:opacity-100 font-medium">
                    Thêm giao dịch
                  </p>
                </div>
              </Button>
            </div>
          )}

          {/* Create/Edit Form */}
          {isCreating && planItem && (
            <DrawerTransactionForm
              planId={planId}
              planItem={planItem}
              editingTransaction={editingTransaction}
              onSuccess={handleFormSuccess}
              onCancel={handleFormCancel}
            />
          )}

          {/* Transactions List */}
          {!isCreating && (
            <DrawerTransactionsList
              days={transactionsData?.days || []}
              currency={currency}
              isLoading={isLoading}
              onEdit={handleEdit}
              onCreateNew={handleCreateNew}
            />
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}

