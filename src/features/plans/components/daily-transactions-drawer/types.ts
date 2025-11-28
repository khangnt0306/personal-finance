import type { DailyTransaction, DailyTransactionDay } from "../../types/daily-transaction.types"
import type { PlanItem } from "../../types"

export interface DailyTransactionsDrawerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  planId: string
  planItem: PlanItem | null
  currency: string
}

export interface SummaryStats {
  total: number
  count: number
  average: number
  today: number
}

export interface TransactionFormProps {
  planId: string
  planItem: PlanItem
  editingTransaction: DailyTransaction | null
  onSuccess: () => void
  onCancel: () => void
}

export interface TransactionsListProps {
  days: DailyTransactionDay[]
  currency: string
  isLoading: boolean
  onEdit: (transaction: DailyTransaction) => void
  onCreateNew: () => void
}

export interface DayItemProps {
  day: DailyTransactionDay
  dayIndex: number
  currency: string
  onEdit: (transaction: DailyTransaction) => void
}

export interface TransactionItemProps {
  transaction: DailyTransaction
  currency: string
  onEdit: (transaction: DailyTransaction) => void
}

