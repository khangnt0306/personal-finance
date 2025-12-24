import { useState, useMemo } from "react"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@components/ui/sheet"
import { useGetDailyTransactionsQuery } from "../../api/daily-transaction.api"
import type { DailyTransaction, DefaultTransaction } from "../../types/daily-transaction.types"
import type { DailyTransactionsDrawerProps, SummaryStats } from "./types"
import { DrawerSummaryStats } from "./drawer-summary-stats"
import { DrawerTransactionForm } from "./drawer-transaction-form"
import { DrawerDefaultTransactionForm } from "./drawer-default-transaction-form"
import { DrawerTransactionsList } from "./drawer-transactions-list"
import { parseISO, isToday } from "date-fns"
import { AnimatedPlusButton } from "@components/common/AnimatedPlusButton"

export const DailyTransactionsDrawer = ({
  open,
  onOpenChange,
  planId,
  planItem,
  currency,
}: DailyTransactionsDrawerProps) => {
  const [isCreating, setIsCreating] = useState(false)
  const [editingTransaction, setEditingTransaction] = useState<DailyTransaction | null>(null)
  const [isEditingDefault, setIsEditingDefault] = useState(false)
  const [editingDefaultTransaction, setEditingDefaultTransaction] = useState<DefaultTransaction | null>(null)

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
    setIsEditingDefault(false)
  }

  const handleEdit = (transaction: DailyTransaction) => {
    setEditingTransaction(transaction)
    setIsCreating(true)
    setIsEditingDefault(false)
  }

  const handleCreateDefaultNew = () => {
    setEditingDefaultTransaction(null)
    setIsCreating(true)
    setIsEditingDefault(true)
  }

  const handleEditDefault = (transaction: DefaultTransaction) => {
    setEditingDefaultTransaction(transaction)
    setIsCreating(true)
    setIsEditingDefault(true)
  }

  const handleFormSuccess = () => {
    setIsCreating(false)
    setEditingTransaction(null)
    setEditingDefaultTransaction(null)
    setIsEditingDefault(false)
  }

  const handleFormCancel = () => {
    setIsCreating(false)
    setEditingTransaction(null)
    setEditingDefaultTransaction(null)
    setIsEditingDefault(false)
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
          {!isLoading && transactionsData?.days && transactionsData.days.length > 0 && planItem && (
            <DrawerSummaryStats
              summary={summary}
              currency={currency}
              planId={planId}
              itemId={planItem.id}
              isDefaultExcluded={planItem.type === "EXPENSE" && planItem.excludeType === "FIXED"}
              onEditDefault={handleEditDefault}
              onCreateDefault={handleCreateDefaultNew}
            />
          )}
          <div className="flex justify-center">
            <AnimatedPlusButton
              label="Thêm giao dịch"
              onClick={handleCreateNew}
              className="w-full sm:w-auto"
            />
          </div>
          {/* Create/Edit Form */}
          {isCreating && planItem && (
            <>
              {isEditingDefault ? (
                <DrawerDefaultTransactionForm
                  planId={planId}
                  planItem={planItem}
                  editingTransaction={editingDefaultTransaction}
                  onSuccess={handleFormSuccess}
                  onCancel={handleFormCancel}
                />
              ) : (
                <DrawerTransactionForm
                  planId={planId}
                  planItem={planItem}
                  editingTransaction={editingTransaction}
                  onSuccess={handleFormSuccess}
                  onCancel={handleFormCancel}
                />
              )}
            </>
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

